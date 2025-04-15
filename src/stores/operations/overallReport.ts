import { defineStore } from 'pinia'

export const useOperationsOverallReportStore = defineStore('overallReport', () => {
  const searchParams = reactive<OverallReportSearchType>({
    hallValue: 0,
    memberType: '',
    memberValue: [],
    gamePlayValue: [],
    deviceTypeValue: undefined,
    dateDuration: [undefined, undefined]
  })

  const isFiltered = ref<number>(0)

  const tableBaseParams = reactive<BaseOverallReportParams>({})

  return { searchParams, isFiltered, tableBaseParams }
})
