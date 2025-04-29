<script setup lang="ts">
import type { TableColumnsType, SelectProps } from 'ant-design-vue'
import type { AntSelectProps } from '@/components/input/inputs'
import { useI18n } from 'vue-i18n'
import { useGlobalStore } from '@/stores'
import { apiGetOperationGameAnalysis } from '@/api'
import { notification } from 'ant-design-vue'
import { getPlatformToday } from '@/utils/appDayjs'
import { getSessionStorageEntity, formatNumber, formatToPercentage } from '@/utils/commonUtils'
import { targetMap } from '@/../public/js/system_config'

const { t } = useI18n()

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
const apiLoading = ref<boolean>(false)

const columns = ref<TableColumnsType[]>([
  [
    {
      title: t('home.game_combination'),
      width: 380,
      dataIndex: 'content',
      key: 'content',
      align: 'center'
    },
    {
      title: t('data_name.people_proportion'),
      dataIndex: 'user_count_ratio',
      key: 'user_count_ratio',
      align: 'center',
      sorter: true
    },
    {
      title: t('unit.people_num'),
      dataIndex: 'user_count',
      key: 'user_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('data_name.bet_amount'),
      dataIndex: 'bet_amount',
      key: 'bet_amount',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: t('data_name.payoff'),
      dataIndex: 'payoff',
      key: 'payoff',
      align: 'center',
      sorter: true
    },
    {
      title: t('data_name.composite_rtp'),
      dataIndex: 'comprehensive_rtp',
      key: 'comprehensive_rtp',
      align: 'center',
      sorter: true
    }
  ]
])

const hallGroupValue = ref<string[]>([])
const hallGroupOptions = ref<SelectProps['options']>(
  getSessionStorageEntity('platform_config').platform_lobbies?.map(({ target }) => ({
    value: target,
    label: t(`room.${targetMap[target].name}`)
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
      analysis_type: 'combination',
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
      transformGameCombination(response.ret.data)
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

const transformGameCombination = (data: OperationGameAnalysis[]) => {
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
  () => {
    queryOperationGameAnalysis()
  }
)
</script>
<template>
  <section class="!mt-[10px]">
    <a-card class="cdp-card shadow-lg">
      <template #title>
        <div class="custom-shape bg-[var(--primary-color)]"></div>
        <cdp-icon name="playSet"></cdp-icon>
        <span class="text-base !ml-2"> {{ $t('home.game_combination') }} </span>
        <span class="text-[13px] text-[#A5B1C5] !ml-2">
          {{ todayDate.format(t('date.format_locale_date_rule')) }}
        </span>
      </template>
      <template #extra>
        <span class="text-[#A5B1C5] !mr-2">{{ $t('common.hall_group') }}</span>
        <ant-select class="!w-[200px] !mr-15px" v-model="hallGroupValue" v-bind="hallGroupProps">
        </ant-select>
      </template>
      <div>
        <custom-table
          ref="tableRef"
          :pageSize="pagination.pageSize"
          :dataSource="tableData"
          :columns="columns"
          :serverSide="true"
          :total="pagination.total"
          :loading="apiLoading"
          :showSizeChanger="false"
          :showRange="true"
          @update:tableChange="tableChange"
        ></custom-table>
      </div>
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
  position: relative;
  justify-content: center;
  margin-top: 15px !important;
  .ant-pagination-total-text {
    position: absolute;
    left: 0;
  }
  .ant-pagination-item-active {
    border: none;
    a {
      position: relative;
      color: #1677ff;
      text-decoration: none;
      &::after {
        content: '';
        position: absolute;
        bottom: 0; // 與文字距離
        left: 50%;
        transform: translateX(-50%);
        width: 14px; // 底線長度，可再調整
        height: 1px; // 底線粗細
        background-color: #1677ff;
        border-radius: 1px;
      }
    }
  }
}
:deep(.ant-table-tbody) {
  .ant-table-cell {
    text-align: left !important;
  }
  > tr.ant-table-row > td {
    padding: 16px 16px !important;
  }
}
</style>
