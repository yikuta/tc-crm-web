<template>
  <div class="">
    <el-form size="mini" label-width="100px">
      <el-form-item v-for="(item, index) in lst" :label="item.objectFieldName" :key="index" :required="item.required" :class="item.apiName === 'ADDRESS' ? 'address' : ''">
        <Address v-if="item.apiName === 'ADDRESS'" :config="item" @change="handleChange" :disabled="disabled" />
        <component v-else :is="item | filtersCmp" :key="index" :config="item" @change="handleChange" :disabled="disabled && item.apiName === 'CUSTOMER_NAME' || item.apiName === 'CUSTOMER_TYPE'"></component>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import cmp from './module/index.js'
  import Address from './module/address'
  export default {
    name: 'ObjectField',
    components: {
      ...cmp,
      Address
    },
    props: {
      lst: {
        type: Array,
        default: () => []
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        componentData: {}
      }
    },
    filters: {
      filtersCmp(value) {
        // 处理 js 保留关键字导致的组件报错问题
        if (value.fieldType === 'IMAGE') {
          return 'PICTURE'
        }
        return value.fieldType
      }
    },
    watch: {
    },
    created() {
    },
    methods: {
      getData() {
        return this.componentData
      },
      handleChange(name, value) {
        this.$set(this.componentData, name, value)
      }
    }
  }
</script>
