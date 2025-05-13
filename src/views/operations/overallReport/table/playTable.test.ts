import { it, describe, expect, afterEach, vi, beforeEach, Mock } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from '@/global/i18n'
import playTable from '@/views/operations/overallReport/table/playTable.vue'
import {
  apiBetReportLiveBySerialType, // 第一層
  apiBetReportByHall, // 第二層
  apiBetReportByUser // 第三層
} from '@/api'
import { generateOverallParams, queryApi } from '@/utils/filterUtils'
import { useOperationsOverallReportStore } from '@/stores'

vi.mock('@/utils/filterUtils', () => ({
  generateOverallParams: vi.fn(),
  queryApi: vi.fn()
}))

vi.mock('@/api', () => ({
  apiBetReportByHall: vi.fn(),
  apiBetReportByUser: vi.fn(),
  apiBetReportLiveBySerialType: vi.fn()
}))

describe('playTable', () => {
  let wrapper: VueWrapper<any>
  let operationsOverallReportStore: ReturnType<typeof useOperationsOverallReportStore>

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    operationsOverallReportStore = useOperationsOverallReportStore()
    operationsOverallReportStore.isFiltered = 1
    operationsOverallReportStore.tableBaseParams = {}

    wrapper = shallowMount(playTable, {
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
          dataIndex: 'serial_type_name',
          key: 'serial_type_name',
          sorter: true,
          title: '遊戲注區',
          width: 320
        },
        {
          align: 'center',
          dataIndex: 'user_count',
          key: 'user_count',
          sorter: true,
          title: '會員數'
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
          dataIndex: 'serial_type_wager_count_ratio',
          key: 'serial_type_wager_count_ratio',
          sorter: true,
          title: '佔單量'
        },
        {
          align: 'center',
          dataIndex: 'serial_type_payoff_ratio',
          key: 'serial_type_payoff_ratio',
          sorter: true,
          title: '佔獲利比'
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
          title: '會員數'
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
        }
      ],
      [
        {
          align: 'center',
          dataIndex: 'user_id',
          key: 'user_id',
          sorter: true,
          title: '會員ID'
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
          title: 'RTP'
        }
      ]
    ])
    expect(wrapper.vm.pagination).toStrictEqual({
      apiStart: 0,
      pageSize: 10,
      total: 0,
      currentPage: 1
    })
    expect(wrapper.vm.sortColumn).toStrictEqual('wager_count')
    expect(wrapper.vm.order).toStrictEqual('descend')
    expect(wrapper.vm.loading).toBeFalsy()
    expect(wrapper.vm.fetchSubData).toStrictEqual([
      wrapper.vm.subFuncBetReportByHall,
      wrapper.vm.subFuncBetReportByUser
    ])
  })

  it('onMounted called queryApi & tableChange', async () => {
    const mockApiBetReportLiveBySerialType = apiBetReportLiveBySerialType as Mock
    mockApiBetReportLiveBySerialType.mockResolvedValue({
      result: 'success',
      ret: { data: [1, 2, 3] }
    })

    expect(generateOverallParams).toHaveBeenCalledTimes(1)
    expect(queryApi).toHaveBeenCalledTimes(1)
    expect(queryApi).toHaveBeenNthCalledWith(
      1,
      mockApiBetReportLiveBySerialType,
      undefined,
      wrapper.vm.transformBetReportLiveBySerialType,
      undefined
    )

    await wrapper.vm.tableChange(2, 20, undefined, undefined)
    expect(generateOverallParams).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenNthCalledWith(
      2,
      mockApiBetReportLiveBySerialType,
      undefined,
      wrapper.vm.transformBetReportLiveBySerialType,
      undefined
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
      }
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
      }
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
    const params = {
      end_date: '2025-04-15',
      start_date: '2025-04-14',
      hall_id: 6,
      user_id: [],
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
    wrapper.vm.transformBetReportLiveBySerialType(ret, undefined, params)
    expect(wrapper.vm.pagination.total).toStrictEqual(2)
    expect(wrapper.vm.tableData).toStrictEqual([
      {
        bet_amount: '400',
        expected_rtp: '96.28%',
        hasPage: false,
        innerData: [],
        innerExtraParams: {
          device: undefined,
          endDate: '2025-04-15',
          expectedRtp: '0.9628',
          game: [
            {
              game_code: '3003',
              lobby: 3,
              serial_type: ['1']
            }
          ],
          hallId: 6,
          startDate: '2025-04-14',
          userId: [],
          username: []
        },
        innerLoading: true,
        innerPagination: {
          order: 'descend',
          defaultSortCol: 'wager_count',
          sort: 'wager_count'
        },
        key: 0,
        payoff: '0',
        payoff_ratio: '0%',
        rtp: '100%',
        serial_type_name: 'BB視訊 - 龍虎鬥 - 虎',
        serial_type_payoff_ratio: '0%',
        serial_type_wager_count_ratio: '50%',
        user_count: '1',
        wager_count: '4'
      },
      {
        bet_amount: '400',
        expected_rtp: '96.28%',
        hasPage: false,
        innerData: [],
        innerExtraParams: {
          device: undefined,
          endDate: '2025-04-15',
          expectedRtp: '0.9628',
          game: [
            {
              game_code: '3003',
              lobby: 3,
              serial_type: ['2']
            }
          ],
          hallId: 6,
          startDate: '2025-04-14',
          userId: [],
          username: []
        },
        innerLoading: true,
        innerPagination: {
          order: 'descend',
          defaultSortCol: 'wager_count',
          sort: 'wager_count'
        },
        key: 1,
        payoff: '400',
        payoff_ratio: '100%',
        rtp: '0%',
        serial_type_name: 'BB視訊 - 龍虎鬥 - 龍',
        serial_type_payoff_ratio: '100%',
        serial_type_wager_count_ratio: '50%',
        user_count: '1',
        wager_count: '4'
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
        expectedRtp: '0.3'
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
      length: 10,
      sort: 'hall_name',
      start: 0,
      order: 'DESC'
    }
    wrapper.vm.transformBetReportByHall(ret, record, params)
    expect(record.innerData).toStrictEqual([
      {
        bet_amount: '88,347.6',
        expected_rtp: '30%',
        hall_name: 'Esball-1 (esx)',
        hasPage: true,
        innerData: [],
        innerExtraParams: {
          device: undefined,
          endDate: '2025-04-15',
          expectedRtp: '0.3',
          game: [],
          hallId: 6,
          rtp: '0.7829',
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
        wager_count: '1,340'
      }
    ])
  })

  it('transformBetReportByUser', () => {
    const ret = {
      data: [
        {
          user_id: '457599842',
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
      innerExtraParams: {
        expectedRtp: '0.3'
      },
      innerPagination: {
        total: 1
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
      length: 10,
      sort: 'wager_count',
      start: 0,
      order: 'DESC'
    }
    wrapper.vm.transformBetReportByUser(ret, record, params)
    expect(record.innerPagination.total).toStrictEqual(1)
    expect(record.innerData).toStrictEqual([
      {
        bet_amount: '1,941',
        expected_rtp: '30%',
        key: 0,
        payoff: '-81',
        payoff_ratio: '-4.17%',
        rtp: '--',
        user_id: '457599842',
        wager_count: '340'
      }
    ])
  })
})
