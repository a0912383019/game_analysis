import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import antDateRange from '@/components/input/antDateRange.vue'
import dayjs from '@/utils/appDayjs'
import { i18n } from '@/global/i18n'

vi.mock('@/stores', () => ({
  useDateStore: vi.fn(() => ({
    dateRangeConfig1: [{ text: '前7天', value: [dayjs().subtract(7, 'day'), dayjs()] }],
    dateRangeConfig2: [{ text: '本週', value: [dayjs().startOf('week'), dayjs()] }]
  }))
}))

describe('antDateRange', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    vi.useFakeTimers()

    wrapper = shallowMount(antDateRange, {
      global: {
        plugins: [i18n]
      },
      props: {
        defaultDates: [dayjs('2024-03-01'), dayjs('2024-03-02')],
        disabledDays: 30,
        rangeConfig: 1
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
    wrapper.unmount()
  })

  it('應該渲染預設日期', () => {
    expect(wrapper.vm.bindingValue).toStrictEqual([dayjs('2024-03-01'), dayjs('2024-03-02')])
  })

  it('應該根據 rangeConfig 設置快捷方式', () => {
    wrapper.setProps({ rangeConfig: 2 })
    expect(wrapper.vm.shortcuts).toStrictEqual([
      { text: '前7天', value: [dayjs().subtract(7, 'day'), dayjs()] }
    ])
  })

  it('應該在開啟時清除 bindingValue, 關閉時回復 bindingValue', () => {
    wrapper.vm.onOpenChange(true)
    expect(wrapper.vm.bindingValue).toBeUndefined()

    wrapper.vm.onOpenChange(false)
    expect(wrapper.vm.bindingValue).toStrictEqual([dayjs('2024-03-01'), dayjs('2024-03-02')])
  })

  it('應該在選擇日期時更新值並發送事件', () => {
    expect(wrapper.emitted()['update:value'][0]).toStrictEqual([
      [dayjs('2024-03-01'), dayjs('2024-03-02')]
    ])

    wrapper.vm.onChange([dayjs('2024-03-10'), dayjs('2024-03-12')])
    expect(wrapper.vm.bindingValue).toStrictEqual([dayjs('2024-03-10'), dayjs('2024-03-12')])
    expect(wrapper.vm.hackValue).toStrictEqual([dayjs('2024-03-10'), dayjs('2024-03-12')])
    expect(wrapper.emitted()['update:value'][1]).toStrictEqual([wrapper.vm.bindingValue])
  })

  it('應該在日曆變更時更新值', () => {
    wrapper.vm.onCalendarChange([dayjs('2024-03-05'), dayjs('2024-03-06')])
    expect(wrapper.vm.bindingValue).toEqual([dayjs('2024-03-05'), dayjs('2024-03-06')])
  })

  it('應該正確判斷禁用日期', () => {
    wrapper.vm.bindingValue = undefined
    expect(wrapper.vm.disabledDate(dayjs())).toBe(false) // 無禁用

    wrapper.vm.bindingValue = [dayjs('2024-03-05'), undefined]
    const overEndDate = dayjs('2024-03-05').add(30, 'days') // 超過 30 天的日期
    expect(wrapper.vm.disabledDate(overEndDate)).toBe(true) // 禁用
    const inEndDate = dayjs('2024-03-05').add(29, 'days') // 小於 30 天的日期
    expect(wrapper.vm.disabledDate(inEndDate)).toBe(false) // 不禁用

    wrapper.vm.bindingValue = [undefined, dayjs('2024-03-05')]
    const overStartDate = dayjs('2024-03-05').subtract(30, 'days') // 超過 30 天的日期
    expect(wrapper.vm.disabledDate(overStartDate)).toBe(true) // 禁用
    const inStartDate = dayjs('2024-03-05').subtract(29, 'days') // 小於 30 天的日期
    expect(wrapper.vm.disabledDate(inStartDate)).toBe(false) // 不禁用
  })
})
