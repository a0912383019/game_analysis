<script lang="ts" setup>
import { useRouter } from 'vue-router'
// import { notification } from 'ant-design-vue'
import type { CallbackTypes } from 'vue3-google-login'

const router = useRouter()

//google login
const googleLoginCallback: CallbackTypes.CredentialCallback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log(response)

  router.push({ path: '/home' })
  // notification['success']({
  //   message: 'Hello to work',
  //   duration: 3000
  // })
}
</script>
<template>
  <div class="container">
    <div class="content">
      <div class="login-logo"></div>
      <GoogleLogin :callback="googleLoginCallback"  prompt auto-login login />
    </div>
  </div>
  <div class="login-img" ></div>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;  
  height: 100vh;
  z-index: 10;     
  max-width: unset;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
.login-logo {
  width: 116px;
  height: 65px;
  flex-shrink: 0;
  background: url('@/assets/images/loginLogo.png') center / contain no-repeat;
}
.login-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/loginImg.png') center / cover no-repeat;
  z-index: -1;
}
</style>
