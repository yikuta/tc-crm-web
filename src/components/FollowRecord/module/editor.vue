<template>
  <div class="">
    <u-editor v-model="config.value"></u-editor>
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
      }
    }
  }
</script>

<style lang="scss" scoped></style>
