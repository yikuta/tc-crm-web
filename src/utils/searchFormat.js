import { MatchType, DataType } from '@/constant/search'
import { dataType, isEmptyObject } from './util'

// 过滤空筛选条件
function filterEmptyData(data) {
  const results = {}
  Object.keys(data).map(key => {
    const item = data[key]
    const valueType = dataType(item.value)
    if (item.value === false || item.value === 0 || (item.value && ((valueType !== 'ARRAY') || (valueType === 'ARRAY' && item.value.length)))) {
      results[key] = { ...item }
    }
  })
  return results
}

function matchSearchDataType(obj) {
  const typeStr = dataType(obj).toUpperCase()
  if (!DataType[typeStr]) throw new Error(`找不到匹配类型 ${typeStr}`)
  return DataType[typeStr]
}

export default function searchFormat(data) {
  const newData = filterEmptyData(data)
  if (isEmptyObject(newData)) return []

  const results = []
  Object.keys(newData).forEach(key => {
    const item = newData[key]
    const itemObject = {
      tempMatchType: MatchType[item.matchType],
      propertyValue1: item.value,
      propertyName: item.name || key,
      tempType: item.tempType || matchSearchDataType(item.value)
    }
    if (dataType(item.value) === 'Array') {
      item.value.forEach((value, index) => {
        itemObject[`propertyValue${++index}`] = value
      })
    }
    results.push(itemObject)
  })
  return results
}
