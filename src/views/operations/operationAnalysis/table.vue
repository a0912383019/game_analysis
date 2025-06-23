<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import overallReportTable from '@/views/operations/operationAnalysis/table/overallReportTable.vue'
import hallTable from '@/views/operations/operationAnalysis/table/hallTable.vue'
import { useOperationsOverallReportStore } from '@/stores'
import { formatToApiDate } from '@/utils/commonUtils'
import dayjs from '@/utils/appDayjs'

const { t } = useI18n()

const operationsOverallReportStore = useOperationsOverallReportStore()
const { searchParams } = operationsOverallReportStore

const buttonGroup = computed(() => [
  { name: t('sidebar.overall_report'), value: 'overallReportTable' },
  { name: t('common.hall_master'), value: 'hallTable' }
])

const currentTabs = ref<string>('overallReportTable')

// 整理所有 component
const componentMap = {
  overallReportTable,
  hallTable
}

// 當前使用的 component
const currentTabComponent = computed(() => {
  return componentMap[currentTabs.value] || null
})

const keepAliveKey = ref(0)
// watch(
//   () => operationsOverallReportStore.isFiltered,
//   () => {
//     // 產生帶入 api 的基本參數
//     operationsOverallReportStore.tableBaseParams = getParamInfo()
//     keepAliveKey.value = operationsOverallReportStore.isFiltered
//   }
// )
</script>
<template>
  <section class="cdp-section !p-4">
    <cdp-button-group class="!mb-4" :buttonGroup="buttonGroup" v-model="currentTabs" />
    <keep-alive :key="keepAliveKey">
      <component :is="currentTabComponent"></component>
    </keep-alive>
  </section>
</template>
<style lang="scss" scoped></style>
