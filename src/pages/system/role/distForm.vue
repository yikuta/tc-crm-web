<template>
  <div class="app-container">
    <el-row :gutter="20" class="desc-list">
      <el-col :span="12" class="desc-item">
        <span class="label">姓名：</span>
        <span class="content">{{ userInfo.fullName }}</span>
      </el-col>

      <el-col :span="12" class="desc-item">
        <span class="label">主属部门：</span>
        <span class="content">{{ userInfo.mainDepartmentName }}</span>
      </el-col>

      <el-col :span="12" class="desc-item">
        <span class="label">附属部门：</span>
        <span class="content">{{ userInfo.slaveDepartment }}</span>
      </el-col>
    </el-row>
    <el-transfer v-model="roleIdList" :data="transferData" :titles="['可选列表', '已选列表']" size="mini"></el-transfer>
    <div class="padding-top text-center">
      <el-button type="default" @click="$router.go(-1)" size="mini">返回</el-button>
      <el-button type="primary" @click="handleSubmit" size="mini">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { getUserDetail, getRoleList, saveRoleToUser } from '@/api/system/role'
  export default {
    name: 'DistForm',
    data() {
      return {
        userId: null,
        userInfo: {
          fullName: '',
          mainDepartmentName: '',
          slaveDepartment: '',
          roleList: []
        },
        roleIdList: [],
        transferData: []
      }
    },
    created() {
      this.getRoleList()
      this.userId = this.$route.query.id
      if (this.userId) {
        this.getUserDetail(this.userId)
      } else {
        this.$message.error('用户 id 异常')
      }
    },
    methods: {
      getUserDetail(id) {
        getUserDetail(id).then(res => {
          if (res.result) {
            this.userInfo = res.result
            this.roleIdList = this.userInfo.roleList.map(item => {
              return item.roleId
            })
          }
        })
      },
      getRoleList() {
        getRoleList({
          pageNo: 1,
          pageSize: 1000
        }).then(res => {
          if (res.result) {
            this.transferData = res.result.itemVOs.map(item => {
              return {
                key: item.roleId,
                label: item.roleName,
                disabled: false
              }
            })
          }
        })
      },
      handleSubmit() {
        saveRoleToUser({
          roleIdList: this.roleIdList,
          userId: this.userId,
          userName: this.userInfo.fullName
        }).then(res => {
          if (res.code === 200) {
            this.$confirm('保存成功', '提示', {
              cancelButtonText: '再改一下',
              confirmButtonText: '返回列表',
              showClose: false,
              closeOnClickModal: false,
              closeOnPressEscape: false
            }).then(() => {
              this.$notify.success('保存成功')
              this.$router.push('/system/role/dist')
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@/styles/variables.scss';

</style>
