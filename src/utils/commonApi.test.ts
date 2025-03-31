import { it, describe, expect, afterEach, vi, Mock, beforeEach } from 'vitest'
import { queryLobbyGames } from '@/utils/commonApi'
import { apiLobbyGames } from '@/api'
import { notification } from 'ant-design-vue'
import { useGlobalStore } from '@/stores'
import { createTestingPinia } from '@pinia/testing'

vi.mock('@/api', () => ({
  apiLobbyGames: vi.fn()
}))

vi.mock('ant-design-vue', () => ({
  notification: {
    error: vi.fn()
  }
}))

describe('commonApi', () => {
  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    // 讓console.error不要洗版
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('queryLobbyGames 應該成功回傳遊戲列表', async () => {
    const mockApiLobbyGames = apiLobbyGames as Mock
    const retData = [
      {
        game_code: '5001',
        game_name: '水果拉霸',
        enable: 0,
        serial_info: []
      },
      {
        game_code: '5002',
        game_name: '撲克拉霸',
        enable: 0,
        serial_info: []
      }
    ]
    mockApiLobbyGames.mockResolvedValue({
      result: 'success',
      ret: retData
    })

    const result = await queryLobbyGames(123)

    expect(apiLobbyGames).toHaveBeenCalledWith({ lobby_id: 123 })
    expect(result).toStrictEqual(retData)
  })

  it('queryLobbyGames 應該在 result 不是 success 時拋出錯誤並顯示通知', async () => {
    const mockApiLobbyGames = apiLobbyGames as Mock
    mockApiLobbyGames.mockResolvedValue({
      result: 'error'
    })

    const result = await queryLobbyGames(123)

    expect(apiLobbyGames).toHaveBeenCalledWith({ lobby_id: 123 })
    expect(notification.error).toHaveBeenCalledWith({
      message: '查詢失敗，請重新操作'
    })
    expect(result).toBeUndefined()
  })

  it('queryLobbyGames 應該在 401 時執行 storeHandleApiError', async () => {
    vi.spyOn(axios, 'isAxiosError').mockImplementation((err) => {
      return err?.isAxiosError === true
    })

    const globalStore = useGlobalStore()
    const storeHandleApiError = vi.fn()
    globalStore.storeHandleApiError = storeHandleApiError

    const mockApiLobbyGames = apiLobbyGames as Mock
    mockApiLobbyGames.mockRejectedValue({
      isAxiosError: true,
      response: { status: 401 }
    })

    await queryLobbyGames(123)
    expect(storeHandleApiError).toHaveBeenCalledTimes(1)
  })

  it('queryLobbyGames 應該在 403 時顯示 no_permission 錯誤通知', async () => {
    const mockApiLobbyGames = apiLobbyGames as Mock
    mockApiLobbyGames.mockRejectedValue({
      isAxiosError: true,
      response: { status: 403 }
    })
    await queryLobbyGames(123)

    expect(notification.error).toHaveBeenCalledWith({
      message: '權限不足，請聯繫管理員'
    })
  })
})
