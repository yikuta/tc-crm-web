<template>
  <dialog-modal title="新建跟进记录" :visible.sync="dialogVisible" width="80%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini">
      <!-- <FormItem v-for="(item, index) in keyValue" :key="index" :formItem="item" @on-val-change="onValChange" /> -->
    </el-form>
    <object-filed :lst="customerTemplateFieldVoList" ref="objectField"></object-filed>
  </dialog-modal>
</template>

<script>
  // import { queryObjectFieldList } from '@/api/resource/detail'
  import { getFollowRecordList, addFollowRecord } from '@/api/resource/detail'
  import DialogModal from '@/components/Dialog/index.vue'
  // import FormItem from '../formItem'
  import ObjectFiled from '@/components/FollowRecord/index'
  import { modelType } from '@/components/FollowRecord/module/index'
  export default {
    name: 'SaleForm',
    components: {
      DialogModal,
      // FormItem,
      ObjectFiled
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        formInfo: {
          crmInfoType: 1, // 资源类型 1、资源线索 2、客户
          customerId: this.$route.query.resourceId, // 资源、客户 的关联id
          recordType: 2, // 记录类型 1、上门拜访  2、销售记录
          record: '' // 跟进记录json串
        },
        customerTemplateFieldVoList: [],
        dialogVisible: false
      }
    },
    mounted() {
      this.getTemplateDetail()
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        if (n) {
        }
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      handleSubmit() {
        // 校验必填是否已经填了
        const lst = JSON.parse(JSON.stringify(this.customerTemplateFieldVoList))
        let validateStatus = true
        for (let i = 0; i < lst.length; i++) {
          if (lst[i].isRequired) {
            if (lst[i].fieldType === 'ADDRESS') {
              // 地址特殊处理
              const obj = lst[i]
              if (obj.realData) {
                if (!obj.realData.address.value) {
                  validateStatus = false
                  this.$message.error(`【${obj.realData.address.fieldName}】不能为空！`)
                  break
                }
                if (!obj.realData.area.value) {
                  validateStatus = false
                  this.$message.error(`【${obj.realData.area.fieldName}】不能为空！`)
                  break
                }
                if (!obj.realData.location.value) {
                  validateStatus = false
                  this.$message.error(`【${obj.realData.location.fieldName}】不能为空！`)
                  break
                }
              } else {
                validateStatus = false
                this.$message.error(`【${obj.fieldName}】不能为空！`)
                break
              }
            } else {
              // 如果是必填项，需要验证数据
              const typ = Object.prototype.toString.call(lst[i].value)
              if (typ === '[object String]') {
                // 如果是字符串，验证空
                if (!lst[i].value) {
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
                this.$message.error(`【${lst[i].fieldName}】不能为空！`)
                break
              }
            }
          }
        }
        if (!validateStatus) return
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
            console.log(e)
          }
        }
        this.customerTemplateFieldVoList.forEach((item, index) => {
          if (item.fieldType === 'Multiple_Choice' || item.fieldType === 'Single_Choice') {
            this.customerTemplateFieldVoList[index] = dealChoice(item)
          }
        })
        this.formInfo.record = JSON.stringify(this.customerTemplateFieldVoList)
        this._addFollowRecord(this.formInfo)
      },
      // _getFollowRecordList() {
      //   return getFollowRecordList().then((res) => {
      //     if (res.code === 200) {
      //       this.keyValue = res.result
      //     }
      //   })
      // },
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
              return this.formInfo.contacts
            } else if (item.apiName === 'CUSTOMER_TYPE') {
              return this.formInfo.customerTypeName.id
            } else {
              if (item.fieldType === 'Multiple_Choice') {
                // 如果是个多选，则是数组
                const value = []
                otherOption.forEach(option => {
                  if (option.apiName === item.apiName) {
                    value.push(option.objectFieldValueId)
                  }
                })
                return value
              } else if (item.fieldType === 'Single_Choice') {
                // 如果是单选
                let value = 0
                otherOption.forEach(option => {
                  if (option.apiName === item.apiName) {
                    value = option.objectFieldValueId
                  }
                })
                return value
              } else {
                // 最后默认获取值
                let value = ''
                otherOption.forEach(option => {
                  if (option.apiName === item.apiName) {
                    value = option.fieldValue
                  }
                })
                return value
              }
            }
          }
        }
        getFollowRecordList().then(res => {
          this.customerTemplateFieldVoList = res.result.map(item => {
            return {
              ...item,
              value: status ? getValue(item) : modelType[item.fieldType]
            }
          })
        })
      },
      _addFollowRecord(data) {
        return addFollowRecord(data).then((res) => {
          if (res.code === 200) {
            this.$emit('update:visible', false)
            this.$emit('on-freshData')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
