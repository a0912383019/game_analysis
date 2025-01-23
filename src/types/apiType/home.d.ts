interface QuerySmallBoxDataParams {
  hall_name: string
  search_date: string
}

interface Metrics {
  growth: string // 增長率，字串格式
  month_avg: string // 月均值，字串格式
  week_avg: string // 周均值，字串格式
}

interface ResultSmallBoxData {
  active_people?: Metrics // 活躍人數相關數據
  bet_amount?: Metrics // 投注金額相關數據
  payoff?: Metrics // 盈虧相關數據
  premium_amount?: Metrics // 保費金額相關數據
}

interface AddUserParams {
  email: string
  user_type: number
  user_status: number
  access_hall_name: string
}