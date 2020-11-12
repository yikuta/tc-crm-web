<template>
  <div class="page-container">
    <div class="padding-bottom">
      <div class="text-main text-bold">{{ roleDetail.roleName }}</div>
      <div class="text-sm text-second">{{ roleDetail.remark || '暂无描述' }}</div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="功能权限" name="FUNCTION_PERMISSION">
        <auth-form :permissionList="functionAuth" @change="handleSubmit"></auth-form>
      </el-tab-pane>
      <el-tab-pane label="菜单权限" name="MENU_PERMISSION">
        <menu-form :menuAuth="menuAuth" @change="handleSubmit"></menu-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { queryPermissionList, saveRolePermission, getRoleDetail } from '@/api/system/role'
  export default {
    name: 'Auth',
    components: {
      AuthForm: resolve => {
        return require(['./templates/auth/auth.vue'], resolve)
      },
      MenuForm: resolve => {
        return require(['./templates/auth/menu.vue'], resolve)
      }
    },
    data() {
      return {
        activeName: 'FUNCTION_PERMISSION',
        roleId: null,
        roleDetail: {
          roleName: '',
          remark: ''
        },
        functionAuth: [], // 功能权限
        menuAuth: [], // 菜单权限
        defaultProps: { // 节点参数
          children: 'menuVoList',
          label: 'menuName'
        }
      }
    },
    created() {
      this.roleId = this.$route.query.id
      this.getPermission()
      this.getRoleDetail()
    },
    methods: {
      getPermission() {
        queryPermissionList({
          roleId: this.roleId,
          permissionType: this.activeName
        }).then(res => {
          if (res.code === 200) {
            if (this.activeName === 'FUNCTION_PERMISSION') {
              // 功能权限
              this.functionAuth = res.result
            } else {
              // 菜单权限
              this.menuAuth = res.result
            }
          }
        })
      },
      getRoleDetail() {
        getRoleDetail(this.roleId).then(res => {
          if (res.code === 200) {
            this.roleDetail = res.result
          }
        })
      },
      handleClick() {
        this.getPermission()
      },
      handleSubmit(result) {
        // 保存
        this.$confirm('确定要保存吗？', '提示', {
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          let permissionIdList = result
          if (result === 1) {
            // 循环处理选中的数据项
            permissionIdList = []
            this.functionAuth.forEach(parent => {
              parent.permissionName.forEach(item => {
                if (item.isSelect) {
                  permissionIdList.push(item.id)
                }
              })
            })
          }
          saveRolePermission({
            roleId: this.roleId,
            permissionIdList,
            permissionType: this.activeName
          }).then(res => {
            if (res.code === 200) {
              this.$notify.success('保存成功')
              this.$confirm('保存成功', '提示', {
                cancelButtonText: '继续修改',
                confirmButtonText: '返回列表',
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false
              }).then(() => {
                this.$router.push('/system/role/index')
              })
            }
          })
        })
      }
    }
  }
</script>

<style scoped lang="scss"></style>
