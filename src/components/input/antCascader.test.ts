import { describe, it, expect, afterEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import antCascader from '@/components/input/antCascader.vue'
import { VALUE_SPLIT } from 'ant-design-vue/lib/vc-cascader/utils/commonUtil'

describe('antCascader', () => {
  let wrapper: VueWrapper<any>
  const options = [
    {
      label: 'Asia',
      value: 'asia',
      children: [
        {
          label: 'Taiwan',
          value: 'taiwan'
        },
        {
          label: 'Japan',
          value: 'japan'
        }
      ]
    }
  ]

  afterEach(() => {
    wrapper.unmount()
  })

  it('placeholder & isActive', async () => {
    wrapper = shallowMount(antCascader, {
      global: { stubs: { ACascader: { template: '<div><slot /></div>' } } },
      props: {
        modelValue: [],
        options,
        placeHolderText: '請選擇地區',
        placeHolderValuableText: '地區'
      }
    })
    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.placeholder).toStrictEqual('請選擇地區')

    await wrapper.setProps({ modelValue: [1, 2, 3] })
    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.placeholder).toStrictEqual('地區')
  })

  it('emit update:modelValue on change', async () => {
    wrapper = shallowMount(antCascader, {
      global: { stubs: { ACascader: { template: '<div><slot /></div>' } } },
      props: {
        modelValue: [],
        options: []
      }
    })

    await wrapper.vm.allBinding.onChange?.([['asia', 'taiwan']], {} as any)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toStrictEqual([['asia', 'taiwan']])
  })

  it('can render tag with correct label path', () => {
    wrapper = shallowMount(antCascader, {
      global: { stubs: { ACascader: { template: '<div><slot /></div>' } } },
      props: {
        modelValue: [['asia', 'taiwan']],
        options
      }
    })

    const tagLabel = wrapper.vm.getLabelPath(['asia', 'taiwan'].join(VALUE_SPLIT))
    expect(tagLabel).toStrictEqual('Asia-Taiwan')
  })

  it('can delete selected item', async () => {
    wrapper = shallowMount(antCascader, {
      global: { stubs: { ACascader: { template: '<div><slot /></div>' } } },
      props: {
        modelValue: [['asia', 'taiwan']],
        options
      }
    })

    wrapper.vm.deleteItem(['asia', 'taiwan'].join(VALUE_SPLIT))
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual([])
  })
})
