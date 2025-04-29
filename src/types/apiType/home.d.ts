interface ParamsGameReportByLobbyGroup {
  date: string
  lobby_group?: number
}

interface ResultGameReportByLobbyGroup {
  bet_amount: string
  lobby_group: number
  payoff: string
  user_count: number
  wager_count: number
}

interface ParamsGameReportTrend {
  start_date: string
  end_date: string
}

interface GameReportTrend {
  betAmount: string
  data_date: string
  first_play_count: number
  loss_count: number
  payoff: string
  target_id: number
  target_name: string
  wagers_count: number
}

interface GameReportTrendDaily {
  commissionable: string
  data_date: string
  first_play_count: number
  loss_count: number
  payoff: string
  wagers_count: number
}

interface GameReportTrendTarget {
  commissionable: string
  first_play_count: number
  loss_count: number
  payoff: string
  target_id: number
  target_name: string
  wagers_count: number
}

interface GameReportTrendOverall {
  commissionable: string
  first_play_count: number
  loss_count: number
  payoff: string
  wagers_count: number
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
