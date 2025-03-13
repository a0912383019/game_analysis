import { it, describe, expect, afterEach, beforeEach, vi } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import currencySignText from '@/layout/headerBar/components/currencySignText.vue'
import { i18n } from '@/global/i18n'
import { createTestingPinia } from '@pinia/testing'
import { useGlobalStore } from '@/stores'

describe('currencySignText', () => {
  let wrapper: VueWrapper<any>
  let globalStore: ReturnType<typeof useGlobalStore>

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    globalStore = useGlobalStore()

    wrapper = shallowMount(currencySignText, {
      global: {
        plugins: [i18n]
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('currencySignText', () => {
    expect(wrapper.vm.currencySignText).toStrictEqual('人民幣')

    globalStore.currentPlatform = 'midori'
    expect(wrapper.vm.currencySignText).toStrictEqual('菲律賓披索')
  })

  it('getCurrencySign', () => {
    expect(wrapper.vm.getCurrencySign('xc-tw')).toBe('$')
    expect(wrapper.vm.getCurrencySign('xc-ml')).toBe('RM')
    expect(wrapper.vm.getCurrencySign('midori')).toBe('₱')
    expect(wrapper.vm.getCurrencySign('bbin')).toBe('¥')
    expect(wrapper.vm.getCurrencySign('bbgp')).toBe('¥')
    expect(wrapper.vm.getCurrencySign('unknown')).toBe('¥')
  })
})
