<script setup lang="ts">
import type { TableColumnsType, SelectProps } from 'ant-design-vue'
import type { AntSelectProps } from '@/components/input/inputs'
import { useI18n } from 'vue-i18n'
import { useGlobalStore } from '@/stores'
import { apiGetGameReportByLobbyGroup } from '@/api'
import { notification } from 'ant-design-vue'
import { getPlatformToday } from '@/utils/appDayjs'
import { getSessionStorageEntity, formatNumber, formatToPercentage } from '@/utils/commonUtils'
import { targetGroupKey, platformDefaultInfo } from '@/../public/js/system_config'

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
const loading = ref<boolean>(false)

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

// 廳
const hallGroupValue = ref<number[]>([0])
const hallGroupOptions = ref<SelectProps['options']>([
  { value: 0, label: t('common.all') },
  ...platformDefaultInfo[globalStore.currentPlatform].target.map((ele) => ({
    value: ele,
    label: t(`room.${targetGroupKey[ele]}`)
  }))
])
const hallGroupProps = computed<AntSelectProps>(() => {
  return {
    allowClear: false,
    hasPlaceholder: false,
    size: 'middle',
    mode: 'multiple',
    hasAllBtn: false,
    defaultAll: false,
    options: hallGroupOptions.value
  }
})

const transformGameCombination = (data) => {
  data = [
    {
      content: 'BB電子-超牛逼',
      user_count_ratio: '0.0667',
      user_count: 1,
      bet_amount: '1332.0000',
      payoff: '557.7000',
      comprehensive_rtp: '0.5813'
    },
    {
      content: 'BB電子-財犬',
      user_count_ratio: '0.0667',
      user_count: 1,
      bet_amount: '190400.0000',
      payoff: '17760.0000',
      comprehensive_rtp: '0.9067'
    },
    {
      content: 'BB電子-豬寶滿滿',
      user_count_ratio: '0.0667',
      user_count: 1,
      bet_amount: '2500.0000',
      payoff: '-2700.0000',
      comprehensive_rtp: '2.0800'
    },
    {
      content: 'BB電子-碰碰胡、BB電子-連消1024',
      user_count_ratio: '0.0667',
      user_count: 1,
      bet_amount: '399.0000',
      payoff: '211.7000',
      comprehensive_rtp: '0.4694'
    },
    {
      content: 'BB電子-瘋狂果醬罐',
      user_count_ratio: '0.0667',
      user_count: 1,
      bet_amount: '3500.0000',
      payoff: '2100.0000',
      comprehensive_rtp: '0.4000'
    }
  ]

  tableData.value = data.map((item) => {
    return {
      content: item.content,
      user_count_ratio: formatToPercentage(item.payoff_ratio),
      user_count: formatNumber(item.user_count),
      bet_amount: formatNumber(item.bet_amount),
      payoff: formatNumber(item.payoff),
      comprehensive_rtp: formatToPercentage(item.comprehensive_rtp)
    }
  })

  pagination.total = 99
}

const tableChange = () => {}

const hasAll = computed<boolean>(() => {
  return hallGroupValue.value?.includes(0)
})

const isHandlingChange = ref(false)

watch(
  hallGroupValue,
  (newVal, oldVal) => {
    if (isHandlingChange.value) return
    isHandlingChange.value = true

    const allValue = 0
    const allOptions: number[] = hallGroupOptions.value
      ? hallGroupOptions.value
          .filter((ele) => ele.value !== allValue)
          .map((ele) => ele.value as number)
      : []

    const newHasAll = newVal.includes(allValue)
    const oldHasAll = oldVal?.includes(allValue)
    const newFilterArr = newVal.filter((ele) => ele !== allValue)

    let nextVal = [...newVal]

    if ((newHasAll && !oldHasAll) || !oldVal) {
      nextVal = [allValue, ...allOptions]
    } else if (!newHasAll && oldHasAll) {
      nextVal = []
    } else if (oldHasAll && newFilterArr.length < allOptions.length) {
      nextVal = newFilterArr
    } else if (!oldHasAll && newFilterArr.length === allOptions.length) {
      nextVal = [allValue, ...allOptions]
    }

    // 只有當值真正有變時才更新
    if (JSON.stringify(nextVal) !== JSON.stringify(newVal)) {
      hallGroupValue.value = nextVal
    }

    // 最後呼叫 callback
    nextTick(() => {
      tableRef.value.goToFirstPage()

      console.log(hallGroupValue.value.filter((o) => o !== 0).sort())
      transformGameCombination('dd')

      isHandlingChange.value = false
    })
  },
  { immediate: true }
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
        <ant-select
          class="!w-[200px] !mr-15px"
          :class="{ 'has-all': hasAll }"
          v-model="hallGroupValue"
          v-bind="hallGroupProps"
        >
          <template v-if="hasAll" #tagRender="data">
            <span v-if="data.info.value === 0">{{ data.info.label }}</span>
          </template>
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
          :loading="loading"
          :showSizeChanger="false"
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
}
</style>
