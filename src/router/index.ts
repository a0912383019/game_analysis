import { createRouter, createWebHistory } from 'vue-router'
import mainLayout from '@/layout/main.vue'
import { useGlobalStore } from '@/stores/global'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/example',
      name: 'example',
      component: () => import('../views/example.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/',
      component: mainLayout,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: '/member_bet_inquiry',
          name: 'MemberBetQuery',
          component: () => import('@/views/operationCenter/memberBetQuery/index.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const globalStore = useGlobalStore()
  globalStore.isLoading = true
  next()
})

router.afterEach((to, from) => {
  const globalStore = useGlobalStore()
  setTimeout(() => (globalStore.isLoading = false), 2000)
})

export default router
