<template>
  <div class="">
    <el-date-picker v-model="config.value" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" @change="handleChange"></el-date-picker>
  </div>
</template>

<script>
  export default {
    name: 'DateModel',
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
        this.$emit('change', 'DATE', this.dataValue)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
