export interface ChildMenu {
  name: string
  urlPath: string
}

export interface MenuItem {
  name: string
  urlPath?: string
  child?: ChildMenu[]
}
