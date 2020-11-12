import request from '@/utils/request'

/*
* 日志
* @params
*   pageNo
*   pageSize
*   identifier
*   operationLogModule  CUSTOMER_OPERATION RESOURCE_OPERATION
* */
export function getReport(data) {
  return request({
    url: '/api/crm/web/log/operationLog/findOperationLogByPage',
    method: 'post',
    data
  })
}
