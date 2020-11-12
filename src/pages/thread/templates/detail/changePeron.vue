<template>
  <dialog-modal title="变更负责人" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini">
      <el-form-item label="变更负责人为">
        <!-- <span>{{userSelected.name}}</span> -->
        <selected-people v-model="userSelected"></selected-people>
      </el-form-item>
    </el-form>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  import SelectedPeople from '@/components/SelectedPeople/index'
  import { changeAdminUser, getAllUser } from '@/api/resource/detail'
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
        if (this.selected.length) {
          this._changeAdminUser({
            customerOrResourceName: this.selected[0].resourceName,
            id: this.selected[0].resourceId,
            oldPrincipalUser: this.selected[0].principalUser,
            newPrincipalUser: this.userSelected.name,
            userId: this.userSelected.id
          })
        } else {
          this._changeAdminUser({
            customerOrResourceName: this.formData.customerResourceVo.resourceName,
            id: this.$route.query.resourceId,
            oldPrincipalUser: this.formData.customerResourceVo.principalUser,
            newPrincipalUser: this.userSelected.name,
            userId: this.userSelected.id
          })
        }
      },
      onSelected(val) {
        // this.userSelected = val
        // this.form.userId = val.id
      },
      _changeAdminUser(data) {
        return changeAdminUser(data).then((res) => {
          if (res.code === 200) {
            this.$emit('update:visible', false)
            if (this.$route.query.resourceId) {
              this.$emit('on-freshData')
            } else {
              this.$emit('on-refresh')
            }
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
