import { describe, it, expect } from 'vitest'
import dayjs from '@/utils/appDayjs'

describe('appDayjs', () => {
  it('dayjs 是否支援 tz', () => {
    const now = dayjs.tz('2024-06-08', 'America/New_York').format('Z') // 取得時區偏移量
    expect(now).toBe('-04:00')
  })
})
