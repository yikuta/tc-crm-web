import request from '@/utils/request'

// 获取销售线索列表
export function getMenuList(data) {
  return request({
    url: '/api/crm/web/resource/findByPage',
    method: 'post',
    data
  })
}

// 上传文件
export function uploadFile(data) {
  return request({
    url: '/api/crm/web/oss/upload/file',
    // url: '/api/crm/web/oss/upload/multipart/file',
    method: 'post',
    data
  })
}

// 获取地区信息
export function queryArea(data) {
  return request({
    url: '/api/crm/web/region/queryArea',
    method: 'get'
  })
}

// 新增线索
export function saveResource(data) {
  return request({
    url: '/api/crm/web/resource/save',
    method: 'post',
    data
  })
}
// 编辑线索POST /api/crm/web/resource/update
export function updateResource(data) {
  return request({
    url: '/api/crm/web/resource/update',
    method: 'post',
    data
  })
}

// 合并线索
export function mergeResource(data) {
  return request({
    url: '/api/crm/web/resource/merge',
    method: 'post',
    data
  })
}

// 现有客户列表
export function queryCustomerList(data, dataRange) {
  return request({
    // url: '/api/crm/web/customer/queryCustomerList',
    url: '/api/crm/web/customer/queryCustomerList?dataRange=' + dataRange,
    method: 'post',
    data
  })
}
