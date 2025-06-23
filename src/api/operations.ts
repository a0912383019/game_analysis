// 營運中心
import { apiGet, apiPost } from './axiosGoInstance'
import {
  mockBetReportByGame,
  mockBetReportByHall,
  mockBetReportByLobby,
  mockBetReportByUser,
  mockBetReportLiveBySerialType,
  mockBetReportByDate,
  mockBetRecords,
  mockBetSettledByDate
} from '@/api/mock/operations'

const useMock = import.meta.env.VITE_ENV === 'local'

// 總報表
// 取得投注報表（by 遊戲）
export const apiBetReportByGame = (params: ParamsBetReport) => {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBetReportByGame), 300)
    })
  }

  return apiPost<ParamsBetReport, ResultBetReportByGame>(
    '/api/auth/operation/bet_report/by_game',
    params
  )
}

// 取得投注報表（by 廳主）
export const apiBetReportByHall = (params: ParamsBetReport) => {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBetReportByHall), 300)
    })
  }

  return apiPost<ParamsBetReport, ResultBetReportByHall>(
    '/api/auth/operation/bet_report/by_hall',
    params
  )
}

// 取得投注報表（by 遊戲大廳）
export const apiBetReportByLobby = (params: ParamsBetReport) => {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBetReportByLobby), 300)
    })
  }

  return apiPost<ParamsBetReport, ResultBetReportByLobby>(
    '/api/auth/operation/bet_report/by_lobby',
    params
  )
}

// 取得投注報表（by 會員）
export const apiBetReportByUser = (params: ParamsBetReport) => {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBetReportByUser), 300)
    })
  }

  return apiPost<ParamsBetReport, ResultBetReportByUser>(
    '/api/auth/operation/bet_report/by_user',
    params
  )
}

// 取得視訊投注報表（by 遊戲玩法）
export const apiBetReportLiveBySerialType = (params: ParamsBetReport) => {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBetReportLiveBySerialType), 300)
    })
  }

  return apiPost<ParamsBetReport, ResultBetReportLiveBySerialType>(
    '/api/auth/operation/bet_report/live/by_serial_type',
    params
  )
}

// 取得投注報表（by 日期）
export const apiBetReportByDate = (params: ParamsBetReport) => {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBetReportByDate), 300)
    })
  }

  return apiPost<ParamsBetReport, ResultBetReportByDate>(
    '/api/auth/operation/bet_report/by_date',
    params
  )
}

// 會員注單查詢 [注單]
export const apiBetRecords = (params: ParamsBetRecords) => {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBetRecords), 300)
    })
  }

  return apiGet<ParamsBetRecords, ResultBetRecords>('/api/auth/operation/bet/records', params)
}

// 會員注單查詢 [結算日期]
export const apiBetSettledByDate = (params: ParamsBetSettledByDate) => {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBetSettledByDate), 300)
    })
  }

  return apiGet<ParamsBetSettledByDate, ResultBetSettledByDate>(
    '/api/auth/operation/bet/settled/by_date',
    params
  )
}
