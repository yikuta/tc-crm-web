<template>
  <div class="margin-top">
    <el-form :model="form" size="mini" label-width="150px">
      <el-form-item label="客户分类" prop="typeId">
        <!-- <el-select v-model="formInfo.typeId" @change="handleTypeChange">
          <el-option v-for="(item, index) in clientOptions" :key="index" :value="item.id" :label="item.customerTypeValue"></el-option>
        </el-select> -->
        <el-select v-model="formInfo.typeId" @change="handleTypeChange">
          <el-option v-for="(item, index) in clientOptions" :key="index" :value="item.id" :label="item.customerTypeValue" :disabled="!item.customerTemplateId"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="客户模板" prop="templateId">
        <el-select v-model="formInfo.templateId">
          <el-option v-for="(item, index) in templateOptions" :key="index" :value="item.customerTemplateId" :label="item.customerTemplateName"></el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item> -->
    </el-form>
    <customer-form v-if="formInfo.typeId" :tempId="formInfo.customerTemplateId" @success="handleSuccess"></customer-form>
  </div>
</template>

<script>
  import { queryCustomerTypeList, queryCustomerTemplateList } from '@/api/system/customer'
  import { MatchType, DataType } from '@/constant/search'
  import searchTool from '@/utils/searchTool'
  import CustomerForm from '@/components/Customer/form'
  export default {
    name: 'ConversionForm',
    components: {
      CustomerForm
    },
    data() {
      return {
        form: {
          customerType: '',
          customerName: '',
          businessTypeList: [],
          contacts: '',
          phone: '',
          businessLicenseUrl: '',
          creditCode: '',
          regionId: '',
          address: '',
          remark: '',
          resourceId: this.$route.query.resourceId
        },
        selectedArea: [],
        options: [],
        optionsProps: {
          value: 'id',
          label: 'name',
          children: 'childrenList'
        },
        formInfo: {
          typeId: null,
          customerTemplateId: null
        },
        clientOptions: [],
        templateOptions: []
      }
    },
    created() {
      this.getCustomerTypeList()
    },
    methods: {
      // 1
      handleSuccess(val) {
        const data = {
          id: Number(this.$route.query.resourceId),
          type: 1,
          customerId: val.customerId.id || val.customerId,
          customerOrResourceName: this.$route.query.resourceName,
          customerName: val.customerId.customerName || val.customerOrResourceName
        }
        this.$emit('on-change', data)
      },
      areaChange() {
        this.form.regionId = this.selectedArea[2].id
      },
      getCustomerTypeList() {
        // 模板分类列表
        queryCustomerTypeList(1).then(res => {
          if (res.code === 200 && res.result.length) {
            this.clientOptions = res.result
            // this.formInfo.typeId = res.result[0].id
            // this.getCustomerTemplateList(res.result[0].id)
          }
        })
      },
      getCustomerTemplateList(id) {
        queryCustomerTemplateList({
          pageNo: 1,
          pageSize: 1000,
          searchs: JSON.stringify(searchTool({
            customerType: { value: id, name: 'customerType', matchType: MatchType.EQUAL, type: DataType.BOOLEAN }
          }))
        }).then(res => {
          if (res.code === 200 && res.result.itemVOs.length) {
            this.templateOptions = res.result.itemVOs
          }
        })
      },
      handleTypeChange(val) {
        // 分类选择
        this.clientOptions.map((item) => {
          if (val === item.id) {
            this.formInfo.customerTemplateId = item.customerTemplateId
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
