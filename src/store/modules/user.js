import { setLocalStorage, getLocalStorage, clearLocalStorage } from '@/utils/auth'
import { setCookie, getCookie } from '@/utils/support'
export default {
  state: {
    userInfo: getLocalStorage('userInfo'),
    token: getLocalStorage(),
    btnPermissions: getLocalStorage('btnPermissions')
  },
  mutations: {
    SET_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.btnPermissions = permissions
    }
  },
  actions: {
    login() {},
    logout() {
      // 判断当前账号是否记住密码
      const _pwd = getCookie('password') || ''
      const _name = getCookie('username') || ''
      const _logintime = getCookie('logintime') || ''
      clearLocalStorage()
      if (_pwd) {
        setCookie('password', _pwd)
        setCookie('username', _name)
        setCookie('logintime', _logintime)
      }
      location.href = '/login'
    },
    setUserInfo({ commit }, userInfo) {
      commit('SET_INFO', JSON.stringify(userInfo))
      setLocalStorage('userInfo', userInfo)
    },
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
      setLocalStorage('loginToken', token)
    },
    setPermissions({ commit }, permissions) {
      commit('SET_PERMISSIONS', permissions)
      setLocalStorage('btnPermissions', permissions)
    }
  }
}
