import { apiGet } from './axiosGoInstance'

// 首頁
// 取得遊戲大類報表數值
export const apiGetGameReportByLobbyGroup = (params: ParamsGameReportByLobbyGroup) => {
  return apiGet<ParamsGameReportByLobbyGroup, ResultGameReportByLobbyGroup[]>(
    '/api/auth/stats/game_report/by_lobby_group',
    params
  )
}

// 取得營運趨勢圖及數值
export const apiGetGameReportTrend = (params: ParamsGameReportTrend) => {
  return apiGet<ParamsGameReportTrend, ResultGameReportTrend>(
    '/api/auth/stats/game_report/trend',
    params
  )
}

// 取得遊玩(組合/流向)分析
export const apiGetOperationGameAnalysis = (params: ParamsOperationGameAnalysis) => {
  return apiGet<ParamsOperationGameAnalysis, ResultOperationGameAnalysis>(
    '/api/auth/operation/game_analysis',
    params
  )
}
