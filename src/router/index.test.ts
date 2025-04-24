import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useGlobalStore } from '@/stores'
import { createTestingPinia } from '@pinia/testing'
import router from '@/router'

describe('Vue Router Guards', () => {
  let globalStore: ReturnType<typeof useGlobalStore>

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    globalStore = useGlobalStore()
  })

  afterEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('應該在未登入時導向 /login', async () => {
    await router.push('/home')
    expect(router.currentRoute.value.path).toBe('/login')
  })

  it('應該在已登入時允許導航', async () => {
    // home 是動態路由，因此先手動加入
    router.addRoute({ path: '/home', name: '/home', component: expect.any(Function) })
    localStorage.setItem('game_user_info', 'mockUser')
    await router.push('/home')
    expect(router.currentRoute.value.path).toBe('/home')
  })

  it('應該允許訪問白名單頁面 /login', async () => {
    await router.push('/login')
    expect(router.currentRoute.value.path).toBe('/login')
  })

  it('進入 login 頁面時應該重置 global store', async () => {
    const resetStateMock = vi.fn()
    globalStore.resetState = resetStateMock

    await router.push('/login')
    expect(resetStateMock).toHaveBeenCalled()
  })
})
