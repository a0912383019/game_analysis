<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { notification } from 'ant-design-vue'
import type { TableColumnsType } from 'ant-design-vue'
import { targetMap } from '@/config/defaultConfig'
import { useGlobalStore } from '@/stores'
import { getPlatformToday } from '@/utils/appDayjs'
import { getSessionStorageEntity } from '@/utils/commonUtils'
import { apiGetSmartDisplays } from '@/api'
import CdpIcon from '@/components/cdpIcon.vue'

const { t } = useI18n()
const globalStore = useGlobalStore()

const platformLobbies =
  getSessionStorageEntity<PlatformConfig>('platform_config')?.platform_lobbies || []
const todayDate = ref<Dayjs>(getPlatformToday(globalStore.currentPlatform))
const apiLoading = ref<boolean>(true)
const searchText = ref<string>('')
const currentTabs = ref<string>('all')
const tableRef = ref()

const buttonGroup = computed(() => {
  const lobbyOptions = platformLobbies.map(({ target, target_name }) => ({
    name: target_name,
    value: target
  }))
  return [{ name: t('common.all'), value: 'all' }, ...lobbyOptions]
})

const columns = ref<TableColumnsType[]>([
  [
    {
      title: t('home.game_category'),
      dataIndex: 'game_category',
      key: 'game_category',
      align: 'center',
      width: 90
    },
    {
      title: t('common.content'),
      dataIndex: 'content',
      key: 'content',
      align: 'left'
    },
    {
      title: t('date.date'),
      dataIndex: 'data_date',
      key: 'data_date',
      align: 'center',
      width: 120
    }
  ]
])

const tableTypeData = reactive<Record<string, any[]>>({
  all: [],
  ...Object.fromEntries(platformLobbies.map(({ target }) => [target, []]))
})
const tableData = ref<ResultSmartDisplays[]>([])

const clearSearch = () => {
  searchText.value = ''
}

const queryGetSmartDisplays = async () => {
  apiLoading.value = true

  try {
    const response: BaseStatusWithData<ResultSmartDisplays[]> = await apiGetSmartDisplays({
      start_date: todayDate.value.subtract(6, 'day').format('YYYY-MM-DD'),
      end_date: todayDate.value.format('YYYY-MM-DD'),
      target: currentTabs.value === 'all' ? undefined : parseInt(currentTabs.value)
    })
    const { result } = response
    if (result === 'success') {
      transformGetSmartDisplays(response.ret)
    } else {
      throw new Error()
    }
  } catch (err) {
    console.error(err)
    // 非 Axios 錯誤
    if (!axios.isAxiosError(err)) {
      notification.error({
        message: t('msg.query_failed')
      })
      return
    }

    const status = err.response?.status

    if (status === 401) {
      globalStore.storeHandleApiError()
      return
    }

    if (status === 403) {
      notification.error({
        message: t('msg.no_permission')
      })
      return
    }

    notification.error({
      message: t('msg.query_failed')
    })
  } finally {
    apiLoading.value = false
  }
}

const transformGetSmartDisplays = (data: ResultSmartDisplays[]) => {
  // 為避免資料殘留，初始化所有分類對應的資料
  Object.keys(tableTypeData).forEach((key) => {
    tableTypeData[key] = []
  })

  data.forEach((item) => {
    const categoryName = targetMap[item.target_id]?.name || 'unknown'
    const mappedItem = {
      game_category: t(`target_group.${categoryName}`),
      content: item.alert_message,
      data_date: item.data_date
    }

    tableTypeData.all.push(mappedItem)
    tableTypeData[item.target_id]?.push(mappedItem)
  })
  updateTableData()
}

const updateTableData = () => {
  const dataForCurrentTab = tableTypeData[currentTabs.value]
  const keyword = searchText.value.toLowerCase()

  const filteredData = searchText.value
    ? dataForCurrentTab.filter((item) =>
        Object.values(item).some((field) => String(field).toLowerCase().includes(keyword))
      )
    : dataForCurrentTab

  tableData.value = filteredData
}

watch([() => currentTabs.value, () => searchText.value], () => {
  tableRef.value.goToFirstPage()
  updateTableData()
})

onMounted(() => {
  queryGetSmartDisplays()
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
    <template #extra>
      <a-input
        v-model:value="searchText"
        class="!w-[200px] !mr-15px group"
        :placeholder="$t('common.search')"
      >
        <template #suffix>
          <span
            v-if="searchText"
            class="text-[10px] cursor-pointer group-focus-within:text-[#4096ff] text-[#D1D6E4]"
            @click="clearSearch"
          >
            <cdp-icon name="delete"></cdp-icon>
          </span>
          <span v-else class="group-focus-within:text-[#4096ff] text-[#D1D6E4]">
            <cdp-icon name="search"></cdp-icon>
          </span>
        </template>
      </a-input>
    </template>
    <div class="!px-1">
      <cdp-button-group class="!mb-4" :buttonGroup="buttonGroup" v-model="currentTabs" />
      <a-row justify="start">
        <a-col :span="24">
          <custom-table
            ref="tableRef"
            class="min-h-[290px] cdp-game-table"
            :hasPage="true"
            :dataSource="tableData"
            :columns="columns"
            :loading="apiLoading"
            :pageSize="5"
            :showSizeChanger="false"
            :showRange="true"
          ></custom-table>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>
<style lang="scss" scoped>
:deep(.ant-table) {
  min-height: 235px;
  .ant-table-thead > tr > th {
    text-align: center !important;
    height: 34px;
  }
  .ant-table-placeholder {
    height: 200px;
  }
}

:deep(.ant-pagination) {
  @media (max-width: 1440px) {
    flex-direction: row;
    align-items: flex-start;
    .ant-pagination-total-text {
      position: relative;
    }
  }
}
</style>
