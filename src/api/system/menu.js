import request from '@/utils/request'

// 获取菜单列表
export function getMenuList(data) {
  return request({
    url: '/api/crm/web/system/menu/queryMenuList',
    method: 'post',
    data
  })
}

// 添加菜单
export function saveMenuList(data) {
  return request({
    url: '/api/crm/web/system/menu/saveMenu',
    method: 'post',
    data
  })
}

// 停用启用菜单
export function updateMenuStatus(id) {
  return request({
    url: `/api/crm/web/system/menu/updateMenuStatus/${id}`,
    method: 'get'
  })
}

// 编辑菜单
export function updateMenu(data) {
  return request({
    url: '/api/crm/web/system/menu/updateMenu',
    method: 'post',
    data
  })
}

// 详情
export function getMenuDetail(id) {
  return request({
    url: `/api/crm/web/system/menu/findMenuBasicDetail/${id}`,
    method: 'get'
  })
}

// 获取菜单绑定角色
export function getBindMenuRoleList(id) {
  return request({
    url: `/api/crm/web/system/menu/queryMenuBindRoleList/${id}`,
    method: 'get'
  })
}
