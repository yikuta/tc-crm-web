/*
* 过滤自定义字段获取值
* */
const getObjectFieldValue = (item) => {
  const getValue = (lst, value) => {
    let text = ''
    if (typeof value === 'object') {
      // 如果 value 是一个数组
      value.forEach(val => {
        lst.forEach(obj => {
          if (obj.id === val) {
            // 获取到对应 id 的数据
            text = text ? `${text}，${obj.fieldTypeConditionValue}` : obj.fieldTypeConditionValue
          }
        })
      })
    } else {
      // value 不是数组
      return value
      // lst.forEach(obj => {
      //   if (obj.id === value) {
      //     // 获取到对应 id 的数据
      //     text = text ? `${text}，${obj.fieldTypeConditionValue}` : obj.fieldTypeConditionValue
      //   }
      // })
    }
    return text
  }
  switch (item.fieldType) {
    case 'RICH_TEST':
      // 详情，不作处理
      return ''
    case 'Multiple_Choice':
      // 多选
      return getValue(item.objectFieldValueList, item.value)
    case 'Single_Choice':
      // 单选
      return getValue(item.objectFieldValueList, item.value)
    default:
      return item.value
  }
}

export default {
  getObjectFieldValue
}
