import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    global,
    user,
    permission
  },
  getters
})
