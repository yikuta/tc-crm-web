<template>
  <dialog-modal title="转入线索池" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini">
      <el-form-item label="转移至">
        <el-select v-model="form.type">
          <el-option v-for="(item, index) in options" :label="item.value" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  import { moveToPool } from '@/api/resource/detail'
  export default {
    name: 'SwitchPool',
    components: {
      DialogModal
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
          type: 1
        },
        options: [
          { id: 1, value: '线索池1' }
          // { id: 2, value: '跟进1' }
        ]
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        if (n) {
          this.form = {
            remark: '',
            type: 1
          }
        }
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      handleSubmit(done) {
        if (this.selected.length) {
          this._moveToPool({
            customerOrResourceName: this.selected[0].resourceName,
            id: this.selected[0].resourceId,
            publicSeaName: this.options[0].value
          })
        } else {
          this._moveToPool({
            customerOrResourceName: this.formData.customerResourceVo.resourceName,
            id: this.$route.query.resourceId,
            publicSeaName: this.options[0].value
          })
        }
      },
      _moveToPool(data) {
        return moveToPool(data).then((res) => {
          if (res.code === 200) {
            this.$emit('update:visible', false)
            if (this.$route.query.resourceId) {
              this.$router.go(-1)
            } else {
              this.$emit('on-refresh')
            }
            // 1
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
