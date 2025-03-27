<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import dayjs from '@/utils/appDayjs'
import { useI18n } from 'vue-i18n'
import { apiBetSettledByDate, apiBetRecords } from '@/api'
import { useOperationsBetSearchStore, useGlobalStore } from '@/stores'
import {
  formatNumber,
  formatToApiTime,
  formatToApiDate,
  formatByTimeZone,
  formatToPercentage
} from '@/utils/commonUtils'
import { notification } from 'ant-design-vue'

const { t } = useI18n()

const globalStore = useGlobalStore()

const operationsBetSearchStore = useOperationsBetSearchStore()
const { searchParams } = operationsBetSearchStore

const tableRef = ref()
const tableData = ref<any[]>([])

// 注單表格
const columnsBet = ref<TableColumnsType[]>([
  [
    {
      title: t('bet_search.bet_slip'),
      width: 155,
      dataIndex: 'wager_id',
      key: 'wager_id',
      align: 'center',
      sorter: true
    },
    {
      title: t('bet_search.betting_time'),
      width: 180,
      dataIndex: 'bet_time',
      key: 'bet_time',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.member_account'),
      width: 172,
      dataIndex: 'username',
      key: 'username',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.game_name'),
      width: 145,
      dataIndex: 'game_name',
      key: 'game_name',
      align: 'center',
      sorter: true
    },
    {
      title: t('data_name.bet_amount'),
      width: 125,
      dataIndex: 'bet_amount',
      key: 'bet_amount',
      align: 'center',
      sorter: true
    },
    {
      title: t('bet_search.bet_slip_status'),
      width: 115,
      dataIndex: 'result',
      key: 'result',
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
      dataIndex: 'payoff_ratio',
      key: 'payoff_ratio',
      align: 'center',
      sorter: true
    }
  ]
])

// 結算日期表格
const columnsDate = ref<TableColumnsType[]>([
  [
    {
      title: t('bet_search.betting_date'),
      width: 152,
      dataIndex: 'settle_date',
      key: 'settle_date',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.member_account'),
      width: 204,
      dataIndex: 'username',
      key: 'username',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.game_name'),
      width: 177,
      dataIndex: 'game_name',
      key: 'game_name',
      align: 'center',
      sorter: true
    },
    {
      title: t('bet_search.bet_amount'),
      width: 152,
      dataIndex: 'bet_amount',
      key: 'bet_amount',
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
      dataIndex: 'payoff_ratio',
      key: 'payoff_ratio',
      align: 'center',
      sorter: true
    }
  ]
])

const apiStart = ref<number>(0) // 起始筆數
const pageSize = ref<number>(10) // 每頁筆數
const total = ref<number>(0) // 總筆數
const currentPage = ref<number>(1)
const sortColumn = ref<string>('settle_date')
const order = ref<string>('descend')

const loading = ref<boolean>(false)

const queryBetApi = async (
  apiFunc: Function,
  params: ParamsBetRecords | ParamsBetSettledByDate,
  searchType: string
) => {
  try {
    const response = await apiFunc(params)
    const { result } = response

    if (result === 'success') {
      if (response.ret.data.length !== 0) {
        total.value = response.ret.records_total
        transformTable(response.ret.data, searchType)
      }
      notification['success']({
        message: t('msg.query_success')
      })
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

const betStatusMap = {
  1: t('bet_search.bet_finish'),
  0: t('bet_search.bet_not_finish'),
  '-1': t('bet_search.bet_destroy')
}

const generateBetResult = (status: number): string => {
  return betStatusMap[status] || ''
}

const transformTable = (data: BetRecords[] | BetSettledByDate[], searchType: string) => {
  if (searchType === 'bet') {
    tableData.value = (data as BetRecords[]).map((item) => {
      return {
        wager_id: item.wager_id,
        bet_time: formatByTimeZone(item.bet_time).format(t('date.format_time_rule')),
        username: item.username,
        game_name: item.game_name,
        bet_amount: formatNumber(item.bet_amount),
        result: generateBetResult(item.result),
        payoff: formatNumber(item.payoff),
        payoff_ratio: formatToPercentage(item.payoff_ratio)
      }
    })
  } else {
    tableData.value = (data as BetSettledByDate[]).map((item) => {
      return {
        settle_date: item.settle_date,
        username: item.username,
        game_name: item.game_name,
        bet_amount: formatNumber(item.bet_amount),
        payoff: formatNumber(item.payoff),
        payoff_ratio: formatToPercentage(item.payoff_ratio)
      }
    })
  }
}

const columns = computed(() =>
  searchParams.searchTypeValue === 'bet' ? columnsBet.value : columnsDate.value
)

const setColumnSortOrder = (sortField: string | undefined, sortOrder: 'descend' | 'ascend' | undefined) => {
  columns.value[0].forEach((col) => {
    col.defaultSortOrder = col.key === sortField ? sortOrder : undefined
  })
}

// 排序或是切換分頁時呼叫
const tableChange = async (
  page: number,
  size: number,
  sortOrder: 'descend' | 'ascend' | undefined,
  sortField: string | undefined
) => {
  // 設定排序方向與排序欄位
  sortColumn.value = sortField || sortColumn.value

  // 如果排序是 undefined，恢復預設
  if (sortOrder) {
    order.value = sortOrder
  } else {
    order.value = 'descend'
    sortColumn.value = searchParams.searchTypeValue === 'bet' ? 'bet_time' : 'settle_date'
  }

  // 更新對應欄位的排序狀態
  setColumnSortOrder(sortField, sortOrder)

  // 只有當 tableData.value 不為空時才執行換頁與 API 查詢
  if (tableData.value.length !== 0) {
    currentPage.value = page
    pageSize.value = size
    apiStart.value = (currentPage.value - 1) * pageSize.value
    await handleSearch(searchParams)
  }
}

// 查詢參數轉換
const generateBetParams = (
  paramsData: BetRecordSearchType
): ParamsBetRecords | ParamsBetSettledByDate => {
  const {
    searchTypeValue,
    timeDuration,
    dateDuration,
    memberType,
    memberValue,
    hallValue,
    lobbyValue,
    gameTypeValue
  } = paramsData

  const orderType: 'DESC' | 'ASC' = order.value === 'descend' ? 'DESC' : 'ASC'
  const [start, end] =
    searchTypeValue === 'bet'
      ? [formatToApiTime(dayjs(timeDuration[0])), formatToApiTime(dayjs(timeDuration[1]))]
      : [formatToApiDate(dayjs(dateDuration[0])), formatToApiDate(dayjs(dateDuration[1]))]

  const user_id = memberType === 'id' ? memberValue : []
  const username = memberType === 'account' ? memberValue : []

  const commonParams = {
    order: orderType,
    length: pageSize.value,
    start: apiStart.value,
    sort: sortColumn.value,
    hall_id: hallValue ?? 0,
    lobby: lobbyValue ?? 0,
    game_code: gameTypeValue,
    user_id,
    username
  }

  return searchTypeValue === 'bet'
    ? { ...commonParams, start_time: start, end_time: end }
    : { ...commonParams, start_date: start, end_date: end }
}

const handleSearch = async (originParams: BetRecordSearchType) => {
  loading.value = true
  let betParams = generateBetParams(originParams)

  const apiFunc = originParams.searchTypeValue === 'bet' ? apiBetRecords : apiBetSettledByDate
  await queryBetApi(apiFunc, betParams, originParams.searchTypeValue)

  loading.value = false
}

// 監聽搜尋
watch(
  () => operationsBetSearchStore.isFiltered,
  () => {
    // 回到第一頁
    tableRef.value.goToFirstPage()

    // 恢復預設值
    tableData.value = []
    apiStart.value = 0
    order.value = 'descend'
    sortColumn.value = searchParams.searchTypeValue === 'bet' ? 'bet_time' : 'settle_date'
    setColumnSortOrder(sortColumn.value, 'descend')

    handleSearch(searchParams)
  }
)
</script>
<template>
  <section class="cdp-section !p-4">
    <!-- 加 key 是因為有兩種表格，排序會互相影響，所以在搜尋後重新渲染表格 -->
    <custom-table
      :key="operationsBetSearchStore.isFiltered"
      ref="tableRef"
      :pageSize="pageSize"
      :dataSource="tableData"
      :columns="columns"
      :serverSide="true"
      :total="total"
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
