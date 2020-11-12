import request from '@/utils/request'

// 获取字段对象列表
// 1 客户字段   2 跟进字段
export function getObjectList(type) {
  return request({
    url: '/api/crm/web/system/objectField/queryObjectFieldList',
    method: 'post',
    data: {
      objectFieldType: type
    }
  })
}

// 添加对象
export function saveOpenObject(data) {
  return request({
    url: '/api/crm/web/system/objectField/saveObjectField',
    method: 'post',
    data
  })
}

// 编辑对象
export function updateOpenObject(data) {
  return request({
    url: '/api/crm/web/system/objectField/updateObjectField',
    method: 'post',
    data
  })
}

export function getOpenObjectDetail(id) {
  return request({
    url: `/api/crm/web/system/objectField/getObjectFieldDetail/${id}`,
    method: 'get'
  })
}

// 停启用对象
export function updateOpenObjectStatus(id) {
  return request({
    url: `/api/crm/web/system/objectField/updateObjectFieldStatus/${id}`,
    method: 'get'
  })
}
