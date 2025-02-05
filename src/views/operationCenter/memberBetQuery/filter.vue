<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import type { AntSelectProps, AntInputProps } from '@/components/input/inputs'
import { Dayjs } from 'dayjs'

const { t } = useI18n()

const hallValue = ref<number[]>([])
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
    options: hallOptions.value,
    mode: 'multiple'
  }
})

const memberValue = ref<string>('')
const accoutOrId = ref<string>('account')

const memberProps = computed<AntInputProps>(() => {
  return {
    placeHolderText: t('common.required_select_hall'),
    disabled: hallValue.value.length === 0
  }
})

const overallProfitValue = ref<number | null>(null)
const overallProfitProps = computed<AntInputProps>(() => {
  return {
    placeHolderText: t('common.overall_profit'),
    type: 'number'
  }
})

const oneGameProfitValue = ref<number | null>(null)
const oneGameProfitProps = computed<AntInputProps>(() => {
  return {
    placeHolderText: t('common.single_game_profit'),
    type: 'number'
  }
})

const typeValue = ref<string>('bet')
const typeOptions = ref<SelectProps['options']>([
  {
    value: 'bet',
    label: t('member_bet_inquiry.bet_slip')
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
  console.log(hallValue.value)
  console.log(memberValue.value)
  console.log(overallProfitValue.value)
  console.log(oneGameProfitValue.value)
  console.log(typeValue.value)
  console.log(timeDuration.value)
}

const searchDisable = ref<boolean>(false)

watch(
  [() => hallValue.value, () => timeDuration.value],
  () => {
    // 廳與時間必填
    if (hallValue.value.length === 0 || timeDuration.value.includes(undefined)) {
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
    <a-row class="mt-[20px] mb-[15px] !mx-[7.5px]" justify="left" :gutter="[15, 15]">
      <a-col :span="12">
        <ant-select v-model="hallValue" v-bind="hallProps"></ant-select>
      </a-col>
      <a-col :span="12">
        <ant-input v-model="memberValue" v-bind="memberProps">
          <template #addonBefore>
            <a-select :value="accoutOrId" class="w-[90px]" popupClassName="!rounded-none">
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
        <ant-input v-model="overallProfitValue" v-bind="overallProfitProps"></ant-input>
      </a-col>
      <a-col :span="12">
        <ant-input v-model="oneGameProfitValue" v-bind="oneGameProfitProps"></ant-input>
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
