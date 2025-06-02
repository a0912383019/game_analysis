<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import {
  apiBetReportLiveBySerialType, // 第一層
  apiBetReportByHall, // 第二層
  apiBetReportByUser // 第三層
} from '@/api'
import { useOperationsRegionDiffStore } from '@/stores'
import { formatNumber, formatToPercentage } from '@/utils/commonUtils'
import { queryApi } from '@/utils/filterUtils'

const { t } = useI18n()

const operationsRegionDiffStore = useOperationsRegionDiffStore()
const { searchParams } = operationsRegionDiffStore

const tableRef = ref()
const tableData = ref<any[]>([])

const columns = ref<TableColumnsType[]>([
  [
    {
      title: t('common.game_hall'),
      dataIndex: 'game_hall',
      key: 'game_hall',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.member_quantity'),
      dataIndex: 'user_count',
      key: 'user_count',
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
      defaultSortOrder: 'descend',
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
      title: t('regional_difference.bet_amount_growth_ratio'),
      dataIndex: 'bet_amount_growth_ratio',
      key: 'bet_amount_growth_ratio',
      align: 'right',
      sorter: true
    }
  ],
  [
    {
      title: t('common.country'),
      dataIndex: 'country',
      key: 'country',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.member_quantity'),
      dataIndex: 'user_count',
      key: 'user_count',
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
      defaultSortOrder: 'descend',
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
      title: t('regional_difference.bet_amount_growth_ratio'),
      dataIndex: 'bet_amount_growth_ratio',
      key: 'bet_amount_growth_ratio',
      align: 'right',
      sorter: true
    }
  ],
  [
    {
      title: t('regional_difference.region'),
      dataIndex: 'region',
      key: 'region',
      align: 'center',
      sorter: true
    },
    {
      title: t('common.member_quantity'),
      dataIndex: 'user_count',
      key: 'user_count',
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
      defaultSortOrder: 'descend',
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
      title: t('regional_difference.bet_amount_growth_ratio'),
      dataIndex: 'bet_amount_growth_ratio',
      key: 'bet_amount_growth_ratio',
      align: 'right',
      sorter: true
    }
  ],
  [
    {
      title: t('date.date'),
      dataIndex: 'date',
      key: 'date',
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
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: t('data_name.payoff'),
      dataIndex: 'payoff',
      key: 'payoff',
      align: 'right',
      sorter: true
    }
  ]
])

const pagination = reactive<Pagination>({
  apiStart: 0,
  pageSize: 10,
  total: 0,
  currentPage: 1
})

const sortColumn = ref<string>('bet_amount')
const order = ref<string>('descend')
const apiLoading = ref<boolean>(false)

const fetchSubData = ref([])

// 第一層排序或換頁
const tableChange = async (
  page: number,
  size: number,
  sortOrder: any,
  sortField: string | undefined
) => {}

watch(
  () => operationsRegionDiffStore.isFiltered,
  () => {
    console.log(searchParams)
  }
)
</script>
<template>
  <section class="cdp-section !p-4">
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
  </section>
</template>
<style lang="scss" scoped>
// 無資料時 table 的高度
:deep(.ant-table-placeholder) {
  height: 400px;
}
:deep(.ant-table) {
  .ant-table-thead > tr > th {
    text-align: center !important;
  }
}
</style>
