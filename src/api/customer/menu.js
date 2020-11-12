import request from '@/utils/request'

// 客户列表
export function getCustomerList(data) {
  return request({
    url: `/api/crm/web/customer/queryCustomerList?dataRange=${data.dataRange}&userId=${data.userId}`,
    method: 'post',
    data
  })
}

// 新建客户
export function saveCustomer(data) {
  return request({
    url: '/api/crm/web/customer/saveCustomer',
    method: 'post',
    data
  })
}

// 获取客户详情
export function getCustomerDetail(id) {
  return request({
    url: `/api/crm/web/customer/findCustomerDetail/${id}`,
    method: 'get'
  })
}

// 编辑客户详情
export function updateCustomerDetail(data) {
  return request({
    url: '/api/crm/web/customer/updateCustomer',
    method: 'post',
    data
  })
}

/*
* 作废客户
* @params Object
* customerId 客户 id
* userId 用户 id
* */
export function deleteCustomer(data) {
  return request({
    url: '/api/crm/web/customer/deleteCustomer',
    method: 'post',
    data
  })
}

/*
* 更改客户合作状态
* customerId 客户 id
* cooperationStatus ['NO_COOPERATION', 'HAS_COOPERATION', 'SUSPENSION_OF_COOPERATION']
* */
export function updateCustomerCooperationStatus(data) {
  return request({
    url: '/api/crm/web/customer/updateCustomerCooperationStatus',
    method: 'post',
    data
  })
}

/*
* 转入公海
* customerId 客户 id
* openSeaId 公海 id
* */
export function moveToOpenSea(data) {
  return request({
    url: '/api/crm/web/customer/moveToOpenSea',
    method: 'post',
    data
  })
}

/*
* 变更负责人
* id 客户 id
* responsibleUserId 新负责人 id
* customerOrResourceName 客户名称
* newPrincipalUser 现负责人
* oldPrincipalUser 原负责人
* */
export function updateCustomerResponsibleUser(data) {
  return request({
    url: '/api/crm/web/customer/updateCustomerResponsibleUser',
    method: 'post',
    data
  })
}

/*
* 获取客户负责团队
* */
export function getCustomerResponsibleTeam(id) {
  return request({
    url: `/api/crm/web/customer/findCustomerResponsibleTeam/${id}`,
    method: 'get'
  })
}

/*
* 添加客户负责团队成员
* isAdmin
* permission ['READ_ONLY', 'READ_AND_WRITE'] 权限
* role ['NORMAL_USER', 'PARTNER_USER', 'ADMIN_USER'] 角色
* targetId 角色
* userId 用户 id
* username 用户名
* */
export function addCustomerResponsibleUser(data) {
  return request({
    url: '/api/crm/web/customer/addCustomerResponsibleUser',
    method: 'post',
    data
  })
}

/*
* 删除客户负责团队成员
* id 成员 id
* userId 用户 id
* */
export function deleteCustomerResponsibleUser(data) {
  return request({
    url: '/api/crm/web/customer/deleteCustomerResponsibleUser',
    method: 'post',
    data
  })
}

/*
* 合并客户
* contacts 联系人
* contactsPhone 联系人电话
* customerOrResourceName 客户名称
* customerTypeId 客户分类
* deleteCustomerId 被删除的客户
* id
* mergeName 合并后的客户名称
* optionMessage 配置
* regionId 地区 id
* */
export function mergeCustomer(data) {
  return request({
    url: '/api/crm/web/customer/mergeCustomer',
    method: 'post',
    data
  })
}

/*
* 编辑保存客户管理团队
* @params Array
* isAdmin
* permission ['READ_ONLY', 'READ_AND_WRITE']
* role ['NORMAL_USER', 'PARTNER_USER', 'ADMIN_USER']
* targetId 对象所属 id，资源：resourceId，客户：customerId
* userId
* username
* */
export function editAdminGroup(data) {
  return request({
    url: '/api/crm/web/customer/save/adminGroup',
    method: 'post',
    data
  })
}

/*
* 领取客户
* id 客户 id
* customerOrResourceName 客户名称
* userId
* */
export function receiveCustomer(data) {
  return request({
    url: '/api/crm/web/customer/receiveCustomer',
    method: 'post',
    data
  })
}
