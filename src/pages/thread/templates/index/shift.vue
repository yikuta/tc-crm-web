<template>
  <dialog-modal title="转入线索池" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini" :model="formInfo" :rules="rules" ref="form">
      <el-form-item label="转移至" prop="name">
        <el-input placeholder="请选择线索池" v-model="formInfo.name"></el-input>
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
            { required: true, message: '请输入角色名称', trigger: 'blur' }
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
