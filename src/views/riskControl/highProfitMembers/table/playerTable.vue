<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import {
  apiBetReportByDate, // 第一層(日期)
  apiBetReportByLobby // 第二層
} from '@/api'
import { useHighProfitMembersStore } from '@/stores'
import { formatNumber, formatToPercentage } from '@/utils/commonUtils'
import { generateOverallParams, queryApi } from '@/utils/filterUtils'
/**
 * 第一層有分頁
 * 第二層無分頁
 */

const { t } = useI18n()

const highProfitMembersStore = useHighProfitMembersStore()
const { searchParams, tableBaseParams } = highProfitMembersStore

const tableRef = ref()
const tableData = ref<any[]>([])

const columns = ref<TableColumnsType[]>([
  // 第一層 header 會員
  [
    {
      title: t('common.member_id'),
      dataIndex: 'user_id',
      key: 'user_id',
      align: 'center',
      sorter: true
    },
    {
      title: t('unit.amount'),
      dataIndex: 'wager_count',
      key: 'wager_count',
      align: 'right',
      sorter: true
    },
    {
      title: t('data_name.bet_amount'),
      dataIndex: 'bet_amount',
      key: 'bet_amount',
      align: 'right',
      sorter: true
    },
    {
      title: t('data_name.bonus_amount'),
      dataIndex: 'bonus_amount',
      key: 'bonus_amount',
      align: 'right',
      sorter: true
    },
    {
      title: t('data_name.member_payoff'),
      dataIndex: 'member_payoff',
      key: 'member_payoff',
      align: 'right',
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: t('common.return_to_player'),
      dataIndex: 'rtp',
      key: 'rtp',
      align: 'right',
      sorter: true
    }
  ],
  // 第二層 header 遊戲名稱
  [
    {
      title: t('common.game_name'),
      dataIndex: 'game_name',
      key: 'game_name',
      align: 'center',
      sorter: true
    },
    {
      title: t('unit.amount'),
      dataIndex: 'wager_count',
      key: 'wager_count',
      align: 'right',
      sorter: true
    },
    {
      title: t('data_name.bet_amount'),
      dataIndex: 'bet_amount',
      key: 'bet_amount',
      align: 'right',
      sorter: true
    },
    {
      title: t('data_name.bonus_amount'),
      dataIndex: 'bonus_amount',
      key: 'bonus_amount',
      align: 'right',
      sorter: true
    },
    {
      title: t('data_name.member_payoff'),
      dataIndex: 'member_payoff',
      key: 'member_payoff',
      align: 'right',
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: t('common.return_to_player'),
      dataIndex: 'rtp',
      key: 'rtp',
      align: 'right',
      sorter: true
    }
  ]
])

const pagination = reactive({
  apiStart: 0,
  pageSize: 10,
  total: 0,
  currentPage: 1
})

const sortColumn = ref<string>('user_id')
const order = ref<string>('descend')
const apiLoading = ref<boolean>(false)

// 第一層 api 轉換
const transformBetReportByDate = (
  ret: ResultBetReportByDate,
  record: any,
  params: ParamsBetReport
) => {
  tableData.value = ret.data.map((item, idx) => {
    return {
      key: idx,
      data_date: item.data_date,
      user_count: formatNumber(item.user_count),
      wager_count: formatNumber(item.wager_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      payoff_ratio: formatToPercentage(item.payoff_ratio),
      innerLoading: true, // 第二層的 loading
      hasPage: false, // 第二層是否分頁模式
      innerExtraParams: {
        // 下一層需要帶入的參數
        device: params.device,
        endDate: item.data_date,
        startDate: item.data_date,
        hallId: params.hall_id,
        userId: params.user_id,
        username: params.username,
        game: params.game
      },
      innerPagination: {
        defaultSortCol: 'wager_count',
        sort: 'wager_count',
        order: 'descend',
        current: 1,
        pageSize: 10,
        total: 0
      },
      innerData: [] // 存放下一層資料的地方
    }
  })
}

// 第二層 api 轉換
const transformBetReportByLobby = (
  ret: ResultBetReportByLobby,
  record: any,
  params: ParamsBetReport
) => {
  record.innerPagination.total = 22
  record.innerData = ret.data.map((item, idx) => {
    return {
      key: idx,
      user_id: item.user_count,
      user_count: formatNumber(item.user_count),
      wager_count: formatNumber(item.wager_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      payoff_ratio: formatToPercentage(item.payoff_ratio)
    }
  })
}

// 第二層 api 呼叫
const subFuncBetReportByLobby = async (record: any) => {
  const { sort, order } = record.innerPagination
  let params = generateOverallParams(undefined, undefined, sort, order, record.innerExtraParams)

  record.innerLoading = true
  await queryApi<ParamsBetReport>(apiBetReportByLobby, params, transformBetReportByLobby, record)
  record.innerLoading = false
}

const fetchSubData = ref([subFuncBetReportByLobby])

// 第一層排序或換頁
const tableChange = async (
  page: number,
  size: number,
  sortOrder: any,
  sortField: string | undefined
) => {
  // 設定排序方向與排序欄位
  sortColumn.value = sortField || sortColumn.value

  // 如果排序是 undefined，恢復預設
  if (sortOrder) {
    order.value = sortOrder
  } else {
    order.value = 'descend'
    sortColumn.value = 'data_date'
  }
  pagination.currentPage = page
  pagination.pageSize = size
  pagination.apiStart = (pagination.currentPage - 1) * pagination.pageSize

  let params = generateOverallParams(
    pagination.pageSize,
    pagination.apiStart,
    sortColumn.value,
    order.value,
    tableBaseParams
  )

  apiLoading.value = true
  await queryApi<ParamsBetReport>(apiBetReportByDate, params, transformBetReportByDate, undefined)
  apiLoading.value = false
}

onMounted(async () => {
  // if (operationsOverallReportStore.isFiltered !== 0) {
  let params: ParamsBetReport = {
    end_date: '2025-05-19',
    hall_id: 6,
    start_date: '2025-05-01',
    order: 'DESC',
    sort: 'data_date'
  }

  apiLoading.value = true
  await queryApi<ParamsBetReport>(apiBetReportByDate, params, transformBetReportByDate, undefined)
  apiLoading.value = false
  // }
})
</script>
<template>
  <custom-table
    ref="tableRef"
    :pageSize="pagination.pageSize"
    :dataSource="tableData"
    :columns="columns"
    :serverSide="true"
    :total="pagination.total"
    :loading="apiLoading"
    :fetchSubData="fetchSubData"
    @update:tableChange="tableChange"
  ></custom-table>
</template>
<style lang="scss" scoped></style>
