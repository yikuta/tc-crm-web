<template>
  <div ref="echarts" :style="{ width: width, height: height }"></div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'ECharts',
    props: {
      option: {
        type: Object,
        default: () => {
          return {}
        }
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    watch: {
      option: {
        handler(n) {
          console.log('handler echarts drawLine')
          this.drawLine()
        },
        deep: true
      }
    },
    created() {
      this.drawLine()
    },
    methods: {
      drawLine() {
        console.log('echarts drawLine')
        this.$nextTick(() => {
          const myEChart = echarts.init(this.$refs.echarts)
          myEChart.setOption({
            ...this.option
          })
        })
      }
    }
  }
</script>
