<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import type { AntSelectProps, AntInputProps } from '@/components/input/inputs'
import { Dayjs } from 'dayjs'
import { useOperationsBetSearchStore, useGlobalStore } from '@/stores'
import type { FormInstance } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'

const { t } = useI18n()

const globalStore = useGlobalStore()
const operationsBetSearchStore = useOperationsBetSearchStore()
const { searchParams } = operationsBetSearchStore

const formRef = ref<FormInstance>()
const formState = reactive<BetSearchFilterFormState>({
  memberValue: '',
  lobbyValue: undefined,
  timeDuration: [undefined, undefined]
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

const timeDurationRule = async (_rule: Rule, value: [Dayjs, Dayjs]) => {
  if (!value || !value[0] || !value[1]) {
    return Promise.reject(t('common.select_complete_time_range'))
  }
  return Promise.resolve()
}

// 驗證規則
const rules: Record<string, Rule[]> = {
  memberValue: [{ validator: memberValueRule }],
  timeDuration: [{ validator: timeDurationRule }],
  lobbyValue: [{ required: true, message: t('common.select_game_hall') }]
}

// 廳
const hallValue = ref<number>(8)
const hallOptions = ref<SelectProps['options']>([
  {
    value: 6,
    label: 'esx'
  },
  {
    value: 7,
    label: 'mdo'
  },
  {
    value: 8,
    label: 'bmw'
  }
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
    placeHolderText: t('common.member')
  }
})

// 遊戲大廳
const lobbyOptions = ref<SelectProps['options']>([
  {
    value: 'live',
    label: t('lobby_group.live')
  },
  {
    value: 'prob',
    label: t('lobby_group.prob')
  },
  {
    value: 'card',
    label: t('lobby_group.card')
  },
  {
    value: 'fish',
    label: t('lobby_group.fish')
  },
  {
    value: 'lottery',
    label: t('lobby_group.lottery')
  }
])

const lobbyProps = computed<AntSelectProps>(() => {
  return {
    allowClear: false,
    placeHolderText: t('common.select_game_hall'),
    placeHolderValuableText: t('common.hall'),
    options: lobbyOptions.value
  }
})

// 遊戲
const gameTypeValue = ref<number[]>([])
const gameTypeOptions = ref<SelectProps['options']>([
  {
    value: 1,
    label: '老虎機'
  },
  {
    value: 2,
    label: '泡泡糖'
  },
  {
    value: 3,
    label: '水果派對'
  }
])

const gameTypeProps = computed<AntSelectProps>(() => {
  return {
    allowClear: false,
    placeHolderText: t('common.select_game'),
    placeHolderValuableText: t('common.game'),
    options: gameTypeOptions.value,
    defaultAll: false,
    mode: 'multiple'
  }
})

// 搜尋方式
const typeValue = ref<string>('bet')
const typeOptions = ref<SelectProps['options']>([
  {
    value: 'bet',
    label: t('bet_search.bet_slip')
  },
  {
    value: 'date',
    label: t('date.date')
  }
])

const typeProps = computed<AntSelectProps>(() => {
  return {
    allowClear: false,
    placeHolderValuableText: t('common.search_method'),
    options: typeOptions.value
  }
})

// 時間區間
const timeDurationChange = (date: [Dayjs, Dayjs]) => {
  formState.timeDuration[0] = date[0]
  formState.timeDuration[1] = date[1]
}

// 搜尋
const handleSearch = () => {
  console.log('sssi')

  searchParams.hallValue = hallValue.value
  searchParams.gameTypeValue = gameTypeValue.value
  searchParams.typeValue = typeValue.value
  
  formState.memberValue = formState.memberValue
  .trim() // 去掉頭尾空格
  .replace(/\s*,\s*/g, ',') // 去除逗號前後的空格
  .replace(/,{2,}/g, ',') // 移除連續逗號
  .replace(/(^,|,$)/g, '') // 移除開頭 結尾的逗號

  formRef.value
    ?.validate()
    .then(() => {
      searchParams.memberValue = formState.memberValue
      searchParams.lobbyValue = formState.lobbyValue
      searchParams.timeDuration = formState.timeDuration
      operationsBetSearchStore.isFiltered = new Date().getTime()
      console.log('驗證通過')
    })
    .catch(() => {
      console.log('驗證失敗')
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
            <a-form-item name="lobbyValue">
              <ant-select v-model="formState.lobbyValue" v-bind="lobbyProps"></ant-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <ant-select v-model="gameTypeValue" v-bind="gameTypeProps"></ant-select>
          </a-col>
          <a-col :span="12">
            <ant-select v-model="typeValue" v-bind="typeProps"></ant-select>
          </a-col>
          <a-col :span="12">
            <a-form-item name="timeDuration">
              <ant-time-range
                :startValue="formState.timeDuration[0]"
                :endValue="formState.timeDuration[1]"
                @update:timeValue="timeDurationChange"
              ></ant-time-range>
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
