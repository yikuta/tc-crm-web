<template>
  <div class="app-container">
    <el-row class="padding-bottom-sm border-bottom-main">
      <el-col :span="12" class="">客户索合并</el-col>
      <el-col :span="12" class="text-right">
        <span class="text-info text-sm padding-right-sm">线索合并后会将被合并线索的负责团队、跟进记录等合并到目标线索</span>
      </el-col>
    </el-row>
    <div class="text-df table-box margin-top">
      <el-row class="bg-seat text-bold">
        <el-col class="header-line">
          <div>字段</div>
          <div>客户</div>
        </el-col>
        <el-col :span="10">{{ detail1 && detail1.contacts }}</el-col>
        <el-col :span="10">{{ detail2 && detail2.contacts }}</el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px;">设为目标客户</el-col>
        <el-col :span="10">
          <el-radio v-model="targetId" :label="0" @change="handleChangeTarget(0)">{{ '' }}</el-radio>
        </el-col>
        <el-col :span="10">
          <el-radio v-model="targetId" :label="1" @change="handleChangeTarget(1)">{{ '' }}</el-radio>
        </el-col>
      </el-row>
      <el-row v-for="(val, key, index) of detailSelect" :key="index" class="text-convention">
        <el-col style="width:180px">{{ detailList[key].name || '' }}</el-col>
        <el-col :span="10">
          <el-radio :class="detailList[key].value[0] === '选项已删除' ? 'text-line-through' : ''" v-model="detailSelect[key]" :label="0">
            <template v-if="detailList[key].type !== 'IMAGE'">{{ detailList[key].value[0] || '--' }}</template>
            <template v-if="detailList[key].type === 'IMAGE'">
              <el-image
                style="width: 30px; height: 30px"
                fit="contain"
                :src="detailList[key].value[0]"
                :preview-src-list="[detailList[key].value[0]]">
              </el-image>
            </template>
          </el-radio>
          <!-- <el-radio v-model="detailSelect[key]" :label="0" :disabled="!detailList[key].value[0]">{{ detailList[key].value[0] || '--' }}</el-radio> -->
        </el-col>
        <el-col :span="10">
          <el-radio :class="detailList[key].value[1] === '选项已删除' ? 'text-line-through' : ''" v-model="detailSelect[key]" :label="1">
            <template  v-if="detailList[key].type !== 'IMAGE'">{{ detailList[key].value[1] || '--' }}</template>
            <template v-if="detailList[key].type === 'IMAGE'">
              <el-image
                style="width: 30px; height: 30px"
                fit="contain"
                :src="detailList[key].value[1]"
                :preview-src-list="[detailList[key].value[1]]">
              </el-image>
            </template>
          </el-radio>
          <!-- <el-radio v-model="detailSelect[key]" :label="1" :disabled="!detailList[key].value[0]">{{ detailList[key].value[1] || '--' }}</el-radio> -->
        </el-col>
      </el-row>
      <el-row class="text-convention" v-for="(val, key, index) of basicData" :key="`${key}${index}`">
        <el-col style="width:180px">{{ basicData[key].name }}</el-col>
        <el-col :span="10">
          <el-radio v-model="basicData[key].value" :label="0" disabled>{{ detail1[key] || '--' }}</el-radio>
        </el-col>
        <el-col :span="10">
          <el-radio v-model="basicData[key].value" :label="1" disabled>{{ detail2[key] || '--' }}</el-radio>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
<!--      <el-button size="mini">取消</el-button>-->
    </div>
  </div>
</template>

<script>
  import { getCustomerDetail, mergeCustomer } from '@/api/customer/menu'
  export default {
    name: 'Merge',
    data() {
      return {
        targetId: 0, // 目标客户
        detailId1: null, // 客户 1
        detailId2: null, // 客户 2
        detail1: {
          customerNo: '', // 客户编号
          responsibilityUserName: '', // 负责人
          userDepartmentName: '', // 负责人所属部门
          creatorName: '', // 创建人
          createTime: '', // 创建时间
          lastFollowUpTime: '', // 最后跟进时间
          cooperationStatus: '', // 合作状态
          lastUpdateTime: '', // 最后修改时间
          lastUpdateUserName: '', // 最后修改人
          otherOption: '[]'
        }, // 客户 1 详情
        detail2: {
          customerNo: '', // 客户编号
          responsibilityUserName: '', // 负责人
          userDepartmentName: '', // 负责人所属部门
          creatorName: '', // 创建人
          createTime: '', // 创建时间
          lastFollowUpTime: '', // 最后跟进时间
          cooperationStatus: '', // 合作状态
          lastUpdateTime: '', // 最后修改时间
          lastUpdateUserName: '', // 最后修改人
          otherOption: '[]'
        }, // 客户 2 详情
        detailSelect: {}, // 选择的数据
        detailList: {}, // 数据列表
        basicData: { // 基本信息
          customerNo: {
            name: '客户编号',
            value: 0
          }, // 客户编号
          responsibilityUserName: {
            name: '负责人',
            value: 0
          }, // 负责人
          userDepartmentName: {
            name: '负责人所属部门',
            value: 0
          }, // 负责人所属部门
          creatorName: {
            name: '创建人',
            value: 0
          }, // 创建人
          createTime: {
            name: '创建时间',
            value: 0
          }, // 创建时间
          lastFollowUpTime: {
            name: '最后跟进时间',
            value: 0
          }, // 最后跟进时间
          cooperationStatus: {
            name: '合作状态',
            value: 0
          }, // 合作状态
          lastUpdateTime: {
            name: '最后修改时间',
            value: 0
          }, // 最后修改时间
          lastUpdateUserName: {
            name: '最后修改人',
            value: 0
          } // 最后修改人
        }, // 基础信息
        loadNum: 0
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        // 新建数据
        try {
          this.detailId1 = this.$route.query.id1
          this.getDetail(this.detailId1, 'detail1')
          this.detailId2 = this.$route.query.id2
          this.getDetail(this.detailId2, 'detail2')
        } catch (e) {
          // 抛出错误
        }
      },
      getDetail(id, key) {
        // 获得客户详情
        getCustomerDetail(id).then(res => {
          if (res.code === 200) {
            this[key] = res.result
            this.dealDetail()
          }
        })
      },
      dealDetail() {
        // 处理详情
        if (this.loadNum) {
          // 当数据完整了之后才进行处理
          const option1 = JSON.parse(this.detail1.otherOption)
          const option2 = JSON.parse(this.detail2.otherOption)
          const forEach = (lst, index) => {
            // 处理数据
            lst.forEach(item => {
              if (item.apiName === 'ADDRESS') {
                this.$set(this.detailSelect, 'DOT', 0)
                this.$set(this.detailSelect, 'AREA', 0)
                this.$set(this.detailSelect, 'DETAILADDRESS', 0)
              } else {
                this.$set(this.detailSelect, item.apiName, 0)
              }
              if (this.detailList[item.apiName]) {
                if (item.apiName === 'ADDRESS') {
                  // 处理 value 值
                  if (item.fieldValue) {
                    if (this.detailList[item.apiName].value[index]) {
                      this.detailList[item.apiName].value[index] = `${this.detailList[item.apiName].value[index]},${item.fieldValue}`
                    } else {
                      this.detailList[item.apiName].value[index] = item.fieldValue
                    }
                    // 处理 baseData
                    if (this.detailList[item.apiName].baseData[index]) {
                      this.detailList[item.apiName].baseData[index] = this.detailList[item.apiName].baseData[index].concat(item)
                    } else {
                      this.detailList[item.apiName].baseData[index] = [item]
                    }
                  }
                } else {
                  // 处理 value 值
                  if (this.detailList[item.apiName].value[index]) {
                    this.detailList[item.apiName].value[index] = `${this.detailList[item.apiName].value[index]},${item.fieldValue}`
                  } else {
                    this.detailList[item.apiName].value[index] = item.fieldValue
                  }
                  // 处理 baseData
                  if (this.detailList[item.apiName].baseData[index]) {
                    this.detailList[item.apiName].baseData[index] = this.detailList[item.apiName].baseData[index].concat(item)
                  } else {
                    this.detailList[item.apiName].baseData[index] = [item]
                  }
                }
              } else {
                // 新建的数据
                if (item.apiName === 'ADDRESS') {
                  // this.detailList[item.apiName] = {
                  //   name: item.fieldName,
                  //   enName: item.apiName,
                  //   value: index ? ['', item.fieldValue] : [item.fieldValue],
                  //   baseData: index ? [[], [item]] : [[item]]
                  // }
                  // console.log(this.detailList)
                  if (item.fieldValue) {
                    const fieldValue = JSON.parse(item.fieldValue)
                    for (const key in fieldValue) {
                      const element = fieldValue[key]
                      let val = ''
                      try {
                        element.apiName === 'AREA'
                          ? val = JSON.parse(element.realData)[0].name + JSON.parse(element.realData)[1].name + JSON.parse(element.realData)[2].name
                          : val = element.value
                      } catch (e) {
                        console.error(e) // eslint-disable-line
                      }
                      this.detailList[element.apiName] = {
                        name: element.objectFieldName,
                        enName: element.apiName,
                        type: element.fieldType,
                        value: index ? [this.detailList[element.apiName] ? this.detailList[element.apiName].value[0] : '', val] : [val],
                        baseData: index ? [this.detailList[element.apiName] ? this.detailList[element.apiName].baseData[0] : '', [element]] : [[element]]
                      }
                    }
                  } else {
                    const dot = 'DOT'
                    this.detailList[dot] = {
                      name: '定位地址',
                      enName: 'DOT',
                      type: 'DOT',
                      value: index ? ['', ''] : [''],
                      baseData: index ? [[], [{}]] : [[]]
                    }
                    const area = 'AREA'
                    this.detailList[area] = {
                      name: '地址',
                      enName: 'AREA',
                      type: 'AREA',
                      value: index ? ['', ''] : [''],
                      baseData: index ? [[], [{}]] : [[{}]]
                    }
                    const detailAddress = 'DETAILADDRESS'
                    this.detailList[detailAddress] = {
                      name: '详细地址',
                      enName: 'DETAILADDRESS',
                      type: 'DETAILADDRESS',
                      value: index ? ['', ''] : [''],
                      baseData: index ? [[], [{}]] : [[{}]]
                    }
                  }
                } else {
                  this.detailList[item.apiName] = {
                    name: item.fieldName,
                    enName: item.apiName,
                    type: item.fieldType,
                    value: index ? ['', item.fieldValue] : [item.fieldValue],
                    baseData: index ? [[], [item]] : [[item]]
                  }
                }
              }
            })
          }
          forEach(option1, 0)
          forEach(option2, 1)
          this.$forceUpdate()
        }
        this.loadNum = this.loadNum + 1
      },
      handleChangeTarget(targetId) {
        // 选择设置目标客户
        this.targetId = targetId
        for (const key in this.basicData) {
          this.basicData[key].value = targetId
        }
        for (const key in this.detailSelect) {
          this.detailSelect[key] = targetId
        }
      },
      handleSubmit() {
        // 保存
        let option = []
        const form = {}
        // 获得选中的数据项
        for (const key in this.detailSelect) {
          option = option.concat(this.detailList[key].baseData[this.detailSelect[key]])
        }
        // 数据处理
        const realData = {
          location: {
            apiName: 'DOT',
            fieldType: 'LOCATION',
            objectFieldName: '定位地址',
            optionValue: [],
            required: false,
            select: null,
            value: '',
            realData: null
          },
          area: {
            apiName: 'AREA',
            fieldType: 'AREA',
            objectFieldName: '地址',
            optionValue: [],
            required: false,
            select: null,
            value: '',
            realData: []
          },
          address: {
            apiName: 'DETAILADDRESS',
            fieldType: 'Single_LineText',
            objectFieldName: '详细地址',
            optionValue: [],
            required: false,
            select: null,
            value: '',
            realData: null
          }
        }
        option.forEach((item, index) => {
          if (item.apiName === 'CUSTOMER_NAME') {
            // 客户名称
            form.customerOrResourceName = item.fieldValue
            form.mergeName = item.fieldValue
            // 判断处理获得被删掉的客户
            try {
              form.customerOrResourceName2 = this.detailSelect[item.apiName] ? this.detailList[item.apiName].baseData[0][0].fieldValue : this.detailList[item.apiName].baseData[1][0].fieldValue
            } catch (e) {
              form.customerOrResourceName2 = ''
            }
          }
          if (item.apiName === 'CUSTOMER_TYPE') {
            // 客户分类
            form.customerTypeId = item.objectFieldValueId
          }
          // if (item.apiName === 'BUSINESS_TYPE') {
          //   // 业务类型
          //   form.businessTypeIdList = item.fieldValue
          // }
          if (item.apiName === 'CONTACTS') {
            // 联系人
            form.contacts = item.fieldValue
          }
          if (item.apiName === 'CONTACTS_PHONE') {
            // 联系电话
            form.contactsPhone = item.fieldValue
          }
          if (item.apiName === 'AREA') {
            try {
              form.regionId = item.value || ''
            } catch (e) {}
            realData.area = item
          }
          if (item.apiName === 'DOT') {
            realData.location = item
          }
          if (item.apiName === 'DETAILADDRESS') {
            realData.address = item
          }
        })
        option = option.filter((t) => t.apiName !== 'AREA')
        option = option.filter((t) => t.apiName !== 'DOT')
        option = option.filter((t) => t.apiName !== 'DETAILADDRESS')
        const arr = [{
          apiName: 'ADDRESS',
          delFlag: false,
          enable: true,
          fieldName: '地址',
          fieldType: 'AREA',
          fieldValue: JSON.stringify(realData),
          realData: JSON.stringify(realData)
        }]
        option = option.concat(arr)
        // optionMessage 等于新建的时候的 otherOption
        form.optionMessage = JSON.stringify(option)
        // 被删除的用户
        form.deleteCustomerId = this.targetId ? this.detailId1 : this.detailId2
        // 客户 id
        form.id = !this.targetId ? this.detailId1 : this.detailId2
        // 合并的时候获取对应的区域 id
        // form.regionId = !this.targetId ? this.detail1.regionId : this.detail2.regionId
        this.$confirm('确定要合并客户吗？', '提示', {
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          mergeCustomer(form).then(res => {
            if (res.code === 200) {
              this.$notify.success('合并成功')
              this.$confirm('合并成功！', '成功提示', {
                showCancelButton: false,
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false
              }).then(() => {
                this.$router.push('/client/index')
              })
            }
          })
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.app-container{
  .table-box{
    .header-line{position:relative;width:180px;overflow: hidden;height:50px;
      &:before{width:200%;height:1px;content: '';position:absolute;left:0;transform: rotate(15deg);background:#C0C4CC; transform-origin: 0% 0%; }
      >div{
        &:first-child{position:absolute;bottom:-5px;left:0px;}
        &:last-child{position:absolute;top:-5px;right:10px;}
      }
    }
    >div{height:50px;line-height:50px;text-indent: 10px;}
  }
}
</style>
