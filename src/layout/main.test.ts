import main from '@/layout/main.vue'
import { it, describe, expect, afterEach, beforeEach, vi } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { i18n } from '@/global/i18n'
import { createTestingPinia } from '@pinia/testing'
import router from '@/router'
import { useGlobalStore } from '@/stores'
import sidebar from '@/layout/sidebar/sidebar.vue'
import headerbar from '@/layout/headerbar/headerbar.vue'
import loadingBox from '@/components/loadingBox.vue'

describe('main', () => {
  let wrapper: VueWrapper<InstanceType<typeof main>>
  let globalStore: ReturnType<typeof useGlobalStore>

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    globalStore = useGlobalStore()

    wrapper = shallowMount(main, {
      global: {
        plugins: [i18n, router]
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('components', () => {
    expect(wrapper.findComponent(sidebar).exists()).toBe(true)
    expect(wrapper.findComponent(headerbar).exists()).toBe(true)
    expect(wrapper.findComponent(loadingBox).exists()).toBe(true)
  })

  it('currentPlatform & watchEffect', async () => {
    expect(wrapper.vm.currentPlatform).toStrictEqual('bbin')

    let setPropertySpy = vi.spyOn(document.documentElement.style, 'setProperty')
    globalStore.currentPlatform = 'midori'
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentPlatform).toStrictEqual('midori')
    expect(setPropertySpy).toHaveBeenCalledWith('--primary-color', '#332E21')
  })

  it('getColorByName', () => {
    expect(wrapper.vm.getColorByName('bbin')).toBe('#061127')
    expect(wrapper.vm.getColorByName('bbgp')).toBe('#18242C')
    expect(wrapper.vm.getColorByName('midori')).toBe('#332E21')
    expect(wrapper.vm.getColorByName('xyz')).toBe('#000000')
  })
})
