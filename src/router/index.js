import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/pages/Layout'

import system from './system'
import thread from './thread'
import client from './client'
import work from './work'
import message from './message'

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/index',
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/404',
    component: () => import('@/pages/404'),
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/account/login'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        meta: { title: '首页', icon: 'el-icon-eleme' },
        component: () => import('@/pages/index')
      }
    ]
  }
]

export const asyncRouterMap = [
  work, // 工作台
  system, // 系统设置
  thread, // 线索管理
  client, // 客户管理
  message // 消息
]

export const allRouterMap = [
  ...constantRouterMap,
  ...asyncRouterMap,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: allRouterMap
})

export default router
