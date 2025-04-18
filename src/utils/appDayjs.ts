import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/zh-tw'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('zh-tw')

// 平台 → 時區 & 跨日時間點（以台灣時間為準）
const platformConfigs: Record<
  string,
  {
    daySwitchHour: number // 幾點跨日 (以台灣時間為準)
  }
> = {
  bbin: { daySwitchHour: 12 },
  bbgp: { daySwitchHour: 12 },
  xc_tw: { daySwitchHour: 0 },
  xc_my: { daySwitchHour: 0 },
  midori: { daySwitchHour: 6 }
}

// 取得平台轉換後的當日時間（已處理跨日）
export const getPlatformToday = (platform: string, date: Dayjs = dayjs()): Dayjs => {
  const config = platformConfigs[platform.toLowerCase()]
  if (!config) return date

  const taiwanTime = date.tz('Asia/Taipei')
  const switchTime = taiwanTime.startOf('day').add(config.daySwitchHour, 'hour')

  // 若時間早於跨日時間，視為前一天
  const baseTime = taiwanTime.isBefore(switchTime) ? taiwanTime.subtract(1, 'day') : taiwanTime

  return baseTime
}

export type { Dayjs as AppDayjs } from 'dayjs'
export default dayjs
