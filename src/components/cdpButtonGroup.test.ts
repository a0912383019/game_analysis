import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import cdpButtonGroup from '@/components/cdpButtonGroup.vue'

describe('cdpButtonGroup', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = shallowMount(cdpButtonGroup)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  // 測試是否正確應用預設 props
  it('should correctly apply props', () => {
    expect(wrapper.props().itemObj).toStrictEqual([
      { name: '廳主', value: 1 },
      { name: '遊戲', value: 2 },
      { name: '玩法', value: 3 }
    ])
    expect(wrapper.vm.selectedItems).toBe(1)
    expect(wrapper.findAllComponents({ name: 'a-button' }).length).toBe(3)
  })

  // 模擬點擊第二個按鈕並測試狀態更新與事件觸發
  it('should update selectedItems and emit on button click', () => {
    wrapper.vm.onSelect(2)
    expect(wrapper.vm.selectedItems).toBe(2)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  // 測試元件是否能正確處理字串類型的 value
  it('should handle string values correctly', () => {
    wrapper = shallowMount(cdpButtonGroup, {
      props: {
        itemObj: [
          { name: 'A', value: 'a' },
          { name: 'B', value: 'b' }
        ]
      }
    })

    expect(wrapper.vm.selectedItems).toBe('a')
    wrapper.vm.onSelect('b')
    expect(wrapper.vm.selectedItems).toBe('b')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })
})
