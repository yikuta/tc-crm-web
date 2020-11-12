import request from '@/utils/request'

/*
* 查询工作台数据
* @params
*   dataRange 查询数据范围 ['ALL', 'MY_RESPONSIBLE', 'MY_DEPARTMENT_RESPONSIBLE', 'MY_SUBORDINATE_RESPONSIBLE', 'MY_FOLLOW', 'MY_JOIN']
*   dateEnum 日期范围 ['ALL_TIME', 'TODAY', 'YESTERDAY', 'THIS_WEEK', 'LAST_WEEK', 'THIS_MONTH', 'LAST_MONTH', 'DEFINED_DATE']
*   endTime 结束时间
*   followTime 跟进时间
*   followUsername 跟进人姓名
*   startTime 开始时间
* */
export function queryWork(data) {
  return request({
    url: '/api/crm/web/workPlatform/query',
    method: 'post',
    data
  })
}

/*
* 门店数据详情
* */
export function getShopDataDetail(data) {
  return request({
    url: '/api/crm/web/workPlatform/shop/detail',
    method: 'post',
    data
  })
}

/*
* 门店数据详情
* */
export function getShopDataDetail2(data) {
  return request({
    url: '/api/crm/web/customerMerchantCooperateApi/queryCustomerMerchantCooperateList',
    method: 'post',
    data
  })
}

/*
* 拜访客户详情
* @params
*   dataRange 查询数据范围 ['ALL', 'MY_RESPONSIBLE', 'MY_DEPARTMENT_RESPONSIBLE', 'MY_SUBORDINATE_RESPONSIBLE', 'MY_FOLLOW', 'MY_JOIN']
*   dateEnum 日期范围 ['ALL_TIME', 'TODAY', 'YESTERDAY', 'THIS_WEEK', 'LAST_WEEK', 'THIS_MONTH', 'LAST_MONTH', 'DEFINED_DATE']
*   endTime 结束时间
*   followTime 跟进时间
*   followUsername 跟进人姓名
*   startTime 开始时间
* */
export function visitCustomer(data) {
  return request({
    url: '/api/crm/web/workPlatform/visitCustomer/detail',
    method: 'post',
    data
  })
}
