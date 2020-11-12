<template>
  <div class="">
    <el-radio-group v-model="config.value" @change="handleChange">
      <el-radio v-for="(item, index) in selectOption" :key="index" :disabled="!item.enable" :label="item.id">{{ item.fieldTypeConditionValue }}</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'RadioModel',
    props: {
      value: {
        type: [String, Boolean, Number],
        default: ''
      },
      config: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        selectOption: [],
        selectValue: []
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
        this.$emit('change', 'Single_Choice', this.selectValue)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
