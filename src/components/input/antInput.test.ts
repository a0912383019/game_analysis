import { describe, afterEach, it, expect } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import antInput from '@/components/input/antInput.vue'

describe('antInput', () => {
  let wrapper: VueWrapper<any>

  afterEach(() => {
    wrapper.unmount()
  })

  // 測試 props 的預設值是否正確
  it('applies default props correctly', () => {
    wrapper = shallowMount(antInput, {
      global: { stubs: { AInput: { template: '<div><slot /></div>' } } }
    })
    expect(wrapper.vm.type).toBe('text')
    expect(wrapper.vm.modelValue).toBe('')
    expect(wrapper.vm.hasPlaceholder).toBe(true)
    expect(wrapper.find('div').classes()).toContain('has-placeholder')
    expect(wrapper.vm.disabled).toBe(false)
  })

  // 測試 text 類型的 input 是否正確應用 props
  it('applies text input props correctly', () => {
    wrapper = shallowMount(antInput, {
      global: { stubs: { AInput: { template: '<div><slot /></div>' } } },
      props: {
        placeHolderText: 'Enter text',
        type: 'text',
        originPlaceHolder: 'Enter your name',
        disabled: true
      }
    })
    expect(wrapper.find('div').attributes('style')).toContain("--placeholder-text: 'Enter text'")
    expect(wrapper.vm.originPlaceHolder).toBe('Enter your name')
    expect(wrapper.vm.disabled).toBe(true)
  })

  // 測試 number 類型的 input 是否正確應用 props
  it('applies number input props correctly', () => {
    wrapper = shallowMount(antInput, {
      global: { stubs: { AInputNumber: { template: '<div><slot /></div>' } } },
      props: { type: 'number', disabled: true }
    })
    expect(wrapper.vm.disabled).toBe(true)
  })

  // 測試 onChange 行為
  it('emits update:modelValue with trimmed string when type is text', () => {
    wrapper = shallowMount(antInput, {
      global: { stubs: { AInput: { template: '<div><slot /></div>' } } }
    })
    wrapper.vm.allBinding.onChange(' hello ')

    const emitted: any = wrapper.emitted('update:modelValue')
    expect(emitted).toHaveLength(1)
    expect(emitted[0]).toEqual(['hello'])
  })

  it('emits update:modelValue with number when type is number', () => {
    wrapper = shallowMount(antInput, {
      global: { stubs: { AInputNumber: { template: '<div><slot /></div>' } } },
      props: { type: 'number', disabled: true }
    })

    // 測試數字輸入
    wrapper.vm.allBinding.onChange(123)
    let emitted: any = wrapper.emitted('update:modelValue')
    expect(emitted).toHaveLength(1)
    expect(emitted[0]).toEqual([123])

    // 測試輸入 null
    wrapper.vm.allBinding.onChange(null)
    emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toHaveLength(2)
    expect(emitted[1]).toEqual([undefined])
  })
})
