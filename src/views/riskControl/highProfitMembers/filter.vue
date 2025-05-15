<script setup lang="ts">
import type { SelectProps, FormInstance } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import type { AntSelectProps, AntInputProps } from '@/components/input/inputs'
import { useGlobalStore, useVideoReportsTableReportsStore } from '@/stores'
import type { Rule } from 'ant-design-vue/es/form'
import { getSessionStorageEntity } from '@/utils/commonUtils'
import { memberValueRule, dateDurationRule, tidyMember } from '@/utils/filterUtils'
import { platformDefaultInfo } from '@/../public/js/system_config'
import dayjs from '@/utils/appDayjs'

const { t } = useI18n()

const globalStore = useGlobalStore()

// const videoReportsTableReportsStore = useVideoReportsTableReportsStore()
// const { searchParams } = videoReportsTableReportsStore

const formRef = ref<FormInstance>()
const formState = reactive<HighProfitMembersFormState>({
  lobbyValue: platformDefaultInfo[globalStore.currentPlatform].lobby,
  memberValue: '',
  dateDuration: [undefined, undefined]
})

// 驗證規則
const rules: Record<string, Rule[]> = {
  memberValue: [{ validator: (_rule, value) => memberValueRule(_rule, value, accountOrId.value) }],
  dateDuration: [{ validator: dateDurationRule }]
}

// 遊戲大廳
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

// 帳號 or id
const accountOrId = ref<string>('account')
const memberProps = computed<AntInputProps>(() => {
  return {
    originPlaceHolder: t('common.comma_separated'),
    placeHolderText: t('common.member')
  }
})

const memberProfitSymbolValue = ref<number>(0)
const memberProfitValue = ref<number>()
const memberProfitProps = computed<AntInputProps>(() => {
  return {
    type: 'number',
    placeHolderText: t('data_name.member_payoff')
  }
})

const memberSingleGameProfitSymbolValue = ref<number>(0)
const memberSingleGameProfitValue = ref<number>()
const memberSingleGameProfitProps = computed<AntInputProps>(() => {
  return {
    type: 'number',
    placeHolderText: t('data_name.member_sigle_game_payoff')
  }
})

// 日期區間
const dateDurationChange = (date: [Dayjs, Dayjs] | null) => {
  formState.dateDuration = date || [undefined, undefined]
}

// 搜尋
const handleSearch = () => {
  formRef.value?.validate().then(() => {
    // searchParams.hallValue = hallValue.value
    // searchParams.dateDuration = formState.dateDuration
    // videoReportsTableReportsStore.isFiltered = new Date().getTime()
  })
}

onMounted(async () => {
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
          <ant-select v-model="formState.lobbyValue" v-bind="lobbyProps"></ant-select>
        </a-col>
        <a-col :span="12">
          <a-form-item name="memberValue">
            <ant-input v-model="formState.memberValue" v-bind="memberProps">
              <template #addonBefore>
                <a-select
                  v-model:value="accountOrId"
                  class="w-[110px] text-start"
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
          <ant-input v-model="memberProfitValue" v-bind="memberProfitProps">
            <template #addonBefore>
              <a-select
                v-model:value="memberProfitSymbolValue"
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
          <ant-input v-model="memberSingleGameProfitValue" v-bind="memberSingleGameProfitProps">
            <template #addonBefore>
              <a-select
                v-model:value="memberSingleGameProfitSymbolValue"
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
