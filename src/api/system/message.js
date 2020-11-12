import request from '@/utils/request'

// POST  消息模板列表
export function fetchMessageTemplatesList(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/crm/web/system/messageTemplate/getMessageTemplateList',
    method: 'POST',
    data
  })
}
// GET 查询模板列表
export function getMessageTypeList(id) {
  return request({
    url: '/api/crm/web/system/messageTemplate/getMessageTypeList',
    method: 'GET'
  })
}
// POST 新增消息模板
export function asyncMessageTemplateSave(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/crm/web/system/messageTemplate/saveMessageTemplate',
    method: 'POST',
    data
  })
}
// POST 编辑消息模板
export function asyncMessageTemplateUpdate(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/crm/web/system/messageTemplate/updateMessageTemplate',
    method: 'POST',
    data
  })
}
// GET  修改模板状态
export function asyncMessageTemplatesStatus(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/crm/web/system/messageTemplate/updateTemplateStatus/' + data,
    method: 'GET'
    // data
  })
}
// GET  获取信息模板详情
export function getMessageTemplateDetail(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/crm/web/system/messageTemplate/getMessageTemplateDetail/' + data,
    method: 'GET'
    // data
  })
}
// POST 获取消息列表
export function getMessageList(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/crm/web/message/getMessageList',
    method: 'POST',
    data
  })
}

// 获取消息详情
export function getMessageDetail(id) {
  return request({
    url: `/api/crm/web/message/getMessageDetail/${id}`,
    method: 'GET'
  })
}

// POST 获取消息发送记录列表
export function getMessageSendRecordList(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/crm/web/message/getMessageSendRecordList',
    method: 'POST',
    data
  })
}
// POST 获取个人消息
export function getMyMessageList(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/crm/web/message/getMyMessageList',
    method: 'POST',
    data
  })
}

// GET  消息中心配置初始化
export function fetchMessageConfigInit() {
  return request({
    url: '/api/web/misc/message/center/messageConfigInit',
    method: 'GET'
  })
}
// 保存消息中心配置
export function asyncSaveMessageConfig(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/web/misc/message/center/saveMessageConfig',
    method: 'POST',
    data
  })
}
// GET 初始化消息模板的查询
export function fetchInitMessageTemplate() {
  return request({
    url: '/api/web/misc/message/center/initQueryTemplate',
    method: 'GET'
  })
}
// POST 消息中心.消息列表
export function fetchMessageList(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/web/misc/message/messageTask/messageTaskPage',
    method: 'POST',
    data
  })
}
// POST 消息查看操作日志
export function fetchMessageLogList(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/web/misc/message/messageTask/operatorLogPage',
    method: 'POST',
    data
  })
}
// POST 操作消息
export function asyncMessageTaskStatus(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/web/misc/message/messageTask/sendMessageTask',
    method: 'POST',
    data
  })
}
// POST 查询消息的发送记录/包含发送记录/发送参看列表
export function fetchMessageSendLog(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/web/misc/message/messageTask/messageSendLogPage',
    method: 'POST',
    data
  })
}
// GET 查询模板详情
export function fetchMessageTemplateById(id) {
  return request({
    url: '/api/web/misc/message/center/queryDetail?id=' + id,
    method: 'GET'
  })
}
// POST 查询已添加的目标用户
export function fetchAddMessageMembers(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/web/misc/message/messageTask/queryTempMembers',
    method: 'POST',
    data
  })
}
// POST 添加消息目标用户
export function asyncMessageMembersAdd(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/web/misc/message/messageTask/addTempMembers',
    method: 'POST',
    data
  })
}
// POST 查询boss用户
export function asyncMessageBossMembersAdd(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/web/misc/message/messageTask/queryBossUsers',
    method: 'POST',
    data
  })
}
// POST 删除已添加的目标用户
export function asyncMessageMembersDelete(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/web/misc/message/messageTask/deleteTempMembers',
    method: 'POST',
    data
  })
}
// POST 创建消息队列
export function asyncMessageCreate(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/web/misc/message/messageTask/createMessageTask',
    method: 'POST',
    data
  })
}
// POST 查询指定用户添加到目标用户
export function asyncMessageMembersQueryAdd(data) {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/web/misc/message/messageTask/queryMemberToAdd',
    method: 'POST',
    data
  })
}
// GET 消息模板校验
export function asyncMessageTemplateValidate(params) {
  return request({
    url: '/api/web/misc/message/center/templateCodeValidate',
    method: 'GET',
    params
  })
}
// POST  上传用户
export function asyncMessageMembersUoload(data = {}, params = {}) {
  return request({
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: `/api/web/misc/message/messageTask/importMemberList/${params.templateType}/${params.channelType}/${params.identifier}`,
    method: 'POST',
    data,
    setConfig: {
      formData: true
    }
  })
}
