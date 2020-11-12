<template>
  <div class="app-container">
    <el-row class="padding-bottom-sm margin-bottom border-bottom-seat">
      <el-col :span="24" class="text-left">
        <span class="text-main padding-right-sm">基本信息</span>
      </el-col>
    </el-row>
    <customer-form :tempId="tempId" :detailId="detailId" @success="handleSuccess"></customer-form>
  </div>
</template>

<script>
  import CustomerForm from '@/components/Customer/form'
  export default {
    name: 'ClientForm',
    components: {
      CustomerForm
    },
    data() {
      return {
        tempId: 0,
        detailId: 0
      }
    },
    created() {
     this.init()
    },
    methods: {
      init() {
        // 新建会传递模板 id，修改会传递客户 id
        const tempId = this.$route.query.temp_id
        if (tempId) {
          // 新建模板
          this.tempId = tempId
        } else {
          // 编辑的时候获取用户详情
          const id = this.$route.params.id
          if (id) {
            this.detailId = id
          }
        }
      },
      handleSuccess() {
        this.$notify.success('保存成功')
        this.$confirm(`${this.detailId ? '修改' : '新建'}客户成功`, '成功提示', {
          confirmButtonText: '返回列表',
          showCancelButton: false,
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          if (this.$route.query.sea) {
            this.$router.push('/client/highSea')
          } else {
            this.$router.push('/client/index')
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .app-container {
    /deep/ .el-form {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 50%;
        /*.el-select {*/
        /*  width: 100%;*/
        /*}*/
      }
      .address {
        width: 100%;
      }
    }
    .search-btn {
      text-align: right;
    }
  }
</style>
