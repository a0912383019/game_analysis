<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { TableColumnsType } from 'ant-design-vue'
import { EChartsOption, SeriesOption } from 'echarts'
import { Empty } from 'ant-design-vue'
import { formatNumberWithK, formatNumber, formatToPercentage } from '@/utils/commonUtils'

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE

const { t } = useI18n()

const colors: string[] = [
  '#C64E30',
  '#FF7E66',
  '#FFA247',
  '#FFCE45',
  '#C4C85C',
  '#8FD26F',
  '#38A868',
  '#69C3C6',
  '#6AB2FF',
  '#0560CB'
]

const activeKey = ref<string>('peopleNum')

const chartSeriesMap = reactive<Record<string, SeriesOption[]>>({
  peopleNum: [],
  amount: [],
  betAmount: []
})

const barChartOptions = computed<EChartsOption>(() => ({
  color: colors,
  tooltip: {
    trigger: 'axis',
    confine: true,
    axisPointer: {
      type: 'cross',
      label: {
        show: false
      }
    }
  },
  legend: {
    left: '70px'
  },
  grid: {
    containLabel: true, // 自動計算邊界，防止 label 被裁切
    left: '30px',
    right: '50px',
    bottom: 'auto' // 調小 bottom，減少 X 軸下方空白
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: true
    },
    data: [
      t('operation_analysis.base_period') + '2025-05-07~2025-05-13',
      t('operation_analysis.compare_period') + '2025-04-30~2025-05-06'
    ],
    axisLabel: {
      width: 180,
      lineHeight: 17,
      overflow: 'break'
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: (value: number) => formatNumberWithK(value)
    }
  },
  series: chartSeriesMap[activeKey.value]
}))

const columns = ref<TableColumnsType[]>([
  [
    {
      title: t('common.hall_master'),
      dataIndex: 'hall_name',
      key: 'hall_name',
      align: 'center',
      width: 280,
      customCell: (_, index) => {
        if (index === undefined) return {}
        if (index % 2 === 0) {
          return { rowSpan: 2 }
        }
        return { rowSpan: 0 }
      }
    },
    {
      title: t('date.time_duration'),
      dataIndex: 'time_duration',
      key: 'time_duration',
      align: 'center'
    },
    {
      title: t('operation_analysis.daily_avg_people_num'),
      dataIndex: 'daily_avg_people_num',
      key: 'daily_avg_people_num',
      align: 'right'
    },
    {
      title: t('operation_analysis.daily_avg_order_quantity'),
      dataIndex: 'daily_avg_order_quantity',
      key: 'daily_avg_order_quantity',
      align: 'right'
    },
    {
      title: t('operation_analysis.daily_avg_bet_amount'),
      dataIndex: 'daily_avg_bet_amount',
      key: 'daily_avg_bet_amount',
      align: 'right'
    },
    {
      title: t('operation_analysis.daily_avg_people_num_diff'),
      dataIndex: 'daily_avg_people_num_diff',
      key: 'daily_avg_people_num_diff',
      align: 'center'
    },
    {
      title: t('operation_analysis.daily_avg_order_quantity_diff'),
      dataIndex: 'daily_avg_order_quantity_diff',
      key: 'daily_avg_order_quantity_diff',
      align: 'center'
    },
    {
      title: t('operation_analysis.daily_avg_bet_amount_diff'),
      dataIndex: 'daily_avg_bet_amount_diff',
      key: 'daily_avg_bet_amount_diff',
      align: 'center'
    }
  ]
])

const tableData = ref<any>([])

onMounted(() => {
  chartSeriesMap.peopleNum = [
    {
      name: 'wggwewwwwwwww',
      type: 'bar',
      barMaxWidth: 30,
      barGap: '60%',
      data: [522535.21, 433311.339]
    },
    {
      name: 'em192919291292',
      type: 'bar',
      barMaxWidth: 30,
      data: [2110030.6, 1850300.9]
    }
  ]
  chartSeriesMap.amount = [
    {
      name: 'jinqs',
      type: 'bar',
      barMaxWidth: 30,
      data: [990120.0, 512334.2]
    },
    {
      name: '55wsw',
      type: 'bar',
      barMaxWidth: 30,
      data: [990120.0, 512334.2]
    },
    {
      name: 'hhdvdvddffdff',
      type: 'bar',
      barMaxWidth: 30,
      data: [990120.0, 512334.2]
    }
  ]

  tableData.value = [
    {
      hall_name: 'zzz(zzz)',
      time_duration: t('operation_analysis.base_period'),
      daily_avg_bet_amount: formatNumber(234231.2331),
      daily_avg_people_num: formatNumber(234231.2331),
      daily_avg_order_quantity: formatNumber(234231.2331),
      daily_avg_bet_amount_diff: formatToPercentage(234231.2331),
      daily_avg_people_num_diff: formatToPercentage(234231.2331),
      daily_avg_order_quantity_diff: formatToPercentage(234231.2331)
    },
    {
      hall_name: 'zzz(zzz)',
      time_duration: t('operation_analysis.compare_period'),
      daily_avg_bet_amount: formatNumber(234231.2331),
      daily_avg_people_num: formatNumber(234231.2331),
      daily_avg_order_quantity: formatNumber(234231.2331),
      daily_avg_bet_amount_diff: formatToPercentage(234231.2331),
      daily_avg_people_num_diff: formatToPercentage(234231.2331),
      daily_avg_order_quantity_diff: formatToPercentage(234231.2331)
    },
    {
      hall_name: 'kkk(kkk)',
      time_duration: t('operation_analysis.base_period'),
      daily_avg_bet_amount: formatNumber(234231.2331),
      daily_avg_people_num: formatNumber(234231.2331),
      daily_avg_order_quantity: formatNumber(234231.2331),
      daily_avg_bet_amount_diff: formatToPercentage(234231.2331),
      daily_avg_people_num_diff: formatToPercentage(234231.2331),
      daily_avg_order_quantity_diff: formatToPercentage(234231.2331)
    },
    {
      hall_name: 'kkk(kkk)',
      time_duration: t('operation_analysis.compare_period'),
      daily_avg_bet_amount: formatNumber(234231.2331),
      daily_avg_people_num: formatNumber(234231.2331),
      daily_avg_order_quantity: formatNumber(234231.2331),
      daily_avg_bet_amount_diff: formatToPercentage(234231.2331),
      daily_avg_people_num_diff: formatToPercentage(234231.2331),
      daily_avg_order_quantity_diff: formatToPercentage(234231.2331)
    }
  ]
})
</script>
<template>
  <a-tabs v-model:activeKey="activeKey" size="small" :tabBarGutter="15" class="cdp-tabs">
    <a-tab-pane key="peopleNum" :tab="t('unit.people_num')"></a-tab-pane>
    <a-tab-pane key="amount" :tab="t('unit.amount')"></a-tab-pane>
    <a-tab-pane key="betAmount" :tab="t('data_name.bet_amount')"></a-tab-pane>
  </a-tabs>
  <v-chart
    v-if="chartSeriesMap[activeKey].length !== 0"
    class="!h-[380px]"
    :option="barChartOptions"
    autoresize
  ></v-chart>
  <a-empty v-else :image="simpleImage" class="!my-[165px]" />
  <custom-table
    class="!mt-5 second-row-blue"
    :hasPage="false"
    :dataSource="tableData"
    :columns="columns"
    :serverSide="false"
    :loading="false"
  ></custom-table>
</template>
<style lang="scss" scoped>
.second-row-blue {
  :deep(tr:nth-child(odd)) {
    color: #1170d4;
  }
}
:deep(.ant-tabs-nav::before) {
  border-bottom: none;
}
.cdp-tabs {
  :deep(.ant-tabs-nav-wrap) {
    justify-content: flex-end;
    margin-right: 50px;
  }
  :deep(.ant-tabs-tab) {
    padding: 1px 0;
    .ant-tabs-tab-btn {
      color: #00000066;
    }
    &.ant-tabs-tab-active .ant-tabs-tab-btn {
      font-weight: 400;
      color: #000000;
      text-shadow: none;
    }
    :hover {
      color: #676767;
    }
  }
  :deep(.ant-tabs-ink-bar) {
    background: #000000;
    height: 1px;
  }
}
</style>
