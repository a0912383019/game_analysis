import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import antDate from '@/components/input/antDate.vue'
import dayjs from '@/utils/appDayjs'

describe('antDate', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = shallowMount(antDate)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  // 測試 props 的預設值是否為 false
  it('applies default showTime as false', () => {
    expect(wrapper.props().showTime).toBe(false)
  })

  // 測試 props 的自訂值是否為 true
  it('applies showTime when set to true', () => {
    wrapper = shallowMount(antDate, { props: { showTime: true } })
    expect(wrapper.props().showTime).toBe(true)
  })

  it('applies placeHolderText prop', () => {
    wrapper = shallowMount(antDate, { props: { placeHolderText: 'Select a date' } })
    expect(wrapper.props().placeHolderText).toBe('Select a date')
  })

  // 測試 onChange 傳入字串型別，事件是否正確發送
  it('emits update:value when onChange is called with string value', () => {
    wrapper.vm.onChange('2025-03-27', '2025-03-27 00:00:00')
    const emitted: any = wrapper.emitted('update:value')
    expect(emitted).toHaveLength(1)
    expect(emitted[0]).toEqual(['2025-03-27'])
  })

  // 測試傳入 Dayjs 型別，onChange 是否有正確發送
  it('emits update:value when onChange is called with Dayjs value', () => {
    const realDayjs = dayjs('2025-03-27')
    wrapper.vm.onChange(realDayjs, '2025-03-27 00:00:00')
    const emitted: any = wrapper.emitted('update:value')
    expect(emitted).toHaveLength(1)
    expect(emitted[0]).toEqual([realDayjs])
  })
})
