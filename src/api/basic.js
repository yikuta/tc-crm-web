import request from '@/utils/request'

// 获取手机验证码
export function getPhoneCode(phoneNum) {
  return request({
    url: '/api/integrate/inner/crm/systemApi/sendMessage',
    method: 'get',
    phoneNum
  })
}

// 获取所有员工
export function getAllUser() {
  return request({
    url: '/api/crm/web/system/queryAllUserList',
    method: 'get'
  })
}

// 区域获取
export function getArea(code) {
  return request({
    url: `/api/crm/web/system/findAreaList/${code}`,
    method: 'get'
  })
}

// 根据code查询省市区
export const getAreaByCode = (data = {}) => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/crm/web/region/queryByCode?code=' + data.code,
    method: 'post',
    data
  })
}

// 上传
export const uploadFileRequest = (data = {}) => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/crm/web/oss/upload/file',
    method: 'post',
    data
  })
}
