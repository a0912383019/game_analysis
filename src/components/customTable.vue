<script lang="ts" setup>
import type { TableColumnsType, TablePaginationConfig, TableProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  // 資料集
  dataSource: any[]
  // 表頭陣列，按照順序設定父層子層表頭
  columns: TableColumnsType[]
  // 一頁幾筆
  pageSize?: number
  // 是否啟用後端服務器模式(每頁單獨發api)
  serverSide?: boolean
  // 打開子層時呼叫的 api，有順序性
  fetchSubData?: Function[]
  loading?: boolean
  total?: number
  // 是否有分頁
  hasPage?: boolean
  // 是否可展開
  canExpand?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  serverSide: false,
  loading: true,
  hasPage: true,
  canExpand: true
})

const currentPage = ref<number>(1)
const pageSize = ref<number>(props.pageSize)

// 表格資料
const pageTableData = computed<any[]>(() => {
  if (props.serverSide) {
    return props.dataSource
  }
  return props.dataSource.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
})

interface Pagination {
  pageSize: number
  total: number
  current: number
  showTotal: (total: number) => string
  showSizeChanger: boolean
  pageSizeOptions: string[]
  onChange: (page: number, pageSize: number) => void
}

const pagination = computed<Pagination>(() => ({
  pageSize: pageSize.value,
  total: props.serverSide
    ? props.total
      ? props.total
      : props.dataSource.length
    : props.dataSource.length,
  current: currentPage.value,
  showTotal: (total: number) => t('common.pagination_total', { total: total }),
  showSizeChanger: true,
  pageSizeOptions: ['10', '30', '50', '100'],
  onChange: (page: number, newPageSize: number) => {
    currentPage.value = page
    pageSize.value = newPageSize
  }
}))

const goToFirstPage = () => {
  currentPage.value = 1
}

const scrollX = computed<string | undefined>(() => {
  if (props.dataSource.length === 0) {
    return undefined
  }

  return 'max-content'
})

// **展開的 row keys**
const expandedRowKeys = ref<number[] | string[]>([])

const handleExpand = async (expanded: boolean, record: any) => {
  if (expanded && props.fetchSubData && props.fetchSubData[0]) {
    // 確保 record 有 pagination 狀態
    if (!record.innerPagination) {
      record.innerPagination = {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }

    // 呼叫 API
    await props.fetchSubData[0](record)
  }
}

const emit = defineEmits(['update:tableChange'])

// field 是 columns.dataIndex
const handleTableChange: TableProps['onChange'] = (
  pag: TablePaginationConfig,
  filters: any,
  sorter: any
) => {
  if (props.serverSide) {
    closeAllExpandedRows()

    // 有分頁模式才會有 pag.current, pag.pageSize
    emit('update:tableChange', pag.current, pag.pageSize, sorter.order, sorter.field)
  }
}

const handleSubTableChange = (
  page: number,
  size: number,
  sortOrder: any,
  sortField: string | undefined,
  record: any
) => {
  if (page && size) {
    record.innerPagination.current = page
    record.innerPagination.pageSize = size
  }
  record.innerPagination.order = sortOrder

  if (sortField) {
    record.innerPagination.sort = sortField
  }
  // 重新獲取子層數據
  if (!props.fetchSubData) return
  props.fetchSubData[0](record)
}

const expandedRowsChange = (data: any) => {
  expandedRowKeys.value = data
}

const childRef = ref<any>(null)

// 遞迴關閉所有展開
const closeAllExpandedRows = () => {
  expandedRowKeys.value = []
  if (childRef.value) {
    childRef.value.closeAllExpandedRows()
  }
}

defineExpose({ goToFirstPage, closeAllExpandedRows })
</script>
<template>
  <a-table
    :pagination="props.dataSource.length === 0 || !props.hasPage ? false : pagination"
    :scroll="{ x: scrollX }"
    :columns="props.columns[0]"
    :fetchSubData="props.fetchSubData"
    :data-source="pageTableData"
    :loading="props.loading"
    :expandedRowKeys="expandedRowKeys"
    bordered
    @expand="handleExpand"
    @change="handleTableChange"
    @expandedRowsChange="expandedRowsChange"
  >
    <template v-if="props.columns.length > 1 && props.canExpand" #expandedRowRender="{ record }">
      <custom-table
        ref="childRef"
        :pageSize="record.innerPagination.pageSize"
        :hasPage="record.hasPage"
        :dataSource="record.innerData"
        :columns="props.columns.slice(1)"
        :serverSide="true"
        :total="record.innerPagination.total"
        :loading="record.innerLoading"
        :fetchSubData="props.fetchSubData?.slice(1)"
        @update:tableChange="
          (page, size, sortOrder, sortField) =>
            handleSubTableChange(page, size, sortOrder, sortField, record)
        "
        :canExpand="record.canExpand"
      ></custom-table>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="$slots[String(column.dataIndex)]">
        <slot :name="String(column.dataIndex)" :record="record"></slot>
      </template>
      <template v-else>
        {{ record[String(column.dataIndex)] }}
      </template>
    </template>
  </a-table>
</template>
<style lang="scss"></style>
