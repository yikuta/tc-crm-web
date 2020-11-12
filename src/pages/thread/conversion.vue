<template>
  <div class="app-container">
    <el-row class="padding-bottom-sm border-bottom-main">
      <el-col :span="24" class="">转为客户</el-col>
    </el-row>
    <div class="margin-top">
      <el-radio-group v-model="tab">
        <el-radio :label="0">新建客户</el-radio>
        <el-radio :label="1">关联到已有客户</el-radio>
      </el-radio-group>
    </div>
    <conversion-form v-if="tab == 0" @on-change="onChange"></conversion-form>
    <client-list v-if="tab == 1" class="margin-top" @on-change="onChange"></client-list>
  </div>
</template>

<script>
  import { changeToCustomer } from '@/api/resource/detail'
  import ClientList from './templates/conversion/list'
  import ConversionForm from './templates/conversion/form'
  export default {
    name: 'Conversion',
    components: {
      ClientList, ConversionForm
    },
    data() {
      return {
        tab: 0
      }
    },
    methods: {
      onChange(data) {
        this._changeToCustomer(data)
      },
      _changeToCustomer(data) {
        return changeToCustomer(data).then((res) => {
          if (res.code === 200) {
            this.$notify.success('操作成功')
            this.$router.go(-2)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
