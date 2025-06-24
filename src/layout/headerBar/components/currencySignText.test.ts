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
    expect(wrapper.vm.currencySignText).toStrictEqual('亞洲')

    globalStore.currentPlatform = 'platc'
    expect(wrapper.vm.currencySignText).toStrictEqual('美洲')
  })

  it('getCurrencySign', () => {
    expect(wrapper.vm.getCurrencySign('platc')).toBe('$')
    expect(wrapper.vm.getCurrencySign('platd')).toBe('$')
    expect(wrapper.vm.getCurrencySign('plata')).toBe('¥')
    expect(wrapper.vm.getCurrencySign('platb')).toBe('¥')
    expect(wrapper.vm.getCurrencySign('unknown')).toBe('¥')
  })
})
