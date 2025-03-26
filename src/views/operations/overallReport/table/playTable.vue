<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue'
import dayjs from '@/utils/appDayjs'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// const globalStore = useGlobalStore()

const tableRef = ref()
const tableData = ref<any[]>([])

const columns = ref<TableColumnsType[]>([])
const apiStart = ref<number>(0) // 起始筆數
const pageSize = ref<number>(10) // 每頁筆數
const total = ref<number>(0) // 總筆數
const currentPage = ref<number>(1)
const sortColumn = ref<string>('settle_date')
const order = ref<string>('descend')

const loading = ref<boolean>(false)

const tableChange = () => {}
</script>
<template>
  <custom-table
    ref="tableRef"
    :pageSize="pageSize"
    :dataSource="tableData"
    :columns="columns"
    :serverSide="true"
    :total="total"
    :loading="loading"
    @update:tableChange="tableChange"
  ></custom-table>
</template>
<style lang="scss" scoped>
// 無資料時 table 的高度
:deep(.ant-table-placeholder) {
  height: 400px;
}
</style>
