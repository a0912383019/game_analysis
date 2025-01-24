<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import type { AntSelectProps, AntInputProps } from '@/types/entities/components/inputs'

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

const overallProfitValue = ref<string>('')
const overallProfitProps = computed<AntInputProps>(() => {
  return {
    placeHolderText: t('common.overall_profit')
  }
})

const oneGameProfitValue = ref<string>('')
const oneGameProfitProps = computed<AntInputProps>(() => {
  return {
    placeHolderText: t('common.single_game_profit')
  }
})
</script>
<template>
  <section class="cdp-section">
    <a-row class="my-[20px] !mx-[7.5px]" justify="center" :gutter="[15, 15]">
      <a-col :span="12">
        <ant-select v-model="hallValue" v-bind="hallProps"></ant-select>
      </a-col>
      <a-col :span="12">
        <ant-input v-model="memberValue" v-bind="memberProps">
          <template #addonBefore>
            <a-select :value="accoutOrId" style="width: 90px">
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
        <ant-input v-model="overallProfitValue" v-bind="overallProfitProps"> </ant-input>
      </a-col>
      <a-col :span="12">
        <ant-input v-model="oneGameProfitValue" v-bind="oneGameProfitProps"> </ant-input>
      </a-col>
    </a-row>
  </section>
</template>
<style lang="scss" scoped></style>
