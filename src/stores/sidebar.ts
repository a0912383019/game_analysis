import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebarStore', () => {
  const isSidebarClose = ref<boolean>(false) //sidebar預設開啟

  return { isSidebarClose }
})
