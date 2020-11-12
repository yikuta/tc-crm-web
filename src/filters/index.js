import Vue from 'vue'
import filters from './objectField'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
