import '@/assets/css/tailwind.css'
import '@/assets/css/master.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { i18n } from '@/global/i18n'
import { globalRegister } from '@/global'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'

const app: ReturnType<typeof createApp> = createApp(App)
globalRegister(app)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(i18n)
app.use(pinia)
app.use(router)
app.use(Antd).mount('#app')
