<template>
  <dialog-modal title="角色下绑定的用户" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" @success="handleSubmit">
    <div class="bind-user-tips">该角色绑定了以下用户，请先解绑后在删除。</div>
    <el-table :data="tableData" size="mini">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="用户名" prop="userName"></el-table-column>
      <el-table-column label="电话号码" prop="phone"></el-table-column>
    </el-table>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  import { getBindRoleUserList } from '@/api/system/role'
  export default {
    name: 'RoleBindUser',
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
        tableData: []
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
        this.$emit('update:visible', false)
      },
      dealForm() {
        // 处理表单数据
        if (this.form) {
          // 获取角色绑定用户列表
          getBindRoleUserList(this.form.roleId).then(res => {
            if (res.code === 200) {
              this.tableData = res.result
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.bind-user-tips{color:red;padding-bottom:10px;}
</style>
