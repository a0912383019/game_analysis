<script setup lang="ts">
import type { SelectProps, FormInstance } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import type { AntSelectProps, AntInputProps } from '@/components/input/inputs'
import { useOperationsOverallReportStore, useGlobalStore } from '@/stores'
import type { Rule } from 'ant-design-vue/es/form'
import { getSessionStorageEntity } from '@/utils/commonUtils.js'
import { deviceGroupList } from '@/../public/js/system_config'

const { t } = useI18n()

const globalStore = useGlobalStore()
const operationsOverallReportStore = useOperationsOverallReportStore()
const { searchParams } = operationsOverallReportStore

const formRef = ref<FormInstance>()
const formState = reactive<OverallReportFilterFormState>({
  memberValue: '',
  dateDuration: [undefined, undefined]
})

const memberValueRule = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.resolve()
  }
  
  // 先檢查平台是否為 'xctw' 或 'xcmy'，這兩個平台不限制輸入格式
  if (['xctw', 'xcmy'].includes(globalStore.currentPlatform)) {
    return Promise.resolve()
  }

  // 如果是會員帳號，確保輸入只能包含英數字 + 逗號
  if (accountOrId.value === 'account') {
    if (!/^[0-9a-zA-Z,]+$/.test(value)) {
      return Promise.reject(t('common.only_english_numbers_comma_separated'))
    }
  }

  // 如果是會員ID，需確保輸入的都是數字 + 逗號
  if (accountOrId.value === 'memberId') {
    if (!/^[0-9,]+$/.test(value)) {
      return Promise.reject(t('common.member_id_be_number_confirm_the_content'))
    }
  }

  const members = value.split(',').filter((id) => id !== '')

  // 限制最多10個帳號
  if (members.length > 10) {
    return Promise.reject(t('common.max_member_accounts_exceeded', { max: 10 }))
  }

  return Promise.resolve()
}

const dateDurationRule = async (_rule: Rule, value: [Dayjs, Dayjs]) => {
  if (!value || !value[0] || !value[1]) {
    return Promise.reject(t('common.select_complete_date_range'))
  }
  return Promise.resolve()
}

// 驗證規則
const rules: Record<string, Rule[]> = {
  memberValue: [{ validator: memberValueRule }],
  dateDuration: [{ validator: dateDurationRule }]
}

// 廳
const hallValue = ref<number>(0)
const hallOptions = ref<SelectProps['options']>([
  {value: 0, label: t('common.all')},
  ...getSessionStorageEntity('platform_halls').map(({ hall_id, login_code, name }) => ({
    value: hall_id,
    label: name + ` [${login_code}]`
  }))
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
const lobbyGameValue = ref<number | undefined>()
const lobbyGameOptions = ref<SelectProps['options']>(
  getSessionStorageEntity('platform_lobbies').map(({ lobby, lobby_name }) => ({
    value: lobby,
    label: lobby_name
  }))
)
const lobbyGameProps = computed<AntSelectProps>(() => {
  return {
    allowClear: false,
    placeHolderText: t('common.select_game_play'),
    placeHolderValuableText: t('common.game_play'),
    options: lobbyGameOptions.value
  }
})

// 裝置
const deviceTypeValue = ref<number | undefined>()
const deviceTypeProps = computed<AntSelectProps>(() => {
  return {
    placeHolderText: t('common.select_device'),
    placeHolderValuableText: t('common.device'),
    options: deviceGroupList
  }
})

// 日期區間
const dateDurationChange = (date: [Dayjs, Dayjs] | null) => {
  formState.dateDuration = date || [undefined, undefined]
}

// 搜尋
const handleSearch = () => {  
  formState.memberValue = formState.memberValue
  .trim() // 去掉頭尾空格
  .replace(/\s*,\s*/g, ',') // 去除逗號前後的空格
  .replace(/,{2,}/g, ',') // 移除連續逗號
  .replace(/(^,|,$)/g, '') // 移除開頭 結尾的逗號

  formRef.value?.validate().then(() => {
    searchParams.hallValue = hallValue.value
    searchParams.memberType = accountOrId.value
    searchParams.memberValue = formState.memberValue.split(',')
    searchParams.deviceTypeValue = deviceTypeValue.value
    searchParams.lobbyGameValue = lobbyGameValue.value
    searchParams.dateDuration = formState.dateDuration

    operationsOverallReportStore.isFiltered = new Date().getTime()
  })
}
</script>
<template>
  <section class="cdp-section">
    <div>
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
            <a-form-item name="lobbyGameValue">
              <ant-select v-model="lobbyGameValue" v-bind="lobbyGameProps"></ant-select>
            </a-form-item>
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
    </div>
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
