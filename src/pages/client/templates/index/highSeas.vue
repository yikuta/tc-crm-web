<template>
  <dialog-modal title="转入公海" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini" :model="formInfo" ref="form">
      <el-form-item label="转移至" prop="name">
        <el-select v-model="formInfo.select">
          <el-option v-for="(item, index) in clientOptions" :key="index" :value="item" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  export default {
    name: 'HighSeas',
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
        formInfo: {
          select: 0
        },
        clientOptions: [
          { id: 0, value: '零售门店' },
          { id: 1, value: '供应商' },
          { id: 2, value: '已转换' }
        ]
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      handleSubmit() {
        this.$notify.success('转入成功')
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
