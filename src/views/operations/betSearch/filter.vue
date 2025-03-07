<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import type { AntSelectProps, AntInputProps } from '@/components/input/inputs'
import { Dayjs } from 'dayjs'
import { useOperationsBetSearchStore } from '@/stores'

const { t } = useI18n()

const operationsBetSearchStore = useOperationsBetSearchStore()
const { searchParams } = operationsBetSearchStore


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

const memberValue = ref<string>('')
const accoutOrId = ref<string>('account')

const memberProps = computed<AntInputProps>(() => {
  return {
    placeHolderText: t('common.member')
  }
})

const lobbyValue = ref<string | undefined>(undefined)
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

const timeDuration = ref<[Dayjs | undefined, Dayjs | undefined]>([undefined, undefined])
const timeStartChange = (date: Dayjs) => {
  timeDuration.value[0] = date
}
const timeEndChange = (date: Dayjs) => {
  timeDuration.value[1] = date
}

const search = () => {
  searchParams.hallValue = hallValue.value
  searchParams.memberValue = memberValue.value
  searchParams.lobbyValue = lobbyValue.value
  searchParams.gameTypeValue = gameTypeValue.value
  searchParams.typeValue = typeValue.value
  searchParams.timeDuration = timeDuration.value

  operationsBetSearchStore.isFiltered = new Date().getTime()
}

const searchDisable = ref<boolean>(false)

watch(
  () => timeDuration.value,
  () => {
    // 廳與時間必填
    if (timeDuration.value.includes(undefined)) {
      searchDisable.value = true
    } else {
      searchDisable.value = false
    }
  },
  { deep: true }
)
</script>
<template>
  <section class="cdp-section">
    <a-row class="!mt-[20px] !mb-[15px] !mx-[7.5px]" justify="start" :gutter="[15, 15]">
      <a-col :span="12">
        <ant-select v-model="hallValue" v-bind="hallProps"></ant-select>
      </a-col>
      <a-col :span="12">
        <ant-input v-model="memberValue" v-bind="memberProps">
          <template #addonBefore>
            <a-select v-model:value="accoutOrId" class="w-[75px]" popupClassName="!rounded-none">
              <a-select-option value="account">{{ $t('common.accout') }}</a-select-option>
              <a-select-option value="memberId">{{ $t('common.id') }}</a-select-option>
              <template #suffixIcon>
                <cdp-icon name="downOutline"></cdp-icon>
              </template>
            </a-select>
          </template>
        </ant-input>
      </a-col>
      <a-col :span="12">
        <ant-select v-model="lobbyValue" v-bind="lobbyProps"></ant-select>
      </a-col>
      <a-col :span="12">
        <ant-select v-model="gameTypeValue" v-bind="gameTypeProps"></ant-select>
      </a-col>
      <a-col :span="12">
        <ant-select v-model="typeValue" v-bind="typeProps"></ant-select>
      </a-col>
      <a-col :span="12">
        <ant-time-range
          @update:startValue="timeStartChange"
          @update:endValue="timeEndChange"
        ></ant-time-range>
      </a-col>
      <a-col :span="12">
        <cdp-button-icon
          icon="magnifier"
          :name="$t('common.search')"
          :disabled="searchDisable"
          @click="search"
        ></cdp-button-icon>
      </a-col>
    </a-row>
  </section>
</template>
<style lang="scss" scoped></style>
