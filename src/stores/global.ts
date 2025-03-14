import { defineStore } from 'pinia'
import router from '@/router'
import { notification } from 'ant-design-vue'
import { i18n } from '@/global/i18n'
import { apiLobbyGames } from '@/api'

export const useGlobalStore = defineStore('globalStore', () => {
  const isSidebarClose = ref<boolean>(false) // sidebar預設開啟

  const isLoading = ref<boolean>(true)

  const currentPlatform = ref<string>('bbin')

  const { t } = i18n.global

  const storeHandleApiError = async () => {
    // 當api錯誤時，會執行的內容
    // 清除所有sessionStorage與localStorage
    sessionStorage.clear()
    localStorage.clear()
    notification['error']({
      message: t('msg.login_error')
    })
    router.push({ name: 'Login' })
  }

  const resetState = () => {
    isSidebarClose.value = false
    isLoading.value = true
    currentPlatform.value = 'bbin'
  }

  const queryLobbyGames = async (lobbyId: number): Promise<ResultLobbyGames[] | undefined> => {
    try {
      const response = await apiLobbyGames({
        lobby_id: lobbyId
      })
      const { result } = response

      if (result === 'success') {
        return response.ret
      } else {
        throw new Error()
      }
    } catch (err) {
      console.error(err)
      if (axios.isAxiosError(err)) {
        const status = err.response?.status
        if (status === 401) {
          // token 錯誤，登出
          storeHandleApiError()
        } else if (status === 403) {
          // 沒有權限
          notification['error']({
            message: t('msg.no_permission')
          })
        } else {
          // query failed
          notification['error']({
            message: t('msg.query_failed')
          })
        }
      } else {
        // query failed
        notification['error']({
          message: t('msg.query_failed')
        })
      }
    }
  }

  return {
    isSidebarClose,
    isLoading,
    currentPlatform,
    storeHandleApiError,
    resetState,
    queryLobbyGames
  }
})
