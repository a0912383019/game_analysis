import { it, describe, expect, afterEach } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import index from '@/views/operations/betSearch/index.vue'
import filterBox from '@/views/operations/betSearch/filter.vue'
import tableBox from '@/views/operations/betSearch/table.vue'

describe('index.vue', () => {
  let wrapper: VueWrapper<any>

  afterEach(() => {
    wrapper.unmount()
  })

  it('components', () => {
    wrapper = shallowMount(index)
    expect(wrapper.findComponent(filterBox).exists()).toBe(true)
    expect(wrapper.findComponent(tableBox).exists()).toBe(true)
  })
})
