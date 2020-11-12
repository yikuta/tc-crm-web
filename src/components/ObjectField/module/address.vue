<template>
  <div class="address">
    <div class="padding-bottom-sm"><el-button type="primary" class="" @click="handleReset">重置</el-button></div>
    <el-form size="mini" label-width="100px">
      <el-form-item label="定位地址" :required="(this.config.realData).location.required">
        <DotModel :config="(this.config.realData).location" @change="handleChange" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="地区" :required="(this.config.realData).area.required">
        <AreaModel :config="(this.config.realData).area" @change="handleChange" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="详细地址" :required="(this.config.realData).address.required">
        <TextModel :config="(this.config.realData).address" @change="handleChange" :disabled="disabled" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import TextModel from './text'
import AreaModel from './area'
import DotModel from './dot'
import { getAreaByCode } from '@/api/basic'
export default {
  name: 'AddressModel',
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resetChange: false // 重置
    }
  },
  components: {
    TextModel,
    AreaModel,
    DotModel
  },
  methods: {
    handleChange(name, value) {
      this.$emit('change', name, value)
    },
    handleReset() {
      try {
        this.resetChange = true
        this.config.realData.location.value = ''
        this.config.realData.location.realData = ''
        this.config.realData.area.value = []
        this.config.realData.area.realData = '[]'
        this.config.realData.address.value = ''
        this.config.realData.address.realData = ''
        this.$forceUpdate()
      } catch (e) {
        this.resetChange = false
      }
    },
    _getAreaByCode(code) {
      return getAreaByCode({
        code: code
      }).then((res) => {
        if (res.code === 200) {
          let result = res.result.reverse()
          let arr = []
          result.map((item) => {
            arr.push({
              name: item.name,
              code: item.coed,
              id: item.id
            })
          })
          this.config.realData.area.value = arr[2].id
          this.config.realData.area.realData = JSON.stringify(arr)
        }
      })
    }
  },
  watch: {
    'config.realData.location': {
      handler(newVal, oldVal) {
        if (this.resetChange) return
        this.config.realData.address.value = newVal.address
        this._getAreaByCode(newVal.adcode)
      },
      immediate: false,
      deep: true
    }
  }
}
</script>
<style scoped lang="scss">
  .address {
    width: 100%;
  }
</style>
