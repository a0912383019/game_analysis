import { apiGet } from './axiosGoInstance'

// 首頁
// 取得遊戲大類報表數值
export const apiGetGameReportByLobbyGroup = (params: ParamsGameReportByLobbyGroup) => {
  return apiGet<ParamsGameReportByLobbyGroup, ResultGameReportByLobbyGroup[]>(
    '/api/auth/stats/game_report/by_lobby_group',
    params
  )
}
