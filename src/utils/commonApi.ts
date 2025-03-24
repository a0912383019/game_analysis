import { i18n } from '@/global/i18n'
import { apiLobbyGames } from '@/api'
import { notification } from 'ant-design-vue'
import { useGlobalStore } from '@/stores'

export const queryLobbyGames = async (lobbyId: number): Promise<ResultLobbyGames[] | undefined> => {
  const { t } = i18n.global

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
        useGlobalStore().storeHandleApiError()
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
