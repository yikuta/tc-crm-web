// 对象字段类型
export const ObjectTypeOption = [
  { id: 1, name: '单行文本', component: 'text', type: 'Single_LineText', ref: 'textModel', remark: '适用于填写简单的文字，如：姓名', enable: true },
  { id: 2, name: '多行文本', component: 'textarea', type: 'Multiline_Text', ref: 'textareaModel', remark: '适用于填写大段的文字，如：备注', enable: true },
  { id: 3, name: '单选', component: 'radio', type: 'Single_Choice', ref: 'radioModel', remark: '适用于在几个选项中选择一个，如：性别', enable: true },
  { id: 4, name: '多选', component: 'checkbox', type: 'Multiple_Choice', ref: 'checkboxModel', remark: '适用于在多个选项中选择多个', enable: true },
  { id: 5, name: '数字', component: 'number', type: 'Number', ref: 'numberModel', remark: '适用于填写数字，如：数量', enable: true },
  { id: 6, name: '手机号', component: 'phone', type: 'Phone', ref: 'phoneModel', remark: '适用于填写手机号', enable: true },
  { id: 7, name: '日期', component: 'date', type: 'DATE', ref: 'dateModel', remark: '适用于选择日期，例如：2012-12-12', enable: true },
  { id: 8, name: '时间', component: 'time', type: 'TIME', ref: 'timeModel', remark: '适用于选择时间，例如12:00:00', enable: true },
  { id: 9, name: '日期时间', component: 'dateTime', type: 'DATE_TIME', ref: 'dateTimeModel', remark: '适用于选择唯一时间点，例如2012-12-12 12:00:00', enable: true },
  { id: 10, name: '布尔值', component: 'boolean', type: 'BOOLEAN', ref: 'booleanModel', remark: '适用于选择是或否', enable: true },
  { id: 11, name: '百分数', component: 'percentage', type: 'PERCENTTAGE', ref: 'percentageModel', remark: '适用于填写和展示百分数', enable: true },
  { id: 12, name: '图片', component: 'picture', type: 'IMAGE', ref: 'pictureModel', remark: '适用于上传图片', enable: false },
  { id: 13, name: '地区地址', component: 'area', type: 'AREA', ref: 'areaModel', remark: '适用于填写地址', enable: false },
  { id: 14, name: '定位', component: 'dot', type: 'LOCATION', ref: 'dotModel', remark: '适用于创建定位信息', enable: false },
  { id: 15, name: '富文本', component: 'editor', type: 'RICH_TEST', ref: 'editorModel', remark: '适用于填写富文本内容', enable: false },
  { id: 16, name: '定位地址', component: 'address', type: 'ADDRESS', ref: 'addressModel', remark: '', enable: false }
]

export const ObjectTypeByKey = {
  Single_LineText: ObjectTypeOption[0],
  Multiline_Text: ObjectTypeOption[1],
  Single_Choice: ObjectTypeOption[2],
  Multiple_Choice: ObjectTypeOption[3],
  Number: ObjectTypeOption[4],
  Phone: ObjectTypeOption[5],
  DATE: ObjectTypeOption[6],
  TIME: ObjectTypeOption[7],
  DATE_TIME: ObjectTypeOption[8],
  BOOLEAN: ObjectTypeOption[9],
  PERCENTTAGE: ObjectTypeOption[10],
  IMAGE: ObjectTypeOption[11],
  AREA: ObjectTypeOption[12],
  LOCATION: ObjectTypeOption[13],
  RICH_TEST: ObjectTypeOption[14],
  ADDRESS: ObjectTypeOption[15]
}
