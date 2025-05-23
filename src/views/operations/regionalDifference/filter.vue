<script setup lang="ts">
import type { SelectProps, FormInstance, CascaderProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import type { AntSelectProps, AntCascaderProps } from '@/components/input/inputs'
import { useOperationsRegionDiffStore } from '@/stores'
import type { Rule } from 'ant-design-vue/es/form'
import { getSessionStorageEntity } from '@/utils/commonUtils'
import { dateDurationRule, loadData, generateGamePlayParam } from '@/utils/filterUtils'
import dayjs from '@/utils/appDayjs'

const { t } = useI18n()

const operationsRegionDiffStore = useOperationsRegionDiffStore()
const { searchParams } = operationsRegionDiffStore

const formRef = ref<FormInstance>()
const formState = reactive<RegionDiffFilterFormState>({
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
    placeHolderValuableText: t('common.hall_master'),
    options: hallOptions.value
  }
})

// 遊戲及玩法
const gamePlayValue = ref<LobbyGameData[]>([])
const gamePlayOptions = ref<CascaderProps['options']>(
  getSessionStorageEntity('platform_config').platform_lobbies?.map(({ lobby, lobby_name }) => ({
    value: lobby,
    label: lobby_name,
    isLeaf: false
  })) || []
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
  getSessionStorageEntity('platform_config').platform_devices?.map(({ id, name }) => ({
    value: id,
    label: name
  }))
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

// 國家及地區
const nationRegionValue = ref<number[]>([])
const nationRegionOptions = ref<CascaderProps['options']>([])
const nationRegionProps = computed<AntCascaderProps>(() => {
  return {
    placeHolderText: t('common.select_country_region'),
    placeHolderValuableText: t('common.country_region'),
    options: nationRegionOptions.value,
    loadData: loadData
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
    searchParams.deviceValue = deviceValue.value
    searchParams.gamePlayValue = generateGamePlayParam(gamePlayValue.value)
    searchParams.dateDuration = formState.dateDuration

    operationsRegionDiffStore.isFiltered = new Date().getTime()
  })
}

onMounted(() => {
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
          <ant-cascader v-model="gamePlayValue" v-bind="gamePlayProps"></ant-cascader>
        </a-col>
        <a-col :span="12">
          <ant-select v-model="deviceValue" v-bind="deviceProps"></ant-select>
        </a-col>
        <a-col :span="12">
          <ant-cascader v-model="nationRegionValue" v-bind="nationRegionProps"></ant-cascader>
        </a-col>
        <a-col :span="12">
          <a-form-item name="dateDuration">
            <ant-date-range
              v-model="formState.dateDuration"
              :defaultDates="[
                dayjs().add(-7, 'd').startOf('day'),
                dayjs().add(-1, 'd').endOf('day')
              ]"
              @update:value="dateDurationChange"
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
