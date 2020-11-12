import request from '@/utils/request'

// 数据权限设置
export function setDataPermission(data) {
  return request({
    url: '/api/crm/web/system/setDataPermission',
    method: 'post',
    data
  })
}

// 获取权限
export function getDataPermission(id) {
  return request({
    url: `/api/crm/web/system/getUserDataPermission/${id}`,
    method: 'get'
  })
}
