<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import dayjs from '@/utils/appDayjs'
import { useI18n } from 'vue-i18n'
import { apiLiveTableReportsByState, apiLiveTableReportsByTable } from '@/api'
import { useVideoReportsTableReportsStore } from '@/stores'
import { formatNumber, formatToApiDate, formatToPercentage } from '@/utils/commonUtils'
import { queryApi } from '@/utils/filterUtils'

const { t } = useI18n()

const videoReportsTableReportsStore = useVideoReportsTableReportsStore()
const { searchParams } = videoReportsTableReportsStore

const tableData = ref<any[]>([])
const columns = ref<TableColumnsType[]>([
  [
    {
      title: t('video.live_source'),
      dataIndex: 'state_name',
      key: 'state_name',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: t('unit.people_num'),
      dataIndex: 'user_count',
      key: 'user_count',
      align: 'right',
      sorter: true
    },
    {
      title: t('unit.amount'),
      dataIndex: 'wagers_total',
      key: 'wagers_total',
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
      title: t('data_name.payoff'),
      dataIndex: 'payoff',
      key: 'payoff',
      align: 'right',
      sorter: true
    },
    {
      title: t('common.profit_ratio'),
      dataIndex: 'payoff_ratio',
      key: 'payoff_ratio',
      align: 'right',
      sorter: true
    }
  ],
  [
    {
      title: t('data_name.table_no'),
      dataIndex: 'table_name',
      key: 'table_name',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: t('common.game_name'),
      dataIndex: 'game_name',
      key: 'game_name',
      align: 'center',
      sorter: true
    },
    {
      title: t('unit.people_num'),
      dataIndex: 'user_count',
      key: 'user_count',
      align: 'right',
      sorter: true
    },
    {
      title: t('unit.amount'),
      dataIndex: 'wagers_total',
      key: 'wagers_total',
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
      title: t('data_name.payoff'),
      dataIndex: 'payoff',
      key: 'payoff',
      align: 'right',
      sorter: true
    },
    {
      title: t('common.profit_ratio'),
      dataIndex: 'payoff_ratio',
      key: 'payoff_ratio',
      align: 'right',
      sorter: true
    }
  ]
])

const sortColumn = ref<string>('state_name')
const order = ref<string>('descend')
const apiLoading = ref<boolean>(true)
const tableRef = ref()

interface TotalRow {
  userCount?: string
  wagersTotal?: string
  betAmount?: string
  payoff?: string
  profitRatio?: string
}

// 儲存第一層總計數據
const totalRow = ref<TotalRow>({})

// 第一層資料轉換
const transformLiveTableReportsByState = (
  data: ResultLiveTableReportsByState,
  params: ParamsLiveTableReportsByTable
) => {
  tableData.value = data.data.map((item, idx) => {
    return {
      key: idx,
      state_name: item.state_name,
      user_count: formatNumber(item.user_count),
      wagers_total: formatNumber(item.wagers_total),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      payoff_ratio: formatToPercentage(item.payoff_ratio),
      innerLoading: true, // 第二層的 loading
      hasPage: false, // 第二層是否分頁模式
      innerExtraParams: {
        // 下一層需要帶入的參數
        state: item.state,
        startDate: formatToApiDate(dayjs(searchParams.dateDuration[0])),
        endDate: formatToApiDate(dayjs(searchParams.dateDuration[1])),
        tableName: '',
        gameName: '',
        gameCode: [],
        wagersTotal: item.wagers_total
      },
      innerPagination: {
        sort: 'table_name',
        order: 'descend'
      },
      innerData: [] // 存放下一層資料的地方
    }
  })

  totalRow.value = {
    userCount: formatNumber(data.total.user_count),
    wagersTotal: formatNumber(data.total.wagers_total),
    betAmount: formatNumber(data.total.bet_amount),
    payoff: formatNumber(data.total.payoff),
    profitRatio: formatToPercentage(data.total.payoff_ratio)
  }
}

// 第二層資料轉換
const transformLiveTableReportsByTable = (data: ResultLiveTableReportsByTable, record: any) => {
  record.innerData = data.data.map((item, idx) => ({
    key: idx,
    table_name: item.table_name,
    game_name: item.game_name,
    user_count: formatNumber(item.user_count),
    wagers_total: formatNumber(item.wagers_total),
    bet_amount: formatNumber(item.bet_amount),
    payoff: formatNumber(item.payoff),
    payoff_ratio: formatToPercentage(item.payoff_ratio)
  }))
}

// 第二層 api 呼叫
const subFuncLiveTableReportsByTable = async (record: any) => {
  const { sort, order } = record.innerPagination

  let params = generateParamsByTable(sort, order, record.innerExtraParams)
  record.innerLoading = true
  await queryApi<ParamsLiveTableReportsByTable>(
    apiLiveTableReportsByTable,
    params,
    transformLiveTableReportsByTable,
    record
  )
  record.innerLoading = false
}
const fetchSubData = ref([subFuncLiveTableReportsByTable])

// 第一層生成參數
const generateParamsByState = (sortCol: string, order: string): ParamsLiveTableReportsByState => ({
  start_date: formatToApiDate(dayjs(searchParams.dateDuration[0])),
  end_date: formatToApiDate(dayjs(searchParams.dateDuration[1])),
  game_code: searchParams.gameCodes,
  hall_id: searchParams.hallValue !== 0 ? searchParams.hallValue : undefined,
  sort: sortCol,
  order: order === 'descend' ? 'DESC' : 'ASC',
  table_id: searchParams.tableIds.length > 0 ? searchParams.tableIds : undefined
})

// 第二層生成參數
const generateParamsByTable = (
  sortCol: string,
  order: string,
  extraParams: any
): ParamsLiveTableReportsByTable => ({
  start_date: formatToApiDate(dayjs(searchParams.dateDuration[0])),
  end_date: formatToApiDate(dayjs(searchParams.dateDuration[1])),
  state: extraParams.state,
  game_code: extraParams.game_code,
  hall_id: extraParams.hall_id,
  sort: sortCol,
  order: order === 'descend' ? 'DESC' : 'ASC',
  table_id: searchParams.tableIds.length > 0 ? searchParams.tableIds : undefined
})

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
    sortColumn.value = 'state_name'
  }

  let params = generateParamsByState(sortColumn.value, order.value)

  apiLoading.value = true
  await queryApi<ParamsLiveTableReportsByState>(
    apiLiveTableReportsByState,
    params,
    transformLiveTableReportsByState,
    undefined
  )
  apiLoading.value = false
}

watch(
  () => videoReportsTableReportsStore.isFiltered,
  async () => {
    const params = generateParamsByState(sortColumn.value, order.value)
    tableRef.value.closeAllExpandedRows()

    apiLoading.value = true
    await queryApi<ParamsLiveTableReportsByState>(
      apiLiveTableReportsByState,
      params,
      transformLiveTableReportsByState,
      undefined
    )
    apiLoading.value = false
  }
)
</script>
<template>
  <section class="cdp-section !p-4">
    <custom-table
      ref="tableRef"
      :dataSource="tableData"
      :columns="columns"
      :serverSide="true"
      :hasPage="false"
      :loading="apiLoading"
      :fetchSubData="fetchSubData"
      @update:tableChange="tableChange"
    >
      <template #summary v-if="!apiLoading">
        <a-table-summary-row>
          <a-table-summary-cell></a-table-summary-cell>
          <a-table-summary-cell class="text-center">{{ t('common.totals') }}</a-table-summary-cell>
          <a-table-summary-cell class="text-right" v-for="val in totalRow">
            {{ val }}
          </a-table-summary-cell>
        </a-table-summary-row>
      </template>
    </custom-table>
  </section>
</template>
<style lang="scss" scoped></style>
