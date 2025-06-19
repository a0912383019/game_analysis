<script lang="ts" setup>
import { useRouter } from 'vue-router'
import type { CallbackTypes } from 'vue3-google-login'
import { apiLogin, apiRelease, apiGetSidebar } from '@/api'
import { useSystemStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { notification } from 'ant-design-vue'
import { generateMenuRoutes } from '@/router/dynamicRoutes'

const router = useRouter()

const systemStore = useSystemStore()
const { menuList } = storeToRefs(systemStore)

const isLoading = ref<boolean>(false)

// google login
const googleLoginCallback: CallbackTypes.CredentialCallback = (response) => {
  isLoading.value = true
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  handleLogin({ credential: response.credential })
    .then(async () => {
      // 取得路由的動態 sidebar
      await queryApiGetSidebar()
      // 登入成功取得 api access_token 後才導至首頁
      router.push({ path: '/home' })

      let { name } = JSON.parse(localStorage.game_user_info)
      notification['success']({
        message: `Hello, ${name}`,
        duration: 2
      })
    })
    .catch(() => {
      isLoading.value = false
      shake()
    })
}

const queryApiGetSidebar = async () => {
  try {
    const response = await apiGetSidebar()
    const { result } = response

    if (result === 'success' && response.ret.length !== 0) {
      localStorage.setItem('menu_config', JSON.stringify(response.ret))
      generateMenuList(response.ret)
      generateMenuRoutes(response.ret)
    } else {
      throw new Error()
    }
  } catch (err) {
    console.error(err)
    failMsg['msg4']['isShow'] = true // 系統錯誤
    throw new Error()
  }
}

const generateMenuList = (menuData: ResultSidebar[]) => {
  let keyCounter = 1

  function generateMenuItem(item: ResultSidebar) {
    const menuItem: SidebarMenuItem = {
      key: String(keyCounter++),
      name: item.title.replace(/\s+/g, '_').toLowerCase(),
      urlPath: item.route
    }

    if (item.submenu) {
      menuItem.child = item.submenu.map((subItem) => generateMenuItem(subItem))
    }

    return menuItem
  }

  menuList.value = menuData.map((item) => generateMenuItem(item))
}

const failMsg = reactive({
  msg1: {
    isShow: false,
    text: '密碼錯誤或無此帳戶'
  },
  msg2: {
    isShow: false,
    text: '系統繁忙中，請稍後再試'
  },
  msg3: {
    isShow: false,
    text: '瀏覽器不支援html5功能，請更換瀏覽器後重新登入'
  },
  msg4: {
    isShow: false,
    text: '系統錯誤，請聯繫管理員'
  }
})

const hideErrorMsg = () => {
  //關閉所有錯誤訊息
  Object.values(failMsg).forEach((item) => {
    item.isShow = false
  })
}

const handleLogin = async ({ credential }) => {
  hideErrorMsg()
  try {
    const response = await apiLogin({
      id_token: credential
    })
    const { result } = response

    if (typeof Storage !== 'undefined') {
      //判斷瀏覽器是否有支援 web storage
      if (result === 'success') {
        const { email, name, picture, token_type, access_token } = response.ret
        let userInfoEntity = {
          name,
          email,
          picture
        }
        // 將取得的 access_token 存入 localStorage
        localStorage.setItem('game_user_info', JSON.stringify(userInfoEntity))
        localStorage.setItem('game_access_token', token_type + ' ' + access_token)
        return true
      } else {
        throw new Error('unknown')
      }
    } else {
      throw new Error('web storage not supported')
    }
  } catch (error) {
    console.error(error)

    if (axios.isAxiosError(error)) {
      const { code } = error.response?.data

      if (code === '220401004') {
        failMsg['msg1']['isShow'] = true // 登入失敗錯誤訊息
      } else if (code === '220400001') {
        failMsg['msg4']['isShow'] = true // 系統錯誤
      } else {
        failMsg['msg2']['isShow'] = true // 系統繁忙中
      }
    } else if (error instanceof Error) {
      if (error.message === 'web storage not supported') {
        failMsg['msg3']['isShow'] = true // 瀏覽器不支援 web storage
      } else {
        failMsg['msg2']['isShow'] = true // 系統繁忙中
      }
    } else {
      failMsg['msg2']['isShow'] = true // 系統繁忙中
    }

    throw new Error()
  }
}

// 震動
const isShaking = ref(false)
const shake = () => {
  isShaking.value = true
  setTimeout(() => {
    isShaking.value = false
  }, 2000)
}

// 用來確認 api 有沒有通
const queryApiRelease = async () => {
  try {
    const result = await apiRelease()
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  queryApiRelease()
})
</script>
<template>
  <div class="container">
    <div class="login-logo !mb-7 !mt-1"></div>
    <div class="content" :class="{ isShaking }">
      <GoogleLogin :callback="googleLoginCallback" />
      <div class="error !mt-1" v-show="failMsg.msg1.isShow">{{ failMsg.msg1.text }}</div>
      <div class="error !mt-1" v-show="failMsg.msg2.isShow">{{ failMsg.msg2.text }}</div>
      <div class="error !mt-1" v-show="failMsg.msg3.isShow">{{ failMsg.msg3.text }}</div>
      <div class="error !mt-1" v-show="failMsg.msg4.isShow">{{ failMsg.msg4.text }}</div>
    </div>
  </div>
  <div class="loadingContainer" v-show="isLoading">
    <loading-box />
  </div>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  max-width: unset;
  background: url('@/assets/images/loginImg.png') center / cover no-repeat;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-logo {
  width: 116px;
  height: 65px;
  flex-shrink: 0;
  background: url('@/assets/images/loginLogo.png') center / contain no-repeat;
}
.loadingContainer {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(#000000, 0.8);
}
@keyframes shakeAni {
  10%,
  90% {
    transform: translateX(-1px);
  }
  20%,
  80% {
    transform: translateX(2px);
  }
  30%,
  50%,
  70% {
    transform: translateX(-4px);
  }
  40%,
  60% {
    transform: translateX(4px);
  }
}
.isShaking {
  animation: shakeAni infinite 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
@keyframes is-invalid-animation {
  0% {
    opacity: 1;
    color: #dc3545;
  }
  10% {
    opacity: 1;
    color: #e56e3c;
  }
  20% {
    opacity: 1;
    color: #ff9900;
  }
  30% {
    opacity: 1;
    color: #e56e3c;
  }
  40% {
    opacity: 1;
    color: #dc3545;
  }
  50% {
    opacity: 1;
    color: #e56e3c;
  }
  60% {
    opacity: 1;
    color: #ff9900;
  }
  70% {
    opacity: 1;
    color: #e56e3c;
  }
  80% {
    opacity: 1;
    color: #dc3545;
  }
  90% {
    opacity: 1;
    color: #e56e3c;
  }
  100% {
    opacity: 1;
    color: #ff9900;
  }
}
.error {
  font-size: 13px;
  animation-duration: 2s;
  animation-name: is-invalid-animation;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
}
</style>
