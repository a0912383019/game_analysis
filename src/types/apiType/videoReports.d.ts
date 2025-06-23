interface ParamsLiveStates {
  state?: number
}

interface LiveStatesTableData {
  table_id: string
  table_name: string
  table_no: number
}

interface ResultLiveStates {
  state: number
  state_name: string
  table_data: LiveStatesTableData[]
}

interface ParamsLiveTableReportsByState {
  end_date: string
  game_code: string[]
  hall_id?: number
  order?: string
  sort?: string
  start_date: string
  table_id?: string[]
}

interface LiveTableReportsByStateItem {
  bet_amount: string
  payoff: string
  payoff_ratio: string
  state: number
  state_name: string
  user_count: number
  wagers_total: number
}

interface ResultLiveTableReportsByState {
  data: ReportItem[]
  total: Omit<LiveTableReportsByStateItem, 'state' | 'state_name'>
}

interface ParamsLiveTableReportsByTable {
  end_date: string
  game_code: string[]
  hall_id?: number
  order?: string
  sort?: string
  start_date: string
  state: number
  table_id?: string[]
}

interface LiveTableReportsBytableItem {
  bet_amount: string
  game_name: string
  payoff: string
  payoff_ratio: string
  table_name: string
  user_count: number
  wagers_total: number
}

interface ResultLiveTableReportsByTable {
  data: LiveTableReportsBytableItem[]
}
