<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import {
  apiBetReportByLobby, // 第一層
  apiBetReportByGame, // 第二層
  apiBetReportByHall, // 第三層
  apiBetReportByUser, // 第四層
  apiBetReportLiveBySerialType // 第五層
} from '@/api'
import { useOperationsOverallReportStore } from '@/stores'
import { formatNumber, formatToPercentage } from '@/utils/commonUtils'
import { generateOverallParams, queryApi } from '@/utils/filterUtils'

/**
 * 第一層有分頁
 * 第二層無分頁
 * 第三層無分頁
 * 第四層有分頁(會員層)
 * 第五層無分頁(只有BB視訊才有第五層)
 */

const { t } = useI18n()

const operationsOverallReportStore = useOperationsOverallReportStore()
const { searchParams, tableBaseParams } = operationsOverallReportStore

const tableRef = ref()
const tableData = ref<any[]>([])

const columns = ref<TableColumnsType[]>([
  // 第一層 header 遊戲大類
  [
    {
      title: t('common.game_categories'),
      dataIndex: 'lobby_name',
      key: 'lobby_name',
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
  // 第二層 header 遊戲名稱
  [
    {
      title: t('common.game_name'),
      dataIndex: 'game_name',
      key: 'game_name',
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
      title: t('common.num_of_win_bet'),
      dataIndex: 'base_win_wager_count',
      key: 'base_win_wager_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.num_of_lost_bet'),
      dataIndex: 'base_lose_wager_count',
      key: 'base_lose_wager_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.num_of_free_game_win_bet'),
      dataIndex: 'free_win_wager_count',
      key: 'free_win_wager_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.num_of_free_game_lost_bet'),
      dataIndex: 'free_lose_wager_count',
      key: 'free_lose_wager_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.win_bet_proportion'),
      dataIndex: 'win_ratio',
      key: 'win_ratio',
      align: 'center',
      sorter: true
    }
  ],
  // 第三層 header 廳主名稱
  [
    {
      title: t('common.hall_name'),
      dataIndex: 'hall_name',
      key: 'hall_name',
      align: 'center',
      defaultSortOrder: 'descend',
      width: 320,
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
      title: t('common.num_of_win_bet'),
      dataIndex: 'base_win_wager_count',
      key: 'base_win_wager_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.num_of_lost_bet'),
      dataIndex: 'base_lose_wager_count',
      key: 'base_lose_wager_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.num_of_free_game_win_bet'),
      dataIndex: 'free_win_wager_count',
      key: 'free_win_wager_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.num_of_free_game_lost_bet'),
      dataIndex: 'free_lose_wager_count',
      key: 'free_lose_wager_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.win_bet_proportion'),
      dataIndex: 'win_ratio',
      key: 'win_ratio',
      align: 'center',
      sorter: true
    }
  ],
  // 第四層 header 會員
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
    },
    {
      title: t('common.num_of_win_bet'),
      dataIndex: 'base_win_wager_count',
      key: 'base_win_wager_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.num_of_lost_bet'),
      dataIndex: 'base_lose_wager_count',
      key: 'base_lose_wager_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.num_of_free_game_win_bet'),
      dataIndex: 'free_win_wager_count',
      key: 'free_win_wager_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.num_of_free_game_lost_bet'),
      dataIndex: 'free_lose_wager_count',
      key: 'free_lose_wager_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.win_bet_proportion'),
      dataIndex: 'win_ratio',
      key: 'win_ratio',
      align: 'center',
      sorter: true
    }
  ],
  // 第五層 header 玩法(僅視訊)
  [
    {
      title: t('common.game_mode'),
      dataIndex: 'serial_type_name',
      key: 'serial_type_name',
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
  ]
])

const pagination = reactive({
  apiStart: 0,
  pageSize: 10,
  total: 0,
  currentPage: 1
})

const sortColumn = ref<string>('lobby_name')
const order = ref<string>('descend')
const loading = ref<boolean>(false)

// 第一層 api 轉換
const transformBetReportByLobby = (
  ret: ResultBetReportByLobby,
  record: any,
  params: ParamsBetReport
) => {
  pagination.total = ret.records_total
  tableData.value = ret.data.map((item, idx) => {
    return {
      key: idx,
      lobby: item.lobby, // 子層需要的參數
      lobby_name: item.lobby_name,
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
        endDate: params.end_date,
        startDate: params.start_date,
        hallId: params.hall_id,
        userId: params.user_id,
        username: params.username,
        lobby: item.lobby
      },
      innerPagination: {
        // 下一層分頁的預設值
        current: 1,
        pageSize: 1000,
        total: 0,
        sort: 'game_name',
        order: 'descend'
      },
      innerData: [] // 存放下一層資料的地方
    }
  })
}

// 第二層 api 轉換
const transformBetReportByGame = (
  ret: ResultBetReportByGame,
  record: any,
  params: ParamsBetReport
) => {
  record.innerPagination.total = ret.records_total
  // 進階篩選選項排除
  record.innerData = ret.data.map((item, idx) => {
    return {
      key: idx,
      game_name: item.game_name,
      user_count: formatNumber(item.user_count),
      wager_count: formatNumber(item.wager_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      payoff_ratio: formatToPercentage(item.payoff_ratio),
      expected_rtp: formatToPercentage(item.expected_rtp),
      rtp: formatToPercentage(item.rtp),
      base_win_wager_count: formatNumber(item.base_win_wager_count),
      base_lose_wager_count: formatNumber(item.base_lose_wager_count),
      free_win_wager_count: formatNumber(item.free_win_wager_count),
      free_lose_wager_count: formatNumber(item.free_lose_wager_count),
      win_ratio: formatToPercentage(item.win_ratio),
      innerLoading: true, // 第三層的loading
      hasPage: false, // 第三層是否分頁模式
      innerExtraParams: {
        // 下一層需要帶入的參數
        device: params.device,
        endDate: params.end_date,
        startDate: params.start_date,
        hallId: params.hall_id,
        userId: params.user_id,
        username: params.username,
        lobby: item.lobby,
        gameCode: item.game_code,
        expectedRtp: item.expected_rtp
      },
      innerPagination: {
        current: 1,
        pageSize: 1000,
        total: 0,
        sort: 'hall_name',
        order: 'descend'
      },
      innerData: []
    }
  })
}

// 第三層 api 轉換
const transformBetReportByHall = (
  ret: ResultBetReportByHall,
  record: any,
  params: ParamsBetReport
) => {
  record.innerPagination.total = ret.records_total
  record.innerData = ret.data.map((item, idx) => {
    return {
      key: idx,
      hall_name: `${item.hall_name} (${item.login_code})`,
      user_count: formatNumber(item.user_count),
      wager_count: formatNumber(item.wager_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      payoff_ratio: formatToPercentage(item.payoff_ratio),
      expected_rtp: formatToPercentage(record.innerExtraParams.expectedRtp),
      rtp: formatToPercentage(item.rtp),
      base_win_wager_count: formatNumber(item.base_win_wager_count),
      base_lose_wager_count: formatNumber(item.base_lose_wager_count),
      free_win_wager_count: formatNumber(item.free_win_wager_count),
      free_lose_wager_count: formatNumber(item.free_lose_wager_count),
      win_ratio: formatToPercentage(item.win_ratio),
      innerLoading: true, // 第四層的loading
      hasPage: true, // 第四層是否分頁模式
      canExpand: record.innerExtraParams.lobby === 3, // 第四層是否可擴展（只有視訊可展開）
      innerExtraParams: {
        // 下一層需要帶入的參數
        device: params.device,
        endDate: params.end_date,
        startDate: params.start_date,
        hallId: item.hall_id,
        userId: params.user_id,
        username: params.username,
        lobby: record.innerExtraParams.lobby,
        gameCode: record.innerExtraParams.gameCode
      },
      innerPagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        sort: 'wager_count',
        order: 'descend'
      },
      innerData: []
    }
  })
}

// 第四層 api 轉換
const transformBetReportByUser = (
  ret: ResultBetReportByUser,
  record: any,
  params: ParamsBetReport
) => {
  record.innerPagination.total = ret.records_total
  record.innerData = ret.data.map((item, idx) => {
    return {
      key: idx,
      user_id: item.user_id,
      wager_count: formatNumber(item.wager_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      payoff_ratio: formatToPercentage(item.payoff_ratio),
      base_win_wager_count: formatNumber(item.base_win_wager_count),
      base_lose_wager_count: formatNumber(item.base_lose_wager_count),
      free_win_wager_count: formatNumber(item.free_win_wager_count),
      free_lose_wager_count: formatNumber(item.free_lose_wager_count),
      win_ratio: formatToPercentage(item.win_ratio),
      innerLoading: true, // 第五層的loading
      hasPage: false, // 第五層是否分頁模式
      innerExtraParams: {
        // 下一層需要帶入的參數
        device: params.device,
        endDate: params.end_date,
        startDate: params.start_date,
        hallId: params.hall_id,
        userId: [item.user_id],
        username: [],
        lobby: record.innerExtraParams.lobby,
        gameCode: record.innerExtraParams.gameCode
      },
      innerPagination: {
        current: 1,
        pageSize: 1000,
        total: 0,
        sort: 'wager_count',
        order: 'descend'
      },
      innerData: []
    }
  })
}

// 第五層 api 轉換
const transformBetReportLiveBySerialType = (
  ret: ResultBetReportLiveBySerialType,
  record: any,
  params: ParamsBetReport
) => {
  record.innerPagination.total = ret.records_total
  record.innerData = ret.data.map((item, idx) => {
    return {
      key: idx,
      serial_type_name: item.serial_type_name,
      wager_count: formatNumber(item.wager_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      payoff_ratio: formatToPercentage(item.payoff_ratio)
    }
  })
}

// 第二層 api 呼叫
const subFuncBetReportByGame = async (record: any) => {
  const { current, pageSize, sort, order } = record.innerPagination
  let apiStart = (current - 1) * pageSize

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
  let params = generateOverallParams(pageSize, apiStart, sort, order, record.innerExtraParams)

  record.innerLoading = true
  await queryApi(apiBetReportByGame, params, transformBetReportByGame, record)
  record.innerLoading = false
}

// 第三層 api 呼叫
const subFuncBetReportByHall = async (record: any) => {
  const { current, pageSize, sort, order } = record.innerPagination
  let apiStart = (current - 1) * pageSize

  const newGameParams = searchParams.gamePlayValue?.filter(
    (ele) =>
      ele.lobby === record.innerExtraParams.lobby &&
      ele.game_code === record.innerExtraParams.gameCode
  )
  record.innerExtraParams.game =
    newGameParams?.length !== 0
      ? newGameParams
      : [
          {
            lobby: record.innerExtraParams.lobby,
            game_code: record.innerExtraParams.gameCode
          }
        ]
  let params = generateOverallParams(pageSize, apiStart, sort, order, record.innerExtraParams)

  record.innerLoading = true
  await queryApi(apiBetReportByHall, params, transformBetReportByHall, record)
  record.innerLoading = false
}

// 第四層 api 呼叫
const subFuncBetReportByUser = async (record: any) => {
  const { current, pageSize, sort, order } = record.innerPagination
  let apiStart = (current - 1) * pageSize

  const newGameParams = searchParams.gamePlayValue?.filter(
    (ele) =>
      ele.lobby === record.innerExtraParams.lobby &&
      ele.game_code === record.innerExtraParams.gameCode
  )
  record.innerExtraParams.game =
    newGameParams?.length !== 0
      ? newGameParams
      : [
          {
            lobby: record.innerExtraParams.lobby,
            game_code: record.innerExtraParams.gameCode
          }
        ]
  let params = generateOverallParams(pageSize, apiStart, sort, order, record.innerExtraParams)

  record.innerLoading = true
  await queryApi(apiBetReportByUser, params, transformBetReportByUser, record)
  record.innerLoading = false
}

// 第五層 api 呼叫
const subFuncBetReportLiveBySerialType = async (record: any) => {
  const { current, pageSize, sort, order } = record.innerPagination
  let apiStart = (current - 1) * pageSize

  const newGameParams = searchParams.gamePlayValue?.filter(
    (ele) =>
      ele.lobby === record.innerExtraParams.lobby &&
      ele.game_code === record.innerExtraParams.gameCode
  )
  record.innerExtraParams.game =
    newGameParams?.length !== 0
      ? newGameParams
      : [
          {
            lobby: record.innerExtraParams.lobby,
            game_code: record.innerExtraParams.gameCode
          }
        ]
  let params = generateOverallParams(pageSize, apiStart, sort, order, record.innerExtraParams)

  record.innerLoading = true
  await queryApi(apiBetReportLiveBySerialType, params, transformBetReportLiveBySerialType, record)
  record.innerLoading = false
}

const fetchSubData = ref([
  subFuncBetReportByGame,
  subFuncBetReportByHall,
  subFuncBetReportByUser,
  subFuncBetReportLiveBySerialType
])

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
    sortColumn.value = 'lobby_name'
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
  await queryApi(apiBetReportByLobby, params, transformBetReportByLobby, undefined)
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
    await queryApi(apiBetReportByLobby, params, transformBetReportByLobby, undefined)
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
