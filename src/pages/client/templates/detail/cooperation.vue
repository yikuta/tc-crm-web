<template>
  <dialog-modal title="更改合作状态" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini">
      <el-form-item label="合作状态">
        <el-select v-model="cooperationStatus">
          <el-option v-for="(item, index) in options" :label="item.label" :value="item.value" :key="index"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  export default {
    name: 'Cooperation',
    components: {
      DialogModal
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
        cooperationStatus: 'NO_COOPERATION',
        options: [
          { id: 1, value: 'NO_COOPERATION', label: '未合作' },
          { id: 2, value: 'HAS_COOPERATION', label: '已合作' },
          { id: 3, value: 'SUSPENSION_OF_COOPERATION', label: '暂停合作' }
        ]
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        if (n) {
          this.cooperationStatus = 'NO_COOPERATION'
        }
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      handleSubmit(done) {
        // 确定
        this.$emit('change', this.cooperationStatus)
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
