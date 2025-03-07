<script lang="ts" setup>
import type { TableColumnsType, TablePaginationConfig, TableProps } from 'ant-design-vue'

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
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  serverSide: false,
  loading: true
})

const currentPage = ref<number>(1)
const pageSize = ref<number>(props.pageSize)

// 表格資料
const pageTableData = computed<any[]>(() => {
  if (!props.serverSide) {
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
  total: props.dataSource.length,
  current: currentPage.value,
  showTotal: (total: number) => `共 ${total} 筆`,
  showSizeChanger: true,
  pageSizeOptions: ['10', '30', '50', '100', '200', '500', 'Infinity'],
  onChange: (page: number, newPageSize: number) => {
    currentPage.value = page
    pageSize.value = newPageSize
  }
}))

const scrollX = computed<string | undefined>(() => {
  if (props.dataSource.length === 0) {
    return undefined
  }

  return 'max-content'
})

const handleExpand = async (expanded: boolean, record: any) => {
  if (expanded && props.fetchSubData && props.fetchSubData[0] && record.isLoading) {
    await props.fetchSubData[0](record)
  }
}

// field 是 columns.dataIndex
const handleTableChange: TableProps['onChange'] = (
  pag: TablePaginationConfig,
  filters: any,
  sorter: any
) => {
  if (props.serverSide && pageTableData.value.length !== 0) {
    emit('update:tableChange', pag.current, pag.pageSize, sorter.order, sorter.field)
  }
}

const tableKey = ref<number>(0)

// 當表格無資料時重新渲染，讓表頭恢復預設長度
watch(
  () => pageTableData.value.length,
  (newVal) => {
    if (newVal === 0) {
      tableKey.value = new Date().getTime()
    }
  }
)

const emit = defineEmits(['update:tableChange'])
</script>
<template>
  <a-table
    :key="tableKey"
    :pagination="props.dataSource.length === 0 ? false : pagination"
    :scroll="{ x: scrollX }"
    :columns="props.columns[0]"
    :fetchSubData="props.fetchSubData"
    :data-source="pageTableData"
    :loading="props.loading"
    bordered
    class="sub-table"
    @expand="handleExpand"
    @change="handleTableChange"
  >
    <template v-if="props.columns.length > 1" #expandedRowRender="{ record }">
      <custom-table
        bordered
        class="sub-table"
        :loading="record.innerLoading"
        :columns="props.columns.slice(1)"
        :fetchSubData="props.fetchSubData?.slice(1)"
        :data-source="record.innerData"
        :pagination="false"
      ></custom-table>
    </template>
  </a-table>
</template>
<style lang="scss" scoped></style>
