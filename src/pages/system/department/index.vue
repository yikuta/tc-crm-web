<template>
  <div class="app-container">
    <search-form ref="searchForm" :form="searches" @change="handleSearchChange" />
    <el-table
      ref="treeTable"
      :expand-row-keys="expandRowKeys"
      :data="list"
      row-key="id"
      @expand-change="handleExpandChange"
      :tree-props="{ children: 'childrenList' }"
    >
      <el-table-column prop="name" label="部门结构"></el-table-column>
      <el-table-column prop="departmentClassify" label="分类">
        <template slot-scope="{ row }">
          <span>{{row['departmentClassify'] && row['departmentClassify'].value || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="peoples" label="人数"></el-table-column>
      <el-table-column prop="enable" label="状态">
        <template slot-scope="scope">
          <el-badge is-dot class="badge-item" :type="scope.row.enable ? 'success' : 'danger'"></el-badge>
          <span>{{scope.row.enable ? '正常' : '停用'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="adminUserName" label="负责人"></el-table-column>
      <el-table-column prop="remark" label="备注说明"></el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="{ row }">
          <!-- <el-button type="text" v-if="!row.isRoot" @click="handleEditDepartment(row)">编辑</el-button>
          <el-button type="text" @click="updateDepartmentStatus(row)">{{ row.enable ? '停用' : '启用' }}</el-button>
          <el-button type="text" v-if="!row.isRoot && !row.enable" @click="deleteDepartment(row)">删除</el-button>
          <el-button type="text" v-if="row.enable" @click="addDepartmentSub(row)">添加下级部门</el-button> -->
          <el-button type="text" @click="setPrincipal(row)">设置负责人</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialog-form :visible.sync="dialogVisible" :departmentId="departmentId" :adminUserName="adminUserName" @on-del-adminUserName="delAdminUserName" @on-refresh="searchDepartmentsList" />
  </div>
</template>
<script>
  import SearchForm from './templates/searchForm.vue'
  import DialogForm from './templates/dialogForm.vue'
  // import LazyTable from './templates/lazyTable.vue'
  // import TreeTable from './templates/treeTable.vue'
  import { searchDepartmentsList } from '@/api/system/authSetting'
  import searchFormat from '@/utils/searchFormat'
  // import { traceTreePath } from '@/utils/traceTreePath'
  // import { uniqueArr } from '@/utils/util'
  const initSearches = {
    name: '',
    enable: ''
  }
  function deleteHasChildrenProperty(data) {
    return data.map(item => {
      delete item.hasChildren
      if (item.childrenList && item.childrenList.length) {
        item.childrenList = deleteHasChildrenProperty(item.childrenList)
      }
      return item
    })
  }

  function getExpandRowKeys(data, expandRowKeys = []) {
    data.forEach(item => {
      if (item.childrenList && item.childrenList.length) {
        expandRowKeys.push(item.id.toString())
        expandRowKeys = getExpandRowKeys(item.childrenList, expandRowKeys)
      }
    })
    return expandRowKeys
  }

  export default {
    name: 'organizationManage',
    components: { SearchForm, DialogForm },
    data() {
      return {
        searches: { ...initSearches },
        list: [],
        dialogVisible: false,
        expandRowKeys: [],
        parentPath: {},
        currentPath: [],
        currentRow: null,
        isSearch: false,
        departmentId: null,
        adminUserName: ''
      }
    },
    mounted() {
      this.searchDepartmentsList()
      // this.fetchDepartmentsById({})
    },
    methods: {
      formatSearches() {
        const { name, enable } = this.searches
        const results = searchFormat({
          name: { value: name, matchType: 'CONTAIN' },
          enable: { value: enable === '' ? enable : enable === 1, matchType: 'EQUAL' }
        })
        return results.length ? JSON.stringify(results) : null
      },
      // 加载子元素
      loadChildren(tree, treeNode, resolve) {
        // fetchDepartmentsList({
        //   searchs: JSON.stringify(searchFormat({ 'parent.id': { value: tree.id, matchType: 'EQUAL', tempType: 'Integer' } }))
        // }).then(res => {
        //   if (res.code === 200) {
        //     tree.childrenList = res.result
        //     resolve && resolve(res.result)
        //   }
        // })
      },
      // 搜索部门列表
      searchDepartmentsList() {
        searchDepartmentsList({
          orderby: 'sortNum',
          sort: 'desc',
          searchs: this.formatSearches()
        }).then(res => {
          if (res.code === 200) {
            if (res.result.length) {
              res.result[0].isRoot = true
              this.list = deleteHasChildrenProperty(res.result)
              if (this.isSearch) {
                this.expandRowKeys = getExpandRowKeys(res.result)
              } else {
                this.expandRowKeys.push(res.result[0].id.toString())
              }
            } else {
              this.list = []
              this.expandRowKeys = []
            }
          }
        })
      },
      // 搜索
      handleSearchChange(type) { // search | reset | add
        if (type === 'add') {
          this.dialogVisible = true // 显示添加弹框
        } else if (type === 'reset') {
          this.searches = { ...initSearches }
          this.fetchDepartmentsById({})
        } else if (type === 'search') {
          this.isSearch = true
          this.searchDepartmentsList()
        }
      },
      // 根据id查询子级部门
      fetchDepartmentsById(parentNode) {
        const postData = {}
        if (parentNode.id) {
          postData.searchs = JSON.stringify(searchFormat({
            'parent.id': { value: parentNode.id, matchType: 'EQUAL', tempType: 'Integer' }
          }))
        }
        // fetchDepartmentsList(postData).then(res => {
        //   if (parentNode.id) {
        //     this.$set(parentNode, 'hasChildren', res.result.length > 0)
        //     this.$set(parentNode, 'childrenList', res.result)
        //     this.$forceUpdate()
        //   } else {
        //     res.result[0].isRoot = true
        //     this.list = res.result
        //   }
        // })
      },
      // 展开关闭
      handleExpandChange(row, expanded) {
        if (expanded) {
          this.expandRowKeys.push(row.id.toString())
        } else {
          const index = this.expandRowKeys.indexOf(row.id.toString())
          if (index > -1) {
            this.expandRowKeys.splice(index, 1)
          }
        }
      },
      // 设置负责人
      setPrincipal(row) {
        this.departmentId = row.id
        this.adminUserName = row.adminUserName // 默认负责人
        this.dialogVisible = true
      },
      delAdminUserName() {
        this.adminUserName = ''
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
