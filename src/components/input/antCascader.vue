<script lang="ts" setup>
import type { AntCascaderProps } from './inputs'
import type { CascaderProps } from 'ant-design-vue'
import { VALUE_SPLIT } from 'ant-design-vue/lib/vc-cascader/utils/commonUtil'
import { CloseOutlined } from '@ant-design/icons-vue'

const props = withDefaults(defineProps<AntCascaderProps>(), {
  hasPlaceholder: true
})

const isActive = computed<boolean>(() => {
  if (props.modelValue) {
    return props.modelValue.length > 0
  }
  return false
})

const placeholder = computed<string | undefined>(() => {
  if (props.modelValue === null || props.modelValue === undefined) {
    return props.placeHolderText
  }
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.length > 0 ? props.placeHolderValuableText : props.placeHolderText
  }
  return props.placeHolderValuableText
})

const emit = defineEmits(['update:modelValue'])

const allBinding = computed(() => ({
  value: props.modelValue,
  onChange: ((value, option) => {
    emit('update:modelValue', value)
  }) as CascaderProps['onChange']
}))

// 產生對應的標籤
const getLabelPath = (targetValue: string): string => {
  const values = targetValue.split(VALUE_SPLIT) // 拆解 value
  const labels: string[] = [] // 存放對應的 label

  let currentOptions = props.options || []
  for (const val of values) {
    const found = currentOptions.find((opt) => opt.value?.toString() === val)
    if (!found) break // 如果找不到，直接中斷

    labels.push(found.label)
    currentOptions = found.children || [] // 進入下一層的 children
  }

  return labels.join('-')
}

// 刪除標籤
const deleteItem = (val: string) => {
  const newData = props.modelValue?.filter((item) => item.join(VALUE_SPLIT) !== val) // 過濾掉匹配的
  emit('update:modelValue', newData)
}
</script>
<template>
  <a-cascader
    v-bind="allBinding"
    :options="props.options"
    multiple
    :load-data="props.loadData"
    :style="{ '--placeholder-text': `'${placeholder}'` }"
    class="cdp-cascader"
    :class="{
      'has-placeholder': props.hasPlaceholder,
      'is-active': isActive
    }"
    max-tag-count="responsive"
    popupClassName="!rounded-none"
    change-on-select
  >
    <template #tagRender="props">
      <span class="ant-select-selection-item">
        <span class="ant-select-selection-item-content">{{ getLabelPath(props.value) }}</span>
        <span
          class="ant-select-selection-item-remove"
          unselectable="on"
          style="user-select: none"
          @click="deleteItem(props.value)"
        >
          <CloseOutlined />
        </span>
      </span>
    </template>
  </a-cascader>
</template>
<style lang="scss" scoped>
.cdp-cascader {
  width: 100%;
  :deep(.ant-select-selector) {
    border-radius: 2px !important;
    font-size: 14px;
    padding-left: 8px;
    height: 40px;
  }
}
</style>
<style lang="scss">
.ant-cascader-menu-item-expand-icon {
  margin-left: 18px !important;
}
</style>
