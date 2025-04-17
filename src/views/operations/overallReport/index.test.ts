import { it, describe, expect, afterEach, beforeEach, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import index from '@/views/operations/overallReport/index.vue'
import filterBox from '@/views/operations/overallReport/filter.vue'
import tableBox from '@/views/operations/overallReport/table.vue'
import { useOperationsOverallReportStore } from '@/stores'

describe('index.vue', () => {
  let wrapper: VueWrapper<any>
  let operationsOverallReportStore: ReturnType<typeof useOperationsOverallReportStore>

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    operationsOverallReportStore = useOperationsOverallReportStore()
    operationsOverallReportStore.isFiltered = 1

    expect(operationsOverallReportStore.isFiltered).toStrictEqual(1)
    wrapper = shallowMount(index)
  })

  afterEach(() => {
    wrapper.unmount()
    expect(operationsOverallReportStore.isFiltered).toStrictEqual(0)
  })

  it('components', () => {
    expect(wrapper.findComponent(filterBox).exists()).toBe(true)
    expect(wrapper.findComponent(tableBox).exists()).toBe(true)
  })
})
