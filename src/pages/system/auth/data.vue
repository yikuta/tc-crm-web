<template>
  <div class="app-container">
    <div class="padding-sm bg-seat text-convention">
      <p class="text-df">说明：</p>
      <p class="text-sm padding-top-sm">1、私有：对象中所有数据遵循相关团队成员（包括负责人）及其上级对数据可见，单条数据的负责人及其上级、以及相关团队具备编辑权限的成员可编辑该数据；上级部门的部门负责人可以看到下级部门的所有数据。</p>
      <p class="text-sm padding-top-sm">2、公开只读：对象中所有数据对全公司公开。单条数据的负责人及其上级、以及相关团队具备编辑权限的成员可编辑该数据。</p>
      <p class="text-sm padding-top-sm">3、公开读写：对象中所有的数据对全公司公开，全员可编辑。</p>
    </div>
    <el-row class="bg-seat margin-top-sm padding-sm text-df">
      <el-col :span="8">对象</el-col>
      <el-col :span="16">数据权限</el-col>
    </el-row>
    <el-row class="padding-sm text-df">
      <el-col :span="8">销售线索</el-col>
      <el-col :span="16">
        <el-radio-group v-model="form.salesLeadPermission" @change="handleSubmit">
          <el-radio label="PRIVATE_WRITE_READ">私有</el-radio>
          <el-radio label="PUBLIC_ONLY_READ">公开只读</el-radio>
          <el-radio label="PUBLIC_WRITE_READ">公开读、写</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="padding-sm text-df">
      <el-col :span="8">客户</el-col>
      <el-col :span="16">
        <el-radio-group v-model="form.customerPermission" @change="handleSubmit">
          <el-radio label="PRIVATE_WRITE_READ">私有</el-radio>
          <el-radio label="PUBLIC_ONLY_READ">公开只读</el-radio>
          <el-radio label="PUBLIC_WRITE_READ">公开读、写</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="padding-sm text-df">
      <el-col :span="8">客户跟进记录</el-col>
      <el-col :span="16">
        <el-radio-group v-model="form.followUpRecord" @change="handleSubmit">
          <el-radio label="PRIVATE_WRITE_READ">私有</el-radio>
          <el-radio label="PUBLIC_ONLY_READ">公开只读</el-radio>
          <el-radio label="PUBLIC_WRITE_READ">公开读、写</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // ['PRIVATE_WRITE_READ', 'PUBLIC_ONLY_READ', 'PUBLIC_WRITE_READ']
  // 私有，公开只读，公开读写
  import { getDataPermission, setDataPermission } from '@/api/system/data'
  export default {
    name: 'DataAuth',
    data() {
      return {
        form: {
          customerPermission: '', // 客户
          followUpRecord: '', // 客户跟进记录
          salesLeadPermission: '', // 销售线索
          userId: this.$store.getters.userInfo.userId
        }
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        getDataPermission(1).then(res => {
          this.form = {
            ...this.form,
            customerPermission: res.result.customerPermission, // 客户
            followUpRecord: res.result.followUpRecord, // 客户跟进记录
            salesLeadPermission: res.result.salesLeadPermission // 销售线索
          }
        })
      },
      handleSubmit() {
        setDataPermission(this.form).then(res => {
          this.$notify.success('保存成功')
        })
      }
    }
  }
</script>

<style scoped>

</style>
