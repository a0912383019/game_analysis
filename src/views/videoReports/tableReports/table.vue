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

// const operationsBetSearchStore = useOperationsBetSearchStore()
// const { searchParams } = operationsBetSearchStore

const tableRef = ref()
const tableData = ref<any[]>([])

const columns = ref<TableColumnsType[]>([
  [
    {
      title: t('room.live'),
      dataIndex: 'live',
      key: 'live',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: t('common.member_quantity'),
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
      title: t('common.member_quantity'),
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

const sortColumn = ref<string>('lobby_name')
const order = ref<string>('descend')
const apiLoading = ref<boolean>(false)

interface TotalRow {
  memberCount?: string
  wagerCount?: string
  betAmount?: string
  payoff?: string
  profitRatio?: string
}

const totalRow = ref<TotalRow>({})

const fetchSubData = ref([])

const tableChange = async (
  page: number,
  size: number,
  sortOrder: any,
  sortField: string | undefined
) => {}

onMounted(async () => {
  tableData.value = [
    {
      key: 0,
      live: 'aaa',
      member_count: 22,
      wager_count: 199,
      bet_amount: 982,
      payoff: '283,111',
      profit_ratio: '28%',
      innerLoading: false,
      hasPage: false,
      innerPagination: {
        defaultSortCol: 'wager_count',
        sort: 'wager_count',
        order: 'descend'
      },
      innerData: [
        {
          key: 0,
          table_no: 'BE22',
          game_name: '水果',
          member_count: 22,
          wager_count: 199,
          bet_amount: 982,
          payoff: '283,111',
          profit_ratio: '28%'
        },
        {
          key: 1,
          table_no: 'BE22',
          game_name: '水果',
          member_count: 232,
          wager_count: 661,
          bet_amount: 87236,
          payoff: '28223,111',
          profit_ratio: '11%'
        }
      ]
    },
    {
      key: 1,
      live: 'bbb',
      member_count: 22232,
      wager_count: 0,
      bet_amount: 0,
      payoff: '41',
      profit_ratio: '5%',
      innerLoading: false,
      hasPage: false,
      innerPagination: {
        defaultSortCol: 'wager_count',
        sort: 'wager_count',
        order: 'descend'
      },
      innerData: [
        {
          key: 0,
          table_no: 'BE22',
          game_name: '水果',
          member_count: 232,
          wager_count: 661,
          bet_amount: 87236,
          payoff: '28223,111',
          profit_ratio: '11%'
        }
      ]
    }
  ]

  totalRow.value = {
    memberCount: '44',
    wagerCount: '99',
    betAmount: '323',
    payoff: '3,333',
    profitRatio: '88%'
  }
})
</script>
<template>
  <section class="cdp-section !p-4">
    <custom-table
      :dataSource="tableData"
      :columns="columns"
      :serverSide="false"
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
