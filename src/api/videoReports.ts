// 視訊報表
import { apiGet, apiPost } from './axiosGoInstance'
import {
  mockLiveStates,
  mockLiveTableReportsByState,
  mockLiveTableReportsByTable
} from '@/api/mock/videoReports'

const useMock = import.meta.env.VITE_ENV === 'dev'

// 視訊列表
export const apiLiveStates = (params: ParamsLiveStates) => {
  if (useMock) {
    return new Promise<ApiResponse<ResultLiveStates[]>>((resolve) => {
      setTimeout(() => resolve(mockLiveStates), 300)
    })
  }

  return apiGet<ParamsLiveStates, ResultLiveStates[]>('/api/auth/live/states', params)
}

// 視訊現場
export const apiLiveTableReportsByState = (params: ParamsLiveTableReportsByState) => {
  if (useMock) {
    return new Promise<ApiResponse<ResultLiveTableReportsByState>>((resolve) => {
      setTimeout(() => resolve(mockLiveTableReportsByState), 300)
    })
  }

  return apiPost<ParamsLiveTableReportsByState, ResultLiveTableReportsByState>(
    '/api/auth/live/table_report/by_state',
    params
  )
}

export const apiLiveTableReportsByTable = (params: ParamsLiveTableReportsByTable) => {
  if (useMock) {
    return new Promise<ApiResponse<ResultLiveTableReportsByTable>>((resolve) => {
      setTimeout(() => resolve(mockLiveTableReportsByTable), 300)
    })
  }

  return apiPost<ParamsLiveTableReportsByTable, ResultLiveTableReportsByTable>(
    '/api/auth/live/table_report/by_table',
    params
  )
}
