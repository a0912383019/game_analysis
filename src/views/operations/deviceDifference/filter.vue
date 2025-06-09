<script setup lang="ts">
import type { SelectProps, FormInstance, CascaderProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import type { AntSelectProps, AntInputProps, AntCascaderProps } from '@/components/input/inputs'
import { useGlobalStore, useOperationsDeviceDiffStore } from '@/stores'
import type { Rule } from 'ant-design-vue/es/form'
import { getDefaultLobbyByTarget, getSessionStorageEntity } from '@/utils/commonUtils'
import { dateDurationRule, loadData } from '@/utils/filterUtils'
import { platformDefaultTarget1 } from '@/config/defaultConfig'
import dayjs from '@/utils/appDayjs'

const { t } = useI18n()

const globalStore = useGlobalStore()

const operationsDeviceDiffStore = useOperationsDeviceDiffStore()
const { searchParams } = operationsDeviceDiffStore

const formRef = ref<FormInstance>()
const formState = reactive<DeviceDiffFilterFormState>({
  dateDuration: [undefined, undefined],
  singleDeviceValue: undefined,
  betTotalValue: undefined
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

// 日期區間
const dateDurationChange = (date: [Dayjs, Dayjs] | null) => {
  formState.dateDuration = date || [undefined, undefined]
}

// 遊戲及玩法
const gamePlayValue = ref<LobbyGameData[]>([])
const gamePlayOptions = ref<CascaderProps['options']>(
  getSessionStorageEntity<PlatformConfig>('platform_config')?.platform_lobbies?.map(
    ({ lobby, lobby_name }) => ({
      value: lobby,
      label: lobby_name,
      isLeaf: false
    })
  ) || []
)
const gamePlayProps = computed<AntCascaderProps>(() => {
  return {
    placeHolderText: t('common.select_game_play'),
    placeHolderValuableText: t('common.game_play'),
    options: gamePlayOptions.value,
    loadData: loadData
  }
})

// 裝置
const deviceValue = ref<number | undefined>()
const deviceOptions = ref<SelectProps['options']>(
  getSessionStorageEntity<PlatformConfig>('platform_config')?.platform_devices?.map(
    ({ id, name }) => ({
      value: id,
      label: name
    })
  )
)
const deviceProps = computed<AntSelectProps>(() => {
  return {
    allowClear: false,
    placeHolderText: t('common.select_device'),
    placeHolderValuableText: t('common.device'),
    options: deviceOptions.value,
    defaultAll: false,
    mode: 'multiple'
  }
})

// 單一裝置差異(%)
const singleDeviceSymbolValue = ref<number>(0)
const singleDeviceSymbolProps = computed<AntInputProps>(() => {
  return {
    type: 'number',
    placeHolderText: t('device_difference.single_device_difference')
  }
})

// 貨量合計差異(%)
const betTotalSymbolValue = ref<number>(0)
const betTotalSymbolProps = computed<AntInputProps>(() => {
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

onMounted(() => {
  // 設定遊戲及玩法預設值
  const defaultTarget = getDefaultLobbyByTarget(platformDefaultTarget1[globalStore.currentPlatform])
  if (defaultTarget) {
    gamePlayValue.value.push([defaultTarget])
  }
  // handleSearch()
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
          <a-form-item name="dateDuration">
            <ant-date-range
              v-model="formState.dateDuration"
              @update:value="dateDurationChange"
              :defaultDates="[
                dayjs().add(-7, 'd').startOf('day'),
                dayjs().add(-1, 'd').endOf('day')
              ]"
              :disabled-days="7"
              :dateRepeat="true"
              :rangeConfig="2"
            ></ant-date-range>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <ant-cascader v-model="gamePlayValue" v-bind="gamePlayProps"></ant-cascader>
        </a-col>
        <a-col :span="12">
          <ant-select v-model="deviceValue" v-bind="deviceProps"></ant-select>
        </a-col>
        <a-col :span="6">
          <ant-input v-model="formState.singleDeviceValue" v-bind="singleDeviceSymbolProps">
            <template #addonBefore>
              <a-select
                v-model:value="singleDeviceSymbolValue"
                class="w-[110px] text-start"
                popupClassName="!rounded-none"
              >
                <a-select-option :value="0">{{ $t('data_name.greater_than') }}</a-select-option>
                <a-select-option :value="1">{{ $t('data_name.smaller_than') }}</a-select-option>
                <template #suffixIcon>
                  <cdp-icon name="downOutline"></cdp-icon>
                </template>
              </a-select>
            </template>
          </ant-input>
        </a-col>
        <a-col :span="6">
          <ant-input v-model="formState.betTotalValue" v-bind="betTotalSymbolProps">
            <template #addonBefore>
              <a-select
                v-model:value="betTotalSymbolValue"
                class="w-[110px] text-start"
                popupClassName="!rounded-none"
              >
                <a-select-option :value="0">{{ $t('data_name.greater_than') }}</a-select-option>
                <a-select-option :value="1">{{ $t('data_name.smaller_than') }}</a-select-option>
                <template #suffixIcon>
                  <cdp-icon name="downOutline"></cdp-icon>
                </template>
              </a-select>
            </template>
          </ant-input>
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
