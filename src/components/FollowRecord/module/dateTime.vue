<template>
  <div class="">
    <el-date-picker v-model="config.value" type="datetime" placeholder="选择日期时间" @change="handleChange">
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
