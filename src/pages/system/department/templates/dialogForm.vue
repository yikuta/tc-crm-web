<template>
  <dialog-modal title="设置部门负责人" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini">
      <el-form-item label="部门负责人">
        <el-link v-if="adminUserName" class="adminUserName">{{adminUserName}}<i class="el-icon-close el-icon--right" @click="delAdminUserName"></i></el-link>
        <selected-people v-else v-model="userSelected"></selected-people>
      </el-form-item>
    </el-form>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  import SelectedPeople from '@/components/SelectedPeople/index'
  import { getAllUser } from '@/api/resource/detail'
  import { setDepartmentsAdminUser } from '@/api/system/authSetting'
  export default {
    name: 'SwitchPool',
    components: {
      DialogModal,
      SelectedPeople
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      selected: {
        type: Array,
        default: () => []
      },
      departmentId: {
        type: Number,
        default: () => null
      },
      adminUserName: {
        type: String,
        default: () => ''
      },
      formData: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        dialogVisible: false,
        form: {
          remark: '',
          userId: ''
        },
        userSelected: {},
        userList: [],
        options: [
          { id: 1, value: '跟进1' },
          { id: 2, value: '跟进1' }
        ]
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        if (n) {
          this.form = {
            remark: '',
            userId: ''
          }
          this.userSelected = {}
        }
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    mounted() {
      this._getAllUser()
    },
    methods: {
      handleSubmit(done) {
        // 确定
        if (this.adminUserName) {
          this.$emit('update:visible', false)
          return false
        }
        this._setDepartmentsAdminUser({
          departmentId: this.departmentId,
          userId: this.userSelected.id ? this.userSelected.id : 0,
          adminUserName: this.userSelected.name ? this.userSelected.name : ''
        })
      },
      onSelected(val) {
        // this.userSelected = val
        // this.form.userId = val.id
      },
      delAdminUserName() {
        this.$emit('on-del-adminUserName')
      },
      _setDepartmentsAdminUser(data) {
        return setDepartmentsAdminUser(data).then((res) => {
          if (res.code === 200) {
            this.$emit('update:visible', false)
            this.$emit('on-refresh')
          }
        })
      },
      _getAllUser() {
        return getAllUser().then((res) => {
          if (res.code === 200) {
            this.userList = res.result
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
