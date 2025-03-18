interface ParamsBet extends BasePaginationParams {
  hall_id: number
  lobby: number
  game_code: string[]
  user_id: string[]
  username: string[]
}

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
  payoff_ratio: string
  result: number
  user_id: string
  username: string
  wager_id: string
}

interface ResultBetRecords {
  data: BetRecords[]
  records_total: number
}

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
