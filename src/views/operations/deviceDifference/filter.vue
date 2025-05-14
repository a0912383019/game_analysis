<script setup lang="ts">
import type { SelectProps, FormInstance } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import type { AntSelectProps, AntInputProps } from '@/components/input/inputs'
import { useGlobalStore, useOperationsDeviceDiffStore } from '@/stores'
import type { Rule } from 'ant-design-vue/es/form'
import { getSessionStorageEntity } from '@/utils/commonUtils'
import { dateDurationRule } from '@/utils/filterUtils'
import { platformDefaultInfo } from '@/../public/js/system_config'
import { queryLobbyGames } from '@/utils/commonApi'
import dayjs from '@/utils/appDayjs'

const { t } = useI18n()

const globalStore = useGlobalStore()

const operationsDeviceDiffStore = useOperationsDeviceDiffStore()
const { searchParams } = operationsDeviceDiffStore

const formRef = ref<FormInstance>()
const formState = reactive<DeviceDiffFilterFormState>({
  dateDuration: [undefined, undefined],
  singleDeviceValue: 0,
  betTotalValue: undefined
})

// 驗證規則
const rules: Record<string, Rule[]> = {
  dateDuration: [{ validator: dateDurationRule }]
}

// 廳
const hallValue = ref<number>(0)
const hallOptions = ref<SelectProps['options']>([
  { value: 0, label: t('common.all') },
  ...getSessionStorageEntity('platform_config').platform_halls?.map(
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

// 日期區間
const dateDurationChange = (date: [Dayjs, Dayjs] | null) => {
  formState.dateDuration = date || [undefined, undefined]
}

// 遊戲大廳
const lobbyValue = ref<number | undefined>(platformDefaultInfo[globalStore.currentPlatform].lobby)
const lobbyOptions = ref<SelectProps['options']>(
  getSessionStorageEntity('platform_config').platform_lobbies?.map(({ lobby, lobby_name }) => ({
    value: lobby,
    label: lobby_name,
    isLeaf: false
  })) || []
)
const lobbyProps = computed<AntSelectProps>(() => {
  return {
    allowClear: false,
    placeHolderText: t('common.select_game_hall'),
    placeHolderValuableText: t('common.game_hall'),
    options: lobbyOptions.value
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

const singleDeviceProps = computed<AntInputProps>(() => {
  return {
    type: 'number',
    placeHolderText: t('device_difference.single_device_difference')
  }
})

const betTotalProps = computed<AntInputProps>(() => {
  return {
    type: 'number',
    placeHolderText: t('device_difference.bet_total_difference')
  }
})

// 搜尋
const handleSearch = () => {
  formRef.value?.validate().then(() => {
    searchParams.hallValue = hallValue.value
    searchParams.dateDuration = formState.dateDuration

    operationsDeviceDiffStore.isFiltered = new Date().getTime()
  })
}

// 產生遊戲選項
const generateLobbyGamesOptions = async () => {
  gameLoading.value = true
  gameValue.value = []
  gameOptions.value = []
  if (lobbyValue.value !== undefined) {
    await queryLobbyGames(lobbyValue.value).then((games) => {
      if (games) {
        gameOptions.value = games.map(({ game_code, game_name }) => ({
          value: game_code,
          label: game_name
        }))
      }
    })
  }
  gameLoading.value = false
}

watch(
  () => lobbyValue.value,
  () => {
    generateLobbyGamesOptions()
  },
  // 讓 watch 在第一次渲染組建就會觸發
  { immediate: true }
)

// onMounted(() => {
//   handleSearch()
// })
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
          <a-form-item name="dateDuration">
            <ant-date-range
              v-model="formState.dateDuration"
              @update:value="dateDurationChange"
              :rangeConfig="2"
            ></ant-date-range>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <ant-select v-model="lobbyValue" v-bind="lobbyProps"></ant-select>
        </a-col>
        <a-col :span="12">
          <ant-select v-model="gameValue" v-bind="gameProps"></ant-select>
        </a-col>
        <a-col :span="12">
          <ant-input v-model="formState.singleDeviceValue" v-bind="singleDeviceProps"></ant-input>
        </a-col>
        <a-col :span="12">
          <ant-input v-model="formState.betTotalValue" v-bind="betTotalProps"></ant-input>
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
