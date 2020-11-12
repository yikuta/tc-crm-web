<template>
  <div class="area">
    <area-cascader v-model="areaValue" @change="handleChange" :placeholder="placeholder || config.tipsMessage"></area-cascader>
  </div>
</template>

<script>
  export default {
    name: 'AreaModel',
    components: {
      AreaCascader: resolve => {
        return require(['@/components/Area/cascader.vue'], resolve)
      }
    },
    props: {
      config: {
        type: Object,
        default: () => {}
      },
      value: {
        type: String,
        default: ''
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
        areaValue: []
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        try {
          this.areaValue = JSON.parse(this.config.realData).map(item => {
            return item.code
          })
        } catch (e) {
          this.areaValue = []
        }
      },
      handleChange(result) {
        this.config.realData = JSON.stringify(result)
        this.config.value = result[2].id
      }
    },
    watch: {
      'config.realData': {
        handler(newVal, oldVal) {
          this.init()
        },
        immediate: false,
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped></style>
