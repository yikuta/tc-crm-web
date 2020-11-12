import request from '@/utils/request'

// 获取已绑定区域的员工列表
export function getUserAreaList(data) {
  return request({
    url: '/api/crm/web/system/queryBindAreaUserList',
    method: 'post',
    data
  })
}

// 保存区域
export function saveUserArea(data) {
  return request({
    url: '/api/crm/web/system/bindUserArea',
    method: 'post',
    data
  })
}

// 修改员工区域
export function updateUserArea(data) {
  return request({
    url: '/api/crm/web/system/updateUserBindArea',
    method: 'post',
    data
  })
}
