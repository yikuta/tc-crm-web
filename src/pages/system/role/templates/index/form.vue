<template>
  <dialog-modal :title="formInfo.roleId ? '编辑角色' : '新建角色'" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini" :model="formInfo" :rules="rules" ref="form">
      <el-form-item label="角色名称" prop="roleName">
        <el-input placeholder="请输入角色名称" v-model="formInfo.roleName" :maxLength="30"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" placeholder="请输入备注" :maxLength="200" v-model="formInfo.remark"></el-input>
      </el-form-item>
    </el-form>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  import { saveRole, updateRole } from '@/api/system/role'
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
          creatorId: this.$store.getters.userInfo.userId, // 创建者 id
          roleName: '切图仔',
          remark: '这是一个切图仔'
        },
        rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { pattern: /^[0-9a-zA-Z\u4e00-\u9fa5 ]+$/, message: '请输入中文、字母或数字作为角色名称', trigger: true },
            { pattern: /^.{2,30}$/, message: '请输入2-30个字作为角色名称', trigger: true }
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
            const fn = this.formInfo.roleId ? updateRole : saveRole
            fn(this.formInfo).then(res => {
              this.$notify.success('保存成功')
              this.$emit('change')
              this.$emit('update:visible', false)
            })
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
          creatorId: this.$store.getters.userInfo.userId,
          roleName: '',
          remark: ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
