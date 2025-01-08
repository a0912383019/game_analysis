import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', () => {
  const isLoading = ref<boolean>(true)

  const currentPlatform = ref<string>('bbin')

  return { isLoading, currentPlatform }
})
