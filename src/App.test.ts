import { it, describe, expect, vi, beforeEach } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import { i18n } from '@/global/i18n'
import App from '@/App.vue'
import { createTestingPinia } from '@pinia/testing'
import router from '@/router'

describe('App.vue', () => {
  let wrapper: VueWrapper<InstanceType<typeof App>>

  beforeEach(() => {
    wrapper = shallowMount(App, {
      global: {
        plugins: [i18n, router, createTestingPinia({ createSpy: vi.fn })]
      }
    })
  })

  // aConfigProvider 元件是否存在於畫面上
  it('Whether the aConfigProvider component exists on the screen', () => {
    expect(wrapper.findComponent({ name: 'aConfigProvider' }).exists()).toBe(true)
  })
})
