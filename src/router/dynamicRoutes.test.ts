import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateMenuRoutes } from '@/router/dynamicRoutes'
import router from '@/router'

// 模擬 Vue Router `addRoute` 方法
vi.spyOn(router, 'addRoute')

describe('generateMenuRoutes', () => {
  beforeEach(() => {
    vi.clearAllMocks() // 清除 spy 呼叫紀錄
  })

  it('應該根據 menu 生成對應的 routes 並動態註冊', () => {
    const mockMenu = [
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
          }
        ]
      }
    ]

    generateMenuRoutes(mockMenu)

    // 應該總共註冊 4 條路由
    expect(router.addRoute).toHaveBeenCalledTimes(4)

    // 檢查是否有正確註冊對應的路由
    expect(router.addRoute).toHaveBeenCalledWith('Game', expect.objectContaining({ path: '/home' }))
    expect(router.addRoute).toHaveBeenCalledWith(
      'Game',
      expect.objectContaining({ path: '/operations' })
    )
    expect(router.addRoute).toHaveBeenCalledWith(
      'Game',
      expect.objectContaining({ path: '/operations/overall-report' })
    )
    expect(router.addRoute).toHaveBeenCalledWith(
      'Game',
      expect.objectContaining({ path: '/operations/operation-analysis' })
    )
  })
})
