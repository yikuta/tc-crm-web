<template>
  <dialog-modal title="回复" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-input type="textarea" placeholder="添加回复" v-model="remark"></el-input>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  import { recordComment } from '@/api/resource/detail'
  export default {
    name: 'RecordReply',
    components: {
      DialogModal
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      recordId: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        dialogVisible: false,
        remark: ''
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        if (n) {
          this.remark = ''
        }
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      handleSubmit(done) {
        // 确定
        if (!this.remark) {
          this.$notify.error('请输入回复内容')
          return false
        }
        this._recordComment({
          recordId: this.recordId,
          comment: this.remark
        })
      },
      _recordComment(data) {
        return recordComment(data).then((res) => {
          if (res.code === 200) {
            this.$emit('update:visible', false)
            this.$emit('on-freshData')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
