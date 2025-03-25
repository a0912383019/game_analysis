import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import cdpIcon from '@/components/cdpIcon.vue'

describe('cdpIcon', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = shallowMount(cdpIcon, { props: { name: 'menu', color: '#ffffff' } })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('iconName', () => {
    expect(wrapper.vm.iconName).toBe('#icon-menu')
  })
})
