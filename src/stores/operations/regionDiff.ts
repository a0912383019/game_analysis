import { defineStore } from 'pinia'

export const useOperationsRegionDiffStore = defineStore('regionDiff', () => {
  const searchParams = reactive<RegionDiffSearchType>({
    hallValue: 0,
    gamePlayValue: [],
    deviceValue: undefined,
    nationRegionValue: [],
    dateDuration: [undefined, undefined]
  })

  const isFiltered = ref<number>(0)

  return { searchParams, isFiltered }
})
