import { createRouter, createWebHistory } from 'vue-router'
import mainLayout from '@/layout/main.vue'
import { useGlobalStore } from '@/stores'

// 不用登入即可觀看的頁面
const whiteList = ['/login']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: (to) => {
        const isLogin = !!sessionStorage.getItem('game_user_info')
        return isLogin ? '/home' : '/login'
      }
    },
    {
      path: '/example',
      name: 'example',
      component: () => import('@/views/example.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login.vue')
    },
    // 在 login.vue，會整理 api 回傳動態添加路由
    {
      path: '/game',
      name: 'Game',
      component: mainLayout
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const globalStore = useGlobalStore()
  globalStore.isLoading = true

  // 如果是白名單，直接進入
  if (whiteList.includes(to.path)) {
    return next()
  }

  // 檢查是否已登入
  const isLogin = !!sessionStorage.getItem('game_user_info')

  // 如果已登入，繼續跳轉；否則導向登入頁
  isLogin ? next() : next({ name: 'Login' })
})

router.afterEach((to, from) => {
  const globalStore = useGlobalStore()
  globalStore.isLoading = false
})

export default router
