<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import {
  apiBetReportByDate, // 第一層(日期)
  apiBetReportByLobby, // 第二層
  apiBetReportLiveBySerialType // 第三層
} from '@/api'
import { useOperationsOverallReportStore } from '@/stores'
import { formatNumber, formatToPercentage } from '@/utils/commonUtils'
import { generateOverallParams, queryApi } from '@/utils/filterUtils'
/**
 * 第一層有分頁
 * 第二層無分頁
 * 第三層無分頁
 */

const { t } = useI18n()

const operationsOverallReportStore = useOperationsOverallReportStore()
const { searchParams, tableBaseParams } = operationsOverallReportStore

const tableRef = ref()
const tableData = ref<any[]>([])

const columns = ref<TableColumnsType[]>([
  // 第一層 header 日期
  [
    {
      title: t('date.date'),
      dataIndex: 'data_date',
      key: 'data_date',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: t('common.member_quantity'),
      dataIndex: 'user_count',
      key: 'user_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('unit.amount'),
      dataIndex: 'wager_count',
      key: 'wager_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('data_name.bet_amount'),
      dataIndex: 'bet_amount',
      key: 'bet_amount',
      align: 'center',
      sorter: true
    },
    {
      title: t('data_name.payoff'),
      dataIndex: 'payoff',
      key: 'payoff',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.profit_ratio'),
      dataIndex: 'payoff_ratio',
      key: 'payoff_ratio',
      align: 'center',
      sorter: true
    }
  ],
  // 第二層 header 遊戲大類
  [
    {
      title: t('common.game_categories'),
      dataIndex: 'lobby_name',
      key: 'lobby_name',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.member_quantity'),
      dataIndex: 'user_count',
      key: 'user_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('unit.amount'),
      dataIndex: 'wager_count',
      key: 'wager_count',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: t('data_name.bet_amount'),
      dataIndex: 'bet_amount',
      key: 'bet_amount',
      align: 'center',
      sorter: true
    },
    {
      title: t('data_name.payoff'),
      dataIndex: 'payoff',
      key: 'payoff',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.profit_ratio'),
      dataIndex: 'payoff_ratio',
      key: 'payoff_ratio',
      align: 'center',
      sorter: true
    }
  ],
  // 第三層 header 遊戲注區
  [
    {
      title: t('common.game_bet_area'),
      dataIndex: 'serial_type_name',
      key: 'serial_type_name',
      align: 'center',
      width: 320,
      sorter: true
    },
    {
      title: t('data_name.odds'), // 賠率
      dataIndex: '', // 待填
      key: '', // 待填
      align: 'center',
      sorter: true
    },
    {
      title: t('common.member_quantity'),
      dataIndex: 'user_count',
      key: 'user_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('unit.amount'),
      dataIndex: 'wager_count',
      key: 'wager_count',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: t('data_name.bet_amount'),
      dataIndex: 'bet_amount',
      key: 'bet_amount',
      align: 'center',
      sorter: true
    },
    {
      title: t('data_name.payoff'),
      dataIndex: 'payoff',
      key: 'payoff',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.return_to_player_theory'),
      dataIndex: 'expected_rtp',
      key: 'expected_rtp',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.return_to_player'),
      dataIndex: 'rtp',
      key: 'rtp',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.order_share_by_game'),
      dataIndex: 'serial_type_wager_count_ratio',
      key: 'serial_type_wager_count_ratio',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.profit_share_by_game'),
      dataIndex: 'serial_type_payoff_ratio',
      key: 'serial_type_payoff_ratio',
      align: 'center',
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

const sortColumn = ref<string>('data_date')
const order = ref<string>('descend')
const loading = ref<boolean>(false)

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
        order: 'descend'
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
  record.innerData = ret.data.map((item, idx) => {
    return {
      key: idx,
      lobby_name: item.lobby_name,
      user_count: formatNumber(item.user_count),
      wager_count: formatNumber(item.wager_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      payoff_ratio: formatToPercentage(item.payoff_ratio),
      innerLoading: true, // 第三層的 loading
      hasPage: false, // 第三層是否分頁模式
      allowExpand: item.lobby === 3,
      innerExtraParams: {
        // 下一層需要帶入的參數
        device: params.device,
        endDate: params.end_date,
        startDate: params.start_date,
        hallId: params.hall_id,
        userId: params.user_id,
        username: params.username,
        lobby: item.lobby
        // game: params.game
      },
      innerPagination: {
        defaultSortCol: 'wager_count',
        sort: 'wager_count',
        order: 'descend'
      },
      innerData: [] // 存放下一層資料的地方
    }
  })
}

// 第三層 api 轉換
const transformBetReportLiveBySerialType = (
  ret: ResultBetReportLiveBySerialType,
  record: any,
  params: ParamsBetReport
) => {
  record.innerData = ret.data.map((item, idx) => {
    return {
      key: idx,
      serial_type_name:
        item.serial_type_name === ''
          ? `${item.game_name}`
          : `${item.game_name} - ${item.serial_type_name}`,
      // odds: formatNumber(item.odds), // 賠率
      user_count: formatNumber(item.user_count),
      wager_count: formatNumber(item.wager_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      expected_rtp: formatToPercentage(item.expected_rtp),
      rtp: formatToPercentage(item.rtp),
      serial_type_wager_count_ratio: formatToPercentage(item.serial_type_wager_count_ratio),
      serial_type_payoff_ratio: formatToPercentage(item.serial_type_payoff_ratio)
    }
  })
}

// 第二層 api 呼叫
const subFuncBetReportByLobby = async (record: any) => {
  const { sort, order } = record.innerPagination
  let params = generateOverallParams(undefined, undefined, sort, order, record.innerExtraParams)

  record.innerLoading = true
  await queryApi(apiBetReportByLobby, params, transformBetReportByLobby, record)
  record.innerLoading = false
}

// 第三層 api 呼叫
const subFuncBetReportLiveBySerialType = async (record: any) => {
  const { sort, order } = record.innerPagination

  const newGameParams = searchParams.gamePlayValue?.filter(
    (ele) => ele.lobby === record.innerExtraParams.lobby
  )
  record.innerExtraParams.game =
    newGameParams?.length !== 0
      ? newGameParams
      : [
          {
            lobby: record.innerExtraParams.lobby
          }
        ]
  let params = generateOverallParams(undefined, undefined, sort, order, record.innerExtraParams)

  record.innerLoading = true
  await queryApi(apiBetReportLiveBySerialType, params, transformBetReportLiveBySerialType, record)
  record.innerLoading = false
}
const fetchSubData = ref([subFuncBetReportByLobby, subFuncBetReportLiveBySerialType])

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

  loading.value = true
  await queryApi(apiBetReportByDate, params, transformBetReportByDate, undefined)
  loading.value = false
}

onMounted(async () => {
  if (operationsOverallReportStore.isFiltered !== 0) {
    let params = generateOverallParams(
      pagination.pageSize,
      pagination.apiStart,
      sortColumn.value,
      order.value,
      tableBaseParams
    )

    loading.value = true
    await queryApi(apiBetReportByDate, params, transformBetReportByDate, undefined)
    loading.value = false
  }
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
    :loading="loading"
    :fetchSubData="fetchSubData"
    @update:tableChange="tableChange"
  ></custom-table>
</template>
<style lang="scss" scoped></style>
