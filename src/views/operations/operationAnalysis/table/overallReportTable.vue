<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { TableColumnsType } from 'ant-design-vue'
import { EChartsOption, SeriesOption } from 'echarts'
import { Empty } from 'ant-design-vue'
import { formatNumberWithK, formatNumber, formatToPercentage } from '@/utils/commonUtils'

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE

const { t } = useI18n()

const colors: string[] = ['#FFA152', '#2DA45F', '#1170D4']

const barChartOptions = ref<EChartsOption>({
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
  legend: {},
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
  yAxis: [
    {
      type: 'value',
      scale: true,
      alignTicks: true,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine: {
        lineStyle: {
          color: colors[0]
        }
      },
      axisLabel: {
        formatter: '{value}',
        fontSize: 14
      },
      position: 'left'
    },
    {
      type: 'value',
      scale: true,
      alignTicks: true,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine: {
        lineStyle: {
          color: colors[1]
        }
      },
      axisLabel: {
        formatter: (value: number) => formatNumberWithK(value),
        fontSize: 14
      },
      position: 'right'
    },
    {
      type: 'value',
      scale: true,
      alignTicks: true,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine: {
        lineStyle: {
          color: colors[2]
        }
      },
      axisLabel: {
        formatter: (value: number) => formatNumberWithK(value),
        fontSize: 14
      },
      position: 'right',
      offset: 70
    }
  ],
  series: [
    {
      name: '人數',
      type: 'bar',
      yAxisIndex: 0,
      barWidth: 30,
      barGap: '60%',
      data: [52255.21, 43311.339]
    },
    {
      name: '留言數',
      type: 'bar',
      yAxisIndex: 1,
      barWidth: 30,
      data: [2110030.6, 1850300.9]
    },
    {
      name: '觀看數',
      type: 'bar',
      yAxisIndex: 2,
      barWidth: 30,
      data: [9903120.0, 5123354.2]
    }
  ]
})

const columns = ref<TableColumnsType[]>([
  [
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
  tableData.value = [
    {
      time_duration: t('operation_analysis.base_period'),
      daily_avg_bet_amount: formatNumber(234231.2331),
      daily_avg_people_num: formatNumber(234231.2331),
      daily_avg_order_quantity: formatNumber(234231.2331),
      daily_avg_bet_amount_diff: formatToPercentage(234231.2331),
      daily_avg_people_num_diff: formatToPercentage(234231.2331),
      daily_avg_order_quantity_diff: formatToPercentage(234231.2331)
    },
    {
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
  <v-chart
    v-if="Array.isArray(barChartOptions.series) && barChartOptions.series.length > 0"
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
  :deep(tr:last-child) {
    color: #1170d4;
  }
}
</style>
