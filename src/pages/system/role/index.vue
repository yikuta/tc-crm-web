<template>
  <div class="page-container">
    <search-form @success="handleSearch"></search-form>
    <el-row class="padding-top padding-bottom-sm border-bottom-main">
      <el-col :span="24" class="text-right">
        <span class="text-danger text-sm padding-right-sm" v-if="!tableData.length">请先添加角色后再为角色分配权限</span>
        <el-button type="primary" size="mini" @click="handleEdit(false)">添加角色</el-button>
      </el-col>
    </el-row>
    <div class="">
      <el-table :data="tableData" size="mini">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="角色编号" prop="roleNo"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="状态" width="60">
          <template slot-scope="scope">
            <el-badge is-dot class="badge-item" :type="scope.row.enable ? 'success' : 'danger'"></el-badge>
            <span>{{scope.row.enable ? '正常' : '停用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" prop="creatorName"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="备注说明" prop="remark"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button :type="scope.row.enable ? 'danger' : 'success'" size="mini" @click="handleStop(scope.row)">{{ scope.row.enable ? '停用' : '启用' }}</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
            <el-button type="primary" size="mini" @click="handleSetAuth(scope.row)">权限配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination :current="listQuery.pageNo" :total="listQuery.totalCount" :pageSize="listQuery.pageSize" @onPageChange="handleCurrentChange" @onSizeChange="handleSizeChange" />
    <form-dialog :visible.sync="visible" :form="formInfo" @change="handleChange"></form-dialog>
    <bind-user-list :visible.sync="userVisible" :form="formInfo"></bind-user-list>
  </div>
</template>

<script>
  import SearchForm from './templates/index/search'
  import FormDialog from './templates/index/form'
  import { getRoleList, updateRoleStatus, deleteRole } from '@/api/system/role'
  export default {
    name: 'roleList',
    components: {
      SearchForm,
      FormDialog,
      Pagination: resolve => {
        return require(['@/components/Pagination'], resolve)
      },
      BindUserList: resolve => {
        return require(['./templates/index/roleBindUser'], resolve)
      }
    },
    data() {
      return {
        tableData: [],
        visible: false,
        userVisible: false,
        formInfo: null,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          totalCount: 0
        },
        searchs: ''
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getRoleList({
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          searchs: this.searchs
        }).then(res => {
          if (res.code === 200) {
            this.listQuery.totalCount = res.result.totalCount
            this.tableData = res.result.itemVOs
          }
        })
      },
      handleChange(res) {
        this.getList()
      },
      handleEdit(item) {
        // 新增 编辑
        this.visible = true
        this.formInfo = item || null
      },
      handleStop(row) {
        // 停用
        this.$confirm('角色停用后，绑定了该角色的用户将不再拥有该角色对应的权限，确定要停用吗？', '提示', {
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          updateRoleStatus(row.roleId).then(res => {
            this.$notify.success(`${row.enable ? '停用' : '启用'}角色成功。`)
            row.enable = !row.enable
          })
        })
      },
      handleDelete(row) {
        // 删除
        if (row.hasBindUser) {
          // this.$message.error('该角色绑定了以下用户，请先解绑后在删除')
          this.formInfo = row
          this.userVisible = true
        } else {
          this.$confirm('角色删除后将不能恢复，确定要删除吗？', '提示', {
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false
          }).then(() => {
            deleteRole(row.roleId).then(res => {
              this.$notify.success('删除成功')
              this.getList()
            })
          })
        }
      },
      handleSetAuth(item) {
        // 设置权限
        this.$router.push({ path: '/system/role/auth', query: { id: item.roleId } })
      },
      handleSizeChange(size) {
        this.listQuery.pageSize = size
        this.listQuery.pageNo = 1
        this.getList()
      },
      handleCurrentChange(page) {
        this.listQuery.pageNo = page
        this.getList()
      },
      handleSearch(result) {
        // 检索查询
        this.searchs = result
        this.getList()
      }
    }
  }
</script>

<style lang="scss" scoped></style>
