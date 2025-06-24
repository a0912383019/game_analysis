import { it, describe, expect, afterEach, vi, beforeEach, Mock } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from '@/global/i18n'
import dateTable from '@/views/operations/overallReport/table/dateTable.vue'
import {
  apiBetReportByDate, // 第一層
  apiBetReportByLobby, // 第二層
  apiBetReportLiveBySerialType // 第三層
} from '@/api'
import { generateOverallParams, queryApi } from '@/utils/filterUtils'
import { useOperationsOverallReportStore } from '@/stores'

vi.mock('@/utils/filterUtils', () => ({
  generateOverallParams: vi.fn(),
  queryApi: vi.fn()
}))

vi.mock('@/api', () => ({
  apiBetReportByDate: vi.fn(),
  apiBetReportByLobby: vi.fn(),
  apiBetReportLiveBySerialType: vi.fn()
}))

describe('dateTable', () => {
  let wrapper: VueWrapper<any>
  let operationsOverallReportStore: ReturnType<typeof useOperationsOverallReportStore>

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    operationsOverallReportStore = useOperationsOverallReportStore()
    operationsOverallReportStore.isFiltered = 1
    operationsOverallReportStore.tableBaseParams = {}

    wrapper = shallowMount(dateTable, {
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
          dataIndex: 'data_date',
          defaultSortOrder: 'descend',
          key: 'data_date',
          sorter: true,
          title: '日期'
        },
        {
          align: 'center',
          dataIndex: 'user_count',
          key: 'user_count',
          sorter: true,
          title: '留言數'
        },
        {
          align: 'center',
          dataIndex: 'wager_count',
          key: 'wager_count',
          sorter: true,
          title: '觀看數'
        },
        {
          align: 'center',
          dataIndex: 'bet_amount',
          key: 'bet_amount',
          sorter: true,
          title: '流量'
        },
        {
          align: 'center',
          dataIndex: 'payoff',
          key: 'payoff',
          sorter: true,
          title: '瀏覽趨勢'
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
          dataIndex: 'lobby_name',
          key: 'lobby_name',
          sorter: true,
          title: '媒體大廳'
        },
        {
          align: 'center',
          dataIndex: 'user_count',
          key: 'user_count',
          sorter: true,
          title: '留言數'
        },
        {
          align: 'center',
          dataIndex: 'wager_count',
          defaultSortOrder: 'descend',
          key: 'wager_count',
          sorter: true,
          title: '觀看數'
        },
        {
          align: 'center',
          dataIndex: 'bet_amount',
          key: 'bet_amount',
          sorter: true,
          title: '流量'
        },
        {
          align: 'center',
          dataIndex: 'payoff',
          key: 'payoff',
          sorter: true,
          title: '瀏覽趨勢'
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
          dataIndex: 'serial_type_name',
          key: 'serial_type_name',
          sorter: true,
          title: '內容名稱',
          width: 320
        },
        {
          align: 'center',
          dataIndex: 'odds',
          key: 'odds',
          sorter: true,
          title: '賠率'
        },
        {
          align: 'center',
          dataIndex: 'user_count',
          key: 'user_count',
          sorter: true,
          title: '留言數'
        },
        {
          align: 'center',
          dataIndex: 'wager_count',
          defaultSortOrder: 'descend',
          key: 'wager_count',
          sorter: true,
          title: '觀看數'
        },
        {
          align: 'center',
          dataIndex: 'bet_amount',
          key: 'bet_amount',
          sorter: true,
          title: '流量'
        },
        {
          align: 'center',
          dataIndex: 'payoff',
          key: 'payoff',
          sorter: true,
          title: '瀏覽趨勢'
        },
        {
          align: 'center',
          dataIndex: 'expected_rtp',
          key: 'expected_rtp',
          sorter: true,
          title: '滿意度(理論)'
        },
        {
          align: 'center',
          dataIndex: 'rtp',
          key: 'rtp',
          sorter: true,
          title: '滿意度'
        },
        {
          align: 'center',
          dataIndex: 'serial_type_wager_count_ratio',
          key: 'serial_type_wager_count_ratio',
          sorter: true,
          title: '佔觀看數'
        },
        {
          align: 'center',
          dataIndex: 'serial_type_payoff_ratio',
          key: 'serial_type_payoff_ratio',
          sorter: true,
          title: '佔獲利比'
        }
      ]
    ])
    expect(wrapper.vm.pagination).toStrictEqual({
      apiStart: 0,
      pageSize: 10,
      total: 0,
      currentPage: 1
    })
    expect(wrapper.vm.sortColumn).toStrictEqual('data_date')
    expect(wrapper.vm.order).toStrictEqual('descend')
    expect(wrapper.vm.loading).toBeFalsy()
    expect(wrapper.vm.fetchSubData).toStrictEqual([
      wrapper.vm.subFuncBetReportByLobby,
      wrapper.vm.subFuncBetReportLiveBySerialType
    ])
  })

  it('onMounted called queryApi & tableChange', async () => {
    const mockApiBetReportByDate = apiBetReportByDate as Mock
    mockApiBetReportByDate.mockResolvedValue({
      result: 'success',
      ret: { data: [1, 2, 3] }
    })

    expect(generateOverallParams).toHaveBeenCalledTimes(1)
    expect(queryApi).toHaveBeenCalledTimes(1)
    expect(queryApi).toHaveBeenNthCalledWith(
      1,
      mockApiBetReportByDate,
      undefined,
      wrapper.vm.transformBetReportByDate,
      undefined
    )

    await wrapper.vm.tableChange(2, 20, undefined, undefined)
    expect(generateOverallParams).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenNthCalledWith(
      2,
      mockApiBetReportByDate,
      undefined,
      wrapper.vm.transformBetReportByDate,
      undefined
    )
  })

  it('subFuncBetReportByLobby called queryApi', async () => {
    expect(generateOverallParams).toHaveBeenCalledTimes(1)
    expect(queryApi).toHaveBeenCalledTimes(1)

    const mockApiBetReportByLobby = apiBetReportByLobby as Mock
    mockApiBetReportByLobby.mockResolvedValue({
      result: 'success',
      ret: { data: [1, 2, 3] }
    })

    const record = {
      innerPagination: {
        sort: 'wager_count',
        order: 'descend'
      }
    }
    await wrapper.vm.subFuncBetReportByLobby(record)
    expect(generateOverallParams).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenCalledTimes(2)
    expect(queryApi).toHaveBeenNthCalledWith(
      2,
      mockApiBetReportByLobby,
      undefined,
      wrapper.vm.transformBetReportByLobby,
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
        lobby: 3
      },
      game: [{ lobby: 3 }]
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

  it('transformBetReportByDate', () => {
    const ret = {
      data: [
        {
          data_date: '2025-05-11',
          user_count: 13,
          wager_count: 388,
          bet_amount: '31350.1400',
          payoff: '-2248.4773',
          payoff_ratio: '-0.0717'
        }
      ],
      records_total: 1
    }
    const record = {
      innerData: []
    }
    const params = {
      end_date: '2025-05-11',
      start_date: '2025-05-10',
      hall_id: 6,
      user_id: [],
      username: [],
      game: [],
      length: 10,
      start: 0,
      sort: 'data_date',
      order: 'DESC'
    }
    wrapper.vm.transformBetReportByDate(ret, record, params)
    expect(wrapper.vm.tableData).toStrictEqual([
      {
        key: 0,
        data_date: '2025-05-11',
        user_count: '13',
        wager_count: '388',
        bet_amount: '31,350.14',
        payoff: '-2,248.48',
        payoff_ratio: '-7.17%',
        innerLoading: true,
        hasPage: false,
        innerExtraParams: {
          device: undefined,
          endDate: '2025-05-11',
          startDate: '2025-05-11',
          hallId: 6,
          userId: [],
          username: [],
          game: []
        },
        innerPagination: {
          defaultSortCol: 'wager_count',
          sort: 'wager_count',
          order: 'descend'
        },
        innerData: []
      }
    ])
  })

  it('transformBetReportByLobby', () => {
    const ret = {
      data: [
        {
          lobby: 3,
          lobby_name: 'max直播',
          user_count: 5,
          wager_count: 15,
          bet_amount: '2834.0000',
          payoff: '786.0000',
          payoff_ratio: '0.2773'
        }
      ],
      records_total: 1
    }
    const record = {
      innerData: []
    }
    const params = {
      end_date: '2025-05-11',
      start_date: '2025-05-11',
      hall_id: 6,
      user_id: [],
      username: [],
      game: [],
      sort: 'wager_count',
      order: 'DESC'
    }
    wrapper.vm.transformBetReportByLobby(ret, record, params)
    expect(record.innerData).toStrictEqual([
      {
        key: 0,
        lobby_name: 'max直播',
        user_count: '5',
        wager_count: '15',
        bet_amount: '2,834',
        payoff: '786',
        payoff_ratio: '27.73%',
        innerLoading: true,
        hasPage: false,
        allowExpand: true,
        innerExtraParams: {
          device: undefined,
          endDate: '2025-05-11',
          startDate: '2025-05-11',
          hallId: 6,
          userId: [],
          username: [],
          lobby: 3
        },
        innerPagination: {
          defaultSortCol: 'wager_count',
          sort: 'wager_count',
          order: 'descend'
        },
        innerData: []
      }
    ])
  })

  it('transformBetReportLiveBySerialType', () => {
    const ret = {
      data: [
        {
          bet_amount: '59.0000',
          expected_rtp: '0.8473',
          game_code: '3033',
          game_name: 'Spotify星閃閃',
          lobby: 3,
          lobby_name: 'max直播',
          odds: '60.0000',
          payoff: '-63.0000',
          payoff_ratio: '-1.0678',
          rtp: '2.0678',
          serial_type: '4',
          serial_type_name: '點數/4點',
          serial_type_payoff_ratio: '-0.0566',
          serial_type_wager_count_ratio: '0.0559',
          user_count: 1,
          wager_count: 41
        },
        {
          bet_amount: '100.0000',
          expected_rtp: '0.9600',
          game_code: '3046',
          game_name: 'Spotify幸運5張',
          lobby: 3,
          lobby_name: 'max直播',
          odds: '1.0000',
          payoff: '100.0000',
          payoff_ratio: '1.0000',
          rtp: '0',
          serial_type: '4',
          serial_type_name: '梅花',
          serial_type_payoff_ratio: '1.0000',
          serial_type_wager_count_ratio: '1.0000',
          user_count: 2,
          wager_count: 2
        }
      ],
      records_total: 2
    }
    const record = {
      innerData: []
    }
    const params = {
      end_date: '2025-05-11',
      start_date: '2025-05-11',
      hall_id: 6,
      user_id: [],
      username: [],
      game: [{ lobby: 3 }],
      sort: 'wager_count',
      order: 'DESC'
    }
    wrapper.vm.transformBetReportLiveBySerialType(ret, record, params)
    expect(record.innerData).toStrictEqual([
      {
        key: 0,
        serial_type_name: 'Spotify星閃閃 - 點數/4點',
        odds: '60',
        user_count: '1',
        wager_count: '41',
        bet_amount: '59',
        payoff: '-63',
        expected_rtp: '84.73%',
        rtp: '206.78%',
        serial_type_wager_count_ratio: '5.59%',
        serial_type_payoff_ratio: '-5.66%'
      },
      {
        key: 1,
        serial_type_name: 'Spotify幸運5張 - 梅花',
        odds: '1',
        user_count: '2',
        wager_count: '2',
        bet_amount: '100',
        payoff: '100',
        expected_rtp: '96%',
        rtp: '0%',
        serial_type_wager_count_ratio: '100%',
        serial_type_payoff_ratio: '100%'
      }
    ])
  })
})
