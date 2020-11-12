<template>
  <div class="">
    <el-input type="number" v-model="config.value" :placeholder="placeholder" @change="handleChange" :maxlength="maxLength"></el-input>
  </div>
</template>

<script>
  export default {
    name: 'PercentageModel',
    props: {
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入数字'
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
        this.$emit('change', 'PERCENTTAGE', this.dataValue)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
