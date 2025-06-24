import { createRouter, createWebHashHistory } from 'vue-router'
import { useGlobalStore } from '@/stores'

// 不用登入即可觀看的頁面
const whiteList = ['/login']

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        const hasRoute = router.hasRoute('/home')
        return hasRoute ? '/home' : '/login'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
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
      component: () => import('@/layout/main.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const globalStore = useGlobalStore()
  globalStore.isLoading = true

  // 如果是白名單，直接進入
  if (whiteList.includes(to.path)) {
    next()
    return
  }

  // 特殊路由，會顯示空 layoout，所以直接導轉
  if (to.path === '/game') {
    next('/')
    return
  }

  // 檢查是否已登入
  const isLogin = !!localStorage.getItem('game_user_info')

  // 如果已登入，繼續跳轉；否則導向登入頁
  isLogin ? next() : next({ name: 'Login' })
})

router.afterEach((to, from) => {
  const globalStore = useGlobalStore()
  // 重置 global store 狀態
  if (to.name === 'Login') {
    globalStore.resetState()
  }
  globalStore.isLoading = false
})

export default router
