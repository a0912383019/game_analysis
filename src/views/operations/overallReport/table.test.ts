import { it, describe, expect, afterEach, vi, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from '@/global/i18n'
import { useOperationsOverallReportStore } from '@/stores'
import table from '@/views/operations/overallReport/table.vue'
import hallTable from '@/views/operations/overallReport/table/hallTable.vue'
import gameTable from '@/views/operations/overallReport/table/gameTable.vue'
import playTable from '@/views/operations/overallReport/table/playTable.vue'
import dateTable from '@/views/operations/overallReport/table/dateTable.vue'

vi.mock('@/utils/commonUtils', () => ({
  formatToApiDate: vi.fn(() => '2025-03-10')
}))

describe('table', () => {
  let wrapper: VueWrapper<any>
  let operationsOverallReportStore: ReturnType<typeof useOperationsOverallReportStore>

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    operationsOverallReportStore = useOperationsOverallReportStore()
    operationsOverallReportStore.searchParams = {
      memberType: 'account',
      memberValue: ['tom'],
      gamePlayValue: [{ lobby: 5 }],
      deviceTypeValue: 6,
      dateDuration: [undefined, undefined],
      hallValue: 6
    }

    wrapper = shallowMount(table, {
      global: {
        plugins: [i18n],
        stubs: {
          KeepAlive: {
            template: '<div><slot /></div>'
          }
        }
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
  })

  it('buttonGroup', () => {
    expect(wrapper.vm.buttonGroup).toStrictEqual([
      {
        name: '廳主',
        value: 'hallTable'
      },
      {
        name: '遊戲',
        value: 'gameTable'
      },
      {
        name: '玩法',
        value: 'playTable'
      },
      {
        name: '日期',
        value: 'dateTable'
      }
    ])
  })

  it('components variables', async () => {
    expect(wrapper.vm.currentTabs).toStrictEqual('hallTable')
    expect(wrapper.vm.componentMap).toStrictEqual({
      hallTable,
      gameTable,
      playTable,
      dateTable
    })
    expect(wrapper.vm.currentTabComponent).toStrictEqual(hallTable)
    expect(wrapper.findComponent(hallTable).exists()).toBeTruthy()
    expect(wrapper.findComponent(gameTable).exists()).toBeFalsy()
    expect(wrapper.findComponent(playTable).exists()).toBeFalsy()
    expect(wrapper.findComponent(dateTable).exists()).toBeFalsy()

    wrapper.vm.currentTabs = 'gameTable'
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(hallTable).exists()).toBeFalsy()
    expect(wrapper.findComponent(gameTable).exists()).toBeTruthy()
    expect(wrapper.findComponent(playTable).exists()).toBeFalsy()
    expect(wrapper.findComponent(dateTable).exists()).toBeFalsy()
  })

  it('watch', async () => {
    expect(wrapper.vm.keepAliveKey).toStrictEqual(0)

    operationsOverallReportStore.isFiltered = 2
    await wrapper.vm.$nextTick()
    // getParamInfo function
    expect(operationsOverallReportStore.tableBaseParams).toStrictEqual({
      device: 6,
      endDate: '2025-03-10',
      game: [
        {
          lobby: 5
        }
      ],
      hallId: 6,
      startDate: '2025-03-10',
      username: ['tom']
    })
    expect(wrapper.vm.keepAliveKey).toStrictEqual(2)
  })
})
