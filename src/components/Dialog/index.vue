<template>
  <el-dialog class="dialog-modal" :visible.sync="dialogVisible" :width="width" :show-close="showClose" :close-on-click-modal="closeOnClickModal">
    <template slot="title">
      <div class="title-name text-convention text-left border-bottom-seat">{{ title }}</div>
    </template>
   <slot></slot>
    <div slot="footer">
      <slot name="footer">
         <el-button @click="close" size="mini">取 消</el-button>
         <el-button type="primary" @click="confirm" size="mini">确 定</el-button>
      </slot>
  </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'Dialog',
    props: {
      visible: { // 显示隐藏
        type: Boolean,
        default: false
      },
      title: { // 标题
        type: String,
        default: '提示'
      },
      showClose: { // 显示关闭按钮
        type: Boolean,
        default: false
      },
      closeOnClickModal: { // 点击遮罩关闭弹窗
        type: Boolean,
        default: false
      },
      width: { // 宽度
        type: String,
        default: '50%'
      },
      beforeClose: Function
    },
    data() {
      return {
        dialogVisible: false
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = n
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      close() {
        // 用户点击了关闭按钮
        this.$emit('update:visible', false)
      },
      confirm() {
        // 用户点击默认的确定按钮
        this.$emit('success', this.close)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dialog-modal {
    .title-name {
      padding: 10px 0 10px 20px;
    }

    /deep/ .el-dialog__header {
      padding: 0;

      .el-dialog__headerbtn {
        top: 13px;
      }
    }
  }
</style>
