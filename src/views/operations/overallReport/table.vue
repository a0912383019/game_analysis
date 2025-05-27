<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import hallTable from '@/views/operations/overallReport/table/hallTable.vue'
import gameTable from '@/views/operations/overallReport/table/gameTable.vue'
import playTable from '@/views/operations/overallReport/table/playTable.vue'
import dateTable from '@/views/operations/overallReport/table/dateTable.vue'
import { useOperationsOverallReportStore } from '@/stores'
import { formatToApiDate } from '@/utils/commonUtils'
import dayjs from '@/utils/appDayjs'

const { t } = useI18n()

const operationsOverallReportStore = useOperationsOverallReportStore()
const { searchParams } = operationsOverallReportStore

const buttonGroup = computed(() => [
  { name: t('common.hall_master'), value: 'hallTable' },
  { name: t('common.game'), value: 'gameTable' },
  { name: t('common.gameplay'), value: 'playTable' },
  { name: t('date.date'), value: 'dateTable' }
])

const currentTabs = ref<string>('hallTable')

// 整理所有 component
const componentMap = {
  hallTable,
  gameTable,
  playTable,
  dateTable
}

// 當前使用的 component
const currentTabComponent = computed(() => {
  return componentMap[currentTabs.value] || null
})

const getParamInfo = (): BaseOverallReportParams => {
  const params: BaseOverallReportParams = {
    device: searchParams.deviceTypeValue,
    endDate: formatToApiDate(dayjs(searchParams.dateDuration[1])),
    startDate: formatToApiDate(dayjs(searchParams.dateDuration[0])),
    hallId: searchParams.hallValue === 0 ? undefined : searchParams.hallValue
  }

  if (searchParams.memberType === 'memberId' && searchParams.memberValue.length > 0) {
    params.userId = searchParams.memberValue
  }

  if (searchParams.memberType === 'account' && searchParams.memberValue.length > 0) {
    params.username = searchParams.memberValue
  }

  if (searchParams.gamePlayValue && searchParams.gamePlayValue.length > 0) {
    params.game = searchParams.gamePlayValue
  }

  return params
}

const keepAliveKey = ref(0)
watch(
  () => operationsOverallReportStore.isFiltered,
  () => {
    // 產生帶入 api 的基本參數
    operationsOverallReportStore.tableBaseParams = getParamInfo()
    keepAliveKey.value = operationsOverallReportStore.isFiltered
  }
)
</script>
<template>
  <section class="cdp-section !p-4">
    <cdp-button-group class="!mb-4" :buttonGroup="buttonGroup" v-model="currentTabs" />
    <keep-alive :key="keepAliveKey">
      <component :is="currentTabComponent"></component>
    </keep-alive>
  </section>
</template>
<style lang="scss" scoped>
// 無資料時 table 的高度
// 第一層
:deep(.ant-table-placeholder) {
  height: 400px;
}
// 內層
:deep(.ant-table-expanded-row) {
  .ant-table-placeholder {
    height: 100px !important;
  }
  .ant-pagination {
    margin-top: 15px !important;
  }
}
</style>
