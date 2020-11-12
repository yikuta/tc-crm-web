<template>
  <div class="">
    <el-radio-group v-model="config.value">
      <el-radio v-for="(item, index) in selectOption" :key="index" :label="item.fieldTypeConditionValue"></el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'BooleanModel',
    props: {
      value: {
        type: Boolean,
        default: true
      },
      config: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        dataValue: '',
        selectOption: []
      }
    },
    created() {
      try {
        this.selectOption = JSON.parse(this.config.optionValue)
      } catch (e) {
        this.$message.error(e)
      }
    },
    methods: {
      handleChange() {
        this.$emit('change', 'BOOLEAN', this.dataValue)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
