<script lang="ts" setup>
import dayjs, { Dayjs } from '@/utils/appDayjs'
import type { AppTimeRangeProps } from './inputs'
import { SwapRightOutlined } from '@ant-design/icons-vue'

const props = withDefaults(defineProps<AppTimeRangeProps>(), {
  defaultDates: () => [dayjs().add(-2, 'd').startOf('day'), dayjs().add(-1, 'd').endOf('day')], // 預設近 2天
  disabledDays: 7 // 預設最長只能選 7天
})

const parseDate = (date: string | Dayjs | undefined): Dayjs | undefined => {
  if (!date) return undefined
  return _.isString(date) ? dayjs(date) : (date as Dayjs)
}

const bindingStartValue = ref<Dayjs | undefined>(parseDate(props.defaultDates[0]))
const bindingEndValue = ref<Dayjs | undefined>(parseDate(props.defaultDates[1]))

const hackStartValue = ref<Dayjs | undefined>(parseDate(props.defaultDates[0]))
const hackEndValue = ref<Dayjs | undefined>(parseDate(props.defaultDates[1]))

const emit = defineEmits(['update:timeValue'])

const onChangeStart = (val: string | Dayjs, formatString: string) => {
  hackStartValue.value = val as Dayjs
  emit('update:timeValue', [val, bindingEndValue.value])
}

const onChangeEnd = (val: string | Dayjs, formatString: string) => {
  hackEndValue.value = val as Dayjs
  emit('update:timeValue', [bindingStartValue.value, val])
}

const disabledStartDate = (current: Dayjs) => {
  // 禁用未來日期
  if (current > dayjs().endOf('day')) return true
  // 禁用超過結束時間的日期
  if (bindingEndValue.value && current > bindingEndValue.value) return true
  // 禁用超過可選範圍
  if (bindingEndValue.value && bindingEndValue.value.diff(current, 'days') > props.disabledDays - 1)
    return true

  return false
}

const disabledEndDate = (current: Dayjs) => {
  // 禁用未來日期
  if (current > dayjs().endOf('day')) return true
  // 禁用起始時間前的日期
  if (bindingStartValue.value && current < bindingStartValue.value) return true
  // 禁用超過可選範圍
  if (
    bindingStartValue.value &&
    current.diff(bindingStartValue.value, 'days') > props.disabledDays - 1
  )
    return true

  return false
}

// 禁用超過當前的時間
const disabledDateTime = (selectedDate: Dayjs | null) => {
  const now = dayjs() // 獲取當前時間

  if (!selectedDate || !selectedDate.isSame(now, 'day')) {
    // 如果沒有選擇日期，或選擇的日期不是今天，則不禁用時間
    return {}
  }

  return {
    disabledHours: () => {
      const hours: number[] = []
      for (let i = now.hour() + 1; i < 24; i++) {
        hours.push(i)
      }
      return hours
    },
    disabledMinutes: (selectedHour: number) => {
      if (selectedHour > now.hour()) return [] // 如果選擇的時比現在大，不禁用分鐘
      const minutes: number[] = []
      for (let i = now.minute() + 1; i < 60; i++) {
        minutes.push(i)
      }
      return minutes
    },
    disabledSeconds: (selectedHour: number, selectedMinute: number) => {
      if (selectedHour > now.hour() || selectedMinute > now.minute()) return []
      const seconds: number[] = []
      for (let i = now.second(); i < 60; i++) {
        seconds.push(i)
      }
      return seconds
    }
  }
}

const handleClick = () => {
  // 當起始跟結束都有值時，點擊任何一個清空
  if (bindingStartValue.value && bindingEndValue.value) {
    bindingStartValue.value = undefined
    bindingEndValue.value = undefined
    updateBindingValue()
  }
}

const handleBlur = () => {
  // 當起始跟結束失去焦點時，如果兩者都沒有值就恢復前一組選擇
  if (!bindingStartValue.value && !bindingEndValue.value) {
    bindingStartValue.value = hackStartValue.value
    bindingEndValue.value = hackEndValue.value
    updateBindingValue()
  }
}

const updateBindingValue = () => {
  emit('update:timeValue', [bindingStartValue.value, bindingEndValue.value])
}

onMounted(() => {
  emit('update:timeValue', [props.defaultDates[0], props.defaultDates[1]])
})
</script>
<template>
  <a-row justify="center" :gutter="0">
    <a-col :span="11">
      <a-date-picker
        v-model:value="bindingStartValue"
        :allowClear="false"
        class="w-full cdp-range-picker has-placeholder is-active"
        :format="'YYYY/MM/DD HH:mm:ss'"
        :showTime="{
          hideDisabledOptions: true,
          defaultValue: dayjs('00:00:00', 'HH:mm:ss')
        }"
        :placeholder="$t('common.select_start_time')"
        :disabled-date="disabledStartDate"
        :disabled-time="disabledDateTime"
        :showToday="false"
        :showNow="false"
        @change="onChangeStart"
        @click="handleClick"
        @blur="handleBlur"
        size="large"
        :style="{ '--placeholder-text': `'${$t('date.start_time')}'` }"
      />
    </a-col>
    <a-col :span="2" class="text-center self-center">
      <swap-right-outlined class="text-[#b3aeae] scale-110" />
    </a-col>
    <a-col :span="11">
      <a-form-item-rest>
        <a-date-picker
          v-model:value="bindingEndValue"
          :allowClear="false"
          class="w-full cdp-range-picker has-placeholder is-active"
          :format="'YYYY/MM/DD HH:mm:ss'"
          :showTime="{
            hideDisabledOptions: true,
            defaultValue: dayjs('23:59:59', 'HH:mm:ss')
          }"
          :placeholder="$t('common.select_end_time')"
          :disabled-date="disabledEndDate"
          :disabled-time="disabledDateTime"
          :showToday="false"
          :showNow="false"
          @change="onChangeEnd"
          @click="handleClick"
          @blur="handleBlur"
          size="large"
          :style="{ '--placeholder-text': `'${$t('date.end_time')}'` }"
        />
      </a-form-item-rest>
    </a-col>
  </a-row>
</template>
<style lang="scss" scoped></style>
