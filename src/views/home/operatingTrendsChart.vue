<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { TableColumnsType } from 'ant-design-vue'
import { useGlobalStore } from '@/stores'
import { formatNumberWithK } from '@/utils/commonUtils'
import { lobbyGroupMap } from '@/../public/js/system_config'
import { EChartsOption, SeriesOption } from 'echarts'
import { Empty } from 'ant-design-vue'

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE

const { t } = useI18n()

const buttonGroup = computed(() => [
  { name: t('data_name.payoff'), value: 0 },
  { name: t('home.bet_people_num'), value: 1 },
  { name: t('home.commissionable'), value: 2 },
  { name: t('home.first_bet_people_num'), value: 3 },
  { name: t('home.churned_people_num'), value: 4 }
])
const currentTabs = ref<number>(0)

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
    }
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
    data: ['11/23', '11/24', '11/25', '11/26', '11/27', '11/28', '11/29']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: function (value: number) {
        return formatNumberWithK(value)
      }
    }
  },
  series: []
})

const chartTypeData = reactive<Record<number, SeriesOption[]>>({
  0: [
    {
      name: '總計',
      type: 'bar',
      barWidth: '30px',
      color: '#64AFFF',
      data: [14200, 9999, 2500, 5390, 496, 220, 3199]
    },
    {
      name: '電子',
      type: 'line',
      color: getCssVar(lobbyGroupMap[5].color),
      data: [293, 7781, 1222, 5231, 0, 0]
    },
    {
      name: '視訊',
      type: 'line',
      color: getCssVar(lobbyGroupMap[3].color),
      data: [12930, 3324, 655, 701, 6, 1, 2240]
    },
    {
      name: '棋牌',
      type: 'line',
      color: getCssVar(lobbyGroupMap[6].color),
      data: [120, 322, 891, 1, 25, 9, 1770]
    },
    {
      name: '捕魚',
      type: 'line',
      color: getCssVar(lobbyGroupMap[4].color),
      data: [150, 122, 91, 122, 25, 229, 770]
    },
    {
      name: '彩票',
      type: 'line',
      color: getCssVar(lobbyGroupMap[2].color),
      data: [320, 222, 391, 331, 235, 91, 170]
    }
  ],
  1: [
    {
      name: '總計',
      type: 'bar',
      barWidth: '30px',
      color: '#64AFFF',
      data: [1428800, 9999, 2500, 5390, 496, 220, 3199]
    }
  ]
})

const columns = ref<TableColumnsType[]>([
  [
    {
      title: t('home.game_category'),
      dataIndex: 'game_category',
      key: 'game_category',
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

const tableData = ref<any>([
  {
    game_category: '總計',
    totals: '--',
    color: 'bg-[#64AFFF]'
  },
  {
    game_category: '電子',
    totals: '--',
    color: `bg-[var(${lobbyGroupMap[5].color})]`
  },
  {
    game_category: '視訊',
    totals: '--',
    color: `bg-[var(${lobbyGroupMap[3].color})]`
  },
  {
    game_category: '棋牌',
    totals: '--',
    color: `bg-[var(${lobbyGroupMap[6].color})]`
  },
  {
    game_category: '捕魚',
    totals: '--',
    color: `bg-[var(${lobbyGroupMap[4].color})]`
  },
  {
    game_category: '彩票',
    totals: '455678908',
    color: `bg-[var(${lobbyGroupMap[2].color})]`
  }
])

const chartSeriesData = computed<SeriesOption[]>(() => {
  return chartTypeData[currentTabs.value] || []
})

watch(
  () => currentTabs.value,
  () => {
    barChartOptions.series = chartSeriesData.value
  }
)

onMounted(() => {
  barChartOptions.series = chartTypeData[0]
})
</script>
<template>
  <a-card class="cdp-card shadow-lg !mt-[15px] !ml-[15px]">
    <template #title>
      <div class="custom-shape bg-[var(--primary-color)]"></div>
      <cdp-icon name="operationsCenter"></cdp-icon>
      <span class="text-base !ml-2"> {{ $t('home.commercial_trend_chart') }} </span>
      <span class="text-[13px] text-[#A5B1C5] !ml-2">
        {{ $t('home.last_seven_days') }}
      </span>
    </template>
    <div class="!px-1">
      <cdp-button-group class="!mb-4" :buttonGroup="buttonGroup" v-model="currentTabs" />
      <a-row justify="start">
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
              <span class="color">{{ scope.record.game_category }}</span>
            </template>
          </custom-table>
        </a-col>
      </a-row>
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
  }
}
</style>
