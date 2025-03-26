import { defineStore } from 'pinia'

export const useSystemStore = defineStore(
  'systemStore',
  () => {
    const menuList = ref<SidebarMenuItem[]>([])

    return { menuList }
  },
  {
    persist: true
  }
)
