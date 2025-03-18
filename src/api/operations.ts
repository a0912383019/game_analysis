// 營運中心
import { apiGet } from './axiosGoInstance'

// 會員注單查詢 [注單]
export const apiBetRecords = (params: ParamsBetRecords) => {
  return apiGet<ParamsBetRecords, ResultBetRecords[]>('/api/auth/operation/bet/records', params)
}

// 會員注單查詢 [結算日期]
export const apiBetSettledByDate = (params: ParamsBetSettledByDate) => {
  return apiGet<ParamsBetSettledByDate, ResultBetSettledByDate[]>(
    '/api/auth/operation/bet/settled/by_date',
    params
  )
}
