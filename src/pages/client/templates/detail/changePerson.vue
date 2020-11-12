<template>
  <dialog-modal title="变更负责人" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini">
      <el-form-item label="变更负责人为">
        <selected-people v-model="userSelected"></selected-people>
      </el-form-item>
    </el-form>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  import SelectedPeople from '@/components/SelectedPeople/index'
  export default {
    name: 'ChangePerson',
    components: {
      DialogModal,
      SelectedPeople
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogVisible: false,
        userSelected: {}
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        if (n) {
          this.userSelected = {}
        }
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      handleSubmit(done) {
        // 确定
        if (Object.keys(this.userSelected).length) {
          this.$confirm('确定修改负责人吗？', '提示', {
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false
          }).then(() => {
            this.$emit('change', this.userSelected)
            this.$emit('update:visible', false)
          })
        } else {
          this.$message.error('请选择要变更的负责人')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
