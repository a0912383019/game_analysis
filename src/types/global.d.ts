import type { AppDayjs } from '@/utils/appDayjs'

declare global {
  namespace globalThis {
    type Dayjs = AppDayjs
  }
}
