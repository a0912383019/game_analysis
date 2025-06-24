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
          align: 'left',
          dataIndex: 'content',
          key: 'content',
          title: '內容組合走向',
          width: 520
        },
        {
          align: 'center',
          dataIndex: 'user_count',
          key: 'user_count',
          sorter: true,
          title: '留言數',
          width: 120
        },
        {
          align: 'center',
          dataIndex: 'bet_amount',
          defaultSortOrder: 'descend',
          key: 'bet_amount',
          sorter: true,
          title: '流量',
          width: 120
        },
        {
          align: 'center',
          dataIndex: 'payoff',
          key: 'payoff',
          sorter: true,
          title: '瀏覽趨勢',
          width: 120
        },
        {
          align: 'center',
          dataIndex: 'comprehensive_rtp',
          key: 'comprehensive_rtp',
          sorter: true,
          title: '綜合滿意度',
          width: 120
        }
      ]
    ])
  })
})
