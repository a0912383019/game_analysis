import { describe, it, expect, afterEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import antTimeRange from '@/components/input/antTimeRange.vue' // 根據實際路徑調整
import dayjs from '@/utils/appDayjs'

describe('antTimeRange', () => {
  let wrapper: VueWrapper<any>

  const defaultStartDate = dayjs('2024-03-01').startOf('day')
  const defaultEndDate = dayjs('2024-03-02').endOf('day')

  afterEach(() => {
    wrapper.unmount()
  })

  it('應該正確設置預設日期', () => {
    wrapper = shallowMount(antTimeRange, {
      props: {
        defaultDates: [defaultStartDate, defaultEndDate]
      }
    })

    expect(wrapper.vm.bindingStartValue).toEqual(defaultStartDate)
    expect(wrapper.vm.bindingEndValue).toEqual(defaultEndDate)
  })

  it('當日期更改時應更新綁定值', async () => {
    wrapper = shallowMount(antTimeRange, {
      props: {
        defaultDates: [defaultStartDate, defaultEndDate]
      }
    })

    // onMounted emit
    expect(wrapper.emitted()['update:timeValue']).toBeTruthy()
    expect(wrapper.emitted()['update:timeValue']![0]).toEqual([[defaultStartDate, defaultEndDate]])

    // 模擬修改開始日期
    const newStartDate = dayjs('2024-03-07').add(1, 'day')
    await wrapper.vm.onChangeStart(newStartDate, 'YYYY-MM-DD')
    expect(wrapper.vm.hackStartValue).toEqual(newStartDate)
    expect(wrapper.emitted()['update:timeValue']![1]).toEqual([[newStartDate, defaultEndDate]])

    // 模擬修改結束日期
    const newEndDate = dayjs('2024-03-08').add(2, 'day')
    await wrapper.vm.onChangeEnd(newEndDate, 'YYYY-MM-DD')
    expect(wrapper.vm.hackEndValue).toEqual(newEndDate)
    expect(wrapper.emitted()['update:timeValue']![2]).toEqual([[defaultStartDate, newEndDate]])
  })

  it('應該禁用超過結束時間的日期', () => {
    wrapper = shallowMount(antTimeRange, {
      props: {
        defaultDates: [defaultStartDate, defaultEndDate],
        disabledDays: 7
      }
    })

    const futureDate = dayjs('2024-03-12').add(8, 'days')
    const disabledStart = wrapper.vm.disabledStartDate(futureDate)
    const disabledEnd = wrapper.vm.disabledEndDate(futureDate)

    expect(disabledStart).toBe(true)
    expect(disabledEnd).toBe(true)
  })

  it('應該處理選擇日期範圍邏輯', () => {
    wrapper = shallowMount(antTimeRange, {
      props: {
        defaultDates: [defaultStartDate, defaultEndDate]
      }
    })

    // 模擬點擊清空起始和結束日期
    wrapper.vm.handleClick('start')
    expect(wrapper.vm.bindingStartValue).toBeUndefined()
    expect(wrapper.vm.bindingEndValue).toBeUndefined()

    // 模擬點擊起始日期並清空
    wrapper.vm.handleClick('end')
    expect(wrapper.vm.bindingStartValue).toBeUndefined()
    expect(wrapper.vm.bindingEndValue).toBeUndefined()
  })

  it('應該處理選擇框失去焦點時的邏輯', () => {
    wrapper = shallowMount(antTimeRange, {
      props: {
        defaultDates: [defaultStartDate, defaultEndDate]
      }
    })

    // 模擬失去焦點
    wrapper.vm.handleBlur()
    expect(wrapper.vm.bindingStartValue).toEqual(defaultStartDate)
    expect(wrapper.vm.bindingEndValue).toEqual(defaultEndDate)
  })

  it('應該禁用起始日期前的日期', () => {
    wrapper = shallowMount(antTimeRange, {
      props: {
        defaultDates: [defaultStartDate, defaultEndDate]
      }
    })

    const pastDate = dayjs().subtract(1, 'day')
    const disabled = wrapper.vm.disabledEndDate(pastDate)

    expect(disabled).toBe(true)
  })

  it('應該禁用未來日期', () => {
    wrapper = shallowMount(antTimeRange, {
      props: {
        defaultDates: [defaultStartDate, defaultEndDate]
      }
    })

    const futureDate = dayjs().add(1, 'day')
    const disabled = wrapper.vm.disabledStartDate(futureDate)

    expect(disabled).toBe(true)
  })

  it('當 okStart 被調用時，若 bindingEndValue 沒有值，應該打開結束日期選擇框', () => {
    wrapper = shallowMount(antTimeRange, {
      props: {
        defaultDates: [defaultStartDate, defaultEndDate]
      }
    })

    wrapper.vm.bindingEndValue = undefined

    // 模擬調用 okStart
    wrapper.vm.okStart()
    expect(wrapper.vm.openEnd).toBe(true)
    expect(wrapper.vm.openStart).toBe(false)
  })

  it('當 okEnd 被調用時，若 bindingStartValue 沒有值，應該打開起始日期選擇框', () => {
    wrapper = shallowMount(antTimeRange, {
      props: {
        defaultDates: [dayjs().startOf('day'), dayjs().endOf('day')]
      }
    })

    wrapper.vm.bindingStartValue = undefined

    // 模擬調用 okEnd
    wrapper.vm.okEnd()
    expect(wrapper.vm.openStart).toBe(true)
    expect(wrapper.vm.openEnd).toBe(false)
  })
})
