import { it, describe, expect, afterEach, vi, beforeEach, Mock } from 'vitest'
import { VueWrapper, shallowMount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from '@/global/i18n'
import topCard from '@/views/home/topCard.vue'
import { apiGetGameReportByLobbyGroup } from '@/api'

vi.mock('@/api', () => ({
  apiGetGameReportByLobbyGroup: vi.fn()
}))

describe('topCard', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    const mockApiGetGameReportByLobbyGroup = apiGetGameReportByLobbyGroup as Mock
    mockApiGetGameReportByLobbyGroup.mockResolvedValueOnce({
      result: 'success',
      ret: [
        {
          lobby_group: 2,
          bet_amount: '200.0000',
          payoff: '-192.0000',
          user_count: 1,
          wager_count: 1
        },
        {
          lobby_group: 3,
          bet_amount: '50.0000',
          payoff: '-35.4000',
          user_count: 2,
          wager_count: 6
        },
        {
          lobby_group: 5,
          bet_amount: '1827791.0000',
          payoff: '54080.0500',
          user_count: 5,
          wager_count: 1269
        },
        {
          lobby_group: 6,
          bet_amount: '30.0000',
          payoff: '-55.0000',
          user_count: 1,
          wager_count: 3
        }
      ]
    })

    wrapper = shallowMount(topCard, {
      global: {
        plugins: [i18n, createTestingPinia({ createSpy: vi.fn })]
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('expect api called correctly', async () => {
    await flushPromises()
    const expectApiResponse: ResultGameReportByLobbyGroup[] = [
      {
        bet_amount: '200.0000',
        lobby_group: 2,
        payoff: '-192.0000',
        user_count: 1,
        wager_count: 1
      },
      {
        bet_amount: '50.0000',
        lobby_group: 3,
        payoff: '-35.4000',
        user_count: 2,
        wager_count: 6
      },
      {
        bet_amount: '1827791.0000',
        lobby_group: 5,
        payoff: '54080.0500',
        user_count: 5,
        wager_count: 1269
      },
      {
        bet_amount: '30.0000',
        lobby_group: 6,
        payoff: '-55.0000',
        user_count: 1,
        wager_count: 3
      }
    ]
    expect(wrapper.vm.apiResponse).toStrictEqual(expectApiResponse)
    const expectCardList: HomeCard[] = [
      {
        amount: '6',
        bet: '50',
        customShapeColor: 'bg-[var(--cdp-pink)]',
        payoff: '-35.4',
        people: '2',
        title: 'prob'
      },
      {
        amount: '1',
        bet: '200',
        customShapeColor: 'bg-[var(--cdp-yellow)]',
        payoff: '-192',
        people: '1',
        title: 'live'
      },
      {
        amount: '3',
        bet: '30',
        customShapeColor: 'bg-[var(--cdp-green)]',
        payoff: '-55',
        people: '1',
        title: 'card'
      },
      {
        amount: '1,269',
        bet: '1,827,791',
        customShapeColor: 'bg-[var(--cdp-blue)]',
        payoff: '54,080.05',
        people: '5',
        title: 'fish'
      },
      {
        amount: '--',
        bet: '--',
        customShapeColor: 'bg-[var(--cdp-orange)]',
        payoff: '--',
        people: '--',
        title: 'lottery'
      }
    ]
    expect(wrapper.vm.cardList).toStrictEqual(expectCardList)
  })
})
