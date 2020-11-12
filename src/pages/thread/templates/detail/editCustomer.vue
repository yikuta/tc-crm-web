<template>
  <div>
    <dialog-modal title="负责团队" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
      <el-table size="mini" :data="adminGroup">
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="role.describe" label="成员角色">
          <template v-slot:default="{ row }">
            <span v-if="row.isAdmin" type="text">{{row.role.describe}}</span>
            <el-select v-else v-model="row.role.value">
              <el-option  label="普通成员" :value="1"></el-option>
              <el-option  label="联合跟进人" :value="2"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="permission.describe" label="成员权限类型">
          <template v-slot:default="{ row }">
            <span v-if="row.isAdmin" type="text">{{row.permission.describe}}</span>
            <el-select v-else v-model="row.permission.value">
              <el-option  label="只读" :value="1"></el-option>
              <el-option  label="读写" :value="2"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="{ row }">
            <el-button v-if="!row.isAdmin" type="text" @click="deleteUser(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </dialog-modal>
  </div>
</template>
<script>
import { deleteGroupUser, editGroupUser } from '@/api/resource/detail'
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
      AddCustomerVisible: false
    }
  },
  methods: {
    handleSubmit(done) {
      const form = JSON.parse(JSON.stringify(this.adminGroup))
      form.map((item) => {
        item.targetId = this.$route.query.resourceId
        if (item.isAdmin) {
          item.role = 'ADMIN_USER'
          if (item.permission.value === 1) {
            item.permission = 'READ_ONLY'
          } else if (item.permission.value === 2) {
            item.permission = 'READ_AND_WRITE'
          }
        } else {
          if (item.role.value === 1) {
            item.role = 'NORMAL_USER'
          } else if (item.role.value === 2) {
            item.role = 'PARTNER_USER'
          }
          if (item.permission.value === 1) {
            item.permission = 'READ_ONLY'
          } else if (item.permission.value === 2) {
            item.permission = 'READ_AND_WRITE'
          }
        }
      })
      this._editGroupUser(form)
    },
    deleteUser(row) {
      this._deleteGroupUser({
        resourceId: this.$route.query.resourceId,
        userId: row.userId
      })
    },
    _editGroupUser(data) {
      return editGroupUser(data).then((res) => {
        if (res.code === 200) {
          this.$emit('on-refreshUser')
          this.$emit('update:visible', false)
        }
      })
    },
    _deleteGroupUser(data) {
      return deleteGroupUser(data).then(res => {
        if (res.code === 200) {
          this.$emit('on-refreshUser')
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
