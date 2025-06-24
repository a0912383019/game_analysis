import axios, { AxiosInstance } from 'axios'

const baseURL: string = import.meta.env.VITE_GPT_API as string
const authGpt: string = import.meta.env.VITE_GTP_AUTH as string

// 建立 axios 實例
const axiosGPTInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: authGpt
  }
})

export function chatWithGPT(messages: any[], model = 'meta-llama/llama-4-scout-17b-16e-instruct') {
  return axiosGPTInstance.post('/chat/completions', {
    model,
    messages
  })
}

export default chatWithGPT
