<script setup lang="ts">
import type { SelectProps, FormInstance, CascaderProps } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { AntSelectProps, AntCascaderProps } from '@/components/input/inputs'
import { useI18n } from 'vue-i18n'
import { useGlobalStore, useVideoReportsTableReportsStore } from '@/stores'
import dayjs from '@/utils/appDayjs'
import { getSessionStorageEntity } from '@/utils/commonUtils'
import { dateDurationRule } from '@/utils/filterUtils'
import { queryLobbyGames } from '@/utils/commonApi'
import { apiLiveStates } from '@/api'

const { t } = useI18n()

const globalStore = useGlobalStore()

const videoReportsTableReportsStore = useVideoReportsTableReportsStore()
const { searchParams } = videoReportsTableReportsStore

const formRef = ref<FormInstance>()
const formState = reactive<VideoTableReportsFilterFormState>({
  dateDuration: [undefined, undefined]
})

// 驗證規則
const rules: Record<string, Rule[]> = {
  dateDuration: [{ validator: dateDurationRule }]
}

// 廳主
const hallValue = ref<number>(0)
const hallOptions = ref<SelectProps['options']>([
  { value: 0, label: t('common.all') },
  ...(getSessionStorageEntity<PlatformConfig>('platform_config')?.platform_halls ?? []).map(
    ({ hall_id, login_code, name }) => ({
      value: hall_id,
      label: name + ` [${login_code}]`
    })
  )
])
const hallProps = computed<AntSelectProps>(() => {
  return {
    allowClear: false,
    placeHolderText: t('common.select_hall'),
    placeHolderValuableText: t('common.hall_master'),
    options: hallOptions.value
  }
})

// 遊戲
const gameValue = ref<string[]>([])
const gameOptions = ref<SelectProps['options']>([])
const gameLoading = ref<boolean>(true)
const gameProps = computed<AntSelectProps>(() => {
  return {
    isLoading: gameLoading.value,
    allowClear: false,
    placeHolderText: t('common.select_game'),
    placeHolderValuableText: t('common.game'),
    options: gameOptions.value,
    defaultAll: false,
    mode: 'multiple'
  }
})

// 視訊現場及桌次
const liveTableLoading = ref<boolean>(true)
const liveTableValue = ref<LobbyGameData[]>([])
const liveTableOptions = ref<CascaderProps['options']>([{ loading: true }])
const liveTableProps = computed<AntCascaderProps>(() => {
  return {
    placeHolderText: t('video.select_live_table'),
    placeHolderValuableText: t('video.live_table'),
    options: liveTableOptions.value
  }
})

// 日期區間
const dateDurationChange = (date: [Dayjs, Dayjs] | null) => {
  formState.dateDuration = date || [undefined, undefined]
}

const queryApiLiveStates = async () => {
  liveTableLoading.value = true
  try {
    const response = await apiLiveStates({ state: undefined })

    const { result } = response
    if (result === 'success') {
      transformLiveStates(response.ret)
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
      }
    }
  } finally {
    liveTableLoading.value = false
  }
}

const liveOriginalData = ref<ResultLiveStates[]>()
const transformLiveStates = (data: ResultLiveStates[]) => {
  liveOriginalData.value = data
  liveTableOptions.value = data.map((stateItem) => ({
    value: stateItem.state,
    label: stateItem.state_name,
    children: stateItem.table_data.map((table) => ({
      value: table.table_id,
      label: table.table_name
    }))
  }))
}

// 搜尋
const handleSearch = () => {
  // 處理table_id
  const apiTableIdArr = liveTableValue.value
    .map((ele) => {
      if (ele.length === 1) {
        const tables =
          liveOriginalData.value?.find((item) => item.state === ele[0])?.table_data ?? []
        return tables.map((t) => t.table_id.toString())
      } else {
        return [ele[1].toString()] // 保持一致性，回傳陣列
      }
    })
    .flat()
    .filter(Boolean) // 避免 undefined 混入

  formRef.value?.validate().then(() => {
    searchParams.hallValue = hallValue.value
    searchParams.gameCodes =
      gameValue.value.length === 0
        ? (gameOptions.value ?? [])
            .map((ele) => String(ele.value))
            .filter((val): val is string => Boolean(val))
        : gameValue.value.map((val) => String(val))
    searchParams.tableIds = apiTableIdArr
    searchParams.dateDuration = formState.dateDuration

    videoReportsTableReportsStore.isFiltered = new Date().getTime()
  })
}

// 產生遊戲選項
const generateVideoGamesOptions = async () => {
  gameValue.value = []
  gameOptions.value = []

  const config = getSessionStorageEntity<PlatformConfig>('platform_config')
  const lobbies: ResultLobbies[] = (config && config.platform_lobbies) || []

  // 視訊遊戲的玩法 target = 2
  const VIDEO_GAME_TARGET = 2
  const lobby = lobbies.find((item) => item.target === VIDEO_GAME_TARGET)?.lobby

  if (!lobby) return

  const games = await queryLobbyGames(lobby)
  if (games) {
    gameOptions.value = games.map(({ game_code, game_name }) => ({
      value: game_code,
      label: game_name
    }))
  }
}

onMounted(async () => {
  queryApiLiveStates()

  gameLoading.value = true
  await generateVideoGamesOptions()
  gameLoading.value = false

  handleSearch()
})
</script>
<template>
  <section class="cdp-section">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :hideRequiredMark="true"
      validateTrigger="submit"
    >
      <a-row class="!mt-[20px] !mb-[15px] !mx-[7.5px]" justify="start" :gutter="[15, 15]">
        <a-col :span="12">
          <ant-select v-model="hallValue" v-bind="hallProps"></ant-select>
        </a-col>
        <a-col :span="12">
          <ant-select v-model="gameValue" v-bind="gameProps"></ant-select>
        </a-col>
        <a-col :span="12">
          <a-spin :spinning="liveTableLoading">
            <ant-cascader v-model="liveTableValue" v-bind="liveTableProps"></ant-cascader>
          </a-spin>
        </a-col>
        <a-col :span="12">
          <a-form-item name="dateDuration">
            <ant-date-range
              v-model="formState.dateDuration"
              @update:value="dateDurationChange"
              :defaultDates="[
                dayjs().add(-7, 'd').startOf('day'),
                dayjs().add(-1, 'd').endOf('day')
              ]"
              :rangeConfig="2"
            ></ant-date-range>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <cdp-button-icon
            icon="magnifier"
            :name="$t('common.search')"
            @click.prevent="handleSearch"
          ></cdp-button-icon>
        </a-col>
      </a-row>
    </a-form>
  </section>
</template>
<style lang="scss" scoped>
.cdp-section {
  .ant-form-item {
    margin-bottom: 0;
  }
  :deep(.ant-form-item-explain-error) {
    font-size: 12px;
    padding-top: 2px;
  }
}
</style>
