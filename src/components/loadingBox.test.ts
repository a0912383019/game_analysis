import { describe, it, expect, afterEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import loadingBox from '@/components/loadingBox.vue'

describe('loadingBox', () => {
  let wrapper: VueWrapper<any>

  afterEach(() => {
    wrapper.unmount()
  })

  // 測試是否正確套用預設 props
  it('renders with default props', () => {
    wrapper = shallowMount(loadingBox)
    expect(wrapper.find('.loader').classes()).toContain('grey')
    expect(wrapper.find('.loader').classes()).toContain('lg')
  })

  // 測試是否能正確套用不同的 props
  it('renders with specific props', () => {
    wrapper = shallowMount(loadingBox, { props: { color: 'blue', size: 'sm' } })

    expect(wrapper.find('.loader').classes()).toContain('blue')
    expect(wrapper.find('.loader').classes()).toContain('sm')
  })
})
