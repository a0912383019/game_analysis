import { it, describe, expect, afterEach, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { i18n } from '@/global/i18n'
import playCombination from '@/views/home/playCombination.vue'
import playTable from '@/views/home/components/playTable.vue'

describe('playTable', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = shallowMount(playCombination, {
      global: {
        plugins: [i18n],
        stubs: { ACard: { template: '<div><slot /></div>' } }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('components', () => {
    expect(wrapper.findAllComponents(playTable)).toHaveLength(1)
  })

  it('columns', () => {
    expect(wrapper.vm.combinationColumns).toStrictEqual([
      [
        {
          align: 'center',
          dataIndex: 'content',
          key: 'content',
          title: '遊玩組合',
          width: 380
        },
        {
          align: 'center',
          dataIndex: 'user_count_ratio',
          key: 'user_count_ratio',
          sorter: true,
          title: '人數比例'
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
          dataIndex: 'bet_amount',
          defaultSortOrder: 'descend',
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
          dataIndex: 'comprehensive_rtp',
          key: 'comprehensive_rtp',
          sorter: true,
          title: '綜合RTP'
        }
      ]
    ])
  })
})
