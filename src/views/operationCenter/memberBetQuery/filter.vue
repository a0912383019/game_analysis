<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface AntSelectProps {
  modelValue?: SelectValue
  allowClear?: boolean
  disabled?: boolean
  hasPlaceholder?: boolean
  placeHolderText?: string
  options?: SelectProps['options']
  mode?: string
  handleChange?: Function
}

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

const handleChange = (value: string) => {
  console.log(hallValue.value)
}

const selectProps = computed<AntSelectProps>(() => {
  return {
    allowClear: false,
    placeHolderText: t('請選擇廳'),
    placeHolderValuableText: t('廳'),
    options: hallOptions.value,
    mode: 'multiple',
    handleChange
  }
})

const value15 = ref<string>('Sign Up')
const value16 = ref<string>('')
</script>
<template>
  <section class="cdp-section">
    <a-row justify="center mt-10">
      <a-col :span="12">
        <ant-select v-model="hallValue" v-bind="selectProps"></ant-select>
        <!-- <a-select
          v-model:value="hallValue"
          class="has-placeholder"
          :class="{'is-active': hallValue.length !== 0}"
          mode="tags"
          :style="{'--placeholder-text': `'${$t('請選擇廳')}'`}"
          :options="hallOptions"
          @change="handleChange"
          size="large"
        ></a-select> -->
      </a-col>
      <a-col :span="12">
        <a-input v-model:value="value15">
          <template #addonBefore>
            <a-radio-group v-model:value="value16" size="large">
              <a-radio-button value="a">Hangzhou</a-radio-button>
              <a-radio-button value="b">Shanghai</a-radio-button>
            </a-radio-group>
          </template>
        </a-input>
      </a-col>
    </a-row>
  </section>
</template>
<style lang="scss" scoped>
// :deep(.ant-select) {
//   width: 100%;
//   &.has-placeholder::after {
//     display: inline-block !important;
//     content: var(--placeholder-text);
//     position: absolute;
//     left: 14px;
//     top: 50%;
//     transform: translateY(-50%) translateZ(0);
//     color: #a8abb2;
//     background-color: #fff;
//     line-height: 1em !important;
//     font-size: 14px;
//     transition:
//       top 0.2s,
//       font-size 0.2s,
//       background-color 0.1s !important;
//     pointer-events: none;
//     padding-inline-start: 3px !important;
//     padding-inline-end: 2px !important;
//   }
//   &.ant-select-open.has-placeholder::after,
//   &.is-active.has-placeholder::after {
//     top: 0px;
//     font-size: 0.75em;
//     padding-inline-start: 3px !important;
//     padding-inline-end: 2px !important;
//   }
// }
// :deep(.ant-select-selection-placeholder) {
//   // display: inline-block !important;
//   // visibility: visible !important;
//   position: absolute;
//   left: 12px;
//   top: 50%;
//   transform: translateY(-50%) translateZ(0);
//   color: #a8abb2;
//   background-color: #fff;
//   line-height: 1em !important;
//   font-size: 14px;
//   transition:
//     top 0.2s,
//     font-size 0.2s,
//     background-color 0.1s !important;
//   pointer-events: none;
//   padding-inline-start: 3px !important;
//   padding-inline-end: 2px !important;
// }

// /* 聚焦或打开下拉菜单状态 */
// :deep(.ant-select-open) .ant-select-selector .ant-select-selection-placeholder,
// :deep(.ant-select-focused) .ant-select-selector .ant-select-selection-placeholder {
//   top: 0px;
//   font-size: 0.75em;
//   padding-inline-start: 3px !important;
//   padding-inline-end: 2px !important;
// }
</style>
