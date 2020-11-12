import request from '@/utils/request'

// 获取公海列表
export function getOpenSeaList(name) {
  return request({
    url: `/api/crm/web/system/openSea/queryOpenSeaList?openSeaName=${name || ''}`,
    method: 'get'
  })
}

// 添加公海
export function saveOpenSea(data) {
  return request({
    url: '/api/crm/web/system/openSea/saveOpenSea',
    method: 'post',
    data
  })
}

// 编辑公海
export function updateOpenSea(data) {
  return request({
    url: '/api/crm/web/system/openSea/updateOpenSea',
    method: 'post',
    data
  })
}

// 删除公海
export function deleteOpenSea(id) {
  return request({
    url: `/api/crm/web/system/openSea/deleteOpenSea/${id}`,
    method: 'get'
  })
}

// 公海详情
export function getOpenSeaDetail(id) {
  return request({
    url: `/api/crm/web/system/openSea/getOpenSeaDetail/${id}`,
    method: 'get'
  })
}

// 修改公海私有客户规则
export function updatePrivateCustomerRule(data) {
  return request({
    url: '/api/crm/web/system/updatePriavateCustomerRule',
    method: 'post',
    data
  })
}

// 获取公海客户规则详情
export function getPrivateCustomerRule() {
  return request({
    url: '/api/crm/web/system/getPrivateCustomerRule',
    method: 'get'
  })
}
