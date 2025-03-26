interface SidebarMenuItem {
  key: string
  name: string
  urlPath?: string
  child?: SidebarMenuItem[]
}
