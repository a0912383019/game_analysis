import { it, describe, expect, afterEach, beforeEach, vi } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import platformGroup from '@/layout/headerBar/components/platformGroup.vue'
import { i18n } from '@/global/i18n'
import { createTestingPinia } from '@pinia/testing'
import { useGlobalStore } from '@/stores'

vi.mock('@/../public/js/system_config', () => ({
  platformDict: [
    {
      name: 'plata',
      key: 'plata',
      pColor: '#061127'
    },
    {
      name: 'platb',
      key: 'platb',
      pColor: '#18242C'
    },
    {
      name: 'Midori',
      key: 'midori',
      pColor: '#332E21'
    }
  ]
}))

describe('platformGroup', () => {
  let wrapper: VueWrapper<any>
  let globalStore: ReturnType<typeof useGlobalStore>

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    globalStore = useGlobalStore()

    wrapper = shallowMount(platformGroup, {
      global: {
        plugins: [i18n]
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('currentPlatform & handleChangePlatform', () => {
    expect(wrapper.vm.currentPlatform).toStrictEqual('plata')

    wrapper.vm.handleChangePlatform('midori')
    expect(globalStore.currentPlatform).toStrictEqual('midori')
    expect(wrapper.vm.currentPlatform).toStrictEqual('midori')
  })
})
