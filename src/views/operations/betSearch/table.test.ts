import { it, describe, expect, afterEach, vi, beforeEach, Mock } from 'vitest'
import { VueWrapper, shallowMount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from '@/global/i18n'
import table from '@/views/operations/betSearch/table.vue'
import { useOperationsBetSearchStore } from '@/stores'
import dayjs from '@/utils/appDayjs'
import type { ColumnType } from 'ant-design-vue/es/table'
import { apiBetSettledByDate, apiBetRecords } from '@/api'
import { formatToApiTime } from '@/utils/commonUtils'

vi.mock('@/api', () => ({
  apiBetSettledByDate: vi.fn(),
  apiBetRecords: vi.fn()
}))

vi.mock('@/utils/commonUtils', async () => {
  const actual = await vi.importActual('@/utils/commonUtils.js')
  return {
    ...actual,
    formatToApiTime: vi.fn(() => '2025-03-10T12:00:00+08:00'),
    formatToApiDate: vi.fn(() => '2025-03-10'),
    formatByTimeZone: vi.fn(() => dayjs('2024-01-01T12:00:00+08:00'))
  }
})

describe('table', () => {
  let wrapper: VueWrapper<any>
  let operationsBetSearchStore: ReturnType<typeof useOperationsBetSearchStore>
  const mockDate: Dayjs = dayjs('2024-03-10T12:00:00')

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    operationsBetSearchStore = useOperationsBetSearchStore()

    vi.setSystemTime(mockDate.toDate())

    const mockApiBetSettledByDate = apiBetSettledByDate as Mock
    mockApiBetSettledByDate.mockResolvedValueOnce({
      result: 'success',
      ret: {
        data: [
          {
            hall_id: 6,
            settle_date: '2025-03-27',
            user_id: '39584727',
            username: 'gaga2',
            lobby: 5,
            lobby_name: 'BB電子',
            game_code: '5278',
            game_name: 'ColorGame',
            bet_amount: '464.0000',
            payoff: '112.0000',
            payoff_ratio: '0.2414'
          }
        ],
        records_total: 1
      }
    })

    const mockApiBetRecords = apiBetRecords as Mock
    mockApiBetRecords.mockResolvedValueOnce({
      result: 'success',
      ret: {
        data: [
          {
            wager_id: '5200008582454',
            hall_id: 6,
            bet_time: '2025-03-27T13:41:22+08:00',
            user_id: '39584727',
            username: 'gaga2',
            lobby: 5,
            lobby_name: 'BB電子',
            game_code: '5278',
            game_name: 'ColorGame',
            bet_amount: '85.0000',
            payoff: '25.0000',
            payoff_ratio: '0.2941',
            result: 1
          }
        ],
        records_total: 1
      }
    })

    wrapper = shallowMount(table, {
      global: {
        plugins: [i18n]
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
    wrapper.unmount()
  })

  it('components', async () => {
    expect(wrapper.findComponent({ name: 'custom-table' }).exists()).toBeTruthy()
  })

  it('columnsBet & columnsDate', () => {
    expect(wrapper.vm.columnsBet).toStrictEqual([
      [
        {
          align: 'center',
          dataIndex: 'wager_id',
          key: 'wager_id',
          sorter: true,
          title: '注單',
          width: 155
        },
        {
          align: 'center',
          dataIndex: 'bet_time',
          key: 'bet_time',
          sorter: true,
          title: '下注時間',
          width: 180
        },
        {
          align: 'center',
          dataIndex: 'username',
          key: 'username',
          sorter: true,
          title: '會員帳號',
          width: 172
        },
        {
          align: 'center',
          dataIndex: 'game_name',
          key: 'game_name',
          sorter: true,
          title: '遊戲名稱',
          width: 145
        },
        {
          align: 'center',
          dataIndex: 'result',
          key: 'result',
          sorter: true,
          title: '注單狀態',
          width: 115
        },
        {
          align: 'center',
          dataIndex: 'bet_amount',
          key: 'bet_amount',
          sorter: true,
          title: '貨量',
          width: 125
        },
        {
          align: 'center',
          dataIndex: 'payoff',
          key: 'payoff',
          sorter: true,
          title: '損益',
          width: 115
        },
        {
          align: 'center',
          dataIndex: 'payoff_ratio',
          key: 'payoff_ratio',
          sorter: true,
          title: '獲利比',
          width: 115
        }
      ]
    ])
    expect(wrapper.vm.columnsDate).toStrictEqual([
      [
        {
          align: 'center',
          dataIndex: 'settle_date',
          key: 'settle_date',
          sorter: true,
          title: '結算日期',
          width: 152
        },
        {
          align: 'center',
          dataIndex: 'username',
          key: 'username',
          sorter: true,
          title: '會員帳號',
          width: 204
        },
        {
          align: 'center',
          dataIndex: 'game_name',
          key: 'game_name',
          sorter: true,
          title: '遊戲名稱',
          width: 177
        },
        {
          align: 'center',
          dataIndex: 'bet_amount',
          key: 'bet_amount',
          sorter: true,
          title: '貨量',
          width: 152
        },
        {
          align: 'center',
          dataIndex: 'payoff',
          key: 'payoff',
          sorter: true,
          title: '損益',
          width: 140
        },
        {
          align: 'center',
          dataIndex: 'payoff_ratio',
          key: 'payoff_ratio',
          sorter: true,
          title: '獲利比',
          width: 140
        }
      ]
    ])
  })

  it('table default variables', () => {
    expect(wrapper.vm.apiStart).toStrictEqual(0)
    expect(wrapper.vm.pageSize).toStrictEqual(10)
    expect(wrapper.vm.total).toStrictEqual(0)
    expect(wrapper.vm.currentPage).toStrictEqual(1)
    expect(wrapper.vm.sortColumn).toStrictEqual('settle_date')
    expect(wrapper.vm.order).toStrictEqual('descend')
    expect(wrapper.vm.loading).toBe(false)
  })

  it('betStatusMap & generateBetResult', () => {
    expect(wrapper.vm.betStatusMap).toStrictEqual({
      '-1': '註銷',
      '0': '未結',
      '1': '已結'
    })

    const betResult = wrapper.vm.generateBetResult(-1)
    expect(betResult).toStrictEqual('註銷')
  })

  it('columns & setColumnSortOrder', () => {
    operationsBetSearchStore.searchParams.searchTypeValue = 'bet'
    expect(wrapper.vm.columns).toStrictEqual(wrapper.vm.columnsBet)

    operationsBetSearchStore.searchParams.searchTypeValue = 'settlement_date'
    expect(wrapper.vm.columns).toStrictEqual(wrapper.vm.columnsDate)

    wrapper.vm.setColumnSortOrder('game_name', 'ascend')
    wrapper.vm.columns[0].forEach((ele: ColumnType) => {
      if (ele.key === 'game_name') {
        expect(ele.defaultSortOrder).toStrictEqual('ascend')
      } else {
        expect(ele.defaultSortOrder).toStrictEqual(undefined)
      }
    })
  })

  it('generateBetParams & handleSearch & tableChange & transformTable', async () => {
    const paramsData: BetRecordSearchType = {
      searchTypeValue: 'bet',
      timeDuration: [dayjs('2024-01-01T12:00:00Z'), dayjs('2024-01-02T12:00:00Z')],
      dateDuration: [undefined, undefined],
      memberType: 'id',
      memberValue: ['123'],
      hallValue: 1,
      lobbyValue: 5,
      gameTypeValue: ['3001', '3002']
    }
    const result = wrapper.vm.generateBetParams(paramsData)
    expect(result).toEqual({
      order: 'DESC',
      length: 10,
      start: 0,
      sort: 'settle_date',
      hall_id: 1,
      lobby: 5,
      game_code: ['3001', '3002'],
      user_id: ['123'],
      username: [],
      start_time: '2025-03-10T12:00:00+08:00',
      end_time: '2025-03-10T12:00:00+08:00'
    })

    expect(formatToApiTime).toHaveBeenCalledTimes(2)
    expect(apiBetSettledByDate).toBeCalledTimes(0)

    // handleSearch
    // 測試 settlement_date table
    paramsData.searchTypeValue = 'settlement_date'

    let goToFirstPage = vi.fn()
    wrapper.vm.$refs.tableRef.goToFirstPage = goToFirstPage
    expect(goToFirstPage).toBeCalledTimes(0)
    expect(wrapper.vm.tableData).toStrictEqual([])

    // watch 觸發 handleSearch
    operationsBetSearchStore.searchParams = paramsData
    operationsBetSearchStore.isFiltered = 22
    await flushPromises()
    expect(goToFirstPage).toBeCalledTimes(1)
    expect(apiBetSettledByDate).toBeCalledTimes(1)
    expect(wrapper.vm.tableData).toStrictEqual([
      {
        bet_amount: '464',
        game_name: 'ColorGame',
        payoff: '112',
        payoff_ratio: '24.14%',
        settle_date: '2025-03-27',
        username: 'gaga2'
      }
    ])

    expect(wrapper.vm.sortColumn).toStrictEqual('settle_date')
    expect(wrapper.vm.order).toStrictEqual('descend')
    expect(wrapper.vm.currentPage).toStrictEqual(1)
    expect(wrapper.vm.pageSize).toStrictEqual(10)
    expect(wrapper.vm.apiStart).toStrictEqual(0)

    // tableChange
    wrapper.vm.tableChange(2, 20, undefined, undefined)
    await flushPromises()
    expect(wrapper.vm.sortColumn).toStrictEqual('settle_date')
    expect(wrapper.vm.order).toStrictEqual('descend')
    expect(wrapper.vm.currentPage).toStrictEqual(2)
    expect(wrapper.vm.pageSize).toStrictEqual(20)
    expect(wrapper.vm.apiStart).toStrictEqual(20)
    expect(apiBetSettledByDate).toBeCalledTimes(2)

    expect(apiBetRecords).toBeCalledTimes(0)

    // 測試 bet table
    paramsData.searchTypeValue = 'bet'
    wrapper.vm.handleSearch(paramsData)
    await flushPromises()
    expect(apiBetRecords).toBeCalledTimes(1)
    expect(wrapper.vm.tableData).toStrictEqual([
      {
        bet_amount: '85',
        bet_time: '2024-01-01 12:00:00',
        game_name: 'ColorGame',
        payoff: '25',
        payoff_ratio: '29.41%',
        result: '已結',
        username: 'gaga2',
        wager_id: '5200008582454'
      }
    ])
  })
})
