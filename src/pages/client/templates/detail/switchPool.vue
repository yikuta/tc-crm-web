<template>
  <dialog-modal title="转入公海" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini">
      <el-form-item label="转移至">
        <el-select v-model="seaValue">
          <el-option v-for="(item, index) in tableData" :label="item.openSeaName" :value="item.openSeaId" :key="index"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  import { getOpenSeaList } from '@/api/system/sea'
  export default {
    name: 'SwitchPool',
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
        tableData: [],
        seaValue: null
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        if (n) {
          !this.tableData.length && this.getList()
        }
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      getList() {
        getOpenSeaList().then(res => {
          if (res.code === 200) {
            this.tableData = res.result
          }
        })
      },
      handleSubmit(done) {
        // 确定
        if (this.seaValue) {
          this.$confirm('确定转入选中公海吗？', '提示', {
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false
          }).then(() => {
            const result = this.tableData.filter(o => o.openSeaId === this.seaValue)
            this.$emit('change', result[0])
            this.$emit('update:visible', false)
          })
        } else {
          this.$message.error('请选择公海')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
