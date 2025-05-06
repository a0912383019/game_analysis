<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { TableColumnsType } from 'ant-design-vue'
// import { useGlobalStore } from '@/stores'

const { t } = useI18n()
// const globalStore = useGlobalStore()
const apiLoading = ref<boolean>(true)

const buttonGroup = computed(() => [
  { name: t('common.all'), value: 'all' },
  { name: t('target_group.prob'), value: 'prob' },
  { name: t('target_group.live'), value: 'live' },
  { name: t('target_group.card'), value: 'card' },
  { name: t('target_group.fish'), value: 'fish' },
  { name: t('target_group.lottery'), value: 'lottery' }
])
const currentTabs = ref<string>('all')

const columns = ref<TableColumnsType[]>([
  [
    {
      title: t('home.game_category'),
      dataIndex: 'game_category',
      key: 'game_category',
      align: 'center'
    },
    {
      title: t('common.content'),
      dataIndex: 'content',
      key: 'content',
      align: 'center'
    },
    {
      title: t('date.date'),
      dataIndex: 'date',
      key: 'date',
      align: 'center'
    }
  ]
])

const tableData = ref<any>([])

const mockNoteData = {
  result: 'success',
  ret: {
    data: [
      {
        target_id: 1,
        game_category: 'prob',
        game_category_name: t('target_group.prob'),
        content: '會員 xinyang105 今天贏了 30,372 元',
        data_date: '2025-05-05'
      },
      {
        target_id: 3,
        game_category: 'card',
        game_category_name: t('target_group.card'),
        content: '會員 zhang7241329 今天贏了 180,750 元',
        data_date: '2025-05-03'
      },
      {
        target_id: 2,
        game_category: 'live',
        game_category_name: t('target_group.live'),
        content: '會員 mai127 今天貨量大幅度提升',
        data_date: '2025-05-01'
      },
      {
        target_id: 2,
        game_category: 'live',
        game_category_name: t('target_group.live'),
        content: '會員 wz8260 今天輸了 115,073 元',
        data_date: '2025-04-30'
      },
      {
        target_id: 4,
        game_category: 'fish',
        game_category_name: t('target_group.fish'),
        content: '會員 kissygj 今天輸了 9,066 元',
        data_date: '2025-04-30'
      },
      {
        target_id: 4,
        game_category: 'fish',
        game_category_name: t('target_group.fish'),
        content: '會員 zxcvb01 今天贏了 30,372 元',
        data_date: '2025-05-05'
      },
      {
        target_id: 1,
        game_category: 'prob',
        game_category_name: t('target_group.prob'),
        content: '會員 d198821 今天贏了 229,768 元',
        data_date: '2025-05-03'
      },
      {
        target_id: 2,
        game_category: 'live',
        game_category_name: t('target_group.live'),
        content: '會員 phanthanhtungg 今天輸了 83,001 元',
        data_date: '2025-04-30'
      },
      {
        target_id: 1,
        game_category: 'prob',
        game_category_name: t('target_group.prob'),
        content: '會員 chhung88 今天輸了 28,016 元',
        data_date: '2025-04-30'
      }
    ]
  }
}

const pagination = reactive({
  currentPage: 1,
  pageSize: 5,
  total: 0
})

const transformData = (data: any[]) => {
  const filteredData = data.filter(
    (item) => currentTabs.value === 'all' || item.game_category === currentTabs.value
  )

  pagination.total = filteredData.length

  tableData.value = filteredData.map((item) => ({
    game_category: item.game_category_name,
    content: item.content,
    date: item.data_date
  }))
}

const tableChange = (page: number, size: number) => {
  pagination.currentPage = page
  pagination.pageSize = size
  transformData(mockNoteData.ret.data)
}

watch(
  () => currentTabs.value,
  () => {
    pagination.currentPage = 1
    transformData(mockNoteData.ret.data)
  }
)

onMounted(() => {
  apiLoading.value = false
  transformData(mockNoteData.ret.data)
})
</script>
<template>
  <a-card class="cdp-card shadow-lg !mt-[10px]">
    <template #title>
      <div class="custom-shape bg-[var(--primary-color)]"></div>
      <cdp-icon name="gameIntelligenceInfo"></cdp-icon>
      <span class="text-base !ml-2"> {{ $t('home.game_intelligence_info') }} </span>
      <span class="text-[13px] text-[#A5B1C5] !ml-2">
        {{ $t('date.last_seven_days') }}
      </span>
    </template>
    <div class="!px-1">
      <cdp-button-group class="!mb-4" :buttonGroup="buttonGroup" v-model="currentTabs" />
      <a-spin :spinning="apiLoading">
        <a-row justify="start">
          <a-col :span="24">
            <custom-table
              class="min-h-[290px] cdp-game-table"
              :hasPage="true"
              :dataSource="tableData"
              :columns="columns"
              :serverSide="true"
              :loading="false"
              :pageSize="pagination.pageSize"
              :total="pagination.total"
              :showSizeChanger="false"
              :showRange="true"
              @update:tableChange="tableChange"
            >
              <template #game_category="scope">
                <span>{{ scope.record.game_category }}</span>
              </template>
            </custom-table>
          </a-col>
        </a-row>
      </a-spin>
    </div>
  </a-card>
</template>
<style lang="scss" scoped>
:deep(.ant-table-thead > tr > th) {
  height: 34px;
}
:deep(.ant-table) {
  min-height: 235px;
  .ant-empty {
    height: 135px;
  }
}
</style>
