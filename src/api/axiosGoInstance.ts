import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosInstance } from 'axios'
import { useGlobalStore } from '@/stores/global'

const baseURL: string = import.meta.env.VITE_API_GO_BASE_URL as string

// 建立 axios 實例
const axiosGoInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const globalStore = useGlobalStore()

// 請求攔截器
axiosGoInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    // const accessToken = sessionStorage.getItem('access_token_go')
    const accessToken =
      'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTAwLCJOYW1lIjoiIiwiRW1haWwiOiIiLCJVc2VyVHlwZSI6OSwiVXNlclN0YXR1cyI6MCwiU291cmNlIjoiZnJvbnRlbmQiLCJBY2Nlc3NIYWxsTmFtZSI6ImVzeCxiYjgsYmJpLHJiIiwiR29vZ2xlUGljdHVyZVVybCI6IiIsIlVVSUQiOiI5MTJiZjFmOS1lMzJkLTQ5NWEtODdkYS0yMWY5MTFlOWU0NmEiLCJleHAiOjE3Njk2ODQxODMsIm5iZiI6MTcwNjYxMjE4M30.QMOd3wyDJnKKwS86Ghp87yWZ-JkQ2rD8IGXNaz62Z-Y'
    if (accessToken) {
      // 添加 Authorization
      request.headers.set('Authorization', accessToken)
    }

    if (request.method === 'post' || request.method === 'put') {
      request.data = {
        ...(request.data || {}),
        platform: globalStore.currentPlatform // 預設 platform 為 bbin
      }
    }

    if (request.method === 'get' || request.method === 'delete') {
      request.params = {
        ...(request.params || {}),
        platform: globalStore.currentPlatform // 預設 platform 為 bbin
      }
    }

    return request
  },
  (error: AxiosError) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// 響應攔截器
axiosGoInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    console.error('Response Error:', error)
    return Promise.reject(error)
  }
)

export default axiosGoInstance
