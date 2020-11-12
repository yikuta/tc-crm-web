import request from '@/utils/request'

// 获取销售线索详情
export function getDetails(data) {
  return request({
    url: '/api/crm/web/resource/queryResourceDetail?resourceId=' + data,
    method: 'post'
    // params: data
  })
}
// 获取销售线索 作废 操作
export function deleteResource(data) {
  return request({
    url: '/api/crm/web/resource/destroy',
    method: 'post',
    data
  })
}
// 获取销售线索 转为客户 操作
export function changeToCustomer(data) {
  return request({
    url: '/api/crm/web/resource/changeToCustomer',
    method: 'post',
    data
  })
}
// 获取销售线索 转入线索池 操作
export function moveToPool(data) {
  return request({
    url: '/api/crm/web/resource/moveToPool',
    method: 'post',
    data
  })
}
// 领取线索操作
export function pollResource(data) {
  return request({
    url: '/api/crm/web/resource/poll/resource',
    method: 'post',
    data
  })
}
// 获取销售线索 变更负责人 操作
export function changeAdminUser(data) {
  return request({
    url: '/api/crm/web/resource/changeAdminUser',
    method: 'post',
    data
  })
}

// 获取销售线索 获取团队成员
export function queryGroupUser(data) {
  return request({
    url: '/api/crm/web/resource/queryGroupUser?resourceId=' + data,
    method: 'post'
    // data
  })
}
// 获取销售线索 新增团队成员POST /api/crm/web/resource/save/adminGroup
export function addGroupUser(data) {
  return request({
    url: '/api/crm/web/resource/add/adminGroup',
    method: 'post',
    data
  })
}
// 获取销售线索 编辑保存团队成员
export function editGroupUser(data) {
  return request({
    url: '/api/crm/web/resource/save/adminGroup',
    method: 'post',
    data
  })
}
// 获取销售线索 删除团队成员
export function deleteGroupUser(data) {
  return request({
    url: '/api/crm/web/resource/delete/adminGroup?resourceId=' + data.resourceId + '&userId=' + data.userId,
    method: 'post'
    // data
  })
}

// 获取销售线索 回复跟进记录 操作
export function recordComment(data) {
  return request({
    url: '/api/crm/web/resource/new/recordComment?recordId=' + data.recordId + '&comment=' + data.comment,
    method: 'post'
    // data
  })
}
// 获取销售线索 删除回复 操作
export function deleteComment(data) {
  return request({
    url: '/api/crm/web/resource/delete/comment?commentId=' + data,
    method: 'post'
    // data
  })
}

// 获取所有员工
export function getAllUser(data) {
  return request({
    url: '/api/crm/web/system/getAllUser',
    method: 'get'
    // data
  })
}
// 获取跟进记录对象字段
export function getFollowRecordList(data) {
  return request({
    url: '/api/crm/web/system/objectField/queryFollowRecordList',
    method: 'get'
    // data
  })
}
// 新增跟进记录
export function addFollowRecord(data) {
  return request({
    url: '/api/crm/web/resource/new/followRecord',
    method: 'post',
    data
  })
}

// 获取人员和组织架构
export function queryUserAndDepartmentList() {
  return request({
    url: '/api/crm/web/system/queryUserAndDepartmentList',
    method: 'get'
    // data
  })
}

// 获取操作日志
export function findOperationLogByPage(data) {
  return request({
    url: '/api/crm/web/log/operationLog/findOperationLogByPage',
    method: 'post',
    data
  })
}
