interface VideoTableReportsSearchType {
  hallValue: number
  gameCodes: string[]
  tableIds: string[]
  dateDuration: [Dayjs | undefined, Dayjs | undefined]
}

interface VideoTableReportsFilterFormState {
  dateDuration: [Dayjs | undefined, Dayjs | undefined]
}
