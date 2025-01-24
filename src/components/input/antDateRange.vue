<script lang="ts" setup>
import type { AntSelectProps } from '@/types/entities/components/inputs'
import type { SelectProps } from 'ant-design-vue'

const props = withDefaults(defineProps<AntSelectProps>(), {
  disabled: false,
  allowClear: true,
  hasPlaceholder: true,
  handleChange: () => {}
})

const emit = defineEmits(['update:modelValue'])

const isActive = computed<boolean>(() => {
  if (props.modelValue === null || props.modelValue === undefined) {
    return false
  }
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.length > 0
  }
  return true
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

const formatOptions = computed<SelectProps['options']>(() => props.options || [])

const selectAllBtn = computed<boolean>(() => {
  if (Array.isArray(props.modelValue)) {
    return formatOptions.value?.length === props.modelValue.length
  }
  return false
})

const selectAll = (status: boolean) => {
  if (status) {
    emit(
      'update:modelValue',
      formatOptions.value?.map((item) => item.value)
    )
  } else {
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
    :showArrow="true"
    :class="{
      'has-placeholder': props.hasPlaceholder,
      'is-active': isActive
    }"
    popupClassName="!rounded-none"
  >
    <template #suffixIcon>
      <cdp-icon name="downOutline"></cdp-icon>
    </template>
    <template #dropdownRender="{ menuNode }">
      <template v-if="props.mode === 'multiple'">
        <div
          class="w-full checkbox-wrap"
          @click.stop
          @pointerdown.prevent="selectAll(!selectAllBtn)"
        >
          <a-checkbox :checked="selectAllBtn">{{ $t('common.select_all') }}</a-checkbox>
        </div>
        <a-divider />
      </template>
      <component :is="menuNode" />
    </template>
  </a-select>
</template>
<style lang="scss" scoped></style>
