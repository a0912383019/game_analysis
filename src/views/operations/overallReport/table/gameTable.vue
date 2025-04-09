<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import dayjs from '@/utils/appDayjs'
import { useI18n } from 'vue-i18n'
import {
  apiBetReportByLobby, // 第一層
  apiBetReportByGame, // 第二層
  apiBetReportByHall, // 第三層
  apiBetReportLiveBySerialType // 第五層
} from '@/api'
import { notification } from 'ant-design-vue'
import { useGlobalStore, useOperationsOverallReportStore } from '@/stores'
import { formatNumber, formatToApiDate, formatToPercentage } from '@/utils/commonUtils'

/**
 * 第一層有分頁
 * 第二層無分頁
 * 第三層無分頁
 * 第四層有分頁
 * 第五層無分頁(只有BB視訊才有第五層)
 */

const { t } = useI18n()

const globalStore = useGlobalStore()
const operationsOverallReportStore = useOperationsOverallReportStore()
const { searchParams } = operationsOverallReportStore

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
      title: t('common.profit_comparison_by_game'),
      dataIndex: 'payoff_ratio',
      key: 'payoff_ratio',
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
      title: t('common.return_to_player_theory'),
      dataIndex: 'expected_rtp',
      key: 'expected_rtp',
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
      title: t('common.profit_comparison_by_game'),
      dataIndex: 'payoff_ratio',
      key: 'payoff_ratio',
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
      title: t('common.return_to_player_theory'),
      dataIndex: 'expected_rtp',
      key: 'expected_rtp',
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
      dataIndex: 'hall_name',
      key: 'hall_name',
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
      title: t('common.profit_comparison_by_game'),
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
  ]
  // // 第五層 header 玩法(僅視訊)
  // [
  //   {
  //     title: t('common.game_mode'),
  //     dataIndex: 'game_name',
  //     key: 'game_name',
  //     align: 'center',
  //     sorter: true
  //   },
  //   {
  //     title: t('unit.amount'),
  //     dataIndex: 'wager_count',
  //     key: 'wager_count',
  //     align: 'center',
  //     sorter: true
  //   },
  //   {
  //     title: t('data_name.bet_amount'),
  //     dataIndex: 'bet_amount',
  //     key: 'bet_amount',
  //     align: 'center',
  //     sorter: true
  //   },
  //   {
  //     title: t('data_name.payoff'),
  //     dataIndex: 'payoff',
  //     key: 'payoff',
  //     align: 'center',
  //     sorter: true
  //   },
  //   {
  //     title: t('common.profit_ratio'),
  //     dataIndex: 'payoff_ratio',
  //     key: 'payoff_ratio',
  //     align: 'center',
  //     sorter: true
  //   }
  // ]
])

const apiStart = ref<number>(0) // 起始筆數
const pageSize = ref<number>(10) // 每頁筆數
const total = ref<number>(0) // 總筆數
const currentPage = ref<number>(1)
const sortColumn = ref<string>('lobby_name')
const order = ref<string>('descend')
const loading = ref<boolean>(false)

const generateParams = (
  apiLength: number,
  sortCol: string,
  apiStart: number,
  order: string
): ParamsBetReport => {
  let apiParams = {
    device: searchParams.deviceTypeValue,
    end_date: formatToApiDate(dayjs(searchParams.dateDuration[1])),
    start_date: formatToApiDate(dayjs(searchParams.dateDuration[0])),
    hall_id: searchParams.hallValue === 0 ? undefined : searchParams.hallValue,
    user_id: searchParams.memberType === 'id' ? searchParams.memberValue : [],
    username: searchParams.memberType === 'account' ? searchParams.memberValue : [],
    game: searchParams.gamePlayValue
  }

  return {
    ...apiParams,
    length: apiLength,
    sort: sortCol,
    start: apiStart,
    order: order === 'descend' ? 'DESC' : 'ASC'
  }
}

const queryBetApi = async (
  apiFunc: Function,
  params: ParamsBetReport,
  transformFunc: Function,
  record: any
) => {
  try {
    const response = await apiFunc(params)
    const { result } = response

    if (result === 'success') {
      if (response.ret.data.length !== 0) {
        transformFunc(response.ret, record, params)
      }
    } else {
      throw new Error()
    }
  } catch (err) {
    console.error(err)
    if (axios.isAxiosError(err)) {
      const status = err.response?.status
      if (status === 401) {
        // token 錯誤，登出
        globalStore.storeHandleApiError()
      } else if (status === 403) {
        // 沒有權限
        notification['error']({
          message: t('msg.no_permission')
        })
      } else {
        // query failed
        notification['error']({
          message: t('msg.query_failed')
        })
      }
    } else {
      // query failed
      notification['error']({
        message: t('msg.query_failed')
      })
    }
  }
}

// 第一層 api 轉換
const transformBetReportByLobby = (
  ret: ResultBetReportByLobby,
  record: any,
  params: ParamsBetReport
) => {
  total.value = ret.records_total
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
      // canExpand: false, // 第二層的 +
      fatherParams: params,
      innerExtraParams: {
        lobby: item.lobby
      },
      innerPagination: {
        current: 1,
        pageSize: 1000,
        total: 0,
        sort: 'game_name',
        order: 'descend'
      },
      innerData: []
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
  record.innerData = ret.data.map((item, idx) => {
    return {
      key: idx,
      game_name: item.game_name,
      user_count: formatNumber(item.user_count),
      wager_count: formatNumber(item.wager_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      payoff_ratio: formatToPercentage(item.payoff_ratio),
      rtp: formatToPercentage(item.rtp),
      expected_rtp: formatToPercentage(item.expected_rtp),
      base_win_wager_count: formatNumber(item.base_win_wager_count),
      base_lose_wager_count: formatNumber(item.base_lose_wager_count),
      free_win_wager_count: formatNumber(item.free_win_wager_count),
      free_lose_wager_count: formatNumber(item.free_lose_wager_count),
      win_ratio: formatToPercentage(item.win_ratio),
      innerLoading: true, // 第三層的loading
      hasPage: false, // 第三層是否分頁模式
      fatherParams: params,
      innerExtraParams: {
        lobby: item.lobby,
        game_code: item.game_code,
        expected_rtp: item.expected_rtp
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
      hall_name: item.hall_name,
      user_count: formatNumber(item.user_count),
      wager_count: formatNumber(item.wager_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      payoff_ratio: formatToPercentage(item.payoff_ratio),
      rtp: formatToPercentage(item.rtp),
      expected_rtp: formatToPercentage(record.innerExtraParams.expected_rtp),
      base_win_wager_count: formatNumber(item.base_win_wager_count),
      base_lose_wager_count: formatNumber(item.base_lose_wager_count),
      free_win_wager_count: formatNumber(item.free_win_wager_count),
      free_lose_wager_count: formatNumber(item.free_lose_wager_count),
      win_ratio: formatToPercentage(item.win_ratio),
      innerLoading: true, // 第四層的loading
      hasPage: true, // 第四層是否分頁模式
      innerPagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        sort: 'bet_amount',
        order: 'descend'
      },
      innerData: []
    }
  })
}

// 第二層 api 呼叫
const subFuncBetReportByGame = async (record: any) => {
  record.innerLoading = true
  const { current, pageSize, sort, order } = record.innerPagination
  let apiStart = (current - 1) * pageSize

  let params = generateParams(pageSize, sort, apiStart, order)
  params.game = [
    {
      lobby: record.innerExtraParams.lobby
    }
  ]
  await queryBetApi(apiBetReportByGame, params, transformBetReportByGame, record)
  record.innerLoading = false
}

// 第三層 api 呼叫
const subFuncBetReportByHall = async (record: any) => {
  record.innerLoading = true
  const { current, pageSize, sort, order } = record.innerPagination
  let apiStart = (current - 1) * pageSize

  let params = generateParams(pageSize, sort, apiStart, order)
  params.game = [
    {
      lobby: record.innerExtraParams.lobby,
      game_code: record.innerExtraParams.game_code
    }
  ]
  await queryBetApi(apiBetReportByHall, params, transformBetReportByHall, record)
  record.innerLoading = false
}

const fetchSubData = ref([subFuncBetReportByGame, subFuncBetReportByHall])

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

  currentPage.value = page
  pageSize.value = size
  apiStart.value = (currentPage.value - 1) * pageSize.value
  let params = generateParams(pageSize.value, sortColumn.value, apiStart.value, order.value)
  loading.value = true
  await queryBetApi(apiBetReportByLobby, params, transformBetReportByLobby, undefined)
  loading.value = false
}

onMounted(async () => {
  if (operationsOverallReportStore.isFiltered !== 0) {
    loading.value = true
    let params = generateParams(pageSize.value, sortColumn.value, apiStart.value, order.value)
    await queryBetApi(apiBetReportByLobby, params, transformBetReportByLobby, undefined)
    loading.value = false
  }
})
</script>
<template>
  <custom-table
    ref="tableRef"
    :pageSize="pageSize"
    :dataSource="tableData"
    :columns="columns"
    :serverSide="true"
    :total="total"
    :loading="loading"
    :fetchSubData="fetchSubData"
    @update:tableChange="tableChange"
  ></custom-table>
</template>
<style lang="scss" scoped>
// 無資料時 table 的高度
:deep(.ant-table-placeholder) {
  height: 100px !important;
}
</style>
