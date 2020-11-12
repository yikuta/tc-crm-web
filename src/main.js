import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import App from './App.vue'
import store from './store'
import router from './router'
import './filters'
// import '@/utils/request'
import '@/icons'

import '@/directives/hasPermission'

import Map from './components/Map'
Vue.use(Map)
Vue.use(Element, { locale })

Vue.config.productionTip = false

console.warn({
  mabu: '1.0.0'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
