<template>
  <div class="">
    <el-date-picker v-model="config.value" format="yyyy-MM-dd HH:mm:ss" type="datetime" :placeholder="placeholder || config.tipsMessage" @change="handleChange" :disabled="disabled">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    name: 'DateTimeModel',
    props: {
      value: {
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
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        dataValue: ''
      }
    },
    created() {
      this.dataValue = this.value
    },
    methods: {
      handleChange() {
        this.$emit('change', 'DATE_TIME', this.dataValue)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
