import '@/assets/css/tailwind.css'
import '@/assets/css/master.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { i18n } from '@/global/i18n'
import { globalRegister } from '@/global'
import Antd from 'ant-design-vue'
import App from '@/App.vue'
import router from '@/router'
import { generateMenuRoutes } from '@/router/dynamicRoutes'
import { getSessionStorageEntity } from '@/utils/commonUtils'

const app: ReturnType<typeof createApp> = createApp(App)
globalRegister(app)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(i18n)
app.use(pinia)
app.use(Antd)

// 重整頁面會丟失動態添加的 route，所以須重新加入
const storageMenu = getSessionStorageEntity('game_config').menu_config
if (storageMenu) {
  generateMenuRoutes(storageMenu)
} else {
  sessionStorage.clear()
  localStorage.clear()
  router.push({ name: 'Login' })
}

app.use(router)
app.mount('#app')
