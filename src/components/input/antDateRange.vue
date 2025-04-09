<script lang="ts" setup>
import dayjs from '@/utils/appDayjs'
import { useDateStore } from '@/stores'
import type { AppRangePickerProps } from './inputs'

const props = withDefaults(defineProps<AppRangePickerProps>(), {
  defaultDates: () => [dayjs().add(-2, 'd').startOf('day'), dayjs().add(-1, 'd').endOf('day')], // 預設近 2天
  disabledDays: 60, // 預設 60天
  rangeConfig: 1
})

const { dateRangeConfig1, dateRangeConfig2 } = useDateStore()

const shortcuts = computed(() => {
  if (props.rangeConfig === 1) {
    return dateRangeConfig1 // 多種快捷
  } else if (props.rangeConfig === 2) {
    return dateRangeConfig2 // 7天快捷
  } else {
    return []
  }
})

const bindingValue = ref<[Dayjs, Dayjs] | undefined>(
  props.defaultDates
    ? ([
        _.isString(props.defaultDates[0]) ? dayjs(props.defaultDates[0]) : props.defaultDates[0],
        _.isString(props.defaultDates[1]) ? dayjs(props.defaultDates[1]) : props.defaultDates[1]
      ] as [Dayjs, Dayjs])
    : undefined
)

const hackValue = ref<[Dayjs, Dayjs] | undefined>(
  props.defaultDates
    ? ([
        _.isString(props.defaultDates[0]) ? dayjs(props.defaultDates[0]) : props.defaultDates[0],
        _.isString(props.defaultDates[1]) ? dayjs(props.defaultDates[1]) : props.defaultDates[1]
      ] as [Dayjs, Dayjs])
    : undefined
)

const disabledDate = (current: Dayjs): boolean => {
  // 禁用超過今天的日期
  // const disabledAfterToday = current > dayjs().endOf('day')
  // 如果沒有選擇日期範圍
  if (!bindingValue.value || bindingValue.value.length !== 2) {
    // return disabledAfterToday
    return false
  }

  const [start, end] = bindingValue.value
  if (!start && !end) return false

  // 禁用超過 x 天以外的日期
  const tooLate = start ? current.diff(start, 'days') > props.disabledDays - 1 : false
  const tooEarly = end ? end.diff(current, 'days') > props.disabledDays - 1 : false

  // return disabledAfterToday || tooLate || tooEarly
  return tooLate || tooEarly
}

const onOpenChange = (open: boolean) => {
  if (open) {
    bindingValue.value = undefined
  } else {
    bindingValue.value = hackValue.value
  }
}

const emit = defineEmits(['update:value'])

const onChange = (val: [string | Dayjs, string | Dayjs]) => {
  bindingValue.value = [
    _.isString(val[0]) ? dayjs(val[0]) : val[0],
    _.isString(val[1]) ? dayjs(val[1]) : val[1]
  ] as [Dayjs, Dayjs]
  hackValue.value = [
    _.isString(val[0]) ? dayjs(val[0]) : val[0],
    _.isString(val[1]) ? dayjs(val[1]) : val[1]
  ] as [Dayjs, Dayjs]

  emit('update:value', bindingValue.value)
}

const onCalendarChange = (val: [string | Dayjs, string | Dayjs]) => {
  bindingValue.value = [
    _.isString(val[0]) ? dayjs(val[0]) : val[0],
    _.isString(val[1]) ? dayjs(val[1]) : val[1]
  ] as [Dayjs, Dayjs]
}

onMounted(() => {
  emit('update:value', bindingValue.value)
})
</script>
<template>
  <a-range-picker
    :value="bindingValue"
    :allowClear="false"
    class="w-full cdp-range-picker has-placeholder is-active"
    format="YYYY-MM-DD"
    @openChange="onOpenChange"
    @change="onChange"
    @calendarChange="onCalendarChange"
    :disabled-date="disabledDate"
    :presets="shortcuts"
    size="large"
    :style="{ '--placeholder-text': `'${$t('date.date_duration')}'` }"
  >
  </a-range-picker>
</template>
<style lang="scss" scoped></style>
