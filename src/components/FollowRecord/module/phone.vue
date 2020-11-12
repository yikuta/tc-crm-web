<template>
  <div class="">
    <el-input type="text" v-model="config.value" :placeholder="placeholder" @change="handleChange" :maxlength="maxLength"></el-input>
  </div>
</template>

<script>
  export default {
    name: 'PhoneModel',
    props: {
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入手机号'
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
    methods: {
      handleChange() {
        this.$emit('change', 'Phone', this.dataValue)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
