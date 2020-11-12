<template>
  <div>
    <el-input type="textarea" v-model="config.value" :placeholder="placeholder" @change="handleChange" :maxlength="maxLength"></el-input>
  </div>
</template>

<script>
  export default {
    name: 'TextareaModel',
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
      try {
        this.maxLength = JSON.parse(this.config.optionValue)[0].fieldTypeConditionValue
      } catch (e) {
        this.$message.error(e)
      }
    },
    methods: {
      handleChange() {
        this.$emit('change', 'Multiline_Text', this.dataValue)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/common';
</style>
