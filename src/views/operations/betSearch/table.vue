<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import dayjs, { Dayjs } from '@/utils/appDayjs'
import { useI18n } from 'vue-i18n'
// import { querySmallBoxData } from '@/api'
import { useOperationsBetSearchStore } from '@/stores'

const { t } = useI18n()

const operationsBetSearchStore = useOperationsBetSearchStore()
const { searchParams } = operationsBetSearchStore

const tableData = ref([
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:12',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '-19.2',
    profitRate: '20%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:13',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '-19234,12323,231121,23.2',
    profitRate: '20%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  },
  {
    bet: 2299222239,
    betTime: '2024-01-22 01:33:14',
    account: '869agent403596013',
    game: '糖果派對',
    betAmount: '49.2',
    commissionable: '8,833.12',
    status: '已結',
    payoff: '23.2',
    profitRate: '25%'
  }
])

// 注單表格
const columnsBet = ref<TableColumnsType[]>([
  [
    {
      title: t('bet_search.bet_slip'),
      width: 125,
      dataIndex: 'bet',
      key: 'bet',
      align: 'center',
      sorter: true
    },
    {
      title: t('bet_search.betting_time'),
      width: 172,
      dataIndex: 'betTime',
      key: 'betTime',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.member_account'),
      width: 172,
      dataIndex: 'account',
      key: 'account',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.game_name'),
      width: 145,
      dataIndex: 'game',
      key: 'game',
      align: 'center',
      sorter: true
    },
    {
      title: t('bet_search.bet_amount'),
      width: 125,
      dataIndex: 'betAmount',
      key: 'betAmount',
      align: 'center',
      sorter: true
    },
    {
      title: t('bet_search.effective_bet_amount'),
      width: 125,
      dataIndex: 'commissionable',
      key: 'commissionable',
      align: 'center',
      sorter: true
    },
    {
      title: t('bet_search.bet_slip_status'),
      width: 115,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: true
    },
    {
      title: t('data_name.payoff'),
      width: 115,
      dataIndex: 'payoff',
      key: 'payoff',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.profit_ratio'),
      width: 115,
      dataIndex: 'profitRate',
      key: 'profitRate',
      align: 'center',
      sorter: true
    }
  ]
])

// 日期表格
const columnsDate = ref<TableColumnsType[]>([
  [
    {
      title: t('bet_search.betting_date'),
      width: 152,
      dataIndex: 'betDate',
      key: 'betDate',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.member_account'),
      width: 204,
      dataIndex: 'account',
      key: 'account',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.game_name'),
      width: 177,
      dataIndex: 'game',
      key: 'game',
      align: 'center',
      sorter: true
    },
    {
      title: t('bet_search.bet_amount'),
      width: 152,
      dataIndex: 'betAmount',
      key: 'betAmount',
      align: 'center',
      sorter: true
    },
    {
      title: t('bet_search.effective_bet_amount'),
      width: 166,
      dataIndex: 'commissionable',
      key: 'commissionable',
      align: 'center',
      sorter: true
    },
    {
      title: t('data_name.payoff'),
      width: 140,
      dataIndex: 'payoff',
      key: 'payoff',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.profit_ratio'),
      width: 140,
      dataIndex: 'profitRate',
      key: 'profitRate',
      align: 'center',
      sorter: true
    }
  ]
])

const apiStart = ref<number>(0) // 起始筆數
const pageSize = ref<number>(10) // 每頁筆數
const currentPage = ref<number>(1)
const sortColumn = ref<string>('bet')
const order = ref<string>('descend')

const loading = ref<boolean>(true)

// const querySmallBoxDataa = async () => {
//   try {
//     const response = await querySmallBoxData({
//       hall_name: 'esx',
//       search_date: '2024-12-23 ~ 2024-12-29'
//     })
//     const { return_code } = response.status

//     if (return_code === '0000') {
//       transformTable()
//     } else {
//       console.error(response.status)
//     }
//   } catch (error) {
//     console.error('aa', error)
//   }
// }

const transformTable = () => {}

const columns = ref(columnsBet.value)

// 排序或是切換切呼叫
const tableChange = async (page: number, size: number, sortOrder: string, sortField: string) => {
  currentPage.value = page
  pageSize.value = size
  order.value = sortOrder
  sortColumn.value = sortField
  apiStart.value = currentPage.value * pageSize.value - pageSize.value

  loading.value = true
  // tableData.value = []
  // tableData.value = tableData.value.slice(1)
  // await querySmallBoxDataa()
  loading.value = false
}

// 監聽搜尋
watch(
  () => operationsBetSearchStore.isFiltered,
  async () => {
    columns.value = searchParams.typeValue === 'bet' ? columnsBet.value : columnsDate.value

    loading.value = true
    tableData.value = []
    // tableData.value = tableData.value.slice(1)
    // await querySmallBoxDataa()
    loading.value = false
  }
)


onMounted(async () => {
  // await querySmallBoxDataa()
  loading.value = false
})
</script>
<template>
  <section class="cdp-section !p-4">
    <custom-table
      :pageSize="pageSize"
      :dataSource="tableData"
      :columns="columns"
      :serverSide="true"
      :loading="loading"
      @update:tableChange="tableChange"
    ></custom-table>
  </section>
</template>
<style lang="scss" scoped>
// 無資料時 table 的高度
:deep(.ant-table-placeholder) {
  height: 400px;
}
</style>
