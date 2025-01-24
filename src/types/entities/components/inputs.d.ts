import type { SelectProps } from 'ant-design-vue'

export type SelectValue = number | number[] | string | string[]

export interface AntSelectProps {
  modelValue?: SelectValue
  allowClear?: boolean
  disabled?: boolean
  hasPlaceholder?: boolean
  placeHolderText?: string
  placeHolderValuableText?: string
  options?: SelectProps['options']
  mode?: string
  handleChange?: Function
}

export interface AntInputProps {
  modelValue?: string
  hasPlaceholder?: boolean
  placeHolderText?: string
  disabled?: boolean
}