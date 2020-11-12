<template>
  <div class="">
    <el-time-picker v-model="config.value" :picker-options="{selectableRange: '12:00:00 - 12:00:00'}" :placeholder="placeholder || config.tipsMessage" @change="handleChange">
    </el-time-picker>
  </div>
</template>

<script>
  export default {
    name: 'TimeModel',
    props: {
      value: {
        type: String,
        default: ''
      },
      config: {
        type: Object,
        default: () => {}
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
        this.$emit('change', 'TIME', this.dataValue)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
