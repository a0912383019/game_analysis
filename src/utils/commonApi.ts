import { apiLobbyGames } from '@/api'
import { handleApiError } from '@/utils/commonUtils'

export const queryLobbyGames = async (lobbyId: number): Promise<ResultLobbyGames[] | undefined> => {
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
    handleApiError(err)
  }
}
