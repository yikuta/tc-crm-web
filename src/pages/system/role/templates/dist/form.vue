<template>
  <dialog-modal title="新建机构" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini" :model="formInfo" :rules="rules" ref="form">
      <el-form-item label="机构名称" prop="name">
        <el-input placeholder="请输入机构名称" v-model="formInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" placeholder="请输入备注" v-model="formInfo.remark"></el-input>
      </el-form-item>
    </el-form>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  export default {
    name: 'RoleForm',
    components: {
      DialogModal
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
      return {
        dialogVisible: false,
        formInfo: {
          name: '',
          remark: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入机构名称', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        if (n) {
          this.dealForm()
        }
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      handleSubmit(done) {
        // 确定
        this.$refs.form.validate(result => {
          if (result) {
            this.$notify.success('保存成功')
            this.$emit('update:visible', false)
          }
        })
      },
      dealForm() {
        // 处理表单数据
        if (this.form) {
          this.formInfo = {
            ...this.form
          }
        } else {
          this.reset()
        }
      },
      reset() {
        this.formInfo = {
          name: '',
          remark: ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
