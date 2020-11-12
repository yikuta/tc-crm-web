import request from '../utils/request'
/*
* 登录
* imageVerificationCode (string, optional): 图片验证码 ,
* password (string, optional): 密码 ,
* phone (string, optional): 手机号 ,
* phoneVerificationCode (string, optional): 手机验证码
* */
export function login(data) {
  return request({
    url: '/api/crm/web/login/signUp',
    method: 'post',
    data
  })
}

/*
* 获取员工具有权限的菜单列表
* /api/crm/web/system/menu/getUserMenuList
* */
export function getCurrentPermissions() {
  return request({
    url: '/api/crm/web/system/menu/getUserMenuList',
    method: 'get'
  })
}
