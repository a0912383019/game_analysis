<script lang="ts" setup>
import type { AntInputProps } from '@/types/entities/components/inputs'

const props = withDefaults(defineProps<AntInputProps>(), {
  modelValue: '',
  hasPlaceholder: true,
  disabled: false
})

const emit = defineEmits(['update:modelValue'])

const allBinding = computed(() => ({
  value: props.modelValue,
  onChange: (e: Event) => {
    const val = (e.target as HTMLInputElement)?.value
    emit('update:modelValue', val?.trim())
  }
}))

const isFocused = ref(false)

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}
</script>
<template>
  <div
    class="app-input"
    :class="{
      'has-placeholder': props.hasPlaceholder,
      'is-active': true
    }"
    :style="{ '--placeholder-text': `'${props.placeHolderText}'` }"
  >
    <a-input :disabled="props.disabled" type="text" v-bind="allBinding" size="large" @focus="handleFocus" @blur="handleBlur">
      <template v-for="(_, key) in $slots" :key="key" #[key]>
        <slot :name="key"></slot>
      </template>
    </a-input>
  </div>
</template>
<style lang="scss" scoped></style>
