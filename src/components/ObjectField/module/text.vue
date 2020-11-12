<template>
  <div>
    <el-input type="text" v-model="config.value" :placeholder="placeholder || config.tipsMessage" @change="handleChange" :maxlength="maxLength" :disabled="disabled"></el-input>
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
