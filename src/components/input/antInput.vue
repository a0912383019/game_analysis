<script lang="ts" setup>
import type { AntInputProps } from './inputs'

const props = withDefaults(defineProps<AntInputProps>(), {
  modelValue: '',
  type: 'text',
  hasPlaceholder: true,
  disabled: false
})

const emit = defineEmits(['update:modelValue'])

const allBinding = computed(() => ({
  value: props.modelValue,
  onChange: (e: any) => {
    if (props.type === 'text') {
      const val = (e.target as HTMLInputElement)?.value
      emit('update:modelValue', val?.trim())
    } else if (props.type === 'number') {
      emit('update:modelValue', e)
    }
  }
}))
</script>
<template>
  <div
    :class="{
      'has-placeholder': props.hasPlaceholder,
      'is-active': true
    }"
    :style="{ '--placeholder-text': `'${props.placeHolderText}'` }"
  >
    <a-input
      v-if="props.type === 'text'"
      :disabled="props.disabled"
      type="text"
      class="cdp-input"
      v-bind="allBinding"
      size="large"
    >
      <template v-for="(_, key) in $slots" :key="key" #[key]>
        <slot :name="key"></slot>
      </template>
    </a-input>
    <a-input-number
      v-else-if="props.type === 'number'"
      :disabled="props.disabled"
      class="cdp-input"
      v-bind="allBinding"
      size="large"
      :controls="false"
    ></a-input-number>
  </div>
</template>
<style lang="scss" scoped>
.cdp-input {
  width: 100%;
  border-radius: 0 2px 2px 0 !important;
  :deep(.ant-input-group-addon) {
    border-radius: 2px 0 0 2px !important;
    background-color: #ffffff !important;
  }
  :deep(.ant-input) {
    border-radius: 0 2px 2px 0 !important;
  }
}
</style>
