import { it, describe, expect, afterEach, vi, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import notFound from '@/views/notFound.vue'
import { createRouterMock, RouterMock } from 'vue-router-mock'

describe('notFound.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    const router: RouterMock = createRouterMock({
      spy: {
        create: (fn) => vi.fn(fn),
        reset: (spy) => spy.mockClear()
      }
    })

    wrapper = shallowMount(notFound, {
      global: {
        plugins: [router]
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('contains a router-link to home', () => {
    const link = wrapper.findComponent({ name: 'routerLink' })
    expect(link.exists()).toBe(true)
    expect(link.attributes('to')).toBe('/')
  })
})
