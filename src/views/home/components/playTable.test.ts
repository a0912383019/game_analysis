import { it, describe, expect, afterEach, vi, beforeEach, Mock } from 'vitest'
import { VueWrapper, shallowMount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from '@/global/i18n'
import playTable from '@/views/home/components/playTable.vue'
import { apiGetOperationGameAnalysis } from '@/api'
import * as module from '@/utils/commonUtils'

vi.mock('@/api', () => ({
  apiGetOperationGameAnalysis: vi.fn()
}))

vi.mock('@/../public/js/system_config', () => ({
  targetMap: {
    2: { name: 'live', color: '--cdp-yellow' }, // 視訊
    3: { name: 'prob', color: '--cdp-pink' }, // 電子
    4: { name: 'lottery', color: '--cdp-orange' }, // 彩票
    5: { name: 'fish', color: '--cdp-blue' }, // 捕魚
    6: { name: 'card', color: '--cdp-green' } // 棋牌
  }
}))

vi.mock('lodash', async () => {
  const actual = await vi.importActual<any>('lodash')
  return {
    ...actual,
    debounce: (fn: Function) => fn // mock 成立即執行
  }
})

describe('playTable', () => {
  let wrapper: VueWrapper<any>
  const columns = [
    [
      {
        title: 'column 1',
        width: 380,
        dataIndex: 'content',
        key: 'content',
        align: 'center'
      },
      {
        title: 'column 2',
        dataIndex: 'user_count_ratio',
        key: 'user_count_ratio',
        align: 'center',
        sorter: true
      }
    ]
  ]

  beforeEach(() => {
    const mockApiGetOperationGameAnalysis = apiGetOperationGameAnalysis as Mock
    mockApiGetOperationGameAnalysis.mockResolvedValueOnce({
      result: 'success',
      ret: {
        data: [
          {
            content: 'BB彩票-BB 重慶時時彩',
            user_count_ratio: '0.2500',
            user_count: 1,
            bet_amount: '8280.0000',
            payoff: '8280.0000',
            comprehensive_rtp: '0'
          },
          {
            content: 'BB電子-爆利金剛',
            user_count_ratio: '0.2500',
            user_count: 1,
            bet_amount: '724.0000',
            payoff: '-8960.8000',
            comprehensive_rtp: '13.3768'
          },
          {
            content: 'BB電子-五行',
            user_count_ratio: '0.2500',
            user_count: 1,
            bet_amount: '300.0000',
            payoff: '-24.0000',
            comprehensive_rtp: '1.0800'
          },
          {
            content: 'BB電子-麻將胡了',
            user_count_ratio: '0.2500',
            user_count: 1,
            bet_amount: '10.0000',
            payoff: '5.6000',
            comprehensive_rtp: '0.4400'
          }
        ],
        records_total: 4
      }
    })

    vi.spyOn(module, 'getSessionStorageEntity').mockImplementation(() => {
      return {
        platform_lobbies: [
          { lobby: 5, lobby_name: 'BB電子', target: 3 },
          { lobby: 66, lobby_name: 'BB棋牌', target: 6 }
        ]
      }
    })

    wrapper = shallowMount(playTable, {
      global: {
        plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
        stubs: { ACard: { template: '<div><slot /></div>' } }
      },
      props: {
        icon: 'testIcon',
        title: 'test title',
        columns: columns,
        analysisType: 'combination'
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('variables', () => {
    expect(wrapper.vm.props).toStrictEqual({
      analysisType: 'combination',
      columns: columns,
      icon: 'testIcon',
      title: 'test title'
    })
    expect(wrapper.vm.tableData).toStrictEqual([])
    expect(wrapper.vm.pagination).toStrictEqual({
      apiStart: 0,
      currentPage: 1,
      pageSize: 5,
      total: 0
    })
    expect(wrapper.vm.sortColumn).toStrictEqual('bet_amount')
    expect(wrapper.vm.order).toStrictEqual('descend')
    expect(wrapper.vm.apiLoading).toBeTruthy()
    expect(wrapper.vm.platformLobbies).toStrictEqual([
      {
        lobby: 5,
        lobby_name: 'BB電子',
        target: 3
      },
      {
        lobby: 66,
        lobby_name: 'BB棋牌',
        target: 6
      }
    ])
    expect(wrapper.vm.hallGroupValue).toStrictEqual([])
    expect(wrapper.vm.hallGroupOptions).toStrictEqual([
      {
        label: '電子廳',
        value: 3
      },
      {
        label: '棋牌廳',
        value: 6
      }
    ])
    expect(wrapper.vm.hallGroupProps).toStrictEqual({
      allowClear: false,
      hasPlaceholder: false,
      mode: 'multiple',
      options: [
        {
          label: '電子廳',
          value: 3
        },
        {
          label: '棋牌廳',
          value: 6
        }
      ],
      size: 'middle'
    })
  })

  it('watch', async () => {
    let goToFirstPage = vi.fn()
    wrapper.vm.$refs.tableRef.goToFirstPage = goToFirstPage
    expect(goToFirstPage).toBeCalledTimes(0)
    expect(apiGetOperationGameAnalysis).toBeCalledTimes(0)
    expect(wrapper.vm.tableData).toStrictEqual([])
    expect(wrapper.vm.apiLoading).toBeTruthy()

    wrapper.vm.hallGroupValue = [3, 6]
    await flushPromises()
    expect(goToFirstPage).toBeCalledTimes(1)
    expect(apiGetOperationGameAnalysis).toBeCalledTimes(1)
    expect(wrapper.vm.tableData).toStrictEqual([
      {
        bet_amount: '8,280',
        comprehensive_rtp: '0%',
        content: 'BB彩票-BB 重慶時時彩',
        payoff: '8,280',
        user_count: '1',
        user_count_ratio: '25%'
      },
      {
        bet_amount: '724',
        comprehensive_rtp: '1,337.68%',
        content: 'BB電子-爆利金剛',
        payoff: '-8,960.8',
        user_count: '1',
        user_count_ratio: '25%'
      },
      {
        bet_amount: '300',
        comprehensive_rtp: '108%',
        content: 'BB電子-五行',
        payoff: '-24',
        user_count: '1',
        user_count_ratio: '25%'
      },
      {
        bet_amount: '10',
        comprehensive_rtp: '44%',
        content: 'BB電子-麻將胡了',
        payoff: '5.6',
        user_count: '1',
        user_count_ratio: '25%'
      }
    ])
    expect(wrapper.vm.apiLoading).toBeFalsy()
  })

  it('tableChange', async () => {
    await wrapper.vm.tableChange(3, 20, undefined, undefined)
    expect(apiGetOperationGameAnalysis).toHaveBeenCalledTimes(1)
    expect(apiGetOperationGameAnalysis).toBeCalledWith({
      analysis_type: 'combination',
      data_date: expect.any(String),
      length: 20,
      order: 'DESC',
      sort: 'bet_amount',
      start: 40,
      target_types: '-1'
    })
  })
})
