import request from '@/utils/request'

// 获取公海客户列表
export function getOpenSeaCustomerList(data) {
  return request({
    url: '/api/crm/web/customer/queryOpeaSeaCustomerList',
    method: 'post',
    data
  })
}
