import { it, describe, expect, afterEach, vi, beforeEach, Mock, MockInstance } from 'vitest'
import { VueWrapper, shallowMount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from '@/global/i18n'
import { useSystemStore } from '@/stores'
import login from '@/views/login.vue'
import { apiLogin, apiRelease, apiGetSidebar } from '@/api'
import { createRouterMock, RouterMock } from 'vue-router-mock'
import { generateMenuRoutes } from '@/router/dynamicRoutes'

vi.mock('@/api', () => ({
  apiLogin: vi.fn(),
  apiRelease: vi.fn(),
  apiGetSidebar: vi.fn()
}))

vi.mock('@/router/dynamicRoutes', () => ({
  generateMenuRoutes: vi.fn()
}))

describe('login', () => {
  let wrapper: VueWrapper<any>
  let systemStore: ReturnType<typeof useSystemStore>
  let spyPush: MockInstance

  const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => {})

  beforeEach(() => {
    const router: RouterMock = createRouterMock({
      spy: {
        create: (fn) => vi.fn(fn),
        reset: (spy) => spy.mockClear()
      }
    })
    spyPush = vi.spyOn(router, 'push')

    vi.useFakeTimers()
    createTestingPinia({ createSpy: vi.fn })
    systemStore = useSystemStore()

    const mockApiRelease = apiRelease as Mock
    mockApiRelease.mockResolvedValueOnce('release detail')

    wrapper = shallowMount(login, {
      global: {
        plugins: [i18n, router],
        stubs: {
          GoogleLogin: {
            template: '<div><slot /></div>'
          }
        }
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
    wrapper.unmount()
  })

  it('hideErrorMsg', async () => {
    wrapper.vm.failMsg.msg2.isShow = true
    expect(wrapper.vm.failMsg.msg1.isShow).toBeFalsy()
    expect(wrapper.vm.failMsg.msg2.isShow).toBeTruthy()
    expect(wrapper.vm.failMsg.msg3.isShow).toBeFalsy()
    expect(wrapper.vm.failMsg.msg4.isShow).toBeFalsy()

    wrapper.vm.hideErrorMsg()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.failMsg.msg1.isShow).toBeFalsy()
    expect(wrapper.vm.failMsg.msg2.isShow).toBeFalsy()
    expect(wrapper.vm.failMsg.msg3.isShow).toBeFalsy()
    expect(wrapper.vm.failMsg.msg4.isShow).toBeFalsy()
  })

  it('shake', async () => {
    wrapper.vm.shake()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isShaking).toBe(true)
    vi.advanceTimersByTime(2000)
    expect(wrapper.vm.isShaking).toBe(false)
  })

  it('googleLoginCallback & handleLogin & queryApiGetSidebar', async () => {
    expect(generateMenuRoutes).toBeCalledTimes(0)

    const mockApiLogin = apiLogin as Mock
    mockApiLogin.mockResolvedValue({
      result: 'success',
      ret: {
        access_token: 'test token',
        token_type: 'bearer',
        expires_in: 21600,
        email: 'robot@mail.chungyo.net',
        name: 'BI-CDP-Robot',
        picture: 'abc.jpg'
      }
    })
    const mockApiGetSidebar = apiGetSidebar as Mock
    const apiRoutes = [
      {
        title: 'home',
        route: '/home'
      },
      {
        title: 'operations',
        route: '/operations',
        submenu: [
          {
            title: 'overall_report',
            route: '/operations/overall-report'
          },
          {
            title: 'operation_analysis',
            route: '/operations/operation-analysis'
          },
          {
            title: 'regional_difference',
            route: '/operations/regional-difference'
          },
          {
            title: 'device_difference',
            route: '/operations/device-difference'
          },
          {
            title: 'bet_search',
            route: '/operations/bet-search'
          },
          {
            title: 'game_comparison',
            route: '/operations/game-comparison'
          }
        ]
      },
      {
        title: 'risk_control',
        route: '/risk-control',
        submenu: [
          {
            title: 'high_profit_members',
            route: '/risk-control/high-profit-members'
          },
          {
            title: 'risk_behavior',
            route: '/risk-control/risk-behavior'
          }
        ]
      }
    ]
    mockApiGetSidebar.mockResolvedValue({
      result: 'success',
      ret: apiRoutes
    })

    wrapper.vm.googleLoginCallback({ credential: 'asdjio12j' })
    await flushPromises()
    expect(wrapper.vm.isLoading).toBe(true)
    // 驗證 user info
    const gameUserInfo = {
      name: 'BI-CDP-Robot',
      email: 'robot@mail.chungyo.net',
      picture: 'abc.jpg'
    }
    const sessionGameUserInfo = JSON.parse(localStorage.game_user_info)
    expect(sessionGameUserInfo).toStrictEqual(gameUserInfo)

    // 驗證 access_token 組合
    const sessionAccessToken = localStorage.game_access_token
    expect(sessionAccessToken).toStrictEqual('bearer test token')

    const sessionGameConfig = JSON.parse(localStorage.menu_config)
    expect(sessionGameConfig).toStrictEqual(apiRoutes)

    // 驗證 systemStore.menuList
    const menuList: SidebarMenuItem[] = [
      {
        key: '1',
        name: 'home',
        urlPath: '/home'
      },
      {
        child: [
          {
            key: '3',
            name: 'overall_report',
            urlPath: '/operations/overall-report'
          },
          {
            key: '4',
            name: 'operation_analysis',
            urlPath: '/operations/operation-analysis'
          },
          {
            key: '5',
            name: 'regional_difference',
            urlPath: '/operations/regional-difference'
          },
          {
            key: '6',
            name: 'device_difference',
            urlPath: '/operations/device-difference'
          },
          {
            key: '7',
            name: 'bet_search',
            urlPath: '/operations/bet-search'
          },
          {
            key: '8',
            name: 'game_comparison',
            urlPath: '/operations/game-comparison'
          }
        ],
        key: '2',
        name: 'operations',
        urlPath: '/operations'
      },
      {
        child: [
          {
            key: '10',
            name: 'high_profit_members',
            urlPath: '/risk-control/high-profit-members'
          },
          {
            key: '11',
            name: 'risk_behavior',
            urlPath: '/risk-control/risk-behavior'
          }
        ],
        key: '9',
        name: 'risk_control',
        urlPath: '/risk-control'
      }
    ]
    expect(systemStore.menuList).toStrictEqual(menuList)
    expect(generateMenuRoutes).toBeCalledTimes(2)
    expect(spyPush).toHaveBeenCalledWith({ path: '/home' })
  })

  it('queryApiRelease', async () => {
    await flushPromises()
    expect(consoleMock).toHaveBeenCalledWith('release detail')
  })
})
