import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { notification } from 'ant-design-vue'
import { i18n } from '@/global/i18n'
import router from '@/router'

export const useSystemStore = defineStore(
  'systemStore',
  () => {
    const { t } = i18n.global

    const storeLogout = () => {
      sessionStorage.clear()
      localStorage.clear()
      notification['success']({
        message: t('msg.logout'),
        style: {
          width: '280px'
        },
        duration: 1.5
      })
      router.push({ name: 'Login' })
    }

    const menuList = ref<SidebarMenuItem[]>([])

    const views = import.meta.glob('@/views/**/*.vue') // 直接載入所有 Vue 檔案
    const getComponent = (path: string) =>
      views[`/src/views${path}.vue`] || views['/src/views/notFound.vue']

    // 將 api 回傳轉換成前端的檔案路徑
    const getComponentPath = (route: string): string => {
      // 轉換 `/operations/overall-report` → `/operations/overallReport/index`
      return route.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/\//g, '/') + '/index'
    }

    // 動態添加路由
    const generateMenuRoutes = (menu: ResultSidebar[]) => {
      let routes: RouteRecordRaw[] = []

      const processItem = (item: ResultSidebar) => {
        const route = {
          path: item.route,
          name: item.route, // 轉換名稱
          component: getComponent(getComponentPath(item.route)) // 轉換 component
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

    return { storeLogout, menuList, generateMenuRoutes }
  },
  {
    persist: true
  }
)
