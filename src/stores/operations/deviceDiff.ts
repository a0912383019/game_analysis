import { defineStore } from 'pinia'

export const useOperationsDeviceDiffStore = defineStore('deviceDiff', () => {
  const searchParams = reactive<DeviceDiffSearchType>({
    hallValue: 0,
    gamePlayValue: [],
    singleDeviceValue: 0,
    betTotalValue: undefined,
    dateDuration: [undefined, undefined]
  })

  const isFiltered = ref<number>(0)

  return { searchParams, isFiltered }
})
