<script setup lang="ts">
import type { SelectProps, FormInstance } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import type { AntSelectProps } from '@/components/input/inputs'
import { useVideoReportsTableReportsStore } from '@/stores'
import type { Rule } from 'ant-design-vue/es/form'
import { getSessionStorageEntity } from '@/utils/commonUtils'
import { dateDurationRule } from '@/utils/filterUtils'
import dayjs from '@/utils/appDayjs'
import { queryLobbyGames } from '@/utils/commonApi'
import { notification } from 'ant-design-vue'

const { t } = useI18n()

const videoReportsTableReportsStore = useVideoReportsTableReportsStore()
const { searchParams } = videoReportsTableReportsStore

const formRef = ref<FormInstance>()
const formState = reactive<TableReportsFilterFormState>({
  dateDuration: [undefined, undefined]
})

// 驗證規則
const rules: Record<string, Rule[]> = {
  dateDuration: [{ validator: dateDurationRule }]
}

// 廳
const hallValue = ref<number>(0)
const hallOptions = ref<SelectProps['options']>([
  { value: 0, label: t('common.all') },
  ...(getSessionStorageEntity('platform_config').platform_halls ?? []).map(
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
    placeHolderValuableText: t('common.hall'),
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

// 視訊廳
const mockLiveRoom = [
  { id: 0, name: 'AS現場' },
  { id: 1, name: 'BB區塊鏈' },
  { id: 2, name: 'BC現場' },
  { id: 3, name: 'MX' },
  { id: 4, name: 'RB' }
]
const liveRoomValue = ref<number | undefined>()
const liveRoomOptions = ref<SelectProps['options']>(
  mockLiveRoom.map(({ id, name }) => ({
    value: id,
    label: name
  }))
)
const liveRoomProps = computed<AntSelectProps>(() => {
  return {
    allowClear: false,
    placeHolderText: t('common.select_live_room'),
    placeHolderValuableText: t('room.live'),
    options: liveRoomOptions.value,
    defaultAll: false,
    mode: 'multiple'
  }
})

// 桌次
const mockLiveTable = [
  { id: 0, name: 'AS1' },
  { id: 1, name: 'AS2' },
  { id: 2, name: 'AS3' },
  { id: 3, name: 'AS4' },
  { id: 4, name: 'AS5' }
]
const liveTableValue = ref<number | undefined>()
const liveTableOptions = ref<SelectProps['options']>(
  mockLiveTable.map(({ id, name }) => ({
    value: id,
    label: name
  }))
)
const liveTableProps = computed<AntSelectProps>(() => {
  return {
    allowClear: false,
    placeHolderText: t('common.select_table'),
    placeHolderValuableText: t('common.live_table'),
    options: liveTableOptions.value,
    defaultAll: false,
    mode: 'multiple'
  }
})

// 日期區間
const dateDurationChange = (date: [Dayjs, Dayjs] | null) => {
  formState.dateDuration = date || [undefined, undefined]
}

// 搜尋
const handleSearch = () => {
  formRef.value?.validate().then(() => {
    searchParams.hallValue = hallValue.value
    searchParams.dateDuration = formState.dateDuration

    videoReportsTableReportsStore.isFiltered = new Date().getTime()
  })
}

// 產生遊戲選項
const generateVideoGamesOptions = async () => {
  gameValue.value = []
  gameOptions.value = []

  const config = getSessionStorageEntity('platform_config')
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
          <ant-select v-model="liveRoomValue" v-bind="liveRoomProps"></ant-select>
        </a-col>
        <a-col :span="12">
          <ant-select v-model="liveTableValue" v-bind="liveTableProps"></ant-select>
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
