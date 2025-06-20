interface ParamsGameReportByTarget {
  date: string
  target?: number
}

interface ResultGameReportByTarget {
  bet_amount: string
  target: number
  payoff: string
  user_count: number
  wager_count: number
}

interface ParamsGameReportTrend {
  start_date: string
  end_date: string
}

interface GameReportTrend {
  bet_amount: string
  data_date: string
  first_play_count: number
  loss_count: number
  payoff: string
  target_id: number
  target_name: string
  users_count: number
}

interface GameReportTrendDaily {
  data_date: string
  first_play_count: number
  loss_count: number
  payoff: string
  users_count: number
  bet_amount: string
}

interface GameReportTrendTarget {
  first_play_count: number
  loss_count: number
  payoff: string
  target_id: number
  bet_amount: string
  target_name: string
  users_count: number
}

interface GameReportTrendOverall {
  bet_amount: string
  first_play_count: number
  loss_count: number
  payoff: string
  users_count: number
  target_id?: number
  target_name?: string
}

interface GameReportTrendTotal {
  by_daily: GameReportTrendDaily[]
  by_target: GameReportTrendTarget[]
  overall: GameReportTrendOverall
}

interface ResultGameReportTrend {
  data: GameReportTrend[]
  total: GameReportTrendTotal
}

interface ParamsOperationGameAnalysis extends Required<BasePaginationParams> {
  analysis_type: 'combination' | 'flow'
  data_date: string
  target_types: string
}

interface OperationGameAnalysis {
  bet_amount: string
  comprehensive_rtp: string
  content: string
  payoff: string
  user_count: number
  user_count_ratio: string
}

interface ResultOperationGameAnalysis {
  data: OperationGameAnalysis[]
  records_total: number
}

interface ParamsSmartDisplays {
  start_date: string
  end_date: string
  target?: number
}

interface ResultSmartDisplays {
  alert_id: string
  alert_message: string
  alert_type_id: number
  data_date: string
  target_id: number
}
