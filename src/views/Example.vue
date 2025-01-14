<script setup lang="ts">
import { apiQuerySmallBoxData } from '@/api'
import dayjs from 'dayjs'

const querySmallBoxData = async () => {
  try {
    const result = await apiQuerySmallBoxData({
      hall_name: 'esx',
      search_date: '2024-12-23 ~ 2024-12-29'
    })
    const { return_code } = result.data.status

    if (return_code === '0000' && result.data.result.length !== 0) {
      //整理table對應的資料
      console.log(result.data.result)
    } else {
      console.error(result.data.status)
    }
  } catch (error) {
    console.error(error)
  }
}

const barChartOptions = reactive({
  title: { text: '柱状图示例' },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['苹果', '橙子', '香蕉', '葡萄', '西瓜']
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10]
    }
  ]
})

onMounted(() => {
  console.log(dayjs().format())
  console.log(dayjs().toISOString())

  querySmallBoxData()
})
</script>
<template>
  <v-chart class="w-full" :option="barChartOptions" style="width: 600px; height: 400px"></v-chart>
  <div class="h-80 w-80" style="background-color: aqua">
    <span class="text-4xl">testest</span>
  </div>
</template>
<style lang="scss" scoped></style>
