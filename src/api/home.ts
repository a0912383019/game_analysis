import { apiGet } from './axiosGoInstance'
import {
  mockGameReportByTarget,
  mockGameReportTrend,
  mockOperationGameAnalysisCombination,
  mockOperationGameAnalysisFlow,
  mockSmartDisplays
} from '@/api/mock/home'

const useMock = import.meta.env.VITE_ENV === 'local'

// 首頁
// 取得遊戲大類報表數值
export const apiGetGameReportByTarget = (params: ParamsGameReportByTarget) => {
  if (useMock) {
    return new Promise<ApiResponse<ResultGameReportByTarget[]>>((resolve) => {
      setTimeout(() => resolve(mockGameReportByTarget), 300)
    })
  }

  return apiGet<ParamsGameReportByTarget, ResultGameReportByTarget[]>(
    '/api/auth/stats/game_report/by_target',
    params
  )
}

// 取得營運趨勢圖及數值
export const apiGetGameReportTrend = (params: ParamsGameReportTrend) => {
  if (useMock) {
    return new Promise<ApiResponse<ResultGameReportTrend>>((resolve) => {
      setTimeout(() => resolve(mockGameReportTrend), 300)
    })
  }

  return apiGet<ParamsGameReportTrend, ResultGameReportTrend>(
    '/api/auth/stats/game_report/trend',
    params
  )
}

// 取得遊玩(組合/流向)分析
export const apiGetOperationGameAnalysis = (params: ParamsOperationGameAnalysis) => {
  if (useMock && params.analysis_type === 'combination') {
    return new Promise<ApiResponse<ResultOperationGameAnalysis>>((resolve) => {
      setTimeout(() => resolve(mockOperationGameAnalysisCombination), 300)
    })
  }

  if (useMock && params.analysis_type === 'flow') {
    return new Promise<ApiResponse<ResultOperationGameAnalysis>>((resolve) => {
      setTimeout(() => resolve(mockOperationGameAnalysisFlow), 300)
    })
  }

  return apiGet<ParamsOperationGameAnalysis, ResultOperationGameAnalysis>(
    '/api/auth/operation/game_analysis',
    params
  )
}

// 取得遊戲智能訊息
export const apiGetSmartDisplays = (params: ParamsSmartDisplays) => {
  if (useMock) {
    return new Promise<ApiResponse<ResultSmartDisplays[]>>((resolve) => {
      setTimeout(() => resolve(mockSmartDisplays), 300)
    })
  }

  return apiGet<ParamsSmartDisplays, ResultSmartDisplays[]>('/api/auth/smart_displays', params)
}
