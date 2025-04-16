import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { notification } from 'ant-design-vue'
import { useGlobalStore } from '@/stores'
import router from '@/router'

// 模擬 ant-design-vue 的 notification
vi.mock('ant-design-vue', () => ({
  notification: {
    error: vi.fn()
  }
}))

// 模擬 router.push
vi.mock('@/router', () => ({
  default: {
    push: vi.fn()
  }
}))

describe('useGlobalStore', () => {
  let globalStore: ReturnType<typeof useGlobalStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    globalStore = useGlobalStore()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  // 測試預設值是否正確
  it('initializes with correct default values', () => {
    expect(globalStore.isSidebarClose).toBe(false)
    expect(globalStore.isLoading).toBe(true)
    expect(globalStore.currentPlatform).toBe('bbin')
  })

  // // 測試 storeHandleApiError 清除、顯示通知並導回登入頁
  it('clears sessionStorage and localStorage', () => {
    const sessionStorageSpy = vi.spyOn(Object.getPrototypeOf(sessionStorage), 'clear')
    const localStorageSpy = vi.spyOn(Object.getPrototypeOf(localStorage), 'clear')

    globalStore.storeHandleApiError()
    expect(sessionStorageSpy).toHaveBeenCalled()
    expect(localStorageSpy).toHaveBeenCalled()
    expect(notification.error).toHaveBeenCalledWith({
      message: '登入狀態異常，請重新登入'
    })
    expect(router.push).toHaveBeenCalledWith({ name: 'Login' })
  })

  // 測試 resetState 是否被重置
  it('resets state to initial values', () => {
    globalStore.isSidebarClose = true
    globalStore.isLoading = false
    globalStore.currentPlatform = 'other'

    globalStore.resetState()

    // 斷言狀態會重置，回復初始值
    expect(globalStore.isSidebarClose).toBe(false)
    expect(globalStore.isLoading).toBe(true)
    expect(globalStore.currentPlatform).toBe('bbin')
  })
})
