<template>
  <div>
    <dialog-modal title="相关团队" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
      <el-col :span="24" class="text-right" v-if="formData.currentUserOperationVo">
        <el-button type="primary" size="mini" @click="AddCustomerVisible = true" v-show="formData.currentUserOperationVo.permission.value == 2">添加团队成员</el-button>
        <el-button size="mini" @click="EditCustomerVisible = true" v-show="formData.currentUserOperationVo.permission.value == 2">编辑</el-button>
      </el-col>
      <el-table size="mini" :data="adminGroup">
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="role.describe" label="成员角色"></el-table-column>
        <el-table-column prop="permission.describe" label="成员权限类型"></el-table-column>
      </el-table>
      <el-col :span="24">
        <el-row>成员角色说明：</el-row>
        <el-row>1. 联合跟进人，具备查看客户及其相关扩展数据的权限。</el-row>
        <el-row>2. 普通成员，只具备查看或编辑客户基本信息的权限，不具备其他相关数据扩展权限。</el-row>
      </el-col>
    </dialog-modal>
    <add-customer :visible.sync="AddCustomerVisible" @on-refreshUser="onRefreshUser"></add-customer>
    <edit-customer :visible.sync="EditCustomerVisible" :adminGroup="adminGroup" @on-refreshUser="onRefreshUser"></edit-customer>
  </div>
</template>
<script>
import { queryGroupUser } from '@/api/resource/detail'
import DialogModal from '@/components/Dialog/index.vue'
import AddCustomer from './addCustomer'
import EditCustomer from './editCustomer'
export default {
  name: 'CustomerResource',
  components: {
    DialogModal,
    AddCustomer,
    EditCustomer
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      adminGroup: [],
      AddCustomerVisible: false,
      EditCustomerVisible: false
    }
  },
  mounted() {
    this._queryGroupUser(this.$route.query.resourceId)
  },
  methods: {
    handleSubmit(done) {
      // 确定
      this.$emit('update:visible', false)
    },
    onRefreshUser() {
      this._queryGroupUser(this.$route.query.resourceId)
    },
    _queryGroupUser(data) {
      return queryGroupUser(data).then((res) => {
        if (res.code === 200) {
          this.adminGroup = res.result.groupUserVos || []
        }
      })
    }
  },
  watch: {
    visible(n) {
      this.dialogVisible = this.visible
    },
    dialogVisible(n) {
      this.$emit('update:visible', n)
    }
  }
}
</script>
