<script setup lang="ts">
import type { SelectProps, FormInstance, CascaderProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import type { AntSelectProps, AntInputProps, AntCascaderProps } from '@/components/input/inputs'
import { useOperationsOverallReportStore } from '@/stores'
import type { Rule } from 'ant-design-vue/es/form'
import { getSessionStorageEntity } from '@/utils/commonUtils'
import {
  memberValueRule,
  dateDurationRule,
  loadData,
  tidyMember,
  generateGamePlayParam
} from '@/utils/filterUtils'

const { t } = useI18n()

const operationsOverallReportStore = useOperationsOverallReportStore()
const { searchParams } = operationsOverallReportStore

const formRef = ref<FormInstance>()
const formState = reactive<OverallReportFilterFormState>({
  memberValue: '',
  dateDuration: [undefined, undefined]
})

// 驗證規則
const rules: Record<string, Rule[]> = {
  memberValue: [{ validator: (_rule, value) => memberValueRule(_rule, value, accountOrId.value) }],
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

// 帳號 or id
const accountOrId = ref<string>('account')
const memberProps = computed<AntInputProps>(() => {
  return {
    originPlaceHolder: t('common.comma_separated'),
    placeHolderText: t('common.member')
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
const deviceTypeValue = ref<number | undefined>()
const deviceTypeOptions = ref<SelectProps['options']>(
  getSessionStorageEntity('platform_config').platform_devices?.map(({ id, name }) => ({
    value: id,
    label: name
  }))
)
const deviceTypeProps = computed<AntSelectProps>(() => {
  return {
    placeHolderText: t('common.select_device'),
    placeHolderValuableText: t('common.device'),
    options: deviceTypeOptions.value
  }
})

// 日期區間
const dateDurationChange = (date: [Dayjs, Dayjs] | null) => {
  formState.dateDuration = date || [undefined, undefined]
}

// 搜尋
const handleSearch = () => {
  formState.memberValue = tidyMember(formState.memberValue)

  formRef.value?.validate().then(() => {
    searchParams.hallValue = hallValue.value
    searchParams.memberType = accountOrId.value
    searchParams.memberValue = formState.memberValue.split(',').filter(Boolean)
    searchParams.deviceTypeValue = deviceTypeValue.value
    searchParams.gamePlayValue = generateGamePlayParam(gamePlayValue.value)
    searchParams.dateDuration = formState.dateDuration

    operationsOverallReportStore.isFiltered = new Date().getTime()
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
          <a-form-item name="memberValue">
            <ant-input v-model="formState.memberValue" v-bind="memberProps">
              <template #addonBefore>
                <a-select
                  v-model:value="accountOrId"
                  class="w-[75px]"
                  popupClassName="!rounded-none"
                >
                  <a-select-option value="account">{{ $t('common.accout') }}</a-select-option>
                  <a-select-option value="memberId">{{ $t('common.id') }}</a-select-option>
                  <template #suffixIcon>
                    <cdp-icon name="downOutline"></cdp-icon>
                  </template>
                </a-select>
              </template>
            </ant-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <ant-cascader v-model="gamePlayValue" v-bind="gamePlayProps"></ant-cascader>
        </a-col>
        <a-col :span="12">
          <ant-select v-model="deviceTypeValue" v-bind="deviceTypeProps"></ant-select>
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
