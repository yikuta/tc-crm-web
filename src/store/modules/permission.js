import { getCurrentPermissions } from '@/api/login'
import { deepClone } from '@/utils/util'
import { asyncRouterMap, constantRouterMap } from '@/router/index'
// import router from '@/router'

constantRouterPermission(constantRouterMap)
// router.addRouters(constantRouterMap)
let btnPermission = []

// 获取所有权限
function reducePermission(data, pagePermission = [], buttonPermission = []) {
  data.forEach(item => {
    // btnPermission = [...btnPermission, ...item.authCode]
    // if (item.type < 4) {
    //   // 页面
    //   const childrenList = item.children
    //   // Reflect.deleteProperty(item, 'children')
    //   pagePermission[item.permissionIdentification] = item
    //   if (childrenList && childrenList.length) {
    //     reducePermission(childrenList, pagePermission)
    //   }
    // }
    pagePermission.push(item.permissionIdentification)
    //  else { // 按钮
    //   Reflect.deleteProperty(item, 'children')
    // buttonPermission[item.code] = item
    // }
  })
  return pagePermission
}

function setMetaPermission(route, hasPermission) {
  if (route.meta) {
    route.meta['hasPermission'] = hasPermission
  } else {
    route.meta = { hasPermission: hasPermission }
  }
}

// 所有constantRouter类型增加hasPermission
function constantRouterPermission(routers) {
  routers.forEach(route => {
    setMetaPermission(route, true)
    if (route.children && route.children.length) {
      constantRouterPermission(route.children)
    }
  })
}

function filterAsyncRouter(asyncRouteMap, roles) {
  const accessedRouters = asyncRouteMap.filter(route => {
    if (hasPermissions(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
        if (route.children.length) {
          return true
        } else {
          return false
        }
      }
      return true
    }
    return false
  })
  return accessedRouters
}

// 判断是否有权限
function hasPermissions(roles, route) {
 if (route.auth) {
   return roles.some(role => route.auth === role)
 } else {
   return true
 }
}

// 对菜单进行排序
// eslint-disable-next-line
function sortRouters(accessedRouters) {
  for (let i = 0; i < accessedRouters.length; i++) {
    let router = accessedRouters[i]
    if (router.children && router.children.length > 0) {
      router.children.sort(compare('sort'))
    }
  }
  accessedRouters.sort(compare('sort'))
}

// 降序比较函数
function compare(p) {
  return function(m, n) {
    let a = m[p]
    let b = n[p]
    return b - a
  }
}

// eslint-disable-next-line
function menusFilter(routes) {
  const newRoutes = routes.filter(item => {
    let isShow = !item.hidden && item.meta && item.meta.hasPermission
    if (item.children && item.children.length) {
      item.children = menusFilter(item.children)
    }
    if (item.redirect && item.children && !item.children.length) {
      isShow = false
    }
    return isShow
  })
  return newRoutes
}

const permission = {
  state: {
    pagePermission: [],
    buttonPermission: [],
    routers: constantRouterMap,
    addRouters: [],
    menuList: [],
    routerLoadDone: false
  },
  mutations: {
    SET_PERMISSIONS: (state, { pagePermission, buttonPermission }) => {
      state.pagePermission = pagePermission
      state.buttonPermission = btnPermission
    },
    SET_ROUTER_LOAD_DONE: (state, routerLoadDone) => {
      state.routerLoadDone = routerLoadDone
      state.routers = constantRouterMap
      state.addRouters = []
    },
    SET_ROUTERS: (state, routers) => {
      Reflect.apply(Array.prototype.push, state.addRouters, routers)
      state.routers = constantRouterMap.concat(routers)
      state.menuList = state.routers
      // state.menuList = menusFilter(deepClone(state.routers))
      // console.log(state.menuList)
      state.routerLoadDone = true
    }
  },
  actions: {
    async getPermissions({ commit }) {
      await getCurrentPermissions().then(response => {
        const resultPermission = reducePermission(response.result)
        // commit('SET_PERMISSIONS', resultPermission)
        btnPermission = []
        const newAsyncRouterMap = filterAsyncRouter(
          deepClone(asyncRouterMap),
          resultPermission
        )
        commit('SET_ROUTERS', newAsyncRouterMap)
      })
    }
  }
}

export default permission
