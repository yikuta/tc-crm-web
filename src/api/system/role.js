import request from '@/utils/request'

// 获取角色列表
export function getRoleList(data) {
  return request({
    url: '/api/crm/web/system/role/queryRoleList',
    method: 'post',
    data
  })
}

// 添加角色
export function saveRole(data) {
  return request({
    url: '/api/crm/web/system/role/saveRole',
    method: 'post',
    data
  })
}

// 编辑角色
export function updateRole(data) {
  return request({
    url: '/api/crm/web/system/role/updateRole',
    method: 'post',
    data
  })
}

// 删除角色
export function deleteRole(id) {
  return request({
    url: `/api/crm/web/system/role/deleteRole/${id}`,
    method: 'get'
  })
}

// 停启用角色
export function updateRoleStatus(id) {
  return request({
    url: `/api/crm/web/system/role/updateRoleStatus/${id}`,
    method: 'get'
  })
}

// 获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/api/crm/web/system/role/getRoleDetail/${id}`,
    method: 'get'
  })
}

// 获取组织架构
export function queryDepartmentList() {
  return request({
    url: '/api/crm/web/system/queryDepartmentList',
    method: 'get'
  })
}

// 获取所有部门列表
export function queryAllDepartmentList() {
  return request({
    url: '/api/crm/web/department/searchAllDepartmentList',
    method: 'post'
  })
}

// 通过组织架构获取员工
export function queryUserList(data) {
  return request({
    url: '/api/crm/web/system/queryUserList',
    method: 'post',
    data
  })
}

// 获取员工信息
export function getUserDetail(id) {
  return request({
    url: `/api/crm/web/system/getUserDetail/${id}`,
    method: 'get'
  })
}

// 分配角色给员工
export function saveRoleToUser(data) {
  return request({
    url: '/api/crm/web/system/role/saveRoleToUser',
    method: 'post',
    data
  })
}

// 查询权限列表
export function queryPermissionList(data) {
  return request({
    url: '/api/crm/web/system/role/queryPermissionList',
    method: 'post',
    data
  })
}

// 关联角色权限
export function saveRolePermission(data) {
  return request({
    url: '/api/crm/web/system/role/saveRolePermission',
    method: 'post',
    data
  })
}

// 获取绑定某角色的员工列表
export function getBindRoleUserList(id) {
  return request({
    url: `/api/crm/web/system/role/getBindRoleUserList/${id}`,
    method: 'get'
  })
}
