<template>
  <div class="app-container">
    商家APP导入客户规则
    <el-form ref="form" :model="form" label-width="120px" size="mini">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="使用客户模板">
            适用
            <el-select v-model="form.customerTypeId" placeholder="请选择客户模板">
              <!-- <el-option label="预设客户分类" value="" /> -->
              <el-option v-for="(item, index) in option" :label="item.customerTypeName" :value="item.customerTypeId" :key="index" />
            </el-select>
            的客户模板
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="使用公海">
            <el-select v-model="form.openSeaId" placeholder="请选择公海">
              <!-- <el-option label="预设客户分类" value="" /> -->
              <el-option v-for="(item, index) in nameOption" :label="item.openSeaName" :value="item.openSeaId" :key="index" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="btn">
        <el-col :span="12">
          <el-form-item label="">
            <el-button type="primary" size="mini" @click="handleSave" :loading="loading">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getCustomerImportRule, saveCustomerImportRule } from '@/api/system/customer'
export default {
  data() {
    return {
      form: {
        customerTypeId: '',
        openSeaId: ''
      },
      option: [],
      nameOption: [],
      loading: false
    }
  },
  mounted() {
    this._getCustomerImportRule()
  },
  methods: {
    handleSave() {
      this._saveCustomerImportRule(this.form)
    },
    _saveCustomerImportRule(data) {
      this.loading = true
      return saveCustomerImportRule(data).then((res) => {
        this.loading = false
        if (res.code === 200) {
          this.$notify.success('保存成功')
        }
      }).catch(() => {
        this.loading = false
      })
    },
    _getCustomerImportRule() {
      return getCustomerImportRule().then((res) => {
        if (res.code === 200) {
          this.option = res.result.customerType || []
          this.nameOption = res.result.openSea || []
          this.option.map((item) => {
            if (item.hasSelect) {
              this.form.customerTypeId = item.customerTypeId
            }
          })
          this.nameOption.map((item) => {
            if (item.hasSelect) {
              this.form.openSeaId = item.openSeaId
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.app-container {
  .el-form {
    margin-top: 20px;
  }
  .btn {
    margin-top: 20px;
  }
}
</style>
