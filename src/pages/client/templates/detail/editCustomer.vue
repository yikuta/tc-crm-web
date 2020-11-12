<template>
  <div>
    <dialog-modal title="负责团队" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
      <el-table size="mini" :data="adminGroup">
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="role.describe" label="成员角色">
          <template v-slot:default="{ row }">
            <span v-if="row.isAdmin" type="text">{{row.role.describe}}</span>
            <el-select v-else v-model="row.role.value" size="mini">
              <el-option v-for="(item, index) in role" :key="index" :label="item.label" :value="item.id" v-if="!item.disabled"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="permission.describe" label="成员权限类型">
          <template v-slot:default="{ row }">
            <span v-if="row.isAdmin" type="text">{{row.permission.describe}}</span>
            <el-select v-else v-model="row.permission.value" size="mini">
              <el-option v-for="(item, index) in permission" :key="index" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="{ row }">
            <el-button v-if="!row.isAdmin" type="text" @click="deleteUser(row)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </dialog-modal>
  </div>
</template>

<script>
import { deleteCustomerResponsibleUser, editAdminGroup } from '@/api/customer/menu'
import DialogModal from '@/components/Dialog/index.vue'
export default {
  name: 'CustomerResource',
  components: {
    DialogModal
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    adminGroup: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      AddCustomerVisible: false,
      role: [
        { id: 1, value: 'NORMAL_USER', label: '普通成员', disabled: false },
        { id: 2, value: 'PARTNER_USER', label: '联合跟进人', disabled: false },
        { id: 3, value: 'ADMIN_USER', label: '管理员', disabled: true }
      ],
      permission: [
        { id: 1, value: 'READ_ONLY', label: '只读' },
        { id: 2, value: 'READ_AND_WRITE', label: '读写' }
      ]
    }
  },
  methods: {
    handleSubmit(done) {
      // const form = JSON.parse(JSON.stringify(this.adminGroup))
      let form = []
      this.adminGroup.forEach((item) => {
        if (!item.isAdmin) {
          let obj = {
            ...item
          }
          obj.role = (() => {
            // item.role.value
            const info = this.role.filter(o => o.id === obj.role.value)
            return info.length ? info[0].value : ''
          })()
          obj.permission = (() => {
            // item.permission.value
            const info = this.permission.filter(o => o.id === obj.permission.value)
            return info.length ? info[0].value : ''
          })()
          obj.targetId = this.$route.params.id
          form.push(obj)
        }
      })
      this._editGroupUser({
        dtos: form
      })
    },
    deleteUser(row) {
      this.$confirm(`确定要删除用户${row.username}吗？`, '提示', {
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false
      }).then(() => {
        this._deleteGroupUser({
          id: this.$route.params.id,
          userId: row.userId
        })
      })
    },
    _editGroupUser(data) {
      return editAdminGroup(data).then((res) => {
        if (res.code === 200) {
          this.$emit('change')
          this.$emit('update:visible', false)
        }
      })
    },
    _deleteGroupUser(data) {
      return deleteCustomerResponsibleUser(data).then(res => {
        if (res.code === 200) {
          this.$emit('change')
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
