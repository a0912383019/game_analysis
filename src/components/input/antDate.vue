<script lang="ts" setup>
import { Dayjs } from 'dayjs'
import type { AppDatePickerProps } from './inputs'

const props = withDefaults(defineProps<AppDatePickerProps>(), {
  showTime: false
})

const bindingValue = ref<Dayjs | undefined>()

const emit = defineEmits(['update:value'])

const onChange = (val: string | Dayjs, formatString: string) => {
  emit('update:value', val)
}
</script>
<template>
  <a-date-picker
    v-model:value="bindingValue"
    :allowClear="false"
    class="w-full cdp-range-picker has-placeholder is-active"
    :format="'YYYY/MM/DD HH:mm:ss'"
    :showTime="props.showTime"
    :showToday="false"
    @change="onChange"
    size="large"
    :style="{ '--placeholder-text': `'${props.placeHolderText}'` }"
  />
</template>
<style lang="scss" scoped></style>
