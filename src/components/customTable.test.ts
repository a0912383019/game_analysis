import { describe, it, expect, vi, beforeEach } from 'vitest'
import { VueWrapper, shallowMount, flushPromises } from '@vue/test-utils'
import customTable from '@/components/customTable.vue'
import { i18n } from '@/global/i18n'

const generateMockProps = () => ({
  dataSource: Array.from({ length: 30 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` })),
  columns: [
    [
      { title: 'ID', dataIndex: 'id' },
      { title: 'Name', dataIndex: 'name' }
    ]
  ],
  pageSize: 10,
  serverSide: false,
  loading: false,
  hasPage: true,
  canExpand: false
})

describe('customTable.vue', () => {
  let wrapper: VueWrapper<any>
  let props: any

  beforeEach(() => {
    props = generateMockProps()
  })

  it('page variables & goToFirstPage', async () => {
    const wrapper = shallowMount(customTable, {
      global: {
        plugins: [i18n]
      },
      props
    })
    expect(wrapper.vm.currentPage).toStrictEqual(1)
    expect(wrapper.vm.pageSize).toStrictEqual(10)

    wrapper.vm.currentPage = 2
    expect(wrapper.vm.currentPage).toStrictEqual(2)

    wrapper.vm.goToFirstPage()
    expect(wrapper.vm.currentPage).toStrictEqual(1)
  })

  it('should change page when pagination changes', async () => {
    wrapper = shallowMount(customTable, {
      global: {
        plugins: [i18n]
      },
      props
    })

    await wrapper.vm.$nextTick()

    const pagination = wrapper.vm.pagination
    pagination.onChange(2, 10)
    await wrapper.vm.$nextTick()

    const pageTableData = wrapper.vm.pageTableData
    expect(pageTableData[0].id).toBe(11)
  })

  it('should emit tableChange in serverSide mode', async () => {
    wrapper = shallowMount(customTable, {
      global: {
        plugins: [i18n]
      },
      props: {
        ...props,
        serverSide: true
      }
    })

    await wrapper
      .findComponent({ name: 'ATable' })
      .vm.$emit('change', { current: 2, pageSize: 10 }, {}, { order: 'descend', field: 'id' })

    expect(wrapper.emitted()['update:tableChange']).toBeTruthy()
    expect(wrapper.emitted()['update:tableChange'][0]).toEqual([2, 10, 'descend', 'id'])
  })

  it('should call fetchSubData when expanding row', async () => {
    const fetchSubData = vi.fn()
    wrapper = shallowMount(customTable, {
      global: {
        plugins: [i18n]
      },
      props: {
        ...props,
        canExpand: true,
        columns: [props.columns[0], [{ title: 'Inner', dataIndex: 'inner' }]],
        fetchSubData: [fetchSubData]
      }
    })

    const record = {
      id: 1,
      innerPagination: { current: 1, pageSize: 10, total: 0 },
      innerLoading: true
    }
    await wrapper.vm.handleExpand(true, record)

    expect(fetchSubData).toHaveBeenCalled()
  })

  it('handleSubTableChange', () => {
    const subFunc1 = vi.fn()
    wrapper = shallowMount(customTable, {
      global: {
        plugins: [i18n]
      },
      props: {
        ...props,
        serverSide: true,
        fetchSubData: [subFunc1]
      }
    })

    const record = {
      innerPagination: {
        current: 1,
        pageSize: 5,
        order: 'ascend',
        sort: 'hall_name'
      }
    }
    expect(subFunc1).toBeCalledTimes(0)
    wrapper.vm.handleSubTableChange(2, 10, 'descend', 'payoff', record)
    expect(subFunc1).toBeCalledTimes(1)
    expect(record.innerPagination).toStrictEqual({
      current: 2,
      order: 'descend',
      pageSize: 10,
      sort: 'payoff'
    })
  })

  it('closeAllExpandedRows', () => {
    wrapper = shallowMount(customTable, {
      global: {
        plugins: [i18n]
      },
      props
    })

    let closeAllExpandedRows = vi.fn()
    wrapper.vm.childRef = { closeAllExpandedRows }

    expect(closeAllExpandedRows).toBeCalledTimes(0)
    wrapper.vm.closeAllExpandedRows()
    expect(closeAllExpandedRows).toBeCalledTimes(1)
  })
})
