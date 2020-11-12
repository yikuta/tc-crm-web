<template>
  <div>
    <el-input type="textarea" v-model="config.value" :placeholder="placeholder || config.tipsMessage" @change="handleChange" :maxlength="maxLength" :disabled="disabled"></el-input>
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
        default: ''
      },
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
