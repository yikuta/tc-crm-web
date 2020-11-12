<template>
  <div class="">
    <el-time-picker v-model="config.value" :picker-options="{selectableRange: '12:00:00 - 12:00:00'}" placeholder="请选择时间" @change="handleChange">
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
