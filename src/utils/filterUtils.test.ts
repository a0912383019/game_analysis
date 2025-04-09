import { it, describe, expect, afterEach, vi, beforeEach, Mock } from 'vitest'
import {
  loadData,
  dateDurationRule,
  timeDurationRule,
  memberValueRule,
  tidyMember,
  generateGamePlayParam
} from '@/utils/filterUtils'
import { queryLobbyGames } from '@/utils/commonApi'
import dayjs from '@/utils/appDayjs'
import { useGlobalStore } from '@/stores'
import { createTestingPinia } from '@pinia/testing'

vi.mock('@/utils/commonApi', () => ({
  queryLobbyGames: vi.fn()
}))

describe('filterUtils', () => {
  let globalStore: ReturnType<typeof useGlobalStore>

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    globalStore = useGlobalStore()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('loadData', async () => {
    // should return when targetOption.children exists
    const selectedOptions1 = [{ value: 1, children: [{ label: 'test', value: 'test' }] }]
    await loadData(selectedOptions1)
    expect(queryLobbyGames).not.toHaveBeenCalled()

    const mockQueryLobbyGames = queryLobbyGames as Mock
    mockQueryLobbyGames.mockResolvedValueOnce([
      {
        game_code: '5001',
        game_name: '水果拉霸',
        enable: 0,
        serial_info: []
      },
      {
        game_code: '5002',
        game_name: '撲克拉霸',
        enable: 0,
        serial_info: []
      }
    ])

    // should call queryLobbyGames and load data
    const selectedOptions2 = [{ value: 1, loading: false }]
    await loadData(selectedOptions2)
    expect(queryLobbyGames).toHaveBeenCalledTimes(1)
    expect(selectedOptions2[0]).toStrictEqual({
      children: [
        {
          children: undefined,
          isLeaf: true,
          label: '水果拉霸',
          value: '5001'
        },
        {
          children: undefined,
          isLeaf: true,
          label: '撲克拉霸',
          value: '5002'
        }
      ],
      loading: false,
      value: 1
    })

    mockQueryLobbyGames.mockResolvedValueOnce([
      {
        game_code: '3026',
        game_name: '區塊鏈龍虎鬥',
        enable: 1,
        serial_info: [
          {
            serial_type: 1,
            serial_name: '虎'
          },
          {
            serial_type: 2,
            serial_name: '龍'
          },
          {
            serial_type: 3,
            serial_name: '和'
          }
        ]
      }
    ])

    // should have serial node when targetOption.value = 3
    const selectedOptions3 = [{ value: 3, loading: false }]
    await loadData(selectedOptions3)
    expect(queryLobbyGames).toHaveBeenCalledTimes(2)
    expect(selectedOptions3[0]).toStrictEqual({
      children: [
        {
          children: [
            {
              label: '虎',
              value: '3026-1'
            },
            {
              label: '龍',
              value: '3026-2'
            },
            {
              label: '和',
              value: '3026-3'
            }
          ],
          isLeaf: false,
          label: '區塊鏈龍虎鬥',
          value: '3026'
        }
      ],
      loading: false,
      value: 3
    })
  })

  it('dateDurationRule', async () => {
    await expect(dateDurationRule({}, undefined as any)).rejects.toBe('請選擇完整的日期區間')
    await expect(dateDurationRule({}, [dayjs(), dayjs().add(1, 'day')])).resolves.toBeUndefined()
  })

  it('timeDurationRule', async () => {
    await expect(timeDurationRule({}, undefined as any)).rejects.toBe('請選擇完整的時間區間')
    await expect(timeDurationRule({}, [dayjs(), dayjs().add(1, 'day')])).resolves.toBeUndefined()
  })

  it('memberValueRule', async () => {
    await expect(memberValueRule({}, '', 'account')).resolves.toBeUndefined()

    globalStore.currentPlatform = 'xctw'
    await expect(memberValueRule({}, 'invalid@input', 'account')).resolves.toBeUndefined()

    globalStore.currentPlatform = 'midori'
    await expect(memberValueRule({}, 'abc123,xyz789', 'account')).resolves.toBeUndefined()
    await expect(memberValueRule({}, '123,456,789', 'memberId')).resolves.toBeUndefined()
    await expect(memberValueRule({}, 'abc123,xyz@789', 'account')).rejects.toBe(
      '請輸入英文或數字,多筆查詢以逗號分隔'
    )
    await expect(memberValueRule({}, '123,abc,789', 'memberId')).rejects.toBe(
      '會員ID必須為數字,請確認輸入內容'
    )

    const longValue = '1,2,3,4,5,6,7,8,9,10,11'
    await expect(memberValueRule({}, longValue, 'account')).rejects.toBe('最多允許 10 個帳號')
  })

  it('tidyMember', () => {
    expect(tidyMember('  user1,user2  ')).toBe('user1,user2')
    expect(tidyMember('user1 , user2 , user3')).toBe('user1,user2,user3')
    expect(tidyMember('user1,,,user2,,user3')).toBe('user1,user2,user3')
    expect(tidyMember(' , ,, ')).toBe('')
  })

  it('generateGamePlayParam', () => {
    // should correctly transform game params
    const lobbyGame = [
      [1, 'gameA', 'type1'],
      [1, 'gameA', 'type2'],
      [2, 'gameB', 'type3'],
      [3, 'gameC'],
      [4]
    ]
    const expectedParam = [
      { lobby: 1, game_code: 'gameA', serial_type: ['type1', 'type2'] },
      { lobby: 2, game_code: 'gameB', serial_type: ['type3'] },
      { lobby: 3, game_code: 'gameC' },
      { lobby: 4 }
    ]

    expect(generateGamePlayParam(lobbyGame)).toStrictEqual(expectedParam)

    // should return [] when input []
    expect(generateGamePlayParam([])).toStrictEqual([])
  })
})
