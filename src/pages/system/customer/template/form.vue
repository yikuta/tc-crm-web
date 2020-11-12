<template>
  <div class="app-container">
    <el-row class="padding-bottom-sm border-bottom-main margin-bottom">
      <el-col :span="24" class="text-left">
        <span class="text-main padding-right-sm">{{ form.templateId ? '编辑模板' : '新建模板' }}</span>
      </el-col>
    </el-row>
    <el-form :model="form" size="mini" label-width="120px" :rules="rule" ref="form">
      <el-form-item label="模板名称" prop="templateName">
        <el-input placeholder="请输入模板名称" v-model="form.templateName"></el-input>
      </el-form-item>
      <el-form-item label="适用客户分类" prop="customerTypeId">
        <el-select v-model="form.customerTypeId" :disabled="!!form.templateId">
          <el-option v-for="(item, index) in customerOption" :label="item.customerTypeValue" :value="item.id" :key="index" :disabled="!!item.customerTemplateId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" required>
        <el-radio-group v-model="form.enable">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="模板可用字段" prop="objectFielIdList">
        <el-row>
          <el-col :span="12" v-for="(item, index) in dictionaryList" :key="index" :title="item.tips">
            <el-row>
              <el-col :span="8">
                <el-checkbox v-model="item.checkbox" :disabled="item.apiName === 'CUSTOMER_NAME' || item.apiName === 'CUSTOMER_TYPE'">{{ item.value }}</el-checkbox>
              </el-col>
              <el-col :span="16">
                <el-radio-group v-model="item.required" :disabled="item.apiName === 'CUSTOMER_NAME' || item.apiName === 'CUSTOMER_TYPE'">
                  <el-radio :label="true">必填</el-radio>
                  <el-radio :label="false">非必填</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getObjectList } from '@/api/system/object'
  import { queryCustomerTypeList, saveCustomer, getCustomerDetail, updateCustomerTemplate } from '@/api/system/customer'
  export default {
    name: 'ClientForm',
    data() {
      return {
        form: {
          templateId: null, // 模板id
          creatorId: this.$store.getters.userInfo.userId, // 创建者
          templateName: '', // 模板名称
          enable: true, // 启用禁用
          customerTypeId: null, // 客户分类
          objectFielIdList: [], // 模板可用字段
          requiredObjectFieldIdList: [] // 必填字段
        },
        rule: {
          templateName: [
            { required: true, message: '模板名称不能为空', trigger: 'blur' }
          ],
          customerTypeId: [
            { required: true, message: '请选择适用客户分类', trigger: 'blur' }
          ],
          objectFielIdList: [
            { required: true, message: '请选择最少一个可用字段', trigger: 'blur' }
          ]
        },
        customerOption: {},
        dictionaryList: [],
        checkStatus: false
      }
    },
    created() {
      const id = this.$route.params.id
      this.form.templateId = id || null
      this.getList()
    },
    methods: {
      handleSubmit() {
        // 保存
        // 处理模板可用字段已选择的项目
        this.dictionaryList.forEach(value => {
          if (value.checkbox) {
            this.form.objectFielIdList.push(value.id)
            value.required && this.form.requiredObjectFieldIdList.push(value.id)
          }
        })
        this.$refs.form.validate(valid => {
          if (valid) {
            const fn = this.form.templateId ? updateCustomerTemplate : saveCustomer
            fn(this.form).then(res => {
              this.$notify.success('保存成功')
              this.$confirm('保存成功，是否返回列表页？', '提示', {
                cancelButtonText: '继续添加',
                confirmButtonText: '返回列表页',
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false
              }).then(() => {
                this.$router.push('/system/customer/index')
              }).catch(() => {
                if (this.form.templateId) {
                  this.$router.push('/system/customer/form')
                }
                this.reset()
              })
            })
          }
        })
      },
      getInfo(id) {
        // 获得模板详情
        getCustomerDetail(id).then(res => {
          this.form = {
            templateId: id, // 模板id
            creatorId: res.result.creatorId, // 创建者
            templateName: res.result.customerTemplateName, // 模板名称
            enable: res.result.enable, // 启用禁用
            customerTypeId: res.result.customerTypeId, // 客户分类
            objectFielIdList: [], // 模板可用字段
            requiredObjectFieldIdList: [] // 必填字段
          }
          this.dealSelect(res.result.customerTemplateFieldVoList)
        })
      },
      getList() {
        // 获取客户分类列表和模板可用字段
        getObjectList('CUSTOMER').then(res => {
          // 组装字段数据
          this.dictionaryList = res.result.map(value => {
            return {
              id: value.fieldId,
              checkbox: value.apiName === 'CUSTOMER_NAME' || value.apiName === 'CUSTOMER_TYPE', // 勾选
              value: value.fieldName, // 字段名
              tips: value.tipsMessage, // 提示信息
              required: value.apiName === 'CUSTOMER_NAME' || value.apiName === 'CUSTOMER_TYPE', // 必填
              apiName: value.apiName
            }
          })
        })
        queryCustomerTypeList().then(res => {
          this.customerOption = res.result
          this.form.templateId && this.getInfo(this.form.templateId)
        })
      },
      dealSelect(lst) {
        // 处理已经选择的选项
        const getSelect = (apiName) => {
          // 获得选中的选项
          // status 0：没有 1：选中 2：选中且必填
          let status = 0
          lst.forEach(item => {
            if (apiName === item.apiName) {
              if (item.required) {
                status = 2
              } else {
                status = 1
              }
            }
          })
          return status
        }
        this.dictionaryList = this.dictionaryList.map(item => {
          const status = getSelect(item.apiName)
          return {
            ...item,
            checkbox: item.checkbox || !!status,
            required: item.required || status === 2
          }
        })
      },
      reset() {
        this.form = {
          templateId: null, // 模板id
          creatorId: this.$store.getters.userInfo.userId, // 创建者
          templateName: '', // 模板名称
          enable: true, // 启用禁用
          customerTypeId: null, // 客户分类
          objectFielIdList: [], // 模板可用字段
          requiredObjectFieldIdList: [] // 必填字段
        }
        this.dictionaryList.forEach(value => {
          value.checkbox = false
          value.required = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
