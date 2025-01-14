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
  <GoogleLogin :callback="googleLoginCallback" prompt auto-login />
</template>
<style lang="scss" scoped></style>
