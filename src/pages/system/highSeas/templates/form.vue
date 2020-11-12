<template>
  <dialog-modal :title="formInfo.id ? '编辑公海' : '新建公海'" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="110px" size="mini" :model="formInfo" :rules="rules" ref="form">
      <el-row class="padding-bottom-sm border-bottom-main margin-bottom-sm">
        <el-col :span="24" class="text-left">
          <span class="text-second padding-right-sm">基本信息</span>
        </el-col>
      </el-row>
      <el-form-item label="公海名称" prop="openSeaName">
        <el-input placeholder="请输入公海名称" v-model="formInfo.openSeaName"></el-input>
      </el-form-item>
      <el-form-item label="管理员" prop="adminId">
<!--        <el-select v-model="formInfo.adminId" placeholder="请选择管理员">-->
<!--          <el-option v-for="(item, index) in userList" :key="index" :value="item.userId" :label="item.fullName"></el-option>-->
<!--        </el-select>-->
<!--        <i class="el-icon-refresh cursor text-brand text-df margin-left-sm" title="刷新员工列表" @click="getAllUser"></i>-->
        <selected-people v-model="adminSelect"></selected-people>
      </el-form-item>
      <el-form-item label="成员" prop="memberIdList">
<!--        <el-select v-model="formInfo.memberIdList" filterable multiple placeholder="请选择成员">-->
<!--          <el-option v-for="(item, index) in userList" :key="index" :value="item.userId" :label="item.fullName"></el-option>-->
<!--        </el-select>-->
<!--        <i class="el-icon-refresh cursor text-brand text-df margin-left-sm" title="刷新员工列表" @click="getAllUser"></i>-->
        <el-tag v-for="(item, index) in memberList" type="info" :key="index" closable size="mini" @close="handleMemberClose(index)">{{ item.name }}</el-tag>
        <span style="display: inline-block"><selected-people v-model="memberSelect" @on-selected="handleMemberSelect"></selected-people></span>
      </el-form-item>
      <el-form-item label="分配领取规则">
        <div>
          <el-radio label="MEMBER_VISIBLE" v-model="formInfo.receiveRule">成员可见可领取，管理员可分配</el-radio>
        </div>
        <div>
          <el-radio label="MEMBER_INVISIBLE" v-model="formInfo.receiveRule">成员不可见，管理员可分配</el-radio>
        </div>
      </el-form-item>
      <el-row class="padding-top padding-bottom-sm border-bottom-main margin-bottom">
        <el-col :span="24" class="text-left">
          <span class="text-second padding-right-sm">规则设置</span>
        </el-col>
      </el-row>
      <el-form-item label="客户认领上限" prop="memberUplimit">
        每个员工最多保有<el-input type="number" placeholder="请输入数量" style="width:100px;" class="margin-right-sm margin-left-sm" v-model.number="formInfo.memberUplimit"></el-input>个客户
      </el-form-item>
      <el-form-item label="客户范围" prop="openSeaCustomerRangeDtoList">
        <el-row type="flex" align="middle" class="rule-list">
          <el-col :span="4" class="rule-title margin-right text-second">且（and）</el-col>
          <el-col :span="20" class="rule-select">
            <div v-for="(item, index) in formInfo.openSeaCustomerRangeDtoList" :key="index" class="margin-top-sm">
              <el-row>
                <el-col :span="7" class="padding-right-sm">
                  <el-select v-model="item.customerRangeFieldType" @change="handleRangField">
                    <el-option v-for="(item, j) in customer.RangField" :label="item.value" :value="item.id" :key="j"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="7" class="padding-right-sm">
                  <el-select v-model="item.comparisonConditionType">
                    <el-option v-for="(item, j) in customer.RangCondition" :label="item.value" :value="item.id" :key="j"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="7" class="padding-right-sm">
                  <el-select v-model="item.valueId" v-if="item.customerRangeFieldType === 1">
                    <el-option v-for="(item, j) in customer.RangValue[item.customerRangeFieldType]" :label="item.businessTtypeName || item.name" :value="item.businessTypeId || item.code" :key="j"></el-option>
                  </el-select>
                  <area-cascader :key="index" ref="getAreaId" v-model="areaList[index]" v-else></area-cascader>
                </el-col>
                <el-col :span="3">
                  <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDeleteArea" v-if="formInfo.openSeaCustomerRangeDtoList.length > 1"></el-button>
                </el-col>
              </el-row>
            </div>
            <div class="margin-top-sm">
              <el-button type="primary" icon="el-icon-plus" circle @click="handleAddArea"></el-button>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  import { getAllUser } from '@/api/basic'
  import { getCustomerRangCondition, getCustomerRangField, getCustomerRangValue } from '@/api/customer/compare'
  import { saveOpenSea, updateOpenSea } from '@/api/system/sea'
  export default {
    name: 'RoleForm',
    components: {
      DialogModal,
      AreaCascader: resolve => {
        return require(['@/components/Area/cascader.vue'], resolve)
      },
      SelectedPeople: resolve => {
        return require(['@/components/SelectedPeople'], resolve)
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      form: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      // const seaCustomerValidate = (rule, value, callback) => {
      //   let validateTag = false // 是否验证不通过
      //   let areaIdTotal = 0 // 统计匹配到的省市区数量
      //   this.formInfo.openSeaCustomerRangeDtoList.forEach((item, index) => {
      //     // 验证不通过就跳过不再验证
      //     if (validateTag) return
      //     if (item.customerRangeFieldType === 2) {
      //       // 用户选择的是地区，需要获取数据
      //       const areas = this.$refs.getAreaId[areaIdTotal].getAreaIds('id')
      //       if (areas.length === 3) {
      //         item.valueId = areas[2]
      //       } else {
      //         validateTag = true
      //         callback(new Error('请选择客户范围对应的地区'))
      //       }
      //       // 统计选过的省市区数量
      //       areaIdTotal = areaIdTotal + 1
      //     } else {
      //       validateTag = !item.valueId
      //       if (!item.valueId) {
      //         callback(new Error('请选择客户范围对应的类型'))
      //       }
      //     }
      //   })
      //   callback()
      // }
      return {
        dialogVisible: false,
        formInfo: {
          creatorId: this.$store.getters.userInfo.userId, // 创建者 id
          openSeaName: '', // 公海名称
          adminId: '', // 管理员 id
          enable: true, // 状态
          memberIdList: [], // 员工 id 集合
          memberUplimit: 0, // 员工认领上限
          receiveRule: 'MEMBER_VISIBLE', // 领取规则 ['MEMBER_VISIBLE', 'MEMBER_INVISIBLE']
          openSeaCustomerRangeDtoList: [
            // {
            //   comparisonConditionType: '', // 字段
            //   customerRangeFieldType: '', // 条件
            //   valueId: '' // 字段值
            // }
          ]
        },
        rules: {
          openSeaName: [
            { required: true, message: '请输入公海名称', trigger: 'blur' }
          ],
          adminId: [
            { required: true, message: '请选择管理员', trigger: 'blur' }
          ],
          memberIdList: [
            { required: true, message: '请选择成员', trigger: 'blur' }
          ],
          memberUplimit: [
            { required: true, message: '请输入客户认领上限', trigger: 'blur' }
          ],
          openSeaCustomerRangeDtoList: [
            // { required: true, message: '请选择分配领取规则', trigger: 'blur' },
            // { validator: seaCustomerValidate, trigger: 'blur' }
          ]
        },
        adminSelect: { // 管理员选择
          name: '',
          id: ''
        },
        memberSelect: { // 成员选择
          name: '',
          id: ''
        },
        memberList: [], // 成员列表
        userList: [],
        customer: {
          RangCondition: [],
          RangField: [],
          RangValue: []
        },
        RangFieldType: ['', 'BUSINESS_TYPE', 'AREA'], // 对应的检索条件需要的名字
        areaList: {} // 区域列表集合
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        if (n) {
          !this.userList.length && this.getAllUser()
          !this.customer.RangCondition.length && this.getConditionRule()
          this.dealForm()
        }
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    created() {
    },
    methods: {
      getAllUser() {
        getAllUser().then(res => {
          this.userList = res.result
        })
      },
      getConditionRule() {
        // 获取客户范围的筛选列表
        getCustomerRangCondition().then(res => {
          this.customer.RangCondition = res.result
        })
        // 获取客户范围约束字段
        getCustomerRangField().then(res => {
          this.customer.RangField = res.result
        })
        // 获取客户范围比较值
        if (!this.form) {
          this.handleRangField(1)
        }
      },
      handleRangField(val) {
        // 获取客户范围比较值
        getCustomerRangValue({
          customerRangeFieldType: this.RangFieldType[val]
        }).then(res => {
          if (res.code === 200) {
            this.customer.RangValue[val] = res.result
            this.$forceUpdate()
          }
        })
      },
      handleAddArea() {
        // 增加一个客户范围筛选条件
        this.formInfo.openSeaCustomerRangeDtoList.push({
          comparisonConditionType: '', // 字段
          customerRangeFieldType: '', // 条件
          valueId: '' // 字段值
        })
      },
      handleDeleteArea(index) {
        // 删除客户范围筛选条件
        if (this.formInfo.openSeaCustomerRangeDtoList.length === 1) return
        this.formInfo.openSeaCustomerRangeDtoList.splice(index, 1)
      },
      handleSubmit(done) {
        // 确定
        // let validateTag = false // 是否验证不通过
        let areaIdTotal = 0 // 统计匹配到的省市区数量
        this.formInfo.openSeaCustomerRangeDtoList.forEach((item, index) => {
          // 验证不通过就跳过不再验证
          // if (validateTag) return
          if (item.customerRangeFieldType === 2) {
            // 用户选择的是地区，需要获取数据
            const areas = this.$refs.getAreaId[areaIdTotal].getAreaIds('id')
            if (areas.length === 3) {
              item.valueId = areas[2]
            }
            // if (areas.length === 3) {
            //   item.valueId = areas[2]
            // } else {
            //   validateTag = true
            //   this.$message.error('请选择客户范围对应的地区')
            // }
            // // 统计选过的省市区数量
            areaIdTotal = areaIdTotal + 1
          } else {
            // validateTag = !item.valueId
            // if (!item.valueId) {
            //   this.$message.error('请选择客户范围对应的类型')
            // }
          }
        })
        // if (validateTag) return
        this.formInfo.adminId = this.adminSelect.id
        this.formInfo.memberIdList = this.memberList.map(item => {
          return item.id
        })
        this.$refs.form.validate(result => {
          if (result) {
            const fn = this.formInfo.id ? updateOpenSea : saveOpenSea
            fn(this.formInfo).then(res => {
              this.$notify.success('保存成功')
              this.$emit('success')
              this.$emit('update:visible', false)
            })
          }
        })
      },
      dealForm() {
        // 处理表单数据
        if (this.form) {
          this.formInfo = {
            id: this.form.openSeaId,
            creatorId: this.$store.getters.userInfo.userId, // 创建者 id
            openSeaName: this.form.openSeaName, // 公海名称
            adminId: this.form.admin.userId, // 管理员 id
            enable: true, // 状态
            memberIdList: this.form.memberNameList.map(value => {
              return value.userId
            }), // 员工 id 集合
            memberUplimit: this.form.memberUplimit, // 员工认领上限
            receiveRule: this.form.receiveRule, // 领取规则 ['MEMBER_VISIBLE', 'MEMBER_INVISIBLE']
            openSeaCustomerRangeDtoList: this.form.openSeaCustomerRangeVoList.map(item => {
              return {
                comparisonConditionType: item.comparisonConditionTypeId, // 字段
                customerRangeFieldType: item.customerRangeFieldTypeId, // 条件
                valueId: item.valueId // 字段值
              }
            })
          }
          // 设置省市区
          this.form.openSeaCustomerRangeVoList.forEach((item, index) => {
            if (item.customerRangeFieldTypeId === 2) {
              this.areaList[index] = [item.provinceCode, item.cityCode, item.areaCode]
            } else {
              if (this.customer.RangValue[item.customerRangeFieldTypeId] && this.customer.RangValue[item.customerRangeFieldTypeId].length) {
                // 不处理
              } else {
                this.handleRangField(item.customerRangeFieldTypeId)
              }
            }
          })
          // 处理管理员和成员
          this.adminSelect = {
            name: this.form.admin.fullName,
            id: this.form.admin.userId
          }
          this.form.memberNameList.forEach(item => {
            this.memberList.push({
              name: item.fullName,
              id: item.userId
            })
          })
        } else {
          this.reset()
        }
      },
      reset() {
        // 重置数据
        this.formInfo = {
          creatorId: this.$store.getters.userInfo.userId, // 创建者 id
          openSeaName: '', // 公海名称
          adminId: '', // 管理员 id
          enable: true, // 状态
          memberIdList: [], // 员工 id 集合
          memberUplimit: 0, // 员工认领上限
          receiveRule: 'MEMBER_VISIBLE', // 领取规则 ['MEMBER_VISIBLE', 'MEMBER_INVISIBLE']
          openSeaCustomerRangeDtoList: [
            // {
            //   comparisonConditionType: '', // 字段
            //   customerRangeFieldType: '', // 条件
            //   valueId: '' // 字段值
            // }
          ]
        }
      },
      handleMemberSelect(val) {
        // 成员选择
        // 判断是否已经有该成员
        let lst = this.memberList.filter(o => o.id === val.id)
        if (!lst.length) {
          this.memberList.push({
            name: val.name,
            id: val.id
          })
        }
        // 清空
        this.memberSelect = {
          name: '',
          id: ''
        }
      },
      handleMemberClose(index) {
        // 成员列表删除成员
        this.memberList.splice(index, 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
.rule-list{
  .rule-select{position:relative;
    &:after{content: '';display:block;width:1px;height:100%;background:#ccc;position:absolute;left:-20px;top:0;}
    >div{position:relative;
      &:after{content: '';display:block;width:20px;height:1px;background:#ccc;position:absolute;left:-20px;top:50%;}
    }
  }
}
</style>
