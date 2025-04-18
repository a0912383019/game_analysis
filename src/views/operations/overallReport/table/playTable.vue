<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import {
  apiBetReportLiveBySerialType, // 第一層
  apiBetReportByHall, // 第二層
  apiBetReportByUser // 第三層
} from '@/api'
import { useOperationsOverallReportStore } from '@/stores'
import { formatNumber, formatToPercentage } from '@/utils/commonUtils'
import { generateOverallParams, queryApi } from '@/utils/filterUtils'

/**
 * 第一層有分頁
 * 第二層無分頁
 * 第三層有分頁(會員層)
 */

const { t } = useI18n()

const operationsOverallReportStore = useOperationsOverallReportStore()
const { tableBaseParams } = operationsOverallReportStore

const tableRef = ref()
const tableData = ref<any[]>([])

const columns = ref<TableColumnsType[]>([
  // 第一層 header 玩法(僅視訊)
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
  ],
  // 第二層 header 廳主名稱
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
    }
  ]
])

const pagination = reactive({
  apiStart: 0,
  pageSize: 10,
  total: 0,
  currentPage: 1
})

const sortColumn = ref<string>('wager_count')
const order = ref<string>('descend')
const loading = ref<boolean>(false)

// 第一層 api 轉換
const transformBetReportLiveBySerialType = (
  ret: ResultBetReportLiveBySerialType,
  record: any,
  params: ParamsBetReport
) => {
  pagination.total = ret.records_total
  tableData.value = ret.data.map((item, idx) => {
    return {
      key: idx,
      serial_type_name:
        item.serial_type_name === ''
          ? `${item.lobby_name} - ${item.game_name}`
          : `${item.lobby_name} - ${item.game_name} - ${item.serial_type_name}`,
      user_count: formatNumber(item.user_count),
      wager_count: formatNumber(item.wager_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      payoff_ratio: formatToPercentage(item.payoff_ratio),
      expected_rtp: formatToPercentage(item.expected_rtp),
      rtp: formatToPercentage(item.rtp),
      serial_type_wager_count_ratio: formatToPercentage(item.serial_type_wager_count_ratio),
      serial_type_payoff_ratio: formatToPercentage(item.serial_type_payoff_ratio),
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
        game: [
          {
            lobby: item.lobby,
            game_code: item.game_code,
            serial_type: [item.serial_type]
          }
        ],
        expectedRtp: item.expected_rtp
      },
      innerPagination: {
        current: 1,
        pageSize: 1000,
        total: 0,
        defaultSortCol: 'hall_name',
        sort: 'hall_name',
        order: 'descend'
      },
      innerData: []
    }
  })
}

// 第二層 api 轉換
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
        game: params.game,
        expectedRtp: record.innerExtraParams.expectedRtp,
        rtp: item.rtp
      },
      innerPagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        defaultSortCol: 'wager_count',
        sort: 'wager_count',
        order: 'descend'
      },
      innerData: []
    }
  })
}

// 第三層 api 轉換
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
      expected_rtp: formatToPercentage(record.innerExtraParams.expectedRtp),
      rtp: formatToPercentage(record.innerExtraParams.rtp)
    }
  })
}

// 第二層 api 呼叫
const subFuncBetReportByHall = async (record: any) => {
  const { current, pageSize, sort, order } = record.innerPagination
  let apiStart = (current - 1) * pageSize
  let params = generateOverallParams(pageSize, apiStart, sort, order, record.innerExtraParams)

  record.innerLoading = true
  await queryApi(apiBetReportByHall, params, transformBetReportByHall, record)
  record.innerLoading = false
}

// 第三層 api 呼叫
const subFuncBetReportByUser = async (record: any) => {
  const { current, pageSize, sort, order } = record.innerPagination
  let apiStart = (current - 1) * pageSize

  let params = generateOverallParams(pageSize, apiStart, sort, order, record.innerExtraParams)

  record.innerLoading = true
  await queryApi(apiBetReportByUser, params, transformBetReportByUser, record)
  record.innerLoading = false
}

const fetchSubData = ref([subFuncBetReportByHall, subFuncBetReportByUser])

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
    sortColumn.value = 'wager_count'
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
  await queryApi(
    apiBetReportLiveBySerialType,
    params,
    transformBetReportLiveBySerialType,
    undefined
  )
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
    await queryApi(
      apiBetReportLiveBySerialType,
      params,
      transformBetReportLiveBySerialType,
      undefined
    )
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
