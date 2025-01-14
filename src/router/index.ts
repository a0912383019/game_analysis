import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layout/Main.vue'
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
      component: () => import('../views/Example.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('../views/Home/Home.vue')
        },
        {
          path: '/summary_report',
          name: 'SummaryReport',
          component: () => import('../views/Total/TotalM.vue')
        },
        {
          path: '/operational_analysis_chart',
          name: 'OperationalAnalysisChart',
          component: () => import('../views/Total/TotalS.vue')
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
