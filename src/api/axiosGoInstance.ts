import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosInstance } from 'axios'
import { useGlobalStore } from '@/stores'

const baseURL: string = import.meta.env.VITE_API_GO_BASE_URL as string

// 建立 axios 實例
const axiosGoInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})


// 請求攔截器
axiosGoInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('game_access_token')
    if (accessToken) {
      // 添加 Authorization
      request.headers.set('Authorization', accessToken)
    }

    const globalStore = useGlobalStore()
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
    return Promise.reject(error)
  }
)

// T: api 參數結構
// R: api 回傳結構
export const apiGet = <T extends Record<string, any> | undefined, R = any>(
  url: string,
  params?: T
): Promise<ApiResponse<R>> => {
  return axiosGoInstance.get(url, { params })
}

export const apiPost = <T extends Record<string, any> | undefined, R = any>(
  url: string,
  params?: T
): Promise<ApiResponse<R>> => {
  return axiosGoInstance.post(url, params)
}

export const apiPut = <T extends Record<string, any> | undefined, R = any>(
  url: string,
  params?: T
): Promise<ApiResponse<R>> => {
  return axiosGoInstance.put(url, params)
}

export const apiDelete = <T extends Record<string, any> | undefined, R = any>(
  url: string,
  params?: T
): Promise<ApiResponse<R>> => {
  return axiosGoInstance.delete(url, { params })
}

export default axiosGoInstance
