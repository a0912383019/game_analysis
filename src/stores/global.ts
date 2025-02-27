import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', () => {
  const isSidebarClose = ref<boolean>(false) // sidebar預設開啟

  const isLoading = ref<boolean>(true)

  const currentPlatform = ref<string>('bbin')

  return { isSidebarClose, isLoading, currentPlatform }
})
