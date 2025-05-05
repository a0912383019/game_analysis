<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { TableColumnsType } from 'ant-design-vue'
import { useGlobalStore } from '@/stores'
import { getSessionStorageEntity, formatNumberWithK, formatNumber } from '@/utils/commonUtils'
import { targetMap } from '@/../public/js/system_config'
import { EChartsOption, SeriesOption } from 'echarts'
import { Empty } from 'ant-design-vue'
import { apiGetGameReportTrend } from '@/api'
import dayjs, { getPlatformToday } from '@/utils/appDayjs'
import { notification } from 'ant-design-vue'

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE

const { t } = useI18n()

const globalStore = useGlobalStore()

const todayDate = ref<Dayjs>(getPlatformToday(globalStore.currentPlatform))
const apiLoading = ref<boolean>(true)
const platformLobbies = getSessionStorageEntity('platform_config').platform_lobbies || []

const buttonGroup = computed(() => [
  { name: t('data_name.payoff'), value: 'payoff' },
  { name: t('home.bet_people_num'), value: 'wagers_count' },
  { name: t('data_name.bet_amount'), value: 'bet_amount' },
  { name: t('home.first_bet_people_num'), value: 'first_play_count' },
  { name: t('home.churned_people_num'), value: 'loss_count' }
])
const currentTabs = ref<string>('payoff')

const getCssVar = (varName: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(varName).trim()

const barChartOptions = reactive<EChartsOption>({
  tooltip: {
    trigger: 'axis',
    confine: true,
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
        type: 'dashed'
      },
      label: {
        show: false
      }
    },
    valueFormatter: (value) => formatNumber(value as string)
  },
  legend: {},
  grid: {
    containLabel: true, // 自動計算邊界，防止 label 被裁切
    left: 'auto',
    right: '5%',
    bottom: 'auto' // 調小 bottom，減少 X 軸下方空白
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: (value: number) => formatNumberWithK(value)
    }
  },
  series: []
})

const columns = ref<TableColumnsType[]>([
  [
    {
      title: t('home.game_category'),
      dataIndex: 'game_category',
      key: 'game_category',
      width: 100,
      align: 'center'
    },
    {
      title: t('common.totals'),
      dataIndex: 'totals',
      key: 'totals',
      align: 'center'
    }
  ]
])

const tableTypeData = reactive<Record<string, any[]>>({
  payoff: [],
  wagers_count: [],
  bet_amount: [],
  first_play_count: [],
  loss_count: []
})
const tableData = ref<any>([])

const chartTypeData = reactive<Record<string, SeriesOption[]>>({
  payoff: [],
  wagers_count: [],
  bet_amount: [],
  first_play_count: [],
  loss_count: []
})
const chartSeriesData = computed<SeriesOption[]>(() => {
  return chartTypeData[currentTabs.value] || []
})

const queryApiGetGameReportTrend = async () => {
  apiLoading.value = true
  try {
    const response = await apiGetGameReportTrend({
      start_date: todayDate.value.subtract(6, 'day').format('YYYY-MM-DD'),
      end_date: todayDate.value.format('YYYY-MM-DD')
    })

    const { result } = response
    if (result === 'success') {
      transformData(response.ret)
    } else {
      throw new Error()
    }
  } catch (err) {
    console.error(err)
    if (axios.isAxiosError(err)) {
      const status = err.response?.status
      if (status === 401) {
        // token 錯誤，登出
        globalStore.storeHandleApiError()
      } else if (status === 403) {
        // 沒有權限
        notification['error']({
          message: t('msg.no_permission')
        })
      } else {
        // query failed
        notification['error']({
          message: t('msg.query_failed')
        })
      }
    } else {
      // query failed
      notification['error']({
        message: t('msg.query_failed')
      })
    }
  } finally {
    apiLoading.value = false
  }
}

const getTrendValueByTargetId = (
  items: Array<GameReportTrend | GameReportTrendTarget>,
  keyName: string,
  targetId: number
) => {
  return items?.find((item) => item.target_id === targetId)?.[keyName] ?? 0
}

const transformData = (data: ResultGameReportTrend) => {
  // 依日期分類
  const groupedByDate = data.data.reduce(
    (acc, item) => {
      if (!acc[item.data_date]) {
        acc[item.data_date] = []
      }
      acc[item.data_date].push(item)
      return acc
    },
    {} as Record<string, GameReportTrend[]>
  )

  const sortedByDate = Object.entries(groupedByDate)
    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
    .map(([date, items]) => ({
      date,
      items
    }))

  barChartOptions.xAxis = [
    {
      type: 'category',
      data: sortedByDate.map((item) => dayjs(item.date).format('MM/DD'))
    }
  ]

  buttonGroup.value.forEach((item) => {
    chartTypeData[item.value] = platformLobbies.map(({ target }) => {
      return {
        name: t(`target_group.${targetMap[target].name}`),
        type: 'line',
        color: getCssVar(targetMap[target].color),
        data: sortedByDate.map((record) =>
          getTrendValueByTargetId(record.items, item.value, target)
        )
      }
    })

    chartTypeData[item.value].unshift({
      name: t('common.totals'),
      type: 'bar',
      barWidth: '30px',
      color: '#64AFFF',
      data: data.total.by_daily.map((ele) => ele[item.value])
    })

    tableTypeData[item.value] = platformLobbies.map(({ target }) => {
      return {
        game_category: t(`target_group.${targetMap[target].name}`),
        color: `bg-[var(${targetMap[target].color})]`,
        totals: formatNumber(getTrendValueByTargetId(data.total.by_target, item.value, target))
      }
    })
    tableTypeData[item.value].unshift({
      game_category: t('common.totals'),
      color: 'bg-[#64AFFF]',
      totals: formatNumber(data.total.overall[item.value])
    })
  })

  barChartOptions.series = chartTypeData[currentTabs.value]
  tableData.value = tableTypeData[currentTabs.value]
}

watch(
  () => currentTabs.value,
  () => {
    barChartOptions.series = chartSeriesData.value
    tableData.value = tableTypeData[currentTabs.value]
  }
)

onMounted(() => {
  queryApiGetGameReportTrend()
})
</script>
<template>
  <a-card class="cdp-card shadow-lg !mt-[10px]">
    <template #title>
      <div class="custom-shape bg-[var(--primary-color)]"></div>
      <cdp-icon name="operationsCenter"></cdp-icon>
      <span class="text-base !ml-2"> {{ $t('home.commercial_trend_chart') }} </span>
      <span class="text-[13px] text-[#A5B1C5] !ml-2">
        {{ $t('date.last_seven_days') }}
      </span>
    </template>
    <div class="!px-1">
      <cdp-button-group class="!mb-4" :buttonGroup="buttonGroup" v-model="currentTabs" />
      <a-spin :spinning="apiLoading">
        <a-row justify="center">
          <a-col :span="15">
            <v-chart
              v-if="chartSeriesData.length !== 0"
              class="chart"
              :option="barChartOptions"
              autoresize
            ></v-chart>
            <a-empty v-else :image="simpleImage" class="!mt-[90px]" />
          </a-col>
          <a-col :span="9">
            <custom-table
              class="min-h-[300px] home-chart"
              :hasPage="false"
              :dataSource="tableData"
              :columns="columns"
              :serverSide="false"
              :loading="false"
            >
              <template #game_category="scope">
                <span class="circle" :class="scope.record.color"></span>
                <span>{{ scope.record.game_category }}</span>
              </template>
            </custom-table>
          </a-col>
        </a-row>
      </a-spin>
    </div>
  </a-card>
</template>
<style lang="scss" scoped>
.chart {
  height: 289px;
  max-height: 290px;
  overflow: visible !important;
}
.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}
.home-chart {
  :deep(.ant-table) {
    tbody {
      tr {
        height: 42px;
      }
    }
    .ant-empty {
      height: 182px;
    }
  }
}
</style>
