<template>
  <dialog-modal title="选择客户分类" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini" :model="formInfo" ref="form" :rules="rules">
      <el-form-item label="客户分类" prop="typeId">
        <el-select v-model="formInfo.typeId" placeholder="请选择客户分类">
          <el-option v-for="(item, index) in clientOptions" :key="index" :value="item.id" :label="item.customerTypeValue" :disabled="!item.customerTemplateId"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  import { queryCustomerTypeList } from '@/api/system/customer'
  export default {
    name: 'ClientCate',
    components: {
      DialogModal
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogVisible: false,
        formInfo: {
          typeId: null,
          templateId: null
        },
        rules: {
          templateId: [
            { required: true, message: '模板不能为空', trigger: 'blur' }
          ]
        },
        clientOptions: []
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        n && !this.clientOptions.length && this.getCustomerTypeList()
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      handleSubmit() {
        if (this.formInfo.typeId) {
          this.clientOptions.forEach(item => {
            if (item.id === this.formInfo.typeId) {
              this.$router.push({
                path: `/client/form?temp_id=${item.customerTemplateId}`
              })
            }
          })
        } else {
          this.$message.error('请选择客户分类')
        }
      },
      getCustomerTypeList() {
        // 模板分类列表
        queryCustomerTypeList(1).then(res => {
          if (res.code === 200 && res.result.length) {
            this.clientOptions = res.result
            // this.formInfo.templateId = res.result[0].customerTemplateId
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped></style>
