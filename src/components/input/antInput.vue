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
  onChange: (val: string | number | null | Event) => {
    if (props.type === 'text') {
      if (val instanceof Event) {
        const inputValue = (val.target as HTMLInputElement)?.value
        emit('update:modelValue', inputValue.trim())
      } else {
        emit('update:modelValue', typeof val === 'string' ? val.trim() : '')
      }
    } else {
      emit('update:modelValue', typeof val === 'number' ? val : undefined)
    }
  }
}))
</script>
<template>
  <div
    :class="{
      'has-placeholder': props.hasPlaceholder,
      'is-active': true,
      'more-left': props.type === 'number'
    }"
    :style="{ '--placeholder-text': `'${props.placeHolderText}'` }"
  >
    <a-input
      v-if="props.type === 'text'"
      :disabled="props.disabled"
      :placeholder="props.originPlaceHolder"
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
    height: 40px;
    font-size: 14px;
    border-radius: 0 2px 2px 0 !important;
    &::placeholder {
      font-size: 13px;
      transform: translate3d(0, -1px, 0);
    }
  }
}
.more-left.has-placeholder::after {
  left: 18px !important;
}
</style>
