import { describe, it, expect, afterEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import cdpButtonIcon from '@/components/cdpButtonIcon.vue'

describe('cdpButtonIcon', () => {
  let wrapper: VueWrapper<any>

  afterEach(() => {
    wrapper.unmount()
  })

  // 測試預設值是否正確
  it('should correctly apply props', () => {
    wrapper = shallowMount(cdpButtonIcon)
    expect(wrapper.vm.buttonClass).toBe('button__medium button__blue')
  })

  // 測試在沒有 icon 的時候，是否成功渲染組件
  it('when no icon, confirm whether the component is rendered correctly', () => {
    wrapper = shallowMount(cdpButtonIcon, {
      props: { name: '廳主', size: 'medium', color: 'blue' }
    })
    expect(wrapper.find('span').text()).toBe('廳主')
    expect(wrapper.vm.buttonClass).toBe('button__medium button__blue')
    expect(wrapper.findComponent({ name: 'cdp-icon' }).exists()).toBe(false)
  })

  // 測試是否成功渲染組件
  it('confirm whether the component is rendered correctly', () => {
    wrapper = shallowMount(cdpButtonIcon, {
      props: { name: '遊戲', icon: 'game', size: 'large', color: 'green' }
    })
    expect(wrapper.find('span').text()).toBe('遊戲')
    expect(wrapper.vm.buttonClass).toBe('button__large button__green')
    expect(wrapper.findComponent({ name: 'cdp-icon' }).exists()).toBe(true)
  })
})
