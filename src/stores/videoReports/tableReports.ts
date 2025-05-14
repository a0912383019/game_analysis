import { defineStore } from 'pinia'

export const useVideoReportsTableReportsStore = defineStore('tableReports', () => {
  const searchParams = reactive<TableReportsSearchType>({
    hallValue: 0,
    gameValue: [],
    liveRoom: [],
    liveTable: [],
    dateDuration: [undefined, undefined]
  })

  const isFiltered = ref<number>(0)

  return { searchParams, isFiltered }
})
