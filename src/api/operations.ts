// 營運中心
import { apiGet, apiPost } from './axiosGoInstance'

// 總報表
// 取得投注報表（by 遊戲）
export const apiBetReportByGame = (params: ParamsBetReport) => {
  return apiPost<ParamsBetReport, ResultBetReportByGame>(
    '/api/auth/operation/bet_report/by_game',
    params
  )
}

// 取得投注報表（by 廳主）
export const apiBetReportByHall = (params: ParamsBetReport) => {
  return apiPost<ParamsBetReport, ResultBetReportByHall>(
    '/api/auth/operation/bet_report/by_hall',
    params
  )
}

// 取得投注報表（by 遊戲大廳）
export const apiBetReportByLobby = (params: ParamsBetReport) => {
  return apiPost<ParamsBetReport, ResultBetReportByLobby>(
    '/api/auth/operation/bet_report/by_lobby',
    params
  )
}

// 取得投注報表（by 會員）
export const apiBetReportByUser = (params: ParamsBetReport) => {
  return apiPost<ParamsBetReport, ResultBetReportByUser>(
    '/api/auth/operation/bet_report/by_user',
    params
  )
}

// 取得視訊投注報表（by 遊戲玩法）
export const apiBetReportLiveBySerialType = (params: ParamsBetReport) => {
  return apiPost<ParamsBetReport, ResultBetReportLiveBySerialType>(
    '/api/auth/operation/bet_report/live/by_serial_type',
    params
  )
}

// 會員注單查詢 [注單]
export const apiBetRecords = (params: ParamsBetRecords) => {
  return apiGet<ParamsBetRecords, ResultBetRecords>('/api/auth/operation/bet/records', params)
}

// 會員注單查詢 [結算日期]
export const apiBetSettledByDate = (params: ParamsBetSettledByDate) => {
  return apiGet<ParamsBetSettledByDate, ResultBetSettledByDate>(
    '/api/auth/operation/bet/settled/by_date',
    params
  )
}
