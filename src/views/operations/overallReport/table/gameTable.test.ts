import { it, describe, expect, afterEach, vi, beforeEach, Mock } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from '@/global/i18n'
import gameTable from '@/views/operations/overallReport/table/gameTable.vue'
import {
  apiBetReportByLobby, // 第一層
  apiBetReportByGame, // 第二層
  apiBetReportByHall, // 第三層
  apiBetReportByUser, // 第四層
  apiBetReportLiveBySerialType // 第五層
} from '@/api'
import { generateOverallParams, queryApi } from '@/utils/filterUtils'
import { useOperationsOverallReportStore } from '@/stores'

vi.mock('@/utils/filterUtils', () => ({
  generateOverallParams: vi.fn(),
  queryApi: vi.fn()
}))

vi.mock('@/api', () => ({
  apiBetReportByLobby: vi.fn(),
  apiBetReportByGame: vi.fn(),
  apiBetReportByHall: vi.fn(),
  apiBetReportByUser: vi.fn(),
  apiBetReportLiveBySerialType: vi.fn()
}))

describe('gameTable', () => {
  let wrapper: VueWrapper<any>
  let operationsOverallReportStore: ReturnType<typeof useOperationsOverallReportStore>

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    operationsOverallReportStore = useOperationsOverallReportStore()
    operationsOverallReportStore.isFiltered = 1
    operationsOverallReportStore.tableBaseParams = {}

    wrapper = shallowMount(gameTable, {
      global: {
        plugins: [i18n]
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('variables', () => {
    expect(wrapper.vm.columns).toStrictEqual([
      [
        {
          align: 'center',
          dataIndex: 'lobby_name',
          key: 'lobby_name',
          sorter: true,
          title: '遊戲大廳'
        },
        {
          align: 'center',
          dataIndex: 'user_count',
          key: 'user_count',
          sorter: true,
          title: '人數'
        },
        {
          align: 'center',
          dataIndex: 'wager_count',
          defaultSortOrder: 'descend',
          key: 'wager_count',
          sorter: true,
          title: '單量'
        },
        {
          align: 'center',
          dataIndex: 'bet_amount',
          key: 'bet_amount',
          sorter: true,
          title: '貨量'
        },
        {
          align: 'center',
          dataIndex: 'payoff',
          key: 'payoff',
          sorter: true,
          title: '損益'
        },
        {
          align: 'center',
          dataIndex: 'payoff_ratio',
          key: 'payoff_ratio',
          sorter: true,
          title: '獲利比'
        }
      ],
      [
        {
          align: 'center',
          dataIndex: 'game_name',
          key: 'game_name',
          sorter: true,
          title: '遊戲名稱'
        },
        {
          align: 'center',
          dataIndex: 'user_count',
          key: 'user_count',
          sorter: true,
          title: '人數'
        },
        {
          align: 'center',
          dataIndex: 'wager_count',
          defaultSortOrder: 'descend',
          key: 'wager_count',
          sorter: true,
          title: '單量'
        },
        {
          align: 'center',
          dataIndex: 'bet_amount',
          key: 'bet_amount',
          sorter: true,
          title: '貨量'
        },
        {
          align: 'center',
          dataIndex: 'payoff',
          key: 'payoff',
          sorter: true,
          title: '損益'
        },
        {
          align: 'center',
          dataIndex: 'payoff_ratio',
          key: 'payoff_ratio',
          sorter: true,
          title: '獲利比'
        },
        {
          align: 'center',
          dataIndex: 'expected_rtp',
          key: 'expected_rtp',
          sorter: true,
          title: 'RTP(理論)'
        },
        {
          align: 'center',
          dataIndex: 'rtp',
          key: 'rtp',
          sorter: true,
          title: 'RTP'
        },
        {
          align: 'center',
          dataIndex: 'base_win_wager_count',
          key: 'base_win_wager_count',
          sorter: true,
          title: 'Base贏筆數'
        },
        {
          align: 'center',
          dataIndex: 'base_lose_wager_count',
          key: 'base_lose_wager_count',
          sorter: true,
          title: 'Base輸筆數'
        },
        {
          align: 'center',
          dataIndex: 'free_win_wager_count',
          key: 'free_win_wager_count',
          sorter: true,
          title: 'Free贏筆數'
        },
        {
          align: 'center',
          dataIndex: 'free_lose_wager_count',
          key: 'free_lose_wager_count',
          sorter: true,
          title: 'Free輸筆數'
        },
        {
          align: 'center',
          dataIndex: 'win_ratio',
          key: 'win_ratio',
          sorter: true,
          title: '贏單比例'
        }
      ],
      [
        {
          align: 'center',
          dataIndex: 'hall_name',
          key: 'hall_name',
          sorter: true,
          title: '廳主名稱',
          width: 320
        },
        {
          align: 'center',
          dataIndex: 'user_count',
          key: 'user_count',
          sorter: true,
          title: '人數'
        },
        {
          align: 'center',
          dataIndex: 'wager_count',
          defaultSortOrder: 'descend',
          key: 'wager_count',
          sorter: true,
          title: '單量'
        },
        {
          align: 'center',
          dataIndex: 'bet_amount',
          key: 'bet_amount',
          sorter: true,
          title: '貨量'
        },
        {
          align: 'center',
          dataIndex: 'payoff',
          key: 'payoff',
          sorter: true,
          title: '損益'
        },
        {
          align: 'center',
          dataIndex: 'payoff_ratio',
          key: 'payoff_ratio',
          sorter: true,
          title: '獲利比'
        },
        {
          align: 'center',
          dataIndex: 'expected_rtp',
          key: 'expected_rtp',
          title: 'RTP(理論)'
        },
        {
          align: 'center',
          dataIndex: 'rtp',
          key: 'rtp',
          sorter: true,
          title: 'RTP'
        },
        {
          align: 'center',
          dataIndex: 'base_win_wager_count',
          key: 'base_win_wager_count',
          sorter: true,
          title: 'Base贏筆數'
        },
        {
          align: 'center',
          dataIndex: 'base_lose_wager_count',
          key: 'base_lose_wager_count',
          sorter: true,
          title: 'Base輸筆數'
        },
        {
          align: 'center',
          dataIndex: 'free_win_wager_count',
          key: 'free_win_wager_count',
          sorter: true,
          title: 'Free贏筆數'
        },
        {
          align: 'center',
          dataIndex: 'free_lose_wager_count',
          key: 'free_lose_wager_count',
          sorter: true,
          title: 'Free輸筆數'
        },
        {
          align: 'center',
          dataIndex: 'win_ratio',
          key: 'win_ratio',
          sorter: true,
          title: '贏單比例'
        }
      ],
      [
        {
          align: 'center',
          dataIndex: 'user',
          key: 'user',
          sorter: true,
          title: '會員帳號 (ID)'
        },
        {
          align: 'center',
          dataIndex: 'wager_count',
          defaultSortOrder: 'descend',
          key: 'wager_count',
          sorter: true,
          title: '單量'
        },
        {
          align: 'center',
          dataIndex: 'bet_amount',
          key: 'bet_amount',
          sorter: true,
          title: '貨量'
        },
        {
          align: 'center',
          dataIndex: 'payoff',
          key: 'payoff',
          sorter: true,
          title: '損益'
        },
        {
          align: 'center',
          dataIndex: 'payoff_ratio',
          key: 'payoff_ratio',
          sorter: true,
          title: '獲利比'
        },
        {
          align: 'center',
          dataIndex: 'base_win_wager_count',
          key: 'base_win_wager_count',
          sorter: true,
          title: 'Base贏筆數'
        },
        {
          align: 'center',
          dataIndex: 'base_lose_wager_count',
          key: 'base_lose_wager_count',
          sorter: true,
          title: 'Base輸筆數'
        },
        {
          align: 'center',
          dataIndex: 'free_win_wager_count',
          key: 'free_win_wager_count',
          sorter: true,
          title: 'Free贏筆數'
        },
        {
          align: 'center',
          dataIndex: 'free_lose_wager_count',
          key: 'free_lose_wager_count',
          sorter: true,
          title: 'Free輸筆數'
        },
        {
          align: 'center',
          dataIndex: 'win_ratio',
          key: 'win_ratio',
          sorter: true,
          title: '贏單比例'
        }
      ],
      [
        {
          align: 'center',
          dataIndex: 'serial_type_name',
          key: 'serial_type_name',
          sorter: true,
          title: '玩法名稱'
        },
        {
          align: 'center',
          dataIndex: 'wager_count',
          defaultSortOrder: 'descend',
          key: 'wager_count',
          sorter: true,
          title: '單量'
        },
        {
          align: 'center',
          dataIndex: 'bet_amount',
          key: 'bet_amount',
          sorter: true,
          title: '貨量'
        },
        {
          align: 'center',
          dataIndex: 'payoff',
          key: 'payoff',
          sorter: true,
          title: '損益'
        },
        {
          align: 'center',
          dataIndex: 'payoff_ratio',
          key: 'payoff_ratio',
          sorter: true,
          title: '獲利比'
        }
      ]
    ])
    expect(wrapper.vm.pagination).toStrictEqual({
      apiStart: 0,
      pageSize: 10,
      total: 0,
      currentPage: 1
    })
    expect(wrapper.vm.sortColumn).toStrictEqual('lobby_name')
    expect(wrapper.vm.order).toStrictEqual('descend')
    expect(wrapper.vm.loading).toBeFalsy()
    expect(wrapper.vm.fetchSubData).toStrictEqual([
      wrapper.vm.subFuncBetReportByGame,
      wrapper.vm.subFuncBetReportByHall,
      wrapper.vm.subFuncBetReportByUser,
      wrapper.vm.subFuncBetReportLiveBySerialType
    ])
  })

  it('onMounted called queryApi & tableChange', async () => {
    const mockApiBetReportByLobby = apiBetReportByLobby as Mock
    mockApiBetReportByLobby.mockResolvedValue({
      result: 'success',
      ret: { data: [1, 2, 3] }
    })

    expect(generateOverallParams).toHaveBeenCalledTimes(1)
    expect(queryApi).toHaveBeenCalledTimes(1)
    expect(queryApi).toHaveBeenNthCalledWith(
      1,
      mockApiBetReportByLobby,
      undefined,
      wrapper.vm.transformBetReportByLobby,
      undefined
    )

    await wrapper.vm.tableChange(2, 20, undefined, undefined)
    expect(generateOverallParams).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenNthCalledWith(
      2,
      mockApiBetReportByLobby,
      undefined,
      wrapper.vm.transformBetReportByLobby,
      undefined
    )
  })

  it('subFuncBetReportByGame called queryApi', async () => {
    expect(generateOverallParams).toHaveBeenCalledTimes(1)
    expect(queryApi).toHaveBeenCalledTimes(1)

    const mockApiBetReportByGame = apiBetReportByGame as Mock
    mockApiBetReportByGame.mockResolvedValue({
      result: 'success',
      ret: { data: [1, 2, 3] }
    })

    const record = {
      innerPagination: {
        sort: 'wager_count',
        order: 'descend'
      },
      innerExtraParams: {
        lobby: 5
      },
      game: [{ lobby: 5 }]
    }
    await wrapper.vm.subFuncBetReportByGame(record)
    expect(generateOverallParams).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenNthCalledWith(
      2,
      mockApiBetReportByGame,
      undefined,
      wrapper.vm.transformBetReportByGame,
      record
    )
  })

  it('subFuncBetReportByHall called queryApi', async () => {
    expect(generateOverallParams).toHaveBeenCalledTimes(1)
    expect(queryApi).toHaveBeenCalledTimes(1)

    const mockApiBetReportByHall = apiBetReportByHall as Mock
    mockApiBetReportByHall.mockResolvedValue({
      result: 'success',
      ret: { data: [1, 2, 3] }
    })

    const record = {
      innerPagination: {
        sort: 'wager_count',
        order: 'descend'
      },
      innerExtraParams: {
        lobby: 5,
        gameCode: '3003'
      },
      game: [{ lobby: 5, game_code: '3003' }]
    }
    await wrapper.vm.subFuncBetReportByHall(record)
    expect(generateOverallParams).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenNthCalledWith(
      2,
      mockApiBetReportByHall,
      undefined,
      wrapper.vm.transformBetReportByHall,
      record
    )
  })

  it('subFuncBetReportByUser called queryApi', async () => {
    expect(generateOverallParams).toHaveBeenCalledTimes(1)
    expect(queryApi).toHaveBeenCalledTimes(1)

    const mockApiBetReportByUser = apiBetReportByUser as Mock
    mockApiBetReportByUser.mockResolvedValue({
      result: 'success',
      ret: { data: [1, 2, 3] }
    })

    const record = {
      innerPagination: {
        sort: 'wager_count',
        order: 'descend',
        current: 1,
        pageSize: 10
      },
      innerExtraParams: {
        lobby: 5,
        gameCode: '3003'
      },
      game: [{ lobby: 5, game_code: '3003' }]
    }
    await wrapper.vm.subFuncBetReportByUser(record)
    expect(generateOverallParams).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenNthCalledWith(
      2,
      mockApiBetReportByUser,
      undefined,
      wrapper.vm.transformBetReportByUser,
      record
    )
  })

  it('subFuncBetReportLiveBySerialType called queryApi', async () => {
    expect(generateOverallParams).toHaveBeenCalledTimes(1)
    expect(queryApi).toHaveBeenCalledTimes(1)

    const mockApiBetReportLiveBySerialType = apiBetReportLiveBySerialType as Mock
    mockApiBetReportLiveBySerialType.mockResolvedValue({
      result: 'success',
      ret: { data: [1, 2, 3] }
    })

    const record = {
      innerPagination: {
        sort: 'wager_count',
        order: 'descend'
      },
      innerExtraParams: {
        lobby: 5,
        gameCode: '3003'
      },
      game: [{ lobby: 5, game_code: '3003' }]
    }
    await wrapper.vm.subFuncBetReportLiveBySerialType(record)
    expect(generateOverallParams).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenNthCalledWith(
      2,
      mockApiBetReportLiveBySerialType,
      undefined,
      wrapper.vm.transformBetReportLiveBySerialType,
      record
    )
  })

  it('transformBetReportByLobby', () => {
    const ret = {
      data: [
        {
          lobby: 5,
          lobby_name: 'BB電子',
          user_count: 1,
          wager_count: 340,
          bet_amount: '1941.0000',
          payoff: '-81.0000',
          payoff_ratio: '-0.0417'
        }
      ],
      records_total: 1
    }
    const record = {
      innerData: []
    }
    const params = {
      end_date: '2025-04-15',
      start_date: '2025-04-14',
      hall_id: 6,
      user_id: ['457599842'],
      username: [],
      game: [],
      sort: 'lobby_name',
      order: 'DESC'
    }
    wrapper.vm.transformBetReportByLobby(ret, record, params)
    expect(wrapper.vm.tableData).toStrictEqual([
      {
        bet_amount: '1,941',
        hasPage: false,
        innerData: [],
        innerExtraParams: {
          device: undefined,
          endDate: '2025-04-15',
          hallId: 6,
          lobby: 5,
          startDate: '2025-04-14',
          userId: ['457599842'],
          username: []
        },
        innerLoading: true,
        innerPagination: {
          order: 'descend',
          defaultSortCol: 'wager_count',
          sort: 'wager_count'
        },
        key: 0,
        lobby: 5,
        user_count: '1',
        lobby_name: 'BB電子',
        payoff: '-81',
        payoff_ratio: '-4.17%',
        wager_count: '340'
      }
    ])
  })

  it('transformBetReportByGame', () => {
    const ret = {
      data: [
        {
          lobby: 5,
          lobby_name: 'BB電子',
          game_code: '5274',
          game_name: '財富宙升',
          user_count: 1,
          wager_count: 22,
          bet_amount: '33.0000',
          payoff: '29.4000',
          payoff_ratio: '0.8909',
          rtp: '0.1091',
          expected_rtp: '0.8762',
          base_win_wager_count: 0,
          base_lose_wager_count: 22,
          free_win_wager_count: 0,
          free_lose_wager_count: 0,
          win_ratio: '0'
        },
        {
          lobby: 5,
          lobby_name: 'BB電子',
          game_code: '5261',
          game_name: '招財喵喵',
          user_count: 1,
          wager_count: 318,
          bet_amount: '1908.0000',
          payoff: '-110.4000',
          payoff_ratio: '-0.0579',
          rtp: '1.0579',
          expected_rtp: '0.8954',
          base_win_wager_count: 54,
          base_lose_wager_count: 264,
          free_win_wager_count: 0,
          free_lose_wager_count: 0,
          win_ratio: '0.1698'
        }
      ],
      records_total: 2
    }
    const record = {
      innerData: []
    }
    const params = {
      end_date: '2025-04-15',
      start_date: '2025-04-14',
      hall_id: 6,
      user_id: ['457599842'],
      username: [],
      game: [
        {
          lobby: 5
        }
      ],
      sort: 'game_name',
      order: 'DESC'
    }
    wrapper.vm.transformBetReportByGame(ret, record, params)
    expect(record.innerData).toStrictEqual([
      {
        base_lose_wager_count: '22',
        base_win_wager_count: '0',
        bet_amount: '33',
        expected_rtp: '87.62%',
        free_lose_wager_count: '0',
        free_win_wager_count: '0',
        game_name: '財富宙升',
        hasPage: false,
        innerData: [],
        innerExtraParams: {
          device: undefined,
          endDate: '2025-04-15',
          expectedRtp: '0.8762',
          gameCode: '5274',
          hallId: 6,
          lobby: 5,
          startDate: '2025-04-14',
          userId: ['457599842'],
          username: []
        },
        innerLoading: true,
        innerPagination: {
          order: 'descend',
          defaultSortCol: 'wager_count',
          sort: 'wager_count'
        },
        key: 0,
        payoff: '29.4',
        payoff_ratio: '89.09%',
        rtp: '10.91%',
        user_count: '1',
        wager_count: '22',
        win_ratio: '0%'
      },
      {
        base_lose_wager_count: '264',
        base_win_wager_count: '54',
        bet_amount: '1,908',
        expected_rtp: '89.54%',
        free_lose_wager_count: '0',
        free_win_wager_count: '0',
        game_name: '招財喵喵',
        hasPage: false,
        innerData: [],
        innerExtraParams: {
          device: undefined,
          endDate: '2025-04-15',
          expectedRtp: '0.8954',
          gameCode: '5261',
          hallId: 6,
          lobby: 5,
          startDate: '2025-04-14',
          userId: ['457599842'],
          username: []
        },
        innerLoading: true,
        innerPagination: {
          order: 'descend',
          defaultSortCol: 'wager_count',
          sort: 'wager_count'
        },
        key: 1,
        payoff: '-110.4',
        payoff_ratio: '-5.79%',
        rtp: '105.79%',
        user_count: '1',
        wager_count: '318',
        win_ratio: '16.98%'
      }
    ])
  })

  it('transformBetReportByHall', () => {
    const ret = {
      data: [
        {
          hall_id: 6,
          hall_name: 'Esball-1',
          login_code: 'esx',
          user_count: 20,
          wager_count: 1340,
          bet_amount: '88347.6000',
          payoff: '19179.9300',
          payoff_ratio: '0.2171',
          rtp: '0.7829',
          base_win_wager_count: 256,
          base_lose_wager_count: 1044,
          free_win_wager_count: 16,
          free_lose_wager_count: 24,
          win_ratio: '0.2030'
        }
      ],
      records_total: 1
    }
    const record = {
      innerExtraParams: {
        expectedRtp: '0.3',
        lobby: 3,
        gameCode: '3003'
      },
      innerPagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      innerData: []
    }
    const params = {
      end_date: '2025-04-15',
      start_date: '2025-04-14',
      hall_id: 6,
      user_id: [],
      username: [],
      game: [],
      sort: 'hall_name',
      order: 'DESC'
    }
    wrapper.vm.transformBetReportByHall(ret, record, params)
    expect(record.innerData).toStrictEqual([
      {
        base_lose_wager_count: '1,044',
        base_win_wager_count: '256',
        bet_amount: '88,347.6',
        canExpand: true,
        expected_rtp: '30%',
        free_lose_wager_count: '24',
        free_win_wager_count: '16',
        hall_name: 'Esball-1 (esx)',
        hasPage: true,
        innerData: [],
        innerExtraParams: {
          device: undefined,
          endDate: '2025-04-15',
          gameCode: '3003',
          hallId: 6,
          lobby: 3,
          startDate: '2025-04-14',
          userId: [],
          username: []
        },
        innerLoading: true,
        innerPagination: {
          current: 1,
          order: 'descend',
          pageSize: 10,
          defaultSortCol: 'wager_count',
          sort: 'wager_count',
          total: 0
        },
        key: 0,
        payoff: '19,179.93',
        payoff_ratio: '21.71%',
        rtp: '78.29%',
        user_count: '20',
        wager_count: '1,340',
        win_ratio: '20.3%'
      }
    ])
  })

  it('transformBetReportByUser', () => {
    const ret = {
      data: [
        {
          user_id: '457599842',
          user_name: 'ssiopp',
          wager_count: 340,
          bet_amount: '1941.0000',
          payoff: '-81.0000',
          payoff_ratio: '-0.0417',
          base_win_wager_count: 286,
          base_lose_wager_count: 286,
          free_win_wager_count: 0,
          free_lose_wager_count: 0,
          win_ratio: '0.1588'
        }
      ],
      records_total: 1
    }
    const record = {
      innerPagination: {
        total: 1
      },
      innerExtraParams: {
        lobby: 5,
        gameCode: '3003'
      },
      innerData: []
    }
    const params = {
      end_date: '2025-04-15',
      start_date: '2025-04-14',
      hall_id: 6,
      user_id: ['457599842'],
      username: [],
      game: [],
      sort: 'wager_count',
      order: 'DESC'
    }
    wrapper.vm.transformBetReportByUser(ret, record, params)
    expect(record.innerPagination.total).toStrictEqual(1)
    expect(record.innerData).toStrictEqual([
      {
        base_lose_wager_count: '286',
        base_win_wager_count: '286',
        bet_amount: '1,941',
        free_lose_wager_count: '0',
        free_win_wager_count: '0',
        hasPage: false,
        innerData: [],
        innerExtraParams: {
          device: undefined,
          endDate: '2025-04-15',
          gameCode: '3003',
          hallId: 6,
          lobby: 5,
          startDate: '2025-04-14',
          userId: ['457599842'],
          username: []
        },
        innerLoading: true,
        innerPagination: {
          order: 'descend',
          defaultSortCol: 'wager_count',
          sort: 'wager_count'
        },
        key: 0,
        payoff: '-81',
        payoff_ratio: '-4.17%',
        user: 'ssiopp (457599842)',
        wager_count: '340',
        win_ratio: '15.88%'
      }
    ])
  })

  it('transformBetReportLiveBySerialType', () => {
    const ret = {
      data: [
        {
          lobby: 3,
          lobby_name: 'BB視訊',
          game_code: '3003',
          game_name: '龍虎鬥',
          serial_type: '1',
          serial_type_name: '虎',
          user_count: 1,
          wager_count: 4,
          bet_amount: '400.0000',
          payoff: '0',
          payoff_ratio: '0',
          rtp: '1.0000',
          expected_rtp: '0.9628',
          serial_type_wager_count_ratio: '0.5000',
          serial_type_payoff_ratio: '0'
        },
        {
          lobby: 3,
          lobby_name: 'BB視訊',
          game_code: '3003',
          game_name: '龍虎鬥',
          serial_type: '2',
          serial_type_name: '龍',
          user_count: 1,
          wager_count: 4,
          bet_amount: '400.0000',
          payoff: '400.0000',
          payoff_ratio: '1.0000',
          rtp: '0',
          expected_rtp: '0.9628',
          serial_type_wager_count_ratio: '0.5000',
          serial_type_payoff_ratio: '1.0000'
        }
      ],
      records_total: 2
    }
    const record = {
      innerData: []
    }
    const params = {
      end_date: '2025-04-15',
      start_date: '2025-04-14',
      hall_id: 6,
      user_id: ['455652832'],
      username: [],
      game: [
        {
          lobby: 3,
          game_code: '3003'
        }
      ],
      sort: 'wager_count',
      order: 'DESC'
    }
    wrapper.vm.transformBetReportLiveBySerialType(ret, record, params)
    expect(record.innerData).toStrictEqual([
      {
        bet_amount: '400',
        key: 0,
        payoff: '0',
        payoff_ratio: '0%',
        serial_type_name: '虎',
        wager_count: '4'
      },
      {
        bet_amount: '400',
        key: 1,
        payoff: '400',
        payoff_ratio: '100%',
        serial_type_name: '龍',
        wager_count: '4'
      }
    ])
  })
})
