import {
  getCookie,
  removeCookie
} from '@/utils/support'
import { evil } from './util'
const TokenKey = 'loginToken'

// export function getToken(key) {
//   return localStorage.getItem(key || TokenKey)
// }
//
// export function setToken(key, token) {
//   return localStorage.setItem(key || TokenKey, token)
// }
//
// export function removeToken(key) {
//   return localStorage.removeItem(key || TokenKey)
// }

export function setLocalStorage(key, info) {
  return localStorage.setItem(key || TokenKey, JSON.stringify(info))
}

export function getLocalStorage(key) {
  return evil(localStorage.getItem(key || TokenKey))
}

export function removeLocalStorage(key) {
  return localStorage.removeItem(key || TokenKey)
}

export function clearLocalStorage() {
  return localStorage.clear()
}

// 判断用户密码是否失效
export function unInvalidPwd() {
  const _time = getCookie('logintime')
  const _nowTime = new Date().getTime()
  const _isUnInvalid = _nowTime - _time > 7 * 24 * 60 * 60 * 1000
  // 失效了默认移除密码和用户名 token
  if (_isUnInvalid) {
    removeCookie('username')
    removeCookie('password')
    removeCookie('logintime')
    removeLocalStorage()
    sessionStorage.removeItem('lastTime')
  }
  return _isUnInvalid
}
