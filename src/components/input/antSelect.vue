import { propsToAttrMap } from '@vue/shared';
<script lang="ts" setup>
import type { SelectProps } from 'ant-design-vue'

// 定義 Props 類型
interface AntSelectProps {
  modelValue?: number | number[] | string | string[]
  allowClear?: boolean
  disabled?: boolean
  hasPlaceholder?: boolean
  placeHolderText?: string
  placeHolderValuableText?: string
  options?: SelectProps['options']
  mode?: string
  handleChange?: Function
  allSelected?: boolean
}

const props = withDefaults(defineProps<AntSelectProps>(), {
  disabled: false,
  allowClear: true,
  hasPlaceholder: true,
  handleChange: () => {},
  allSelected: false
})

const emit = defineEmits(['update:modelValue'])

const isActive = computed(() => {
  if (props.modelValue === null || props.modelValue === undefined) {
    return false
  }
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.length > 0
  }
  return true
})

const placeholder = computed(() => {
  if (props.modelValue === null || props.modelValue === undefined) {
    return props.placeHolderText
  }
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.length > 0 ? props.placeHolderValuableText : props.placeHolderText
  }
  return props.placeHolderValuableText
})

const allBinding = computed(() => ({
  value: props.modelValue,
  allowClear: props.allowClear,
  disabled: props.disabled,
  mode: props.mode,
  onChange: (value: string | string[]) => {
    emit('update:modelValue', value)
    props.handleChange?.(value)
  }
}))

const formatOptions = computed(() => props.options || [])
const selectAllBtn = ref<boolean>(props.allSelected)

const selectAll = (status: boolean) => {
    console.log(status);

  if (status) {
    selectAllBtn.value = true
    emit(
      'update:modelValue',
      formatOptions.value.map((item) => item.value)
    )
  } else {
    selectAllBtn.value = false
    emit('update:modelValue', [])
  }
}
</script>
<template>
  <a-select
    v-bind="allBinding"
    :options="formatOptions"
    :style="{ '--placeholder-text': `'${placeholder}'` }"
    size="large"
    :class="{
      'has-placeholder': props.hasPlaceholder,
      'is-active': isActive
    }"
  >
    <template #suffixIcon>
      <cdp-icon name="downOutline"></cdp-icon>
    </template>
    <template #dropdownRender="{ menuNode }">
      <template v-if="props.mode === 'multiple'">
        <div class="w-full checkbox-wrap" @click.stop @pointerdown.prevent="selectAll(!allSelected)">
          <a-checkbox :checked="selectAllBtn">{{ $t('全選') }}</a-checkbox>
        </div>
        <a-divider />
      </template>
      <component :is="menuNode" />
    </template>
  </a-select>
</template>
<style lang="scss" scoped></style>
