<template>
  <div>
    <el-input type="text" v-model="config.value" :placeholder="placeholder" @change="handleChange" :maxlength="maxLength"></el-input>
  </div>
</template>

<script>
  export default {
    name: 'TextModel',
    props: {
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入内容'
      },
      config: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        dataValue: '',
        maxLength: 10
      }
    },
    created() {
    },
    methods: {
      handleChange() {
        this.$emit('change', 'Single_LineText', this.dataValue)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/common';
</style>
