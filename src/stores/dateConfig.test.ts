import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDateStore } from '@/stores'
import dayjs from '@/utils/appDayjs'

describe('useDateStore', () => {
  // 模擬當前時間
  const mockNow = new Date('2024-12-31 00:00:00')
  const today = dayjs(mockNow)
  const yesterday = today.subtract(1, 'day')

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
    vi.setSystemTime(mockNow)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // 測試 dateRangeConfig1 對應的結果是否正確
  it('should return correct date ranges and labels in dateRangeConfig1', () => {
    const store = useDateStore()
    const expectedConfig1 = [
      { label: '今天', value: [today, today] },
      { label: '昨天', value: [yesterday, yesterday] },
      { label: '前7天', value: [today.subtract(7, 'day'), yesterday] },
      { label: '本週', value: [today.startOf('week'), today] },
      {
        label: '上週',
        value: [today.startOf('week').subtract(7, 'day'), today.startOf('week').subtract(1, 'day')]
      },
      { label: '前30天', value: [today.subtract(30, 'day'), yesterday] },
      { label: '本月', value: [today.startOf('month'), today] },
      {
        label: '上月',
        value: [
          today.startOf('month').subtract(1, 'month'),
          today.startOf('month').subtract(1, 'day')
        ]
      }
    ]
    expect(store.dateRangeConfig1).toEqual(expectedConfig1)
  })

  // 測試 dateRangeConfig2 對應的結果是否正確
  it('should return correct date ranges and labels in dateRangeConfig2', () => {
    const store = useDateStore()
    const expectedConfig2 = [
      { label: '前7天', value: [today.subtract(7, 'day'), yesterday] },
      { label: '本週', value: [today.startOf('week'), today] },
      {
        label: '上週',
        value: [today.startOf('week').subtract(7, 'day'), today.startOf('week').subtract(1, 'day')]
      }
    ]
    expect(store.dateRangeConfig2).toEqual(expectedConfig2)
  })
})
