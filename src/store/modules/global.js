import { allRouterMap } from '@/router/index'
import { deepClone } from '@/utils/util'

export default {
  state: {
    device: 'desktop', // mobile
    user: {
      name: '',
      avatar: ''
    },
    sidebar: {
      isCollapse: false,
      withoutAnimation: false
    },
    menus: deepClone(allRouterMap),
    permissions: {},
    visitedViews: [],
    cachedViews: []
  },
  getters: {
    getDevice: state => state.device
  },
  mutations: {
    TOGGLE_DEVICE: (state, payload) => {
      state.device = payload.device
    },
    UPDATE_USER_INFO: (state, userInfo) => {
      state.user = { ...userInfo }
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({ ...view, title: view.meta.title || 'no-name' })
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    DEL_OTHERS_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, index + 1)
          break
        }
      }
    },
    CLEAR_VIEWS: (state) => {
      state.visitedViews = []
      state.cachedViews = []
    },
    TOGGLE_MENU_COLLAPSE: (state) => {
      state.sidebar.isCollapse = !state.sidebar.isCollapse
    }
  },
  actions: {
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    deleteVisitedViews({ commit, state }, view) {
      // commit('DEL_VISITED_VIEWS', view)
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    deleteOthersViews({ commit }, view) {
      commit('DEL_OTHERS_VIEWS', view)
    },
    clearViews({ commit }, view) {
      commit('CLEAR_VIEWS', view)
    },
    toggleMenuCollapse({ commit }) {
      commit('TOGGLE_MENU_COLLAPSE')
    },
    updateUserInfo({ commit }, userInfo) {
      commit('UPDATE_USER_INFO', userInfo)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', { device })
    }
  }
}
