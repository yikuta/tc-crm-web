import request from '@/utils/request'

// 客户模板列表
export function getCustomerTemplateList(data) {
  return request({
    url: '/api/crm/web/system/customerTemplate/queryCustomerTemplateList',
    method: 'post',
    data
  })
}

// 添加客户模板
export function saveCustomer(data) {
  return request({
    url: '/api/crm/web/system/customerTemplate/saveCustomerTemplate',
    method: 'post',
    data
  })
}

// 客户模板详情
export function getCustomerDetail(id) {
  return request({
    url: `/api/crm/web/system/customerTemplate/getCustomerTemplateDetail/${id}`,
    method: 'get'
  })
}

// 编辑客户模板
export function updateCustomerTemplate(data) {
  return request({
    url: '/api/crm/web/system/customerTemplate/updateCustomerTemplate',
    method: 'post',
    data
  })
}

// 客户分类列表
export function queryCustomerTypeList(enable) {
  return request({
    url: `/api/crm/web/system/queryCustomerTypeList/${enable || '0'}`,
    method: 'post'
  })
}

// 获取客户模板列表
export function queryCustomerTemplateList(data) {
  return request({
    url: '/api/crm/web/system/customerTemplate/queryCustomerTemplateList',
    method: 'post',
    data
  })
}

// 获取外部系统对接客户规则
export function getCustomerImportRule(id) {
  return request({
    url: '/api/crm/web/customerImportRule/getCustomerImportRule',
    method: 'get'
  })
}

// 保存外部系统对接客户规则
export function saveCustomerImportRule(data) {
  return request({
    url: '/api/crm/web/customerImportRule/saveCustomerImportRule',
    method: 'post',
    data
  })
}
