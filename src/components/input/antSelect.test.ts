import { describe, it, expect, afterEach, vi } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import antSelect from '@/components/input/antSelect.vue'

describe('antSelect', () => {
  let wrapper: VueWrapper<any>
  const options = [
    { label: '選項一', value: '1' },
    { label: '選項二', value: '2' }
  ]

  afterEach(() => {
    wrapper.unmount()
  })

  it('default props', () => {
    wrapper = shallowMount(antSelect, {
      global: { stubs: { ASelect: { template: '<div><slot /></div>' } } }
    })
    expect(wrapper.vm.disabled).toBe(false)
    expect(wrapper.vm.allowClear).toBe(true)
    expect(wrapper.vm.hasPlaceholder).toBe(true)
    expect(wrapper.vm.defaultAll).toBe(true)
    expect(wrapper.vm.showSearch).toBe(true)
    expect(wrapper.vm.isLoading).toBe(false)
    expect(typeof wrapper.vm.handleChange).toBe('function')
  })

  it('placeholder & isActive', async () => {
    wrapper = shallowMount(antSelect, {
      global: { stubs: { ASelect: { template: '<div><slot /></div>' } } },
      props: {
        modelValue: [],
        placeHolderText: '請選擇廳主',
        placeHolderValuableText: '廳主'
      }
    })
    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.placeholder).toBe('請選擇廳主')

    await wrapper.setProps({ modelValue: [1, 2, 3] })
    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.placeholder).toBe('廳主')
  })

  it('should emit update:modelValue when onMounted select all or selecting value', async () => {
    wrapper = shallowMount(antSelect, {
      global: { stubs: { ASelect: { template: '<div><slot /></div>' } } },
      props: {
        modelValue: [],
        options,
        mode: 'multiple'
      }
    })

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue']![0]).toEqual([['1', '2']])

    wrapper.vm.selectAll(false)
    expect(wrapper.emitted()['update:modelValue']![1]).toEqual([[]])

    wrapper.vm.selectAll(true)
    expect(wrapper.emitted()['update:modelValue']![2]).toEqual([['1', '2']])
  })

  it('should call handleChange when option changes', async () => {
    const handleChange = vi.fn()

    wrapper = shallowMount(antSelect, {
      global: { stubs: { ASelect: { template: '<div><slot /></div>' } } },
      props: {
        modelValue: [],
        options,
        handleChange
      }
    })

    await wrapper.vm.allBinding.onChange?.(['1'], [{ label: '選項一', value: '1' }])
    expect(handleChange).toHaveBeenCalledWith(['1'], [{ label: '選項一', value: '1' }])
  })

  it('formatOptions & selectAllBtn & filterOption', () => {
    wrapper = shallowMount(antSelect, {
      global: { stubs: { ASelect: { template: '<div><slot /></div>' } } },
      props: {
        modelValue: ['1', '2'],
        options
      }
    })

    expect(wrapper.vm.formatOptions).toStrictEqual([
      {
        label: '選項一',
        value: '1'
      },
      {
        label: '選項二',
        value: '2'
      }
    ])
    expect(wrapper.vm.selectAllBtn).toBe(true)
    expect(wrapper.vm.filterOption('一', wrapper.vm.formatOptions[0])).toBe(true)
    expect(wrapper.vm.filterOption('一', wrapper.vm.formatOptions[1])).toBe(false)
  })
})
