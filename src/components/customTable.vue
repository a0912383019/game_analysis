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
  showSizeChanger?: boolean
  showRange?: boolean
  customRowClass?: TableProps['rowClassName']
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  serverSide: false,
  loading: true,
  hasPage: true,
  canExpand: true,
  showSizeChanger: true,
  showRange: false
})

// 客製化 class 支援 function 跟 string
const combinedRowClass = (record: any, index: number) => {
  const baseClass = record.allowExpand === false ? 'hide-icon-row' : ''
  const customClass =
    typeof props.customRowClass === 'function'
      ? props.customRowClass(_, index, _)
      : props.customRowClass || ''

  return [baseClass, customClass].filter(Boolean).join(' ')
}

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
  showTotal: (total, range) => string
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
  showTotal: (total, range) =>
    props.showRange
      ? `${range[0]}-${range[1]} / ` + t('common.pagination_total', { total: total })
      : t('common.pagination_total', { total: total }),
  showSizeChanger: props.showSizeChanger,
  pageSizeOptions: ['10', '30', '50', '100'],
  onChange: (page: number, newPageSize: number) => {
    currentPage.value = page
    pageSize.value = newPageSize
  }
}))

const goToFirstPage = () => {
  currentPage.value = 1
}

// **展開的 row keys**
const expandedRowKeys = ref<number[] | string[]>([])

const handleExpand = async (expanded: boolean, record: any) => {
  if (expanded && props.fetchSubData && props.fetchSubData[0]) {
    // 確保 record 有 pagination 狀態
    if (!record.innerPagination) {
      record.innerPagination = {
        total: 0
      }
    }

    // 沒搜尋過才呼叫 API
    if (record.innerLoading) {
      await props.fetchSubData[0](record)
    }
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

  if (sortOrder) {
    record.innerPagination.order = sortOrder
    record.innerPagination.sort = sortField
  } else {
    record.innerPagination.order = 'descend'
    record.innerPagination.sort = record.innerPagination.defaultSortCol
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
    :scroll="{ x: 'max-content' }"
    :columns="props.columns[0]"
    :fetchSubData="props.fetchSubData"
    :dataSource="pageTableData"
    :loading="props.loading"
    :expandedRowKeys="expandedRowKeys"
    :rowClassName="combinedRowClass"
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
    <!-- 處理 #headerCell slot -->
    <template #headerCell="{ column }">
      <template v-if="$slots['header-' + String(column.dataIndex)]">
        {{ console.log(column.dataIndex) }}
        <slot :name="'header-' + String(column.dataIndex)" :column="column" />
      </template>
      <template v-else>
        {{ column.title }}
      </template>
    </template>
    <!-- 處理 #bodyCell slot -->
    <template #bodyCell="{ column, record }">
      <template v-if="$slots[String(column.dataIndex)]">
        <slot :name="String(column.dataIndex)" :record="record"></slot>
      </template>
      <template v-else>
        {{ record[String(column.dataIndex)] }}
      </template>
    </template>
    <!-- 處理其他動態 slot，例如 summary / footer / headerCell 等 -->
    <template v-for="(_, key) in $slots" :key="key" #[key]>
      <slot :name="key"></slot>
    </template>
  </a-table>
</template>
<style lang="scss" scoped>
:deep(.hide-icon-row .ant-table-row-expand-icon) {
  display: none;
}
:deep(.ant-table-summary) {
  .ant-table-cell {
    background-color: rgb(227, 230, 234);
  }
}
</style>
