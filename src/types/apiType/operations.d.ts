interface ParamsBet extends BasePaginationParams {
  hall_id: number
  lobby: number
  game_code: string[]
  user_id: string[]
  username: string[]
}

// 會員注單查詢-注單參數
interface ParamsBetRecords extends ParamsBet {
  start_time: string
  end_time: string
}

interface BetRecords {
  bet_amount: string
  bet_time: string
  game_code: string
  game_name: string
  hall_id: number
  lobby: number
  lobby_name: string
  payoff: string
  payoff_ratio: string | null
  result: number
  user_id: string
  username: string
  wager_id: string
}

interface ResultBetRecords {
  data: BetRecords[]
  records_total: number
}

// 會員注單查詢-結算日期參數
interface ParamsBetSettledByDate extends ParamsBet {
  start_date: string
  end_date: string
}

interface BetSettledByDate {
  bet_amount: string
  game_code: string
  game_name: string
  hall_id: number
  lobby: number
  lobby_name: string
  payoff: string
  payoff_ratio: string
  settle_date: string
  user_id: string
  username: string
}

interface ResultBetSettledByDate {
  data: BetSettledByDate[]
  records_total: number
}

interface Game {
  game_code?: string
  lobby: number
  serial_type?: string[]
}

// 總報表參數
interface ParamsBetReport extends BasePaginationParams {
  device?: number[]
  end_date: string
  game?: Game[]
  hall_id?: number
  start_date: string
  user_id?: string[]
  username?: string[]
}

interface BetReportByGame {
  base_lose_wager_count: number
  base_win_wager_count: number
  bet_amount: string
  free_lose_wager_count: number
  free_win_wager_count: number
  game_code: string
  game_name: string
  lobby: number
  lobby_name: string
  payoff: string
  payoff_ratio: string
  rtp: string
  expected_rtp: string
  user_count: number
  wager_count: number
  win_ratio: string
}

interface ResultBetReportByGame {
  data: BetReportByGame[]
  records_total: number
}

interface BetReportByHall {
  base_lose_wager_count: number
  base_win_wager_count: number
  bet_amount: string
  free_lose_wager_count: number
  free_win_wager_count: number
  hall_id: number
  hall_name: string
  login_code: string
  payoff: string
  payoff_ratio: string
  rtp: string
  user_count: number
  wager_count: number
  win_ratio: string
}

interface ResultBetReportByHall {
  data: BetReportByHall[]
  records_total: number
}

interface BetReportByLobby {
  bet_amount: string
  lobby: number
  lobby_name: string
  payoff: string
  payoff_ratio: string
  user_count: number
  wager_count: number
}

interface ResultBetReportByLobby {
  data: BetReportByLobby[]
  records_total: number
}

interface BetReportByUser {
  bet_amount: string
  payoff: string
  payoff_ratio: string
  user_id: string
  user_name: string
  wager_count: number
  base_lose_wager_count: number
  base_win_wager_count: number
  free_lose_wager_count: number
  free_win_wager_count: number
  win_ratio: string
  rtp: string
}

interface ResultBetReportByUser {
  data: BetReportByUser[]
  records_total: number
}

interface BetReportLiveBySerialType {
  bet_amount: string
  expected_rtp: string
  game_code: string
  game_name: string
  lobby: number
  lobby_name: string
  odds: string
  payoff: string
  payoff_ratio: string
  rtp: string
  serial_type: string
  serial_type_name: string
  serial_type_payoff_ratio: string
  serial_type_wager_count_ratio: string
  user_count: number
  wager_count: number
}

interface ResultBetReportLiveBySerialType {
  data: BetReportLiveBySerialType[]
  records_total: number
}

interface BetReportByDate {
  bet_amount: string
  data_date: string
  payoff: string
  payoff_ratio: string
  user_count: number
  wager_count: number
}

interface ResultBetReportByDate {
  data: BetReportByDate[]
  records_total: number
}
