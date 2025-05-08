import { it, describe, expect, afterEach, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { i18n } from '@/global/i18n'
import playFlow from '@/views/home/playFlow.vue'
import playTable from '@/views/home/components/playTable.vue'

describe('playTable', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = shallowMount(playFlow, {
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

  it('flowColumns', () => {
    expect(wrapper.vm.flowColumns).toStrictEqual([
      [
        {
          title: '遊玩流向',
          width: 380,
          dataIndex: 'content',
          key: 'content',
          align: 'center'
        },
        {
          title: '人數',
          dataIndex: 'user_count',
          key: 'user_count',
          align: 'center',
          sorter: true
        },
        {
          title: '貨量',
          dataIndex: 'bet_amount',
          key: 'bet_amount',
          align: 'center',
          defaultSortOrder: 'descend',
          sorter: true
        },
        {
          title: '損益',
          dataIndex: 'payoff',
          key: 'payoff',
          align: 'center',
          sorter: true
        },
        {
          title: '綜合RTP',
          dataIndex: 'comprehensive_rtp',
          key: 'comprehensive_rtp',
          align: 'center',
          sorter: true
        }
      ]
    ])
  })
})
