<script setup lang="ts">
import { querySmallBoxData, addUser } from '@/api'
import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'
import type { AntSelectProps, AntInputProps } from '@/components/input/inputs'
import { useI18n } from 'vue-i18n'
import type { TableColumnsType } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { FormInstance } from 'ant-design-vue'
import type { SelectProps } from 'ant-design-vue'
// import { useI18n } from 'vue-i18n'
// import type { AntSelectProps, AntInputProps } from '@/components/input/inputs'

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
      sorter: (a: any, b: any) => a.betAmount - b.betAmount
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
        innerLoading: true, // 第二個子層的loading
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

const formRef = ref<FormInstance>()
const formState = reactive({
  pass: undefined,
  checkPass: '',
  age: undefined
})

const hallOptions = ref<SelectProps['options']>([
  {
    value: 6,
    label: 'esx'
  },
  {
    value: 7,
    label: 'mdo'
  },
  {
    value: 8,
    label: 'bmw'
  }
])

const hallProps = computed<AntSelectProps>(() => {
  return {
    allowClear: true,
    placeHolderText: t('common.select_hall'),
    placeHolderValuableText: t('common.hall'),
    options: hallOptions.value
  }
})

const checkAge = async (_rule: Rule, value: number) => {
  if (!value) {
    return Promise.reject('Please input the age')
  }
  if (!Number.isInteger(value)) {
    return Promise.reject('Please input digits')
  } else {
    if (value < 18) {
      return Promise.reject('Age must be greater than 18')
    } else {
      return Promise.resolve()
    }
  }
}

const rules: Record<string, Rule[]> = {
  pass: [{ required: true, trigger: 'change' }],
  age: [{ validator: checkAge, trigger: 'change' }]
}

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
  <div>
    <a-form ref="formRef" name="custom-validation" :model="formState" :rules="rules">
      <a-row class="mt-[20px] mb-[15px] !mx-[7.5px]" justify="left" :gutter="[15, 15]">
        <a-col :span="12">
          <a-form-item has-feedback name="pass">
            <!-- <a-input v-model:value="formState.pass" type="password" autocomplete="off" /> -->
            <ant-select v-model="formState.pass" v-bind="hallProps"></ant-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item has-feedback label="Confirm" name="age">
            <a-input v-model:value="formState.age" type="password" autocomplete="off" />
          </a-form-item>
        </a-col>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-row>
    </a-form>
  </div>
</template>
<style lang="scss" scoped></style>
