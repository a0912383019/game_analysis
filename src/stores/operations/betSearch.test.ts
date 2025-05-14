import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useOperationsBetSearchStore } from '@/stores/operations/betSearch'
import dayjs from '@/utils/appDayjs'

describe('useOperationsBetSearchStore', () => {
  let operationsBetSearchStore: ReturnType<typeof useOperationsBetSearchStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    operationsBetSearchStore = useOperationsBetSearchStore()
  })

  // 測試預設值是否正確
  it('initializes with correct values', () => {
    expect(operationsBetSearchStore.searchParams.hallValue).toBeUndefined()
    expect(operationsBetSearchStore.searchParams.memberType).toBe('')
    expect(operationsBetSearchStore.searchParams.memberValue).toEqual([])
    expect(operationsBetSearchStore.searchParams.lobbyValue).toBeUndefined()
    expect(operationsBetSearchStore.searchParams.gameValue).toEqual([])
    expect(operationsBetSearchStore.searchParams.searchTypeValue).toBe('')
    expect(operationsBetSearchStore.searchParams.timeDuration).toEqual([undefined, undefined])
    expect(operationsBetSearchStore.searchParams.dateDuration).toEqual([undefined, undefined])
    expect(operationsBetSearchStore.isFiltered).toBe(0)
  })

  //  測試 searchParams 的值改變時，是否正確更新
  it('updates searchParams when mutated', () => {
    // Mutate state
    operationsBetSearchStore.searchParams.hallValue = 19
    operationsBetSearchStore.searchParams.memberType = 'account'
    operationsBetSearchStore.searchParams.memberValue = ['tom']
    operationsBetSearchStore.searchParams.lobbyValue = 5
    operationsBetSearchStore.searchParams.gameValue = ['Slot']
    operationsBetSearchStore.searchParams.searchTypeValue = 'settlement_date'
    operationsBetSearchStore.searchParams.timeDuration = [dayjs('2025-01-01 00:00:00'), undefined]
    operationsBetSearchStore.searchParams.dateDuration = [undefined, dayjs('2025-01-01')]
    operationsBetSearchStore.isFiltered = 2

    // Assert mutated values
    expect(operationsBetSearchStore.searchParams.hallValue).toBe(19)
    expect(operationsBetSearchStore.searchParams.memberType).toBe('account')
    expect(operationsBetSearchStore.searchParams.memberValue).toEqual(['tom'])
    expect(operationsBetSearchStore.searchParams.lobbyValue).toBe(5)
    expect(operationsBetSearchStore.searchParams.gameValue).toEqual(['Slot'])
    expect(operationsBetSearchStore.searchParams.searchTypeValue).toBe('settlement_date')
    expect(operationsBetSearchStore.searchParams.timeDuration).toEqual([
      dayjs('2025-01-01 00:00:00'),
      undefined
    ])
    expect(operationsBetSearchStore.searchParams.dateDuration).toEqual([
      undefined,
      dayjs('2025-01-01')
    ])
    expect(operationsBetSearchStore.isFiltered).toBe(2)
  })
})
