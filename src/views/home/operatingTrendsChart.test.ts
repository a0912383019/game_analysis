import { it, describe, expect, afterEach, vi, beforeEach, Mock } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from '@/global/i18n'
import operatingTrendsChart from '@/views/home/operatingTrendsChart.vue'
import { apiGetGameReportTrend } from '@/api'
import * as module from '@/utils/commonUtils'

vi.mock('@/api', () => ({
  apiGetGameReportTrend: vi.fn()
}))

vi.mock('@/config/defaultConfig', () => ({
  targetMap: {
    2: { name: 'live', color: '--cdp-yellow' }, // 視訊
    3: { name: 'prob', color: '--cdp-pink' }, // 電子
    4: { name: 'lottery', color: '--cdp-orange' }, // 彩票
    5: { name: 'fish', color: '--cdp-blue' }, // 捕魚
    6: { name: 'card', color: '--cdp-green' } // 棋牌
  }
}))

describe('operatingTrendsChart', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    const mockApiGetGameReportTrend = apiGetGameReportTrend as Mock
    mockApiGetGameReportTrend.mockResolvedValueOnce({
      result: 'success',
      ret: {
        data: [
          {
            data_date: '2025-04-22',
            target_id: 2,
            target_name: '視訊',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 2
          },
          {
            data_date: '2025-04-22',
            target_id: 3,
            target_name: '電子',
            payoff: '2.4000',
            users_count: 1,
            bet_amount: '6.0000',
            first_play_count: 0,
            loss_count: 4
          },
          {
            data_date: '2025-04-22',
            target_id: 4,
            target_name: '彩票',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 1
          },
          {
            data_date: '2025-04-22',
            target_id: 5,
            target_name: '捕魚',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-22',
            target_id: 6,
            target_name: '棋牌',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 2
          },
          {
            data_date: '2025-04-23',
            target_id: 2,
            target_name: '視訊',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-23',
            target_id: 3,
            target_name: '電子',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-23',
            target_id: 4,
            target_name: '彩票',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-23',
            target_id: 5,
            target_name: '捕魚',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-23',
            target_id: 6,
            target_name: '棋牌',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-24',
            target_id: 2,
            target_name: '視訊',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 1
          },
          {
            data_date: '2025-04-24',
            target_id: 3,
            target_name: '電子',
            payoff: '6.0000',
            users_count: 1,
            bet_amount: '6.0000',
            first_play_count: 0,
            loss_count: 5
          },
          {
            data_date: '2025-04-24',
            target_id: 4,
            target_name: '彩票',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 1
          },
          {
            data_date: '2025-04-24',
            target_id: 5,
            target_name: '捕魚',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-24',
            target_id: 6,
            target_name: '棋牌',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-25',
            target_id: 2,
            target_name: '視訊',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 1
          },
          {
            data_date: '2025-04-25',
            target_id: 3,
            target_name: '電子',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 8
          },
          {
            data_date: '2025-04-25',
            target_id: 4,
            target_name: '彩票',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-25',
            target_id: 5,
            target_name: '捕魚',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 1
          },
          {
            data_date: '2025-04-25',
            target_id: 6,
            target_name: '棋牌',
            payoff: '-254.0000',
            users_count: 2,
            bet_amount: '72.0000',
            first_play_count: 0,
            loss_count: 1
          },
          {
            data_date: '2025-04-26',
            target_id: 2,
            target_name: '視訊',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-26',
            target_id: 3,
            target_name: '電子',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 2
          },
          {
            data_date: '2025-04-26',
            target_id: 4,
            target_name: '彩票',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-26',
            target_id: 5,
            target_name: '捕魚',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 1
          },
          {
            data_date: '2025-04-26',
            target_id: 6,
            target_name: '棋牌',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-27',
            target_id: 2,
            target_name: '視訊',
            payoff: '-100.0000',
            users_count: 1,
            bet_amount: '100.0000',
            first_play_count: 0,
            loss_count: 3
          },
          {
            data_date: '2025-04-27',
            target_id: 3,
            target_name: '電子',
            payoff: '-2415.0000',
            users_count: 104,
            bet_amount: '5200.0000',
            first_play_count: 0,
            loss_count: 4
          },
          {
            data_date: '2025-04-27',
            target_id: 4,
            target_name: '彩票',
            payoff: '250.0000',
            users_count: 1,
            bet_amount: '250.0000',
            first_play_count: 0,
            loss_count: 2
          },
          {
            data_date: '2025-04-27',
            target_id: 5,
            target_name: '捕魚',
            payoff: '200.0000',
            users_count: 1,
            bet_amount: '200.0000',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-27',
            target_id: 6,
            target_name: '棋牌',
            payoff: '4516.0000',
            users_count: 4,
            bet_amount: '4900.0000',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-28',
            target_id: 2,
            target_name: '視訊',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-28',
            target_id: 3,
            target_name: '電子',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-28',
            target_id: 4,
            target_name: '彩票',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-28',
            target_id: 5,
            target_name: '捕魚',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          },
          {
            data_date: '2025-04-28',
            target_id: 6,
            target_name: '棋牌',
            payoff: '0',
            users_count: 0,
            bet_amount: '0',
            first_play_count: 0,
            loss_count: 0
          }
        ],
        total: {
          by_target: [
            {
              target_id: 2,
              target_name: '視訊',
              payoff: '-100.0000',
              users_count: 1,
              bet_amount: '100.0000',
              first_play_count: 0,
              loss_count: 7
            },
            {
              target_id: 3,
              target_name: '電子',
              payoff: '-2406.6000',
              users_count: 106,
              bet_amount: '5212.0000',
              first_play_count: 0,
              loss_count: 23
            },
            {
              target_id: 4,
              target_name: '彩票',
              payoff: '250.0000',
              users_count: 1,
              bet_amount: '250.0000',
              first_play_count: 0,
              loss_count: 4
            },
            {
              target_id: 5,
              target_name: '捕魚',
              payoff: '200.0000',
              users_count: 1,
              bet_amount: '200.0000',
              first_play_count: 0,
              loss_count: 2
            },
            {
              target_id: 6,
              target_name: '棋牌',
              payoff: '4262.0000',
              users_count: 6,
              bet_amount: '4972.0000',
              first_play_count: 0,
              loss_count: 3
            }
          ],
          by_daily: [
            {
              data_date: '2025-04-22',
              payoff: '2.4000',
              users_count: 1,
              bet_amount: '6.0000',
              first_play_count: 0,
              loss_count: 9
            },
            {
              data_date: '2025-04-23',
              payoff: '0',
              users_count: 0,
              bet_amount: '0',
              first_play_count: 0,
              loss_count: 0
            },
            {
              data_date: '2025-04-24',
              payoff: '6.0000',
              users_count: 1,
              bet_amount: '6.0000',
              first_play_count: 0,
              loss_count: 7
            },
            {
              data_date: '2025-04-25',
              payoff: '-254.0000',
              users_count: 2,
              bet_amount: '72.0000',
              first_play_count: 0,
              loss_count: 11
            },
            {
              data_date: '2025-04-26',
              payoff: '0',
              users_count: 0,
              bet_amount: '0',
              first_play_count: 0,
              loss_count: 3
            },
            {
              data_date: '2025-04-27',
              payoff: '2451.0000',
              users_count: 111,
              bet_amount: '10650.0000',
              first_play_count: 0,
              loss_count: 9
            },
            {
              data_date: '2025-04-28',
              payoff: '0',
              users_count: 0,
              bet_amount: '0',
              first_play_count: 0,
              loss_count: 0
            }
          ],
          overall: {
            payoff: '2205.4000',
            users_count: 115,
            bet_amount: '10734.0000',
            first_play_count: 0,
            loss_count: 39
          }
        }
      }
    })

    vi.spyOn(module, 'getSessionStorageEntity').mockImplementation(() => {
      return {
        platform_lobbies: [
          {
            lobby: 5,
            lobby_name: 'max影音',
            target: 3,
            target_name: '電子'
          },
          {
            lobby: 3,
            lobby_name: 'max直播',
            target: 2,
            target_name: '視訊'
          },
          {
            lobby: 66,
            lobby_name: 'max AR/VR',
            target: 6,
            target_name: '棋牌'
          },
          {
            lobby: 38,
            lobby_name: 'max Podcast大師',
            target: 5,
            target_name: '捕魚'
          },
          {
            lobby: 12,
            lobby_name: 'max電子書',
            target: 4,
            target_name: '彩票'
          }
        ]
      }
    })

    wrapper = shallowMount(operatingTrendsChart, {
      global: {
        plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
        stubs: {
          'v-chart': true
        }
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('variables', () => {
    expect(wrapper.vm.apiLoading).toBe(false)
    expect(wrapper.vm.buttonGroup).toStrictEqual([
      {
        name: '瀏覽趨勢',
        value: 'payoff'
      },
      {
        name: '留言數',
        value: 'users_count'
      },
      {
        name: '流量',
        value: 'bet_amount'
      },
      {
        name: '會員按讚數',
        value: 'first_play_count'
      },
      {
        name: '流失會員留言數',
        value: 'loss_count'
      }
    ])
    expect(wrapper.vm.currentTabs).toStrictEqual('payoff')
    expect(wrapper.vm.columns).toStrictEqual([
      [
        {
          align: 'center',
          dataIndex: 'game_category',
          key: 'game_category',
          title: '媒體類別',
          width: 100
        },
        {
          align: 'center',
          dataIndex: 'totals',
          key: 'totals',
          title: '總計'
        }
      ]
    ])
  })

  it('expect api called correctly and watch correctlly', async () => {
    expect(wrapper.vm.tableTypeData).toStrictEqual({
      bet_amount: [
        {
          color: 'bg-[#64AFFF]',
          game_category: '總計',
          totals: '10,734'
        },
        {
          color: 'bg-[var(--cdp-pink)]',
          game_category: '影音',
          totals: '5,212'
        },
        {
          color: 'bg-[var(--cdp-yellow)]',
          game_category: '直播',
          totals: '100'
        },
        {
          color: 'bg-[var(--cdp-green)]',
          game_category: '電子書',
          totals: '4,972'
        },
        {
          color: 'bg-[var(--cdp-blue)]',
          game_category: 'AR/VR',
          totals: '200'
        },
        {
          color: 'bg-[var(--cdp-orange)]',
          game_category: 'Podcast',
          totals: '250'
        }
      ],
      first_play_count: [
        {
          color: 'bg-[#64AFFF]',
          game_category: '總計',
          totals: '0'
        },
        {
          color: 'bg-[var(--cdp-pink)]',
          game_category: '影音',
          totals: '0'
        },
        {
          color: 'bg-[var(--cdp-yellow)]',
          game_category: '直播',
          totals: '0'
        },
        {
          color: 'bg-[var(--cdp-green)]',
          game_category: '電子書',
          totals: '0'
        },
        {
          color: 'bg-[var(--cdp-blue)]',
          game_category: 'AR/VR',
          totals: '0'
        },
        {
          color: 'bg-[var(--cdp-orange)]',
          game_category: 'Podcast',
          totals: '0'
        }
      ],
      loss_count: [
        {
          color: 'bg-[#64AFFF]',
          game_category: '總計',
          totals: '39'
        },
        {
          color: 'bg-[var(--cdp-pink)]',
          game_category: '影音',
          totals: '23'
        },
        {
          color: 'bg-[var(--cdp-yellow)]',
          game_category: '直播',
          totals: '7'
        },
        {
          color: 'bg-[var(--cdp-green)]',
          game_category: '電子書',
          totals: '3'
        },
        {
          color: 'bg-[var(--cdp-blue)]',
          game_category: 'AR/VR',
          totals: '2'
        },
        {
          color: 'bg-[var(--cdp-orange)]',
          game_category: 'Podcast',
          totals: '4'
        }
      ],
      payoff: [
        {
          color: 'bg-[#64AFFF]',
          game_category: '總計',
          totals: '2,205.4'
        },
        {
          color: 'bg-[var(--cdp-pink)]',
          game_category: '影音',
          totals: '-2,406.6'
        },
        {
          color: 'bg-[var(--cdp-yellow)]',
          game_category: '直播',
          totals: '-100'
        },
        {
          color: 'bg-[var(--cdp-green)]',
          game_category: '電子書',
          totals: '4,262'
        },
        {
          color: 'bg-[var(--cdp-blue)]',
          game_category: 'AR/VR',
          totals: '200'
        },
        {
          color: 'bg-[var(--cdp-orange)]',
          game_category: 'Podcast',
          totals: '250'
        }
      ],
      users_count: [
        {
          color: 'bg-[#64AFFF]',
          game_category: '總計',
          totals: '115'
        },
        {
          color: 'bg-[var(--cdp-pink)]',
          game_category: '影音',
          totals: '106'
        },
        {
          color: 'bg-[var(--cdp-yellow)]',
          game_category: '直播',
          totals: '1'
        },
        {
          color: 'bg-[var(--cdp-green)]',
          game_category: '電子書',
          totals: '6'
        },
        {
          color: 'bg-[var(--cdp-blue)]',
          game_category: 'AR/VR',
          totals: '1'
        },
        {
          color: 'bg-[var(--cdp-orange)]',
          game_category: 'Podcast',
          totals: '1'
        }
      ]
    })
    expect(wrapper.vm.tableData).toStrictEqual([
      {
        color: 'bg-[#64AFFF]',
        game_category: '總計',
        totals: '2,205.4'
      },
      {
        color: 'bg-[var(--cdp-pink)]',
        game_category: '影音',
        totals: '-2,406.6'
      },
      {
        color: 'bg-[var(--cdp-yellow)]',
        game_category: '直播',
        totals: '-100'
      },
      {
        color: 'bg-[var(--cdp-green)]',
        game_category: '電子書',
        totals: '4,262'
      },
      {
        color: 'bg-[var(--cdp-blue)]',
        game_category: 'AR/VR',
        totals: '200'
      },
      {
        color: 'bg-[var(--cdp-orange)]',
        game_category: 'Podcast',
        totals: '250'
      }
    ])
    expect(wrapper.vm.chartTypeData).toStrictEqual({
      bet_amount: [
        {
          barWidth: '30px',
          color: '#64AFFF',
          data: ['6.0000', '0', '6.0000', '72.0000', '0', '10650.0000', '0'],
          name: '總計',
          type: 'bar'
        },
        {
          color: '',
          data: ['6.0000', '0', '6.0000', '0', '0', '5200.0000', '0'],
          name: '影音',
          type: 'line'
        },
        {
          color: '',
          data: ['0', '0', '0', '0', '0', '100.0000', '0'],
          name: '直播',
          type: 'line'
        },
        {
          color: '',
          data: ['0', '0', '0', '72.0000', '0', '4900.0000', '0'],
          name: '電子書',
          type: 'line'
        },
        {
          color: '',
          data: ['0', '0', '0', '0', '0', '200.0000', '0'],
          name: 'AR/VR',
          type: 'line'
        },
        {
          color: '',
          data: ['0', '0', '0', '0', '0', '250.0000', '0'],
          name: 'Podcast',
          type: 'line'
        }
      ],
      first_play_count: [
        {
          barWidth: '30px',
          color: '#64AFFF',
          data: [0, 0, 0, 0, 0, 0, 0],
          name: '總計',
          type: 'bar'
        },
        {
          color: '',
          data: [0, 0, 0, 0, 0, 0, 0],
          name: '影音',
          type: 'line'
        },
        {
          color: '',
          data: [0, 0, 0, 0, 0, 0, 0],
          name: '直播',
          type: 'line'
        },
        {
          color: '',
          data: [0, 0, 0, 0, 0, 0, 0],
          name: '電子書',
          type: 'line'
        },
        {
          color: '',
          data: [0, 0, 0, 0, 0, 0, 0],
          name: 'AR/VR',
          type: 'line'
        },
        {
          color: '',
          data: [0, 0, 0, 0, 0, 0, 0],
          name: 'Podcast',
          type: 'line'
        }
      ],
      loss_count: [
        {
          barWidth: '30px',
          color: '#64AFFF',
          data: [9, 0, 7, 11, 3, 9, 0],
          name: '總計',
          type: 'bar'
        },
        {
          color: '',
          data: [4, 0, 5, 8, 2, 4, 0],
          name: '影音',
          type: 'line'
        },
        {
          color: '',
          data: [2, 0, 1, 1, 0, 3, 0],
          name: '直播',
          type: 'line'
        },
        {
          color: '',
          data: [2, 0, 0, 1, 0, 0, 0],
          name: '電子書',
          type: 'line'
        },
        {
          color: '',
          data: [0, 0, 0, 1, 1, 0, 0],
          name: 'AR/VR',
          type: 'line'
        },
        {
          color: '',
          data: [1, 0, 1, 0, 0, 2, 0],
          name: 'Podcast',
          type: 'line'
        }
      ],
      payoff: [
        {
          barWidth: '30px',
          color: '#64AFFF',
          data: ['2.4000', '0', '6.0000', '-254.0000', '0', '2451.0000', '0'],
          name: '總計',
          type: 'bar'
        },
        {
          color: '',
          data: ['2.4000', '0', '6.0000', '0', '0', '-2415.0000', '0'],
          name: '影音',
          type: 'line'
        },
        {
          color: '',
          data: ['0', '0', '0', '0', '0', '-100.0000', '0'],
          name: '直播',
          type: 'line'
        },
        {
          color: '',
          data: ['0', '0', '0', '-254.0000', '0', '4516.0000', '0'],
          name: '電子書',
          type: 'line'
        },
        {
          color: '',
          data: ['0', '0', '0', '0', '0', '200.0000', '0'],
          name: 'AR/VR',
          type: 'line'
        },
        {
          color: '',
          data: ['0', '0', '0', '0', '0', '250.0000', '0'],
          name: 'Podcast',
          type: 'line'
        }
      ],
      users_count: [
        {
          barWidth: '30px',
          color: '#64AFFF',
          data: [1, 0, 1, 2, 0, 111, 0],
          name: '總計',
          type: 'bar'
        },
        {
          color: '',
          data: [1, 0, 1, 0, 0, 104, 0],
          name: '影音',
          type: 'line'
        },
        {
          color: '',
          data: [0, 0, 0, 0, 0, 1, 0],
          name: '直播',
          type: 'line'
        },
        {
          color: '',
          data: [0, 0, 0, 2, 0, 4, 0],
          name: '電子書',
          type: 'line'
        },
        {
          color: '',
          data: [0, 0, 0, 0, 0, 1, 0],
          name: 'AR/VR',
          type: 'line'
        },
        {
          color: '',
          data: [0, 0, 0, 0, 0, 1, 0],
          name: 'Podcast',
          type: 'line'
        }
      ]
    })
    expect(wrapper.vm.chartSeriesData).toStrictEqual([
      {
        barWidth: '30px',
        color: '#64AFFF',
        data: ['2.4000', '0', '6.0000', '-254.0000', '0', '2451.0000', '0'],
        name: '總計',
        type: 'bar'
      },
      {
        color: '',
        data: ['2.4000', '0', '6.0000', '0', '0', '-2415.0000', '0'],
        name: '影音',
        type: 'line'
      },
      {
        color: '',
        data: ['0', '0', '0', '0', '0', '-100.0000', '0'],
        name: '直播',
        type: 'line'
      },
      {
        color: '',
        data: ['0', '0', '0', '-254.0000', '0', '4516.0000', '0'],
        name: '電子書',
        type: 'line'
      },
      {
        color: '',
        data: ['0', '0', '0', '0', '0', '200.0000', '0'],
        name: 'AR/VR',
        type: 'line'
      },
      {
        color: '',
        data: ['0', '0', '0', '0', '0', '250.0000', '0'],
        name: 'Podcast',
        type: 'line'
      }
    ])

    // watch
    wrapper.vm.currentTabs = 'loss_count'
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tableData).toStrictEqual([
      {
        color: 'bg-[#64AFFF]',
        game_category: '總計',
        totals: '39'
      },
      {
        color: 'bg-[var(--cdp-pink)]',
        game_category: '影音',
        totals: '23'
      },
      {
        color: 'bg-[var(--cdp-yellow)]',
        game_category: '直播',
        totals: '7'
      },
      {
        color: 'bg-[var(--cdp-green)]',
        game_category: '電子書',
        totals: '3'
      },
      {
        color: 'bg-[var(--cdp-blue)]',
        game_category: 'AR/VR',
        totals: '2'
      },
      {
        color: 'bg-[var(--cdp-orange)]',
        game_category: 'Podcast',
        totals: '4'
      }
    ])
    expect(wrapper.vm.chartSeriesData).toStrictEqual([
      {
        barWidth: '30px',
        color: '#64AFFF',
        data: [9, 0, 7, 11, 3, 9, 0],
        name: '總計',
        type: 'bar'
      },
      {
        color: '',
        data: [4, 0, 5, 8, 2, 4, 0],
        name: '影音',
        type: 'line'
      },
      {
        color: '',
        data: [2, 0, 1, 1, 0, 3, 0],
        name: '直播',
        type: 'line'
      },
      {
        color: '',
        data: [2, 0, 0, 1, 0, 0, 0],
        name: '電子書',
        type: 'line'
      },
      {
        color: '',
        data: [0, 0, 0, 1, 1, 0, 0],
        name: 'AR/VR',
        type: 'line'
      },
      {
        color: '',
        data: [1, 0, 1, 0, 0, 2, 0],
        name: 'Podcast',
        type: 'line'
      }
    ])
  })

  it('getCssVar', () => {
    document.documentElement.style.setProperty('--test-color', ' #ff0000 ')

    expect(wrapper.vm.getCssVar('--test-color')).toStrictEqual('#ff0000')
  })

  it('getTrendValueByTargetId', () => {
    const fakeTrendData: GameReportTrend[] = [
      {
        bet_amount: '1000',
        data_date: '2024-01-01',
        first_play_count: 5,
        loss_count: 2,
        payoff: '800',
        target_id: 1,
        target_name: 'Target A',
        users_count: 10
      },
      {
        bet_amount: '2000',
        data_date: '2024-01-02',
        first_play_count: 10,
        loss_count: 5,
        payoff: '1500',
        target_id: 2,
        target_name: 'Target B',
        users_count: 20
      }
    ]

    expect(wrapper.vm.getTrendValueByTargetId(fakeTrendData, 'bet_amount', 1)).toBe('1000')
    expect(wrapper.vm.getTrendValueByTargetId(fakeTrendData, 'bet_amount', 2)).toBe('2000')
    expect(wrapper.vm.getTrendValueByTargetId(fakeTrendData, 'bet_amount', 999)).toBe(0)
    expect(wrapper.vm.getTrendValueByTargetId(fakeTrendData, 'nonexistentKey', 1)).toBe(0)
    expect(wrapper.vm.getTrendValueByTargetId(fakeTrendData, [], 'betAmount', 1)).toBe(0)
  })
})
