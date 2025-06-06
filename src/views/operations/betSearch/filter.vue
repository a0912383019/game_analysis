<script setup lang="ts">
import type { SelectProps, FormInstance } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import type { AntSelectProps, AntInputProps } from '@/components/input/inputs'
import { useOperationsBetSearchStore, useGlobalStore } from '@/stores'
import type { Rule } from 'ant-design-vue/es/form'
import { getDefaultLobbyByTarget, getSessionStorageEntity } from '@/utils/commonUtils'
import { queryLobbyGames } from '@/utils/commonApi'
import { platformDefaultHall } from '@/../public/js/system_config'
import { platformDefaultTarget1 } from '@/config/defaultConfig'
import {
  memberValueRule,
  dateDurationRule,
  timeDurationRule,
  tidyMember
} from '@/utils/filterUtils'

const { t } = useI18n()

const globalStore = useGlobalStore()

const operationsBetSearchStore = useOperationsBetSearchStore()
const { searchParams } = operationsBetSearchStore

const formRef = ref<FormInstance>()
const formState = reactive<BetSearchFilterFormState>({
  hallValue: platformDefaultHall[globalStore.currentPlatform]?.hall_id,
  memberValue: '',
  timeDuration: [undefined, undefined],
  dateDuration: [undefined, undefined]
})

// 驗證規則
const rules: Record<string, Rule[]> = {
  hallValue: [{ required: true, message: t('msg.required_hall') }],
  memberValue: [{ validator: (_rule, value) => memberValueRule(_rule, value, accountOrId.value) }],
  timeDuration: [{ validator: timeDurationRule }],
  dateDuration: [{ validator: dateDurationRule }]
}

// 廳主
const hallOptions = ref<SelectProps['options']>(
  getSessionStorageEntity<PlatformConfig>('platform_config')?.platform_halls?.map(
    ({ hall_id, login_code, name }) => ({
      value: hall_id,
      label: name + ` [${login_code}]`
    })
  )
)
const hallProps = computed<AntSelectProps>(() => {
  return {
    allowClear: false,
    placeHolderText: t('common.select_hall'),
    placeHolderValuableText: t('common.hall_master'),
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

// 遊戲大廳
const lobbyValue = ref<number | undefined>(
  getDefaultLobbyByTarget(platformDefaultTarget1[globalStore.currentPlatform])
)
const lobbyOptions = ref<SelectProps['options']>(
  getSessionStorageEntity<PlatformConfig>('platform_config')?.platform_lobbies?.map(
    ({ lobby, lobby_name }) => ({
      value: lobby,
      label: lobby_name
    })
  )
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

// 搜尋方式
const searchTypeValue = ref<string>('settlement_date')
const searchTypeOptions = ref<SelectProps['options']>([
  {
    value: 'settlement_date',
    label: t('common.settlement_date')
  },
  {
    value: 'bet',
    label: t('bet_search.bet_slip')
  }
])
const searchTypeProps = computed<AntSelectProps>(() => {
  return {
    allowClear: false,
    placeHolderValuableText: t('common.search_method'),
    options: searchTypeOptions.value
  }
})

// 時間區間
const timeDurationChange = (date: [Dayjs, Dayjs]) => {
  formState.timeDuration = date
}

const datePickerChangeHandler = (date: [Dayjs, Dayjs]) => {
  formState.dateDuration = date
}

// 搜尋
const handleSearch = () => {
  formState.memberValue = tidyMember(formState.memberValue)

  formRef.value?.validate().then(() => {
    searchParams.hallValue = formState.hallValue
    searchParams.memberType = accountOrId.value
    searchParams.gameValue = gameValue.value
    searchParams.searchTypeValue = searchTypeValue.value
    searchParams.memberValue = formState.memberValue.split(',').filter(Boolean)
    searchParams.lobbyValue = lobbyValue.value
    searchParams.timeDuration = formState.timeDuration
    searchParams.dateDuration = formState.dateDuration

    operationsBetSearchStore.isFiltered = new Date().getTime()
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
          <a-form-item name="hallValue">
            <ant-select v-model="formState.hallValue" v-bind="hallProps"></ant-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="memberValue">
            <ant-input v-model="formState.memberValue" v-bind="memberProps">
              <template #addonBefore>
                <a-select
                  v-model:value="accountOrId"
                  class="w-[110px] text-left"
                  popupClassName="!rounded-none"
                >
                  <a-select-option value="account">{{ $t('common.accout') }}</a-select-option>
                  <a-select-option value="id">{{ $t('common.id') }}</a-select-option>
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
            <ant-select v-model="lobbyValue" v-bind="lobbyProps"></ant-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <ant-select v-model="gameValue" v-bind="gameProps"></ant-select>
        </a-col>
        <a-col :span="12">
          <ant-select v-model="searchTypeValue" v-bind="searchTypeProps"></ant-select>
        </a-col>
        <a-col :span="12">
          <a-form-item v-if="searchTypeValue === 'settlement_date'" name="dateDuration">
            <ant-date-range
              @update:value="datePickerChangeHandler"
              :rangeConfig="2"
              :showTime="true"
            ></ant-date-range>
          </a-form-item>
          <a-form-item v-if="searchTypeValue === 'bet'" name="timeDuration">
            <ant-time-range @update:timeValue="timeDurationChange"></ant-time-range>
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
