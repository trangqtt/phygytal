import axios from 'axios';
import { memoizedRefreshToken } from './refreshToken';
import { accessTokenKey, apiBaseUrl, userInfoKey } from '../constants';

const instance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
    put: {
      'Content-Type': 'application/json',
    },
    delete: {
      'Content-Type': 'application/json',
    },
  },
});

export const updateHeaderAccessToken = (accessToken: string) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
};

instance.interceptors.request.use(
  async (config: any) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const accessToken = (localStorage as any).getItem(accessTokenKey);
      if (accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${accessToken}`,
        };
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      const result = await memoizedRefreshToken();

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.accessToken}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export default instance;
