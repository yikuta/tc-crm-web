import request from '@/utils/request'

// 获取客户范围比较条件
export function getCustomerRangCondition() {
  return request({
    url: '/api/crm/web/system/getCustomerRangCondition',
    method: 'get'
  })
}

// 获取客户范围约束字段GET /api/crm/web/customer/findCustomerDetail/{id}/{userId}
export function getCustomerRangField() {
  return request({
    url: '/api/crm/web/system/getCustomerRangField',
    method: 'get'
  })
}

/*
* 获取客户范围比较值
* customerRangeFieldType
*   参数 'BUSINESS_TYPE', 'AREA'
* */
export function getCustomerRangValue(data) {
  return request({
    url: '/api/crm/web/system/getCustomerRangValue',
    method: 'post',
    data
  })
}

// 获取客户详情POST /api/crm/web/customer/mergeCustomer
export function getCustomerDetails(id) {
  return request({
    url: '/api/crm/web/customer/findCustomerDetail/' + id,
    method: 'get'
  })
}

// 合并客户
export function mergeCustomer(data) {
  return request({
    url: '/api/crm/web/customer/mergeCustomer',
    method: 'post',
    data
  })
}

// 跟进记录列表
export function getFollowRecord(id) {
  return request({
    url: `/api/crm/web/customer/findCustomerFollowRecord/${id}`,
    method: 'get'
  })
}

/*
* 新建跟进记录
* content  记录内容
* crmInfoType 跟进类型 ['CUSTOMER_INFO', 'RESOURCE_INFO']
* customerId 客户 id
* followRecordType 记录类型 如果没有就不传该字段 = ['HOME_VISIT', 'SALE_RECORD']
* userId 跟进人 id
* */
export function saveFollowRecord(data) {
  return request({
    url: '/api/crm/web/customer/saveFollowRecord',
    method: 'post',
    data
  })
}

/*
* 评论跟进记录
* content 内容
* folleReocrdId
* userId
* */
export function commonFollowRecord(data) {
  return request({
    url: '/api/crm/web/customer/commentFollowRecord',
    method: 'post',
    data
  })
}
