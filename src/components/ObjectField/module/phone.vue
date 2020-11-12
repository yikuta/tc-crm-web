<template>
  <div class="">
    <el-input type="text" v-model="config.value" :placeholder="placeholder || config.tipsMessage" @change="handleChange" :maxlength="maxLength" :disabled="disabled"></el-input>
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
        maxLength: 11
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
