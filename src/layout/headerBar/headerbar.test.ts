import { it, describe, expect, afterEach, beforeEach, vi } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import headerbar from '@/layout/headerBar/headerbar.vue'
import { createTestingPinia } from '@pinia/testing'
import { useGlobalStore } from '@/stores'

describe('headerbar', () => {
  let wrapper: VueWrapper<any>
  let globalStore: ReturnType<typeof useGlobalStore>

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    globalStore = useGlobalStore()

    wrapper = shallowMount(headerbar)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('components', () => {
    expect(wrapper.findComponent({ name: 'platform-group' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'currency-sign-text' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'account' }).exists()).toBe(true)
  })

  it('isSidebarClose', async () => {
    expect(wrapper.find('header').classes()).not.toContain('isClose')

    globalStore.isSidebarClose = true
    await wrapper.vm.$nextTick()

    expect(wrapper.find('header').classes()).toContain('isClose')
  })
})
