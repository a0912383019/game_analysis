export interface ChildMenu {
  key: string
  name: string
  urlPath: string
}

export interface MenuItem {
  key: string
  name: string
  urlPath?: string
  child?: ChildMenu[]
}
