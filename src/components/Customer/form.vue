<template>
  <div>
    <div>
      <object-filed :lst="customerTemplateFieldVoList" ref="objectField" :disabled="!!detailId"></object-filed>
    </div>
    <div class="" v-if="tempId || detailId">
      <el-button type="primary" @click="handleSubmit" size="mini">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { getCustomerDetail as getCustomerTemplateDetail } from '@/api/system/customer'
  import { saveCustomer, getCustomerDetail, updateCustomerDetail } from '@/api/customer/menu'
  import ObjectFiled from '@/components/ObjectField/index'
  import { modelType } from '@/components/ObjectField/module/index'
  export default {
    name: 'CustomerForm',
    components: {
      ObjectFiled
    },
    props: {
      tempId: {
        type: [String, Number],
        default: 0
      },
      detailId: {
        type: [String, Number],
        default: 0
      }
    },
    data() {
      return {
        formInfo: {
          businessTypeIdList: '', // 业务类型 id
          contacts: '', // 联系人
          contactsPhone: '', // 联系人电话
          customerOrResourceName: '', // 销售线索或客户名称
          customerTypeId: '', // 客户分类 id
          otherOption: '', // 其它选项
          regionId: '', // 线索 id
          customerTemplateId: '' // 模板 id
        },
        templateData: null, // 模板原始数据
        customerTemplateFieldVoList: [] // 数据
      }
    },
    watch: {
      tempId(n) {
        this.init()
      },
      detailId(n) {
        this.init()
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        // 重置表单
        this.reset()
        // 判断需要进行的操作
        if (this.tempId) {
          // 将模板 id 放入表单
          this.formInfo.customerTemplateId = Number(this.tempId)
          this.getTemplateDetail()
        }
        if (this.detailId) {
          this.getCustomerDetail()
        }
      },
      getTemplateDetail(status) {
        // 获得模板详情
        let getValue = null
        if (status) {
          // 处理选项
          const otherOption = JSON.parse(this.formInfo.otherOption)
          getValue = (item) => {
            /*
            * 获得对应的数据值
            * 前两个是固定的不可修改的
            * */
            if (item.apiName === 'CUSTOMER_NAME') {
              return {
                value: this.formInfo.customerName
              }
            } else if (item.apiName === 'CUSTOMER_TYPE') {
              return {
                value: this.formInfo.customerTypeName.customerTypeValue || item.objectFieldId
              }
            } else if (item.apiName === 'ADDRESS') {
              let value = ''
              let real = ''
              otherOption.forEach(option => {
                if (option.apiName === item.apiName) {
                  value = option.fieldValue
                  real = JSON.parse(option.realData)
                }
              })
              return {
                value,
                realData: real
              }
            } else {
              if (item.fieldType === 'Multiple_Choice') {
                // 如果是个多选，则是数组
                const value = []
                otherOption.forEach(option => {
                  if (option.apiName === item.apiName) {
                    value.push(option.objectFieldValueId)
                  }
                })
                return {
                  value
                }
              } else if (item.fieldType === 'Single_Choice') {
                // 如果是单选
                let value = 0
                otherOption.forEach(option => {
                  if (option.apiName === item.apiName) {
                    value = option.objectFieldValueId
                  }
                })
                return {
                  value
                }
              } else if (item.fieldType === 'AREA') {
                // 处理包含 realData 的数据
                let value = ''
                let real = ''
                otherOption.forEach(option => {
                  if (option.apiName === item.apiName) {
                    value = option.fieldValue
                    real = option.realData
                  }
                })
                return {
                  value,
                  realData: real
                }
              } else {
                // 最后默认获取值
                let value = ''
                otherOption.forEach(option => {
                  if (option.apiName === item.apiName) {
                    value = option.fieldValue
                  }
                })
                return {
                  value
                }
              }
            }
          }
        } else {
          getValue = (item) => {
            if (item.apiName === 'ADDRESS') {
              const realData = {
                location: {
                  apiName: 'DOT',
                  fieldType: 'LOCATION',
                  id: item.id + '_1',
                  objectFieldName: '定位地址',
                  optionValue: '[]',
                  required: item.required,
                  select: null,
                  value: modelType.LOCATION,
                  realData: null
                },
                area: {
                  apiName: 'AREA',
                  fieldType: 'AREA',
                  id: item.id + '_2',
                  objectFieldName: '地址',
                  optionValue: '[]',
                  required: item.required,
                  select: null,
                  value: modelType.AREA,
                  realData: null
                },
                address: {
                  apiName: 'DETAILADDRESS',
                  fieldType: 'Single_LineText',
                  id: item.id + '_3',
                  objectFieldName: '详细地址',
                  optionValue: '[]',
                  required: item.required,
                  select: null,
                  value: modelType.Single_LineText,
                  realData: null
                }
              }
              return {
                realData
              }
            } else if (item.apiName === 'CUSTOMER_TYPE') {
              return {
                value: this.templateData.customerTypeName
              }
            }
          }
        }
        getCustomerTemplateDetail(this.formInfo.customerTemplateId).then(res => {
          if (res.code === 200) {
            this.templateData = res.result
            this.customerTemplateFieldVoList = res.result.customerTemplateFieldVoList.map(item => {
              if (item.apiName === 'ADDRESS') {
                return {
                  ...item,
                  value: status ? getValue(item).value : modelType[item.fieldType],
                  realData: getValue(item).realData,
                  disabled: false // 用于处理一些奇怪的需求
                }
              } else if (item.apiName === 'CUSTOMER_TYPE') {
                return {
                  ...item,
                  value: getValue(item).value,
                  realData: null,
                  disabled: true // 用于处理一些奇怪的需求
                }
              } else {
                return {
                  ...item,
                  value: status ? getValue(item).value : modelType[item.fieldType],
                  realData: status ? getValue(item).realData : null,
                  disabled: false // 用于处理一些奇怪的需求
                }
              }
            })
          }
        })
      },
      getCustomerDetail() {
        // 获得客户详情
        getCustomerDetail(this.detailId).then(res => {
          this.formInfo = {
            ...this.formInfo,
            ...res.result
          }
          this.getTemplateDetail(true)
        })
      },
      handleSubmit() {
        const dealChoice = (obj) => {
          // 处理选项
          try {
            let list = JSON.parse(obj.optionValue)
            list = list.filter(item => {
              if (obj.fieldType === 'Single_Choice') {
                return item.id === obj.value
              } else {
                return obj.value.includes(item.id)
              }
            })
            list.forEach(item => {
              item.value = item.fieldTypeConditionValue
            })
            return {
              ...obj,
              optionValue: JSON.stringify(list)
            }
          } catch (e) {
            throw Error(e)
          }
        }
        const lst = JSON.parse(JSON.stringify(this.customerTemplateFieldVoList))
        // 校验必填是否已经填了
        let validateStatus = true
        for (let i = 0; i < lst.length; i++) {
          if (lst[i].required) {
            if (lst[i].fieldType === 'ADDRESS') {
              // 地址特殊处理
              const obj = lst[i]
              if (obj.realData) {
                if (!obj.realData.address.value) {
                  validateStatus = false
                  this.$message.error(`【${obj.realData.address.objectFieldName}】不能为空！`)
                  break
                }
                if (!obj.realData.area.value) {
                  validateStatus = false
                  this.$message.error(`【${obj.realData.area.objectFieldName}】不能为空！`)
                  break
                }
                if (!obj.realData.location.value) {
                  validateStatus = false
                  this.$message.error(`【${obj.realData.location.objectFieldName}】不能为空！`)
                  break
                }
              } else {
                validateStatus = false
                this.$message.error(`【${obj.objectFieldName}】不能为空！`)
                break
              }
            } else {
              // 如果是必填项，需要验证数据
              const typ = Object.prototype.toString.call(lst[i].value)
              if (typ === '[object String]') {
                // 如果是字符串，验证空
                if (!lst[i].value.trim()) {
                  validateStatus = false
                }
              } else if (typ === '[object Array]') {
                if (!lst[i].value.length) {
                  validateStatus = false
                }
              } else if (typ === '[object Null]') {
                validateStatus = false
              } else {
                // 不作处理
                if (!lst[i].value) {
                  validateStatus = false
                }
              }
              if (!validateStatus) {
                this.$message.error(`【${lst[i].objectFieldName}】不能为空！`)
                break
              }
            }
          }
        }
        if (!validateStatus) return
        // 组装数据
        lst.forEach((item, index) => {
          if (item.fieldType === 'Multiple_Choice' || item.fieldType === 'Single_Choice') {
            lst[index] = dealChoice(item)
          }
          if (item.apiName === 'CUSTOMER_NAME') {
            // 客户名称
            this.formInfo.customerOrResourceName = item.value
          }
          // if (item.apiName === 'CUSTOMER_TYPE') {
          //   // 客户分类
          //   this.formInfo.customerTypeId = item.value
          // }
          if (item.apiName === 'BUSINESS_TYPE') {
            // 业务类型
            this.formInfo.businessTypeIdList = item.value
          }
          if (item.apiName === 'CONTACTS') {
            // 联系人
            this.formInfo.contacts = item.value
          }
          if (item.apiName === 'CONTACTS_PHONE') {
            // 联系电话
            this.formInfo.contactsPhone = item.value
          }
          if (item.apiName === 'AREA') {
            this.formInfo.regionId = item.value[2]
          }
          if (item.apiName === 'ADDRESS') {
            this.formInfo.regionId = item.realData.area.value
            if (typeof this.formInfo.regionId === 'object') {
              try {
                this.formInfo.regionId = item.realData.area.value[2]
              } catch (e) {
                this.formInfo.regionId = ''
              }
            }
            item.realData = JSON.stringify(item.realData)
          }
        })
        this.formInfo.otherOption = JSON.stringify(lst)
        const fn = this.formInfo.id ? updateCustomerDetail : saveCustomer // eslint-disable-line
        // 设置当前创建用户是公海用户还是个人用户
        const sea = this.$route.query.sea
        this.formInfo.isOpenSeaCustomer = !!sea
        this.formInfo.openSeaId = sea || ''
        fn(this.formInfo).then(res => {
          if (res.code === 200) {
            // 成功后的回调
            this.$emit('success', {
              customerId: res.result.id,
              ...this.formInfo
            })
          }
        })
      },
      reset() {
        this.formInfo = {
          businessTypeIdList: '', // 业务类型 id
          contacts: '', // 联系人
          contactsPhone: '', // 联系人电话
          customerOrResourceName: '', // 销售线索或客户名称
          customerTypeId: '', // 客户分类 id
          otherOption: '', // 其它选项
          regionId: '', // 线索 id
          customerTemplateId: '' // 模板 id
        }
        this.customerTemplateFieldVoList = [] // 数据
      }
    }
  }
</script>

<style lang="scss" scoped></style>
