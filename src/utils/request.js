import axios from 'axios'
import qs from 'qs'
import router from '@/router/index'
import store from '../store'
import { getLocalStorage } from '@/utils/auth'
import { Notification } from 'element-ui'

let noErrorToast = false

const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 30000,
  method: 'get,post,put,patch,delete',
  paramsSerializer: params => qs.stringify(params, {
    arrayFormat: 'indices' // brackets | repeat
  }),
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器
service.interceptors.request.use(config => {
  noErrorToast = config.noErrorToast
  if (getLocalStorage()) {
    config.headers.Authorization = 'Bearer ' + getLocalStorage() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200 || response.status !== 200) {
      if (res.code === 401) {
        // debugger
        store.dispatch('logout', '登录凭证失效')
      } else if (res.code === 403) {
        Notification({
          message: '用户权限不足',
          type: 'error',
          duration: 3 * 1000
        })
        try {
          router.push('/index')
        } catch (e) {
        }
      } else if (res.code !== 200 && !noErrorToast) {
        Notification({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(response.data)
    }
    return response.data
  }, error => {
    Notification({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
