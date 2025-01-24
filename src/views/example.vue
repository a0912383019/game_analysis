<script setup lang="ts">
import { querySmallBoxData, addUser } from '@/api'
import dayjs from 'dayjs'

const querySmallBoxDataa = async () => {
  try {
    const response = await querySmallBoxData({
      hall_name: 'esx',
      search_date: '2024-12-23 ~ 2024-12-29'
    })
    console.log(response)

    const { return_code } = response.status

    if (return_code === '0000') {
      //整理table對應的資料
      meme(response.result)
    } else {
      console.error(response.status)
    }
  } catch (error) {
    console.error('aa', error)
  }
}

const addUserr = async () => {
  try {
    const response = await addUser({
      access_hall_name: 'esxxxx',
      email: 'user13467@example.com',
      user_status: 0,
      user_type: 0
    })
    console.log(response)

    const { return_code } = response.status

    if (return_code === '0000') {
      //整理table對應的資料
      // meme(response.result)
    } else {
      console.error(response.status)
    }
  } catch (error) {
    console.error('aa', error)
  }
}

const meme = (data: ResultSmallBoxData) => {
  console.log('vivi', data)
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

  querySmallBoxDataa()
  addUserr()
})
</script>
<template>
  <v-chart class="w-full" :option="barChartOptions" style="width: 600px; height: 400px"></v-chart>
  <div class="h-80 w-80" style="background-color: aqua">
    <span class="text-4xl">testest</span>
  </div>
</template>
<style lang="scss" scoped></style>
