<template>
  <dialog-modal title="回复" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-input type="textarea" placeholder="添加回复" v-model="comment"></el-input>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  import { commonFollowRecord } from '@/api/customer/compare'
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
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        dialogVisible: false,
        comment: ''
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        if (n) {
          this.comment = ''
        }
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      handleSubmit(done) {
        // 确定
        if (!this.comment) {
          this.$notify.error('请输入回复内容')
          return false
        }
        commonFollowRecord({
          comment: this.comment,
          folleRecordId: this.recordId,
          userId: this.$store.getters.userInfo.userId
        }).then(res => {
          if (res.code === 200) {
            this.$notify.success('保存成功')
            this.$emit('update:visible', false)
            this.$emit('success')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
