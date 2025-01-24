// 參考資料
// https://vue3-google-signin.vercel.app/components/google-signin-button.html
import vue3GoogleLogin from 'vue3-google-login'

// 開發環境
// const developmentEnvironment = import.meta.env.VITE_ENV

let clientId = '1055824448864-oifmo3rcb9t51lucpbvsf6v0mhrfvh0s.apps.googleusercontent.com'

export const googleLoginRegister = (app: ReturnType<typeof createApp>) => {
  app.use(vue3GoogleLogin, {
    clientId,
    buttonConfig: {
      theme: 'outline',
      type: 'standard',
      size: 'large',
      shape: 'pill'
    }
  })
}
