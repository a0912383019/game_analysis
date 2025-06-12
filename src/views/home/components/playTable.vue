<script setup lang="ts">
import type { TableColumnsType, SelectProps } from 'ant-design-vue'
import type { AntSelectProps } from '@/components/input/inputs'
import { useI18n } from 'vue-i18n'
import { useGlobalStore } from '@/stores'
import { apiGetOperationGameAnalysis } from '@/api'
import { notification } from 'ant-design-vue'
import { getPlatformToday } from '@/utils/appDayjs'
import { getSessionStorageEntity, formatNumber, formatToPercentage } from '@/utils/commonUtils'
import { targetMap } from '@/config/defaultConfig'

const { t } = useI18n()

interface PlayTableProps {
  icon: string
  title: string
  columns: TableColumnsType[]
  analysisType: 'combination' | 'flow'
}
const props = defineProps<PlayTableProps>()

const globalStore = useGlobalStore()

const todayDate = ref<Dayjs>(getPlatformToday(globalStore.currentPlatform))

const tableRef = ref()
const tableData = ref<any[]>([])

const pagination = reactive({
  apiStart: 0,
  pageSize: 5,
  total: 0,
  currentPage: 1
})

const sortColumn = ref<string>('bet_amount')
const order = ref<string>('descend')
const apiLoading = ref<boolean>(true)

const platformLobbies =
  getSessionStorageEntity<PlatformConfig>('platform_config')?.platform_lobbies || []

const hallGroupValue = ref<string[]>([])
const hallGroupOptions = ref<SelectProps['options']>(
  platformLobbies.map(({ target }) => ({
    value: target,
    label: t(`target_group.${targetMap[target].name}`)
  }))
)
const hallGroupProps = computed<AntSelectProps>(() => {
  return {
    allowClear: false,
    hasPlaceholder: false,
    size: 'middle',
    mode: 'multiple',
    options: hallGroupOptions.value
  }
})

const queryOperationGameAnalysis = async () => {
  apiLoading.value = true
  tableData.value = []

  try {
    const response = await apiGetOperationGameAnalysis({
      analysis_type: props.analysisType,
      data_date: todayDate.value.format('YYYY-MM-DD'),
      target_types:
        hallGroupValue.value.length === 0 ? '-1' : [...hallGroupValue.value].sort().join(),
      length: pagination.pageSize,
      start: pagination.apiStart,
      order: order.value === 'descend' ? 'DESC' : 'ASC',
      sort: sortColumn.value
    })
    const { result } = response

    if (result === 'success') {
      pagination.total = response.ret.records_total
      transformOperationGameAnalysis(response.ret.data)
    } else {
      throw new Error()
    }
  } catch (err) {
    console.error(err)
    if (axios.isAxiosError(err)) {
      const status = err.response?.status
      if (status === 401) {
        // token 錯誤，登出
        globalStore.storeHandleApiError()
      } else if (status === 403) {
        // 沒有權限
        notification['error']({
          message: t('msg.no_permission')
        })
      } else {
        // query failed
        notification['error']({
          message: t('msg.query_failed')
        })
      }
    } else {
      // query failed
      notification['error']({
        message: t('msg.query_failed')
      })
    }
  } finally {
    apiLoading.value = false
  }
}

const transformOperationGameAnalysis = (data: OperationGameAnalysis[]) => {
  tableData.value = data.map((item) => {
    return {
      content: item.content,
      user_count_ratio: formatToPercentage(item.user_count_ratio),
      user_count: formatNumber(item.user_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      comprehensive_rtp: formatToPercentage(item.comprehensive_rtp)
    }
  })
}

const tableChange = async (
  page: number,
  size: number,
  sortOrder: 'descend' | 'ascend' | undefined,
  sortField: string | undefined
) => {
  // 設定排序方向與排序欄位
  sortColumn.value = sortField || sortColumn.value

  // 如果排序是 undefined，恢復預設
  if (sortOrder) {
    order.value = sortOrder
  } else {
    order.value = 'descend'
    sortColumn.value = 'bet_amount'
  }

  pagination.currentPage = page
  pagination.pageSize = size
  pagination.apiStart = (page - 1) * size

  queryOperationGameAnalysis()
}

watch(
  () => hallGroupValue.value,
  _.debounce(() => {
    if (tableRef.value?.goToFirstPage) {
      tableRef.value.goToFirstPage()
      pagination.apiStart = 0
      queryOperationGameAnalysis()
    }
  }, 300)
)
</script>
<template>
  <section class="!mt-[10px] !mx-[15px]">
    <a-card class="cdp-card shadow-lg">
      <template #title>
        <div class="custom-shape bg-[var(--primary-color)]"></div>
        <cdp-icon :name="props.icon"></cdp-icon>
        <span class="text-base !ml-2"> {{ $t(`home.${props.title}`) }} </span>
        <span class="text-[13px] text-[#A5B1C5] !ml-2">
          {{ todayDate.format(t('date.format_locale_date_rule')) }}
        </span>
      </template>
      <template #extra>
        <cdp-tooltip class="text-[#A5B1C5]" :text="t('msg.classify_by_hall_game')" />
        <span class="text-[#A5B1C5] !mr-2">{{ $t('common.hall_group') }}</span>
        <ant-select class="!w-[200px] !mr-15px" v-model="hallGroupValue" v-bind="hallGroupProps">
        </ant-select>
      </template>
      <custom-table
        ref="tableRef"
        class="cdp-game-table"
        :pageSize="pagination.pageSize"
        :dataSource="tableData"
        :columns="props.columns"
        :serverSide="true"
        :total="pagination.total"
        :loading="apiLoading"
        :showSizeChanger="false"
        :showRange="true"
        @update:tableChange="tableChange"
      ></custom-table>
    </a-card>
  </section>
</template>
<style lang="scss" scoped>
.has-all {
  :deep(.ant-select-selection-overflow-item-rest) {
    display: none;
  }
}
:deep(.ant-pagination) {
  justify-content: center;
}
:deep(.ant-table) {
  .ant-table-placeholder {
    height: 200px;
  }
}
</style>
