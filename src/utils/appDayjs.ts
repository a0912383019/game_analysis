import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/zh-tw'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('zh-tw')

export type { Dayjs as AppDayjs } from 'dayjs'
export default dayjs
