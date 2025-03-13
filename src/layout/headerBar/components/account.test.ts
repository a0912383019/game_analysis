import { it, describe, expect, afterEach, beforeEach, vi, MockInstance } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import account from '@/layout/headerBar/components/account.vue'
import { i18n } from '@/global/i18n'
import { createTestingPinia } from '@pinia/testing'
import { createRouterMock, RouterMock } from 'vue-router-mock'

describe('account', () => {
  let wrapper: VueWrapper<any>
  let spyPush: MockInstance

  beforeEach(() => {
    const router: RouterMock = createRouterMock({
      spy: {
        create: (fn) => vi.fn(fn),
        reset: (spy) => spy.mockClear()
      }
    })
    spyPush = vi.spyOn(router, 'push')

    const game_user_info = {
      name: 'Yuyu',
      picture: 'test.jpg'
    }
    sessionStorage.setItem('game_user_info', JSON.stringify(game_user_info))

    wrapper = shallowMount(account, {
      global: {
        plugins: [i18n, router, createTestingPinia({ createSpy: vi.fn })]
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('storeLogout', async () => {
    const sessionStorageSpy = vi.spyOn(Object.getPrototypeOf(sessionStorage), 'clear')
    const localStorageSpy = vi.spyOn(Object.getPrototypeOf(localStorage), 'clear')

    wrapper.vm.storeLogout()
    expect(sessionStorageSpy).toHaveBeenCalled()
    expect(localStorageSpy).toHaveBeenCalled()
    expect(spyPush).toHaveBeenCalled()
  })

  it('name & picture', () => {
    expect(wrapper.vm.name).toStrictEqual('Yuyu')
    expect(wrapper.vm.picture).toStrictEqual('test.jpg')
  })
})
