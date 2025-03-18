import type { SelectProps } from 'ant-design-vue'

export type SelectValue = number | number[] | string | string[]

export interface AntSelectProps {
  modelValue?: SelectValue
  defaultAll?: boolean
  allowClear?: boolean
  disabled?: boolean
  hasPlaceholder?: boolean
  placeHolderText?: string
  placeHolderValuableText?: string
  options?: SelectProps['options']
  mode?: 'multiple' | 'tags'
  handleChange?: Function
  showSearch?: boolean // 是否啟用搜尋模式
  isLoading?: boolean
}

export interface AntInputProps {
  modelValue?: string | number
  type?: string
  hasPlaceholder?: boolean
  placeHolderText?: string
  originPlaceHolder?: string // 原始套件自帶的 placeholder
  disabled?: boolean
}

export interface AppRangePickerProps {
  defaultDates?: [string | Dayjs, string | Dayjs]
  disabledDays?: number // 禁用超過的天數
  rangeConfig?: number // 快捷選項
}

export interface AppTimeRangeProps {
  defaultDates?: [string | Dayjs, string | Dayjs]
  disabledDays?: number // 最多選取天數
}

export interface AppDatePickerProps {
  showTime?: boolean // 快捷選項
  placeHolderText?: string
}
