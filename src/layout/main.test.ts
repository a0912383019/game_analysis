import main from '@/layout/main.vue'
import { it, describe, expect, afterEach, beforeEach, vi, Mock } from 'vitest'
import { VueWrapper, shallowMount, flushPromises } from '@vue/test-utils'
import { i18n } from '@/global/i18n'
import { createTestingPinia } from '@pinia/testing'
import router from '@/router'
import { useGlobalStore } from '@/stores'
import { apiHalls, apiLobbies, apiDevices } from '@/api'

vi.mock('@/../public/js/system_config', () => ({
  platformDict: [
    {
      name: 'BBIN',
      key: 'bbin',
      pColor: '#061127'
    },
    {
      name: 'BBGP',
      key: 'bbgp',
      pColor: '#18242C'
    },
    {
      name: 'Midori',
      key: 'midori',
      pColor: '#332E21'
    }
  ]
}))

vi.mock('@/api', () => ({
  apiHalls: vi.fn(),
  apiLobbies: vi.fn(),
  apiDevices: vi.fn()
}))

describe('main', () => {
  // 用 instance type 會造成 type-check error
  let wrapper: VueWrapper<any>
  let globalStore: ReturnType<typeof useGlobalStore>

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    globalStore = useGlobalStore()

    const mockApiHalls = apiHalls as Mock
    mockApiHalls.mockResolvedValue({ result: 'success', ret: [] })
    const mockApiLobbies = apiLobbies as Mock
    mockApiLobbies.mockResolvedValue({ result: 'success', ret: [] })
    const mockApiDevices = apiDevices as Mock
    mockApiDevices.mockResolvedValue({ result: 'success', ret: [] })

    wrapper = shallowMount(main, {
      global: {
        plugins: [i18n, router]
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('components', () => {
    expect(wrapper.findComponent({ name: 'sidebar' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'headerbar' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'loading-box' }).exists()).toBe(true)
  })

  it('currentPlatform & watch', async () => {
    expect(wrapper.vm.currentPlatform).toStrictEqual('bbin')
    expect(apiHalls).toBeCalledTimes(1)
    expect(apiLobbies).toBeCalledTimes(1)
    expect(apiDevices).toBeCalledTimes(1)

    let setPropertySpy = vi.spyOn(document.documentElement.style, 'setProperty')
    globalStore.currentPlatform = 'midori'
    await flushPromises()
    expect(apiHalls).toBeCalledTimes(2)
    expect(apiLobbies).toBeCalledTimes(2)
    expect(apiDevices).toBeCalledTimes(2)
    expect(wrapper.vm.currentPlatform).toStrictEqual('midori')
    expect(setPropertySpy).toHaveBeenCalledWith('--primary-color', '#332E21')
  })

  it('getColorByName', () => {
    expect(wrapper.vm.getColorByName('bbin')).toBe('#061127')
    expect(wrapper.vm.getColorByName('bbgp')).toBe('#18242C')
    expect(wrapper.vm.getColorByName('midori')).toBe('#332E21')
    expect(wrapper.vm.getColorByName('xyz')).toBe('#000000')
  })
})
