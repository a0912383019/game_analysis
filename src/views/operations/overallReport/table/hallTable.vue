<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import dayjs from '@/utils/appDayjs'
import { useI18n } from 'vue-i18n'
import {
  apiBetReportByHall, // 第一層
  apiBetReportByUser, // 第二層
  apiBetReportByLobby, // 第三層
  apiBetReportByGame, // 第四層
  apiBetReportLiveBySerialType // 第五層
} from '@/api'
import { useOperationsOverallReportStore } from '@/stores'
import {
  formatNumber,
  formatToApiDate,
  formatToPercentage,
  handleApiError
} from '@/utils/commonUtils'

/**
 * 第一層有分頁
 * 第二層有分頁(會員層)
 * 第三層無分頁
 * 第四層無分頁
 * 第五層無分頁(只有BB視訊才有第五層)
 */

const { t } = useI18n()

const operationsOverallReportStore = useOperationsOverallReportStore()
const { searchParams } = operationsOverallReportStore

const tableRef = ref()
const tableData = ref<any[]>([])

const columns = ref<TableColumnsType[]>([
  // 第一層 header 廳主名稱
  [
    {
      title: t('common.hall_name'),
      dataIndex: 'hall_name',
      key: 'hall_name',
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
      title: t('common.profit_comparison_by_game'),
      dataIndex: 'payoff_ratio',
      key: 'payoff_ratio',
      align: 'center',
      sorter: true
    }
  ],
  // 第二層 header 會員
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
      title: t('common.profit_comparison_by_game'),
      dataIndex: 'payoff_ratio',
      key: 'payoff_ratio',
      align: 'center',
      sorter: true
    }
  ],
  // 第三層 header 遊戲大類
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
  // 第四層 header 遊戲名稱
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

const sortColumn = ref<string>('hall_name')
const order = ref<string>('descend')
const loading = ref<boolean>(false)

const generateParams = (
  apiLength: number,
  apiStart: number,
  sortCol: string,
  order: string,
  paramInfo: any
): ParamsBetReport => {
  let apiParams = {
    device: paramInfo.device,
    end_date: paramInfo.endDate,
    start_date: paramInfo.startDate,
    hall_id: paramInfo.hallId,
    user_id: paramInfo.userId,
    username: paramInfo.username,
    game: paramInfo.game
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
    handleApiError(err)
  }
}

// 第一層 api 轉換
const transformBetReportByHall = (
  ret: ResultBetReportByHall,
  record: any,
  params: ParamsBetReport
) => {
  pagination.total = ret.records_total
  tableData.value = ret.data.map((item, idx) => {
    return {
      key: idx,
      hall_name: `${item.hall_name} (${item.login_code})`,
      user_count: formatNumber(item.user_count),
      wager_count: formatNumber(item.wager_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      payoff_ratio: formatToPercentage(item.payoff_ratio),
      innerLoading: true,
      hasPage: true,
      innerExtraParams: {
        // 下一層需要帶入的參數
        device: params.device,
        endDate: params.end_date,
        startDate: params.start_date,
        hallId: item.hall_id,
        userId: params.user_id,
        username: params.username,
        game: params.game
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

// 第二層 api 轉換
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
      innerLoading: true,
      hasPage: false,
      innerExtraParams: {
        // 下一層需要額外帶入的參數
        device: params.device,
        endDate: params.end_date,
        startDate: params.start_date,
        hallId: params.hall_id,
        userId: [item.user_id],
        username: [],
        game: params.game
      },
      innerPagination: {
        current: 1,
        pageSize: 1000,
        total: 0,
        sort: 'lobby_name',
        order: 'descend'
      },
      innerData: []
    }
  })
}

// 第三層 api 轉換
const transformBetReportByLobby = (
  ret: ResultBetReportByLobby,
  record: any,
  params: ParamsBetReport
) => {
  record.innerPagination.total = ret.records_total
  record.innerData = ret.data.map((item, idx) => {
    return {
      key: idx,
      lobby_name: item.lobby_name,
      wager_count: formatNumber(item.wager_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      payoff_ratio: formatToPercentage(item.payoff_ratio),
      innerLoading: true,
      hasPage: false,
      canExpand: item.lobby === 3,
      innerExtraParams: {
        // 下一層需要額外帶入的參數
        device: params.device,
        endDate: params.end_date,
        startDate: params.start_date,
        hallId: params.hall_id,
        userId: params.user_id,
        username: [],
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

// 第四層 api 轉換
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
      wager_count: formatNumber(item.wager_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      payoff_ratio: formatToPercentage(item.payoff_ratio),
      innerLoading: true,
      hasPage: false,
      innerExtraParams: {
        // 下一層需要帶入的參數
        device: params.device,
        endDate: params.end_date,
        startDate: params.start_date,
        hallId: params.hall_id,
        userId: params.user_id,
        username: params.username,
        lobby: record.innerExtraParams.lobby,
        gameCode: item.game_code
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
const subFuncBetReportByUser = async (record: any) => {
  const { current, pageSize, sort, order } = record.innerPagination
  let apiStart = (current - 1) * pageSize

  let params = generateParams(pageSize, apiStart, sort, order, record.innerExtraParams)

  record.innerLoading = true
  await queryBetApi(apiBetReportByUser, params, transformBetReportByUser, record)
  record.innerLoading = false
}

// 第三層 api 呼叫
const subFuncBetReportByLobby = async (record: any) => {
  const { current, pageSize, sort, order } = record.innerPagination
  let apiStart = (current - 1) * pageSize

  let params = generateParams(pageSize, apiStart, sort, order, record.innerExtraParams)

  record.innerLoading = true
  await queryBetApi(apiBetReportByLobby, params, transformBetReportByLobby, record)
  record.innerLoading = false
}

// 第四層 api 呼叫
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
  let params = generateParams(pageSize, apiStart, sort, order, record.innerExtraParams)

  record.innerLoading = true
  await queryBetApi(apiBetReportByGame, params, transformBetReportByGame, record)
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
  let params = generateParams(pageSize, apiStart, sort, order, record.innerExtraParams)

  record.innerLoading = true
  await queryBetApi(
    apiBetReportLiveBySerialType,
    params,
    transformBetReportLiveBySerialType,
    record
  )
  record.innerLoading = false
}

const fetchSubData = ref([
  subFuncBetReportByUser,
  subFuncBetReportByLobby,
  subFuncBetReportByGame,
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
    sortColumn.value = 'hall_name'
  }

  pagination.currentPage = page
  pagination.pageSize = size
  pagination.apiStart = (pagination.currentPage - 1) * pagination.pageSize

  const paramInfo = getParamInfo()

  let params = generateParams(
    pagination.pageSize,
    pagination.apiStart,
    sortColumn.value,
    order.value,
    paramInfo
  )

  loading.value = true
  await queryBetApi(apiBetReportByHall, params, transformBetReportByHall, undefined)
  loading.value = false
}

const getParamInfo = () => {
  return {
    device: searchParams.deviceTypeValue,
    endDate: formatToApiDate(dayjs(searchParams.dateDuration[1])),
    startDate: formatToApiDate(dayjs(searchParams.dateDuration[0])),
    hallId: searchParams.hallValue === 0 ? undefined : searchParams.hallValue,
    userId: searchParams.memberType === 'memberId' ? searchParams.memberValue : [],
    username: searchParams.memberType === 'account' ? searchParams.memberValue : [],
    game: searchParams.gamePlayValue
  }
}

onMounted(async () => {
  if (operationsOverallReportStore.isFiltered !== 0) {
    const paramInfo = getParamInfo()

    let params = generateParams(
      pagination.pageSize,
      pagination.apiStart,
      sortColumn.value,
      order.value,
      paramInfo
    )

    loading.value = true
    await queryBetApi(apiBetReportByHall, params, transformBetReportByHall, undefined)
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
<style lang="scss" scoped>
// 無資料時 table 的高度
:deep(.ant-table-placeholder) {
  height: 400px;
}
</style>
