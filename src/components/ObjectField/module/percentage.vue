<template>
  <div class="">
    <el-input type="number" v-model="config.value" :placeholder="placeholder || config.tipsMessage" @change="handleChange" :maxlength="maxLength" :disabled="disabled"></el-input>
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
        this.$emit('change', 'PERCENTTAGE', this.dataValue)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
