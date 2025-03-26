interface BaseStatus {
  result: string
}

interface BaseStatusWithData<T> {
  result: string
  ret: T
}

// api 不會回傳 ret (e.g. 更新或修改 api)，使用 BaseStatus
type ApiResponse<T = undefined> = T extends undefined ? BaseStatus : BaseStatusWithData<T>

interface BasePaginationParams {
  order: 'DESC' | 'ASC'
  length: number
  start: number
  sort: string
}
