import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/zh-tw'

// 時區預設台北時區
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('zh-tw')
dayjs.tz.setDefault('Asia/Taipei')

export type { Dayjs } from 'dayjs'
export default dayjs
