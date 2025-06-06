<script setup lang="ts">
import type { TableColumnsType, TableProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { apiBetReportLiveBySerialType } from '@/api'
import { useOperationsDeviceDiffStore } from '@/stores'
import { formatNumber, formatToPercentage } from '@/utils/commonUtils'
import dayjs from '@/utils/appDayjs'

const { t } = useI18n()

const operationsDeviceDiffStore = useOperationsDeviceDiffStore()
const { searchParams } = operationsDeviceDiffStore

const tableData = ref<any[]>([])
const dateLength = ref(0)

const columns = ref<TableColumnsType[]>([
  [
    {
      title: t('common.game_hall'),
      dataIndex: 'game_hall',
      align: 'center',
      customCell: (_, index) => {
        if (index === undefined) return {}
        if (index % dateLength.value === 0) {
          if (index === 0) {
            return { rowSpan: dateLength.value, colSpan: 2 }
          } else {
            return { rowSpan: dateLength.value }
          }
        }
        return { rowSpan: 0 }
      }
    },
    {
      title: t('common.game_name'),
      dataIndex: 'game_name',
      align: 'center',
      customCell: (_, index) => {
        if (index === undefined) return {}
        if (index < dateLength.value) {
          return { colSpan: 0 }
        }
        return {}
      }
    },
    {
      title: t('date.date'),
      dataIndex: 'date',
      align: 'center'
    },
    {
      title: t('data_name.bet_total'),
      dataIndex: 'bet_total',
      align: 'right'
    },
    {
      title: t('common.difference'),
      dataIndex: 'b_difference',
      align: 'center'
    },
    {
      title: t('device.phone'),
      dataIndex: 'phone',
      align: 'right'
    },
    {
      title: t('common.difference'),
      dataIndex: 'p_difference',
      align: 'center'
    },
    {
      title: t('device.pad'),
      dataIndex: 'pad',
      align: 'right'
    },
    {
      title: t('common.difference'),
      dataIndex: 'pad_difference',
      align: 'center'
    },
    {
      title: t('device.pc'),
      dataIndex: 'pc',
      align: 'right'
    },
    {
      title: t('common.difference'),
      dataIndex: 'pc_difference',
      align: 'center'
    },
    {
      title: t('device.phone_web'),
      dataIndex: 'phone_web',
      align: 'right'
    },
    {
      title: t('common.difference'),
      dataIndex: 'pw_difference',
      align: 'center'
    }
  ]
])

const apiLoading = ref<boolean>(false)

const transformData = () => {
  let data = [
    {
      game_name: '整體貨量',
      data: [
        {
          date: '2025-05-07',
          volume_total: '1331255085.29',
          volume_diff: '',
          aio_total: '24590',
          aio_diff: '',
          caio_total: '96418248',
          caio_diff: '',
          pc_total: '565741130.89',
          pc_diff: '',
          phone_web_total: '669071116.4',
          phone_web_diff: ''
        },
        {
          date: '2025-05-08',
          volume_total: '959050960.9',
          volume_diff: '-27.96%',
          aio_total: '17250',
          aio_diff: '-29.85%',
          caio_total: '84843276',
          caio_diff: '-12.00%',
          pc_total: '486300732.78',
          pc_diff: '-14.04%',
          phone_web_total: '387889702.12',
          phone_web_diff: '-42.03%'
        }
      ]
    },
    {
      game_name: '21點百家樂',
      data: [
        {
          date: '2025-05-07',
          volume_total: '55391618.64',
          volume_diff: '',
          aio_total: '20',
          aio_diff: '',
          caio_total: '3710024',
          caio_diff: '',
          pc_total: '2004180.97',
          pc_diff: '',
          phone_web_total: '49677393.67',
          phone_web_diff: ''
        },
        {
          date: '2025-05-08',
          volume_total: '16660540.99',
          volume_diff: '-69.92%',
          aio_total: '0',
          aio_diff: '-100.00%',
          caio_total: '1337593',
          caio_diff: '-63.95%',
          pc_total: '1775056.21',
          pc_diff: '-11.43%',
          phone_web_total: '13547891.77',
          phone_web_diff: '-72.73%'
        }
      ]
    },
    {
      game_name: '區塊鏈射龍門',
      data: [
        {
          date: '2025-05-07',
          volume_total: '140052.11',
          volume_diff: '',
          aio_total: '3530',
          aio_diff: '',
          caio_total: '440',
          caio_diff: '',
          pc_total: '13793',
          pc_diff: '',
          phone_web_total: '122289.11',
          phone_web_diff: ''
        },
        {
          date: '2025-05-08',
          volume_total: '256347',
          volume_diff: '83.04%',
          aio_total: '0',
          aio_diff: '-100.00%',
          caio_total: '16473',
          caio_diff: '3643.86%',
          pc_total: '13067',
          pc_diff: '-5.26%',
          phone_web_total: '226807',
          phone_web_diff: '85.47%'
        }
      ]
    },
    {
      game_name: '區塊鏈泰國魚蝦蟹',
      data: [
        {
          date: '2025-05-07',
          volume_total: '30779',
          volume_diff: '',
          aio_total: '0',
          aio_diff: '',
          caio_total: '5875',
          caio_diff: '',
          pc_total: '0',
          pc_diff: '',
          phone_web_total: '24904',
          phone_web_diff: ''
        },
        {
          date: '2025-05-08',
          volume_total: '13113',
          volume_diff: '-57.40%',
          aio_total: '0',
          aio_diff: '',
          caio_total: '0',
          caio_diff: '-100.00%',
          pc_total: '0',
          pc_diff: '',
          phone_web_total: '13113',
          phone_web_diff: '-47.35%'
        }
      ]
    }
  ]

  tableData.value = data.flatMap((item) => {
    return item.data.map((row) => ({
      game_hall: item.game_name,
      date: row.date,
      bet_total: formatNumber(row.volume_total),
      b_difference: row.volume_diff || '--',
      phone: formatNumber(row.pc_total),
      p_difference: row.pc_diff || '--',
      pad: formatNumber(row.phone_web_total),
      pad_difference: row.phone_web_diff || '--',
      pc: formatNumber(row.aio_total),
      pc_difference: row.aio_diff || '--',
      phone_web: formatNumber(row.caio_total),
      pw_difference: row.caio_diff || '--'
    }))
  })
}

const customRowClass: TableProps['rowClassName'] = (_: any, index: number) => {
  let classText = ''
  if (!Math.floor(index / dateLength.value)) {
    classText = 'is-first'
  }

  return classText
}

watch(
  () => operationsDeviceDiffStore.isFiltered,
  () => {
    dateLength.value =
      dayjs(searchParams.dateDuration[1]).diff(searchParams.dateDuration[0], 'day') + 1
    // console.log(dateLength.value)
  }
)

onMounted(() => {
  dateLength.value = 3
  transformData()
})
</script>
<template>
  <section class="cdp-section !p-4">
    <custom-table
      :dataSource="tableData"
      :hasPage="false"
      :columns="columns"
      :serverSide="false"
      :loading="apiLoading"
      :customRowClass="customRowClass"
    >
      <template #header-phone="{ column }: any">
        <span class="!mr-1">{{ column.title }}</span>
        <cdp-tooltip :text="$t('device.phone_description')"></cdp-tooltip>
      </template>
      <template #header-pad="{ column }: any">
        <span class="!mr-1">{{ column.title }}</span>
        <cdp-tooltip :text="$t('device.pad_description')"></cdp-tooltip>
      </template>
      <template #header-pc="{ column }: any">
        <span class="!mr-1">{{ column.title }}</span>
        <cdp-tooltip :text="$t('device.pc_description')"></cdp-tooltip>
      </template>
      <template #header-phone_web="{ column }: any">
        <span class="!mr-1">{{ column.title }}</span>
        <cdp-tooltip :text="$t('device.phone_web_description')"></cdp-tooltip>
      </template>
      <template #b_difference="scope: any">
        <span :class="{ 'text-red-500': parseFloat(scope.record.b_difference) < 0 }">
          {{ scope.record.b_difference }}
        </span>
      </template>
      <template #p_difference="scope: any">
        <span :class="{ 'text-red-500': parseFloat(scope.record.p_difference) < 0 }">
          {{ scope.record.p_difference }}
        </span>
      </template>
      <template #pad_difference="scope: any">
        <span :class="{ 'text-red-500': parseFloat(scope.record.pad_difference) < 0 }">
          {{ scope.record.pad_difference }}
        </span>
      </template>
      <template #pc_difference="scope: any">
        <span :class="{ 'text-red-500': parseFloat(scope.record.pc_difference) < 0 }">
          {{ scope.record.pc_difference }}
        </span>
      </template>
      <template #pw_difference="scope: any">
        <span :class="{ 'text-red-500': parseFloat(scope.record.pw_difference) < 0 }">
          {{ scope.record.pw_difference }}
        </span>
      </template>
    </custom-table>
  </section>
</template>
<style lang="scss" scoped>
// 無資料時 table 的高度
:deep(.ant-table-placeholder) {
  height: 400px;
}
:deep(.ant-table) {
  .ant-table-thead > tr > th {
    text-align: center !important;
  }
  .ant-table-tbody > tr.ant-table-row.is-first:hover > td.ant-table-cell,
  .ant-table-tbody > tr.ant-table-row.is-first > td.ant-table-cell {
    background: #e4e8eb;
  }
}
</style>
