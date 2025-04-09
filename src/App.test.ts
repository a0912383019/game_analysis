import { it, describe, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import { i18n } from '@/global/i18n'
import App from '@/App.vue'
import { createTestingPinia } from '@pinia/testing'
import router from '@/router'
import zhTw from 'ant-design-vue/es/locale/zh_TW'

describe('App.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = shallowMount(App, {
      global: {
        plugins: [i18n, router, createTestingPinia({ createSpy: vi.fn })]
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Whether the aConfigProvider component exists on the screen', () => {
    expect(wrapper.findComponent({ name: 'aConfigProvider' }).exists()).toBe(true)
  })

  it('language', () => {
    expect(wrapper.vm.locale).toStrictEqual('zh-TW')
    expect(wrapper.vm.language).toStrictEqual(zhTw)
  })
})
