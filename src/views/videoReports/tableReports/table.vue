<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import dayjs from '@/utils/appDayjs'
import { useI18n } from 'vue-i18n'
import { apiLiveTableReportsByState } from '@/api'
import { useVideoReportsTableReportsStore, useGlobalStore } from '@/stores'
import { formatNumber, formatToApiDate, formatToPercentage } from '@/utils/commonUtils'
import { notification } from 'ant-design-vue'

const { t } = useI18n()

const globalStore = useGlobalStore()

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
      dataIndex: 'table_no',
      key: 'table_no',
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
      dataIndex: 'member_count',
      key: 'member_count',
      align: 'right',
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
      title: t('data_name.payoff'),
      dataIndex: 'payoff',
      key: 'payoff',
      align: 'right',
      sorter: true
    },
    {
      title: t('common.profit_ratio'),
      dataIndex: 'profit_ratio',
      key: 'profit_ratio',
      align: 'right',
      sorter: true
    }
  ]
])

const sortColumn = ref<string>('state_name')
const order = ref<string>('descend')
const apiLoading = ref<boolean>(false)

interface TotalRow {
  userCount?: string
  wagersTotal?: string
  betAmount?: string
  payoff?: string
  profitRatio?: string
}

const totalRow = ref<TotalRow>({})

const queryApiLiveTableReportsByState = async (params: ParamsLiveTableReportsByState) => {
  apiLoading.value = true
  try {
    const response = await apiLiveTableReportsByState(params)
    const { result } = response

    if (result === 'success') {
      transformLiveTableReportsByState(response.ret)
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
  } finally {
    apiLoading.value = false
  }
}

const transformLiveTableReportsByState = (data: ResultLiveTableReportsByState) => {
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
        // device: params.device,
        // endDate: item.data_date,
        // startDate: item.data_date,
        // hallId: params.hall_id,
        // userId: params.user_id,
        // username: params.username,
        // game: params.game
      },
      innerPagination: {
        defaultSortCol: 'bet_amount',
        sort: 'bet_amount',
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

const fetchSubData = ref([])

const generateParams = (): ParamsLiveTableReportsByState => {
  return {
    start_date: formatToApiDate(dayjs(searchParams.dateDuration[0])),
    end_date: formatToApiDate(dayjs(searchParams.dateDuration[1])),
    game_code: searchParams.gameCodes,
    hall_id: searchParams.hallValue !== 0 ? searchParams.hallValue : undefined,
    order: order.value === 'descend' ? 'DESC' : 'ASC',
    sort: sortColumn.value,
    table_id: searchParams.tableIds.length > 0 ? searchParams.tableIds : undefined
  }
}

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
    sortColumn.value = 'bet_amount'
  }

  const apiParams = generateParams()
  queryApiLiveTableReportsByState(apiParams)
}

watch(
  () => videoReportsTableReportsStore.isFiltered,
  () => {
    const apiParams = generateParams()
    queryApiLiveTableReportsByState(apiParams)
  }
)
</script>
<template>
  <section class="cdp-section !p-4">
    <custom-table
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
<style lang="scss" scoped>
:deep(th.ant-table-cell) {
  text-align: center !important;
}
</style>
