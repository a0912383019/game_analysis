import { defineStore } from 'pinia'

export const useOperationsOverallReportStore = defineStore('overallReport', () => {
  const searchParams = reactive<OverallReportSearchType>({
    hallValue: 0,
    memberType: '',
    memberValue: [],
    lobbyGameValue: undefined,
    deviceTypeValue: undefined,
    dateDuration: [undefined, undefined]
  })

  const isFiltered = ref<number>(0)

  return { searchParams, isFiltered }
})
