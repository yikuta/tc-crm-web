<template>
  <div class="">
    <el-input type="number" v-model="config.value" :placeholder="placeholder || config.tipsMessage" @change="handleChange" :disabled="disabled"></el-input>
  </div>
</template>

<script>
  export default {
    name: 'NumberModel',
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
        maxNum: 0,
        integerLength: 1,
        decimalLength: 2
      }
    },
    created() {
      try {
        const conf = JSON.parse(this.config.optionValue)
        this.integerLength = conf[0].fieldTypeConditionValue
        this.decimalLength = conf[1].fieldTypeConditionValue
      } catch (e) {
        this.$message.error(e)
      }
    },
    methods: {
      handleChange() {
        // this.dataValue.toFixed(this.decimalLength)
        this.$emit('change', 'Number', this.dataValue)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
