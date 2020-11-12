<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4" class="left-container">
        <el-row class="com-title padding-sm border-bottom-con" type="flex" align="middle">
          <el-col :span="12" class="">组织机构</el-col>
        </el-row>
        <div class="com-list">
<!--          <div class="cursor padding-sm text-df" v-for="(item, index) in department" :key="index" @click="handleClick(item)" :class="{'text-bold': departmentId.value === item.id}"><i class="el-icon-plus"></i>{{ item.departmentName }}</div>-->
          <el-tree
            :data="department"
            node-key="id"
            :default-expand-all="false"
            :highlight-current="true"
            :expand-on-click-node="false"
            :props="{label: 'name', children: 'childrenList'}"
            @node-click="handleNodeClick">
          </el-tree>
        </div>
      </el-col>
      <el-col :span="20" class="padding-left">
        <search-form @success="handleSearch"></search-form>
        <el-table :data="userList" size="mini">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="姓名" prop="fullName"></el-table-column>
          <el-table-column label="登录手机" prop="phone"></el-table-column>
          <el-table-column label="主属部门" prop="mainDepartmentName"></el-table-column>
          <el-table-column label="附属部门" prop="slaveDepartment"></el-table-column>
          <el-table-column label="角色">
            <template slot-scope="{ row }">
              {{ row.roleList | getRole }}
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-badge is-dot class="badge-item" :type="scope.row.enable ? 'success' : 'danger'"></el-badge>
              <span>{{scope.row.enable ? '正常' : '停用'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button size="mini" type="text" @click="handleRoleSet(row)">角色分配</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <form-dialog :visible.sync="visible"></form-dialog>
    <pagination :pageSize="listQuery.pageSize" :total="listQuery.totalCount" :current="listQuery.pageNo" @onPageChange="handleCurrentChange" @onSizeChange="handleSizeChange" />
  </div>
</template>

<script>
  import SearchForm from './templates/dist/search'
  import FormDialog from './templates/dist/form'
  import { queryUserList, queryAllDepartmentList } from '@/api/system/role'
  import { MatchType, DataType } from '@/constant/search'
  import searchTool from '@/utils/searchTool'
  export default {
    name: 'distribution',
    components: {
      SearchForm,
      FormDialog,
      pagination: resolve => {
        return require(['@/components/Pagination'], resolve)
      }
    },
    data() {
      return {
        tableData: [],
        department: [], // 机构列表
        visible: false,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          totalCount: 0
        },
        departmentId: { value: '', name: 'departmentId', matchType: MatchType.EQUAL, type: DataType.BOOLEAN },
        userList: [],
        searchs: [] // 这里用数组方便和 departmentId 组合
      }
    },
    filters: {
      getRole(lst) {
        // 过滤获得角色名称
        let name = ''
        lst.forEach(item => {
          name = name ? `${name},${item.roleName}` : item.roleName
        })
        return name
      }
    },
    created() {
      this.getDepartment()
    },
    methods: {
      getDepartment() {
        queryAllDepartmentList().then(res => {
          this.department = res.result
          if (res.result.length) {
            this.departmentId.value = res.result[0].id
            this.getUserList()
          }
        })
      },
      getUserList() {
        // 获取用户列表
        queryUserList({
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          searchs: JSON.stringify(this.searchs.concat(searchTool({
            departmentId: this.departmentId
          })))
        }).then(res => {
          this.userList = res.result.itemVOs
          this.listQuery.totalCount = res.result.totalCount
        })
      },
      handleClick(item) {
        this.departmentId.value = item.id
        this.listQuery.pageNo = 1
        this.getUserList()
      },
      handleAdd() {
        // 添加机构
        this.visible = true
      },
      handleRefresh() {
        // 刷新
        this.$notify.success('刷新成功')
      },
      handleCurrentChange(page) {
        // 当前页发生改变
        this.listQuery.pageNo = page
        this.getUserList()
      },
      handleSizeChange(size) {
        // 当前页数量发生改变
        this.listQuery.pageSize = size
        this.listQuery.pageNo = 1
        this.getUserList()
      },
      handleRoleSet(item) {
        // 角色分配
        this.$router.push({ path: '/system/role/dist/form', query: { id: item.userId } })
      },
      handleSearch(result) {
        // 检索条件
        this.searchs = result
        this.getUserList()
      },
      handleNodeClick(node) {
        // 树状事件点击
        this.departmentId.value = node.id
        this.listQuery.pageNo = 1
        this.getUserList()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@/styles/variables.scss';

  .app-container {
    .left-container {border: 1px solid $colorConventionBorder;
      .com-title {background: $colorSecondBorder;
      }

      .com-list {
      }
    }
    /deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
      background: #409EFF;
      color: #fff;

      .el-tree-node__expand-icon {
        color: #fff;

        &.is-leaf {
          color: transparent;
        }
      }
    }
  }
</style>
