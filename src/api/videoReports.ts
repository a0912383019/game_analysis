// 視訊報表
import { apiGet, apiPost } from './axiosGoInstance'

// 視訊列表
export const apiLiveStates = (params: ParamsLiveStates) => {
  return apiGet<ParamsLiveStates, ResultLiveStates[]>('/api/auth/live/states', params)
}

// 視訊現場
export const apiLiveTableReportsByState = (params: ParamsLiveTableReportsByState) => {
  return apiPost<ParamsLiveTableReportsByState, ResultLiveTableReportsByState>(
    '/api/auth/live/table_report/by_state',
    params
  )
}
