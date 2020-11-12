<template>
  <dialog-modal title="添加团队成员" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini">
      <el-form-item label="员工">
        <!-- <span>{{userSelected.name}}</span> -->
        <selected-people v-model="userSelected"></selected-people>
      </el-form-item>
      <el-form-item label="权限">
        <el-radio v-model="form.permission" label="READ_ONLY">只读</el-radio>
        <el-radio v-model="form.permission" label="READ_AND_WRITE">读写</el-radio>
      </el-form-item>
      <el-form-item label="成员角色">
        <el-radio v-model="form.role" label="NORMAL_USER">普通成员</el-radio>
        <el-radio v-model="form.role" label="PARTNER_USER">联合跟进人</el-radio>
      </el-form-item>
    </el-form>
  </dialog-modal>
</template>
<script>
import { addCustomerResponsibleUser } from '@/api/customer/menu'
import DialogModal from '@/components/Dialog/index.vue'
import SelectedPeople from '@/components/SelectedPeople/index'
export default {
  name: 'AddCustomer',
  components: {
    DialogModal,
    SelectedPeople
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    userList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        isAdmin: false,
        userId: '',
        username: '',
        permission: 'READ_ONLY',
        role: 'NORMAL_USER',
        targetId: this.$route.params.id
      },
      userSelected: {}
    }
  },
  methods: {
    handleSubmit() {
      this.form.userId = this.userSelected.id
      this.form.username = this.userSelected.name
      this._addGroupUser(this.form)
    },
    onSelected(val) {
      this.userSelected = val
    },
    _addGroupUser(data) {
      return addCustomerResponsibleUser(data).then((res) => {
        if (res.code === 200) {
          this.$emit('change')
          this.$emit('update:visible', false)
        }
      })
    }
  },
  watch: {
    visible(n) {
      this.dialogVisible = this.visible
      if (n) {
        this.form = {
          isAdmin: false,
          userId: '',
          username: '',
          permission: 'READ_ONLY',
          role: 'NORMAL_USER',
          targetId: this.$route.params.id
        }
        this.userSelected = {}
      }
    },
    dialogVisible(n) {
      this.$emit('update:visible', n)
    }
  }
}
</script>
