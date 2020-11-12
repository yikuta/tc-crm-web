<template>
  <div class="">
    <u-editor v-model="config.value" :disabled="disabled"></u-editor>
  </div>
</template>

<script>
  import UEditor from '@/components/UEditor'
  export default {
    name: 'EditorModel',
    components: {
      UEditor
    },
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
      }
    }
  }
</script>

<style lang="scss" scoped></style>
