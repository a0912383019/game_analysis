import type { AppDayjs } from '@/utils/appDayjs'

declare global {
  namespace globalThis {
    type Dayjs = AppDayjs
  }

  type LobbyGameData = (number | string)[]
  interface Game {
    game_code?: string
    lobby: number
    serial_type?: string[]
  }

  interface Pagination {
    apiStart?: number
    pageSize?: number
    total: number
    currentPage: number
  }
}
