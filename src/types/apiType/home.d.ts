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
