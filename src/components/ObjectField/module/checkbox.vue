<template>
  <div class="">
    <el-checkbox-group v-model="config.value" size="mini" @change="handleChange" :disabled="disabled">
      <el-checkbox v-for="(item, index) in selectOption" :disabled="!item.enable" :label="item.id" :key="index">{{ item.fieldTypeConditionValue }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: 'CheckboxModel',
    props: {
      config: {
        type: Object,
        default: () => {}
      },
      value: {
        type: Array,
        default: () => []
      },
      disabled: {
        type: Boolean,
        default: false
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
        this.$emit('change', 'Multiple_Choice', this.selectValue)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
