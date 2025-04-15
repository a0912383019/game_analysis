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

const columns = ref<TableColumnsType[]>()

const pagination = reactive({
  apiStart: 0,
  pageSize: 10,
  total: 0,
  currentPage: 1
})

const sortColumn = ref<string>('lobby_name')
const order = ref<string>('descend')
const loading = ref<boolean>(false)

const tableChange = () => { }

const fetchSubData = ref([])
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
