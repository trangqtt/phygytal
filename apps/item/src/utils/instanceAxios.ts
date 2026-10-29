import axios from 'axios'
import { memoizedRefreshToken } from './refreshToken'
import { API_BASE_URL, userInfoKey } from '@/constant'


const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    post: {
      'Content-Type': 'application/json'
    },
    put: {
      'Content-Type': 'application/json'
    },
    delete: {
      'Content-Type': 'application/json'
    },
  }
});


export const updateHeaderAccessToken = (accessToken: string) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
}

instance.interceptors.request.use(
  async (config: any) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const session = JSON.parse((localStorage as any).getItem(userInfoKey))
      if (session?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${session?.accessToken}`,
        }
      }
    }
    return config
  },
  error => Promise.reject(error),
)

instance.interceptors.response.use(
  response => response,
  async error => {
    const config = error?.config

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true
      const result = await memoizedRefreshToken()

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.accessToken}`,
        }
      }

      return axios(config)
    }
    return Promise.reject(error)
  },
)

export default instance
