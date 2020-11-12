<template>
  <div class="report"></div>
</template>

<script>
  import { getReport } from '@/api/report'
  export default {
    name: 'Report',
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      getList() {
        getReport({
          pageNo: 1,
          pageSize: 10
        }).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="scss" scoped></style>
