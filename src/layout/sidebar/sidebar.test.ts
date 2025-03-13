import { it, describe, expect, afterEach, vi, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useSystemStore, useGlobalStore } from '@/stores'
import sidebar from '@/layout/sidebar/sidebar.vue'
import { createRouterMock, RouterMock, injectRouterMock } from 'vue-router-mock'

describe('sidebar', () => {
  let wrapper: VueWrapper<any>
  let globalStore: ReturnType<typeof useGlobalStore>
  let systemStore: ReturnType<typeof useSystemStore>
  let router: RouterMock

  beforeEach(async () => {
    router = createRouterMock({
      spy: {
        create: (fn) => vi.fn(fn),
        reset: (spy) => spy.mockClear()
      }
    })

    // 加了這行就不用在 plugins 放 router
    injectRouterMock(router)
    // 模擬路由到有子頁的頁籤
    await router.push('/operations/game-comparison')

    createTestingPinia({ createSpy: vi.fn })
    globalStore = useGlobalStore()
    systemStore = useSystemStore()
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
    systemStore.menuList = menuList

    wrapper = shallowMount(sidebar)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('openKeys', async () => {
    // onMounted
    expect(wrapper.vm.openKeys).toStrictEqual(['2'])
  })

  it('toggleCollapsed & toggleIconName', () => {
    expect(globalStore.isSidebarClose).toBeFalsy()
    expect(wrapper.vm.toggleIconName).toStrictEqual('unionLeft')

    wrapper.vm.toggleCollapsed()
    expect(globalStore.isSidebarClose).toBeTruthy()
    expect(wrapper.vm.toggleIconName).toStrictEqual('unionRight')

    wrapper.vm.toggleCollapsed()
    expect(globalStore.isSidebarClose).toBeFalsy()
    expect(wrapper.vm.toggleIconName).toStrictEqual('unionLeft')
  })

  it('findMenuItemAndParentKey', () => {
    expect(wrapper.vm.findMenuItemAndParentKey('/home')).toStrictEqual({
      activeItem: {
        key: '1',
        name: 'home',
        urlPath: '/home'
      },
      parentKey: null
    })

    expect(wrapper.vm.findMenuItemAndParentKey('/operations/game-comparison')).toStrictEqual({
      activeItem: {
        key: '8',
        name: 'game_comparison',
        urlPath: '/operations/game-comparison'
      },
      parentKey: '2'
    })
  })

  it('watchEffect', async () => {
    expect(wrapper.vm.selectedKeys).toStrictEqual(['8'])

    await router.push('/home')
    expect(wrapper.vm.selectedKeys).toStrictEqual(['1'])
  })
})
