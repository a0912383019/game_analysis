<script lang="ts" setup>
import filterBox from '@/views/videoReports/tableReports/filter.vue'
import tableBox from '@/views/videoReports/tableReports/table.vue'
// import { useOperationsOverallReportStore } from '@/stores'

// const operationsOverallReportStore = useOperationsOverallReportStore()

// // 切換平台會重新渲染，需要刷新 isFiltered，不然會重複打 api
// onUnmounted(() => {
//   operationsOverallReportStore.isFiltered = 0
// })
</script>
<template>
  <filter-box />
  <table-box />
</template>
<style lang="scss" scoped></style>
