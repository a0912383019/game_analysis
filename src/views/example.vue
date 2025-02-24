<script setup lang="ts">
import { querySmallBoxData, addUser } from '@/api'
import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'
import type { AntSelectProps, AntInputProps } from '@/components/input/inputs'
import { useI18n } from 'vue-i18n'
import type { TableColumnsType } from 'ant-design-vue'

const { t } = useI18n()

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

const datePickerChangeHandler = (date: [Dayjs, Dayjs] | undefined) => {
  console.log(date)
}

const overallProfitValue = ref<number | undefined>(undefined)
const overallProfitProps = computed<AntInputProps>(() => {
  return {
    placeHolderText: t('common.overall_profit'),
    type: 'number'
  }
})

const sortDate: (a: any, b: any) => number = (a, b) => {
  return new Date(a.betTime).getTime() - new Date(b.betTime).getTime()
}

const columns = ref<TableColumnsType[]>([
  [
    {
      title: '注單',
      width: 125,
      dataIndex: 'bet',
      key: 'bet',
      align: 'center'
    },
    {
      title: '下注時間',
      width: 172,
      dataIndex: 'betTime',
      key: 'betTime',
      align: 'center',
      sorter: sortDate
    },
    {
      title: '會員帳號',
      width: 172,
      dataIndex: 'account',
      key: 'account',
      align: 'center'
    },
    {
      title: '遊戲名稱',
      width: 145,
      dataIndex: 'game',
      key: 'game',
      align: 'center'
    },
    {
      title: '投注額',
      width: 125,
      dataIndex: 'betAmount',
      key: 'betAmount',
      align: 'center'
    },
    {
      title: '有效投注額',
      width: 125,
      dataIndex: 'commissionable',
      key: 'commissionable',
      align: 'center'
    },
    {
      title: '注單狀態',
      width: 115,
      dataIndex: 'status',
      key: 'status',
      align: 'center'
    },
    {
      title: '損益',
      width: 115,
      dataIndex: 'payoff',
      key: 'payoff',
      align: 'center'
    },
    {
      title: '獲利率',
      width: 115,
      dataIndex: 'profitRate',
      key: 'profitRate',
      align: 'center'
    }
  ],
  [
    {
      title: '投注額',
      width: 125,
      dataIndex: 'betAmount',
      key: 'betAmount',
      align: 'center',
      sorter: (a: any, b: any) => a.betAmount - b.betAmount,
    },
    {
      title: '有效投注額',
      width: 125,
      dataIndex: 'commissionable',
      key: 'commissionable',
      align: 'center'
    },
    {
      title: '注單狀態',
      width: 115,
      dataIndex: 'status',
      key: 'status',
      align: 'center'
    }
  ],
  [
    {
      title: '注單狀態',
      width: 115,
      dataIndex: 'status',
      key: 'status',
      align: 'center'
    }
  ]
])

const data = ref([
  {
    key: 0,
    bet: 2299222239,
    betTime: '2024-01-22 01:33:12',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '-19.2',
    profitRate: '20%',
    innerLoading: true, // 第一個子層的loading
    innerData: [
      {
        key: 0,
        betAmount: '49.2',
        commissionable: '8,833.12',
        status: '已結',
        innerLoading: true,  // 第二個子層的loading
        innerData: []
      },
      {
        key: 1,
        betAmount: '55.2',
        commissionable: '8,833.12',
        status: '已結',
        innerLoading: true,
        innerData: []
      }
    ]
  },
  {
    key: 1,
    bet: 2299222239,
    betTime: '2024-01-22 01:33:13',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '-19234,12323,231121,23.2',
    profitRate: '20%',
    innerLoading: true,
    innerData: []
  },
  {
    key: 2,
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%',
    innerLoading: true,
    innerData: []
  },
  {
    key: 3,
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%',
    innerLoading: true,
    innerData: []
  },
  {
    key: 4,
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%',
    innerLoading: true,
    innerData: []
  },
  {
    key: 5,
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%',
    innerLoading: true,
    innerData: []
  }
])

const aaa = async (record) => {
  record.innerData = [
    {
      key: 0,
      betAmount: '49.2',
      commissionable: '8,833.12',
      status: '已結',
      innerLoading: true,
      innerData: []
    },
    {
      key: 1,
      betAmount: '55.2',
      commissionable: '8,833.12',
      status: '已結',
      innerLoading: true,
      innerData: []
    }
  ]
  record.innerLoading = false
}

const bbb = async (record) => {
  record.innerData = [
    {
      key: 0,
      status: '已結'
    }
  ]
  record.innerLoading = false
}

const fetchSubData = ref([aaa, bbb])

onMounted(() => {
  console.log(dayjs().format())
  console.log(dayjs().toISOString())

  querySmallBoxDataa()
  addUserr()
})
</script>
<template>
  <section class="cdp-section p-4">
    <custom-table
      :pageSize="3"
      :dataSource="data"
      :columns="columns"
      :loading="false"
      :fetchSubData="fetchSubData"
    ></custom-table>
  </section>
  <v-chart class="w-full" :option="barChartOptions" style="width: 600px; height: 400px"></v-chart>
  <div class="h-80 w-80" style="background-color: aqua">
    <span class="text-4xl">testest</span>
    <ant-date-range
      @update:value="datePickerChangeHandler"
      :disabledDays="7"
      :rangeConfig="2"
      :showTime="true"
    ></ant-date-range>
  </div>
  <cdp-button-group />
  <!-- <ant-input v-model="overallProfitValue" v-bind="overallProfitProps"></ant-input> -->
</template>
<style lang="scss" scoped></style>
