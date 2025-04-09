import { it, describe, expect, afterEach, vi, beforeEach } from 'vitest'
import {
  roundDecimal,
  formatNumber,
  getSessionStorageEntity,
  formatToApiTime,
  formatToApiDate,
  formatByTimeZone,
  formatToPercentage,
  formatNumberWithK
} from '@/utils/commonUtils'
import { useGlobalStore } from '@/stores'
import { createTestingPinia } from '@pinia/testing'

vi.mock('@/../public/js/system_config', () => ({
  platformTimezones: {
    bbin: 'America/New_York',
    xctw: 'Asia/Taipei'
  }
}))

describe('commonUtils', () => {
  let globalStore: ReturnType<typeof useGlobalStore>

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    globalStore = useGlobalStore()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('roundDecimal', async () => {
    const result1 = roundDecimal('187.22387', 3)
    expect(result1).toStrictEqual('187.224')

    const result2 = roundDecimal('-22.456', 1)
    expect(result2).toStrictEqual('-22.5')

    const result3 = roundDecimal('-20.500', 0)
    expect(result3).toStrictEqual('-21')

    const result4 = roundDecimal('-20.510')
    expect(result4).toStrictEqual('-20.51')
  })

  it('formatNumber', () => {
    const result1 = formatNumber('23187.00')
    expect(result1).toStrictEqual('23,187')

    const result2 = formatNumber('23187.27', 1)
    expect(result2).toStrictEqual('23,187.3')

    const result3 = formatNumber('23187.002', 1)
    expect(result3).toStrictEqual('23,187')

    const result4 = formatNumber('23187.000246')
    expect(result3).toStrictEqual('23,187')
  })

  it('getSessionStorageEntity', () => {
    const key = 'user_info'
    const user_info = {
      user_name: 'BI-Yu',
      picture: 'https://lyudd.mm.mw'
    }
    sessionStorage.setItem(key, JSON.stringify(user_info))

    const result = getSessionStorageEntity(key)
    expect(result).toEqual(user_info)
  })

  it('formatToApiTime', () => {
    globalStore.currentPlatform = 'xctw'
    const inputTime = '2024-03-09 00:00:00'
    const result1 = formatToApiTime(inputTime)
    expect(result1).toStrictEqual('2024-03-09T00:00:00+08:00')

    globalStore.currentPlatform = 'bbin'
    const result2 = formatToApiTime(inputTime)
    expect(result2).toStrictEqual('2024-03-09T00:00:00-05:00')
  })

  it('formatToApiDate', () => {
    const result1 = formatToApiDate('2024/03/09')
    expect(result1).toStrictEqual('2024-03-09')

    const result2 = formatToApiDate('03/09/2011')
    expect(result2).toStrictEqual('2011-03-09')
  })

  it('formatByTimeZone', () => {
    globalStore.currentPlatform = 'xctw'
    const inputTime = '2024-03-09T00:00:00-04:00'
    const result1 = formatByTimeZone(inputTime).format('YYYY-MM-DD HH:mm:ss')
    expect(result1).toStrictEqual('2024-03-09 12:00:00')

    globalStore.currentPlatform = 'bbin'
    const result2 = formatByTimeZone(inputTime).format('YYYY-MM-DD HH:mm:ss')
    expect(result2).toStrictEqual('2024-03-08 23:00:00')
  })

  it('formatToPercentage', () => {
    const result1 = formatToPercentage(null)
    expect(result1).toStrictEqual('--')

    const result2 = formatToPercentage('456.8812')
    expect(result2).toStrictEqual('45,688.12%')

    const result3 = formatToPercentage('96.8817', 1)
    expect(result3).toStrictEqual('9,688.2%')
  })

  it('formatNumberWithK', () => {
    const result1 = formatNumberWithK(82939482)
    expect(result1).toStrictEqual('82,939.48k')

    const result2 = formatNumberWithK('450026.8812')
    expect(result2).toStrictEqual('450.03k')

    const result3 = formatNumberWithK('926.8817', 1)
    expect(result3).toStrictEqual('926.9')
  })
})
