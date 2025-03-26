import { RouteRecordRaw } from 'vue-router'
import router from '@/router'

const views = import.meta.glob('@/views/**/*.vue') // 直接載入所有 Vue 檔案
const getComponent = (path: string) =>
  views[`/src/views${path}.vue`] || views['/src/views/notFound.vue']

const getComponentPath = (route: string): string => {
  return route.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/\//g, '/') + '/index'
}

export const generateMenuRoutes = (menu: ResultSidebar[]) => {
  let routes: RouteRecordRaw[] = []

  const processItem = (item: ResultSidebar) => {
    const route = {
      path: item.route,
      name: item.route,
      component: getComponent(getComponentPath(item.route))
    }
    routes.push(route)

    // 遞迴處理 submenu
    if (item.submenu) {
      item.submenu.forEach(processItem)
    }
  }

  menu.forEach(processItem)

  routes.forEach((route) => {
    router.addRoute('Game', {
      ...route
    })
  })
}
