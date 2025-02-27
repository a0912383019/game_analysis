<script lang="ts" setup>
import { useRouter } from 'vue-router'
import type { CallbackTypes } from 'vue3-google-login'
import { apiLogin, apiRelease } from '@/api'

const router = useRouter()

// google login
const googleLoginCallback: CallbackTypes.CredentialCallback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  handleLogin({ credential: response.credential })
    .then(() => {
      //  登入成功取得api access_token後才導至首頁
      router.push({ path: '/home' })
    })
    .catch(() => {
      shake()
    })
}

const hasError = ref<boolean>(false)
const errorMsg = ref<string>('')

const handleLogin = async ({ credential }) => {
  hasError.value = false
  try {
    const response = await apiLogin({
      id_token: credential
    })
    const { result } = response

    if (typeof Storage !== 'undefined') {
      //判斷瀏覽器是否有支援web storage
      if (result === 'success') {
        const { email, name, picture, token_type, access_token } = response.ret
        let userInfoEntity = {
          name,
          email,
          picture
        }
        sessionStorage.user_info = JSON.stringify(userInfoEntity)
        // 將取得的access_token存入sessionStorage
        sessionStorage.access_token = token_type + ' ' + access_token
        return true
      } else {
        // 若為其他錯誤，顯示系統繁忙中
        hasError.value = true
        errorMsg.value = '系統繁忙中，請稍後再試'
        throw new Error()
      }
    } else {
      hasError.value = true
      errorMsg.value = '瀏覽器不支援html5功能，請更換瀏覽器後重新登入'
      throw new Error()
    }
  } catch (error) {
    hasError.value = true

    if (axios.isAxiosError(error)) {
      const { code } = error.response?.data

      if (code === '220401004') {
        errorMsg.value = '密碼錯誤或無此帳戶'
      } else if (code === '220400001') {
        errorMsg.value = '系統錯誤，請稍後再試'
      } else {
        errorMsg.value = '系統繁忙中，請稍後再試'
      }
    } else {
      errorMsg.value = '系統繁忙中，請稍後再試'
    }

    throw error
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
    <div class="login-logo mb-7 mt-1"></div>
    <div class="content" :class="{ isShaking }">
      <GoogleLogin :callback="googleLoginCallback" />
      <div class="error mt-1" v-show="hasError">
        {{ errorMsg }}
      </div>
    </div>
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
