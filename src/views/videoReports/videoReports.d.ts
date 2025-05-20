interface TableReportsSearchType {
  hallValue: number
  gameValue: string[]
  liveRoom: string[]
  liveTable: string[]
  dateDuration: [Dayjs | undefined, Dayjs | undefined]
}

interface TableReportsFilterFormState {
  dateDuration: [Dayjs | undefined, Dayjs | undefined]
}
