import { it, describe, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSystemStore } from '@/stores'

describe('useSystemStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('menuList', () => {
    const systemStore = useSystemStore()
    expect(systemStore.menuList).toEqual([])

    const menuItem: SidebarMenuItem = {
      key: 'home',
      name: 'Home',
      urlPath: '/home'
    }
    systemStore.menuList.push(menuItem)
    expect(systemStore.menuList[0]).toStrictEqual(menuItem)
  })
})
