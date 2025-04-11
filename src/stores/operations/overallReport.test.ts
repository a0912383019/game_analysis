import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useOperationsOverallReportStore } from '@/stores/operations/overallReport'
import dayjs from '@/utils/appDayjs'

describe('useOperationsOverallReportStore', () => {
  let operationsOverallReportStore: ReturnType<typeof useOperationsOverallReportStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    operationsOverallReportStore = useOperationsOverallReportStore()
  })

  // 測試預設值是否正確
  it('initializes with correct values', () => {
    expect(operationsOverallReportStore.searchParams.hallValue).toBe(0)
    expect(operationsOverallReportStore.searchParams.memberType).toBe('')
    expect(operationsOverallReportStore.searchParams.memberValue).toEqual([])
    expect(operationsOverallReportStore.searchParams.gamePlayValue).toBeUndefined()
    expect(operationsOverallReportStore.searchParams.deviceTypeValue).toBeUndefined()
    expect(operationsOverallReportStore.searchParams.dateDuration).toEqual([undefined, undefined])
    expect(operationsOverallReportStore.isFiltered).toBe(0)
  })

  //  測試 searchParams 的值改變時，是否正確更新
  it('updates searchParams when mutated', () => {
    // Mutate state
    operationsOverallReportStore.searchParams.hallValue = 19
    operationsOverallReportStore.searchParams.memberType = 'account'
    operationsOverallReportStore.searchParams.memberValue = ['tom']
    operationsOverallReportStore.searchParams.gamePlayValue = [
      { lobby: 1, game_code: 'gameA', serial_type: ['type1', 'type2'] },
      { lobby: 2, game_code: 'gameB', serial_type: ['type3'] },
      { lobby: 3, game_code: 'gameC' },
      { lobby: 4 }
    ]
    operationsOverallReportStore.searchParams.deviceTypeValue = 6
    operationsOverallReportStore.searchParams.dateDuration = [undefined, dayjs('2025-01-01')]
    operationsOverallReportStore.isFiltered = 2

    // Assert mutated values
    expect(operationsOverallReportStore.searchParams.hallValue).toBe(19)
    expect(operationsOverallReportStore.searchParams.memberType).toBe('account')
    expect(operationsOverallReportStore.searchParams.memberValue).toEqual(['tom'])
    expect(operationsOverallReportStore.searchParams.gamePlayValue).toEqual([
      { lobby: 1, game_code: 'gameA', serial_type: ['type1', 'type2'] },
      { lobby: 2, game_code: 'gameB', serial_type: ['type3'] },
      { lobby: 3, game_code: 'gameC' },
      { lobby: 4 }
    ])
    expect(operationsOverallReportStore.searchParams.deviceTypeValue).toBe(6)
    expect(operationsOverallReportStore.searchParams.dateDuration).toEqual([
      undefined,
      dayjs('2025-01-01')
    ])
    expect(operationsOverallReportStore.isFiltered).toBe(2)
  })
})
