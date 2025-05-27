import { defineStore } from 'pinia'

export const useVideoReportsTableReportsStore = defineStore('tableReports', () => {
  const searchParams = reactive<VideoTableReportsSearchType>({
    hallValue: 0,
    gameCodes: [],
    tableIds: [],
    dateDuration: [undefined, undefined]
  })

  const isFiltered = ref<number>(0)

  return { searchParams, isFiltered }
})
