<template>
  <div class="">
    <el-form size="mini" label-width="100px">
      <el-form-item v-for="(item, index) in lst" :label="item.fieldName" :required="item.isRequired" :key="index">
        <component :is="item | filtersCmp" :key="index" :config="item" @change="handleChange"></component>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import cmp from './module/index.js'
  export default {
    name: 'ObjectField',
    components: {
      ...cmp
    },
    props: {
      lst: {
        type: Array,
        default: () => []
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
