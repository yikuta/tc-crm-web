<template>
  <div class="app-container">
    <el-row class="padding-top padding-bottom-sm border-bottom-main">
      <el-col :span="24" class="text-right">
        <el-button type="primary" size="mini" @click="handleEdit(null, false)">添加菜单</el-button>
      </el-col>
    </el-row>
    <el-table size="mini" :data="tableData" lazy :expand-row-keys="[0]" :default-expand-all="true" row-key="menuId" :load="loadChildren" :tree-props="{ hasChildren: 'hasChildrenList', children: 'children' }">
      <el-table-column label="菜单名称" prop="menuName"></el-table-column>
      <el-table-column label="层级" prop="hierarchy"></el-table-column>
      <el-table-column label="显示顺序" prop="displayOrdernum"></el-table-column>
      <el-table-column label="类型" prop="menuType"></el-table-column>
      <el-table-column label="权限标识" prop="permissionIdentification"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-badge is-dot class="badge-item" :type="scope.row.enable ? 'success' : 'danger'"></el-badge>
          <span>{{scope.row.enable ? '正常' : '停用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row, false, scope)">编辑</el-button>
          <el-button :type="scope.row.enable ? 'danger' : 'success'" size="mini" @click="handleStop(scope.row)">{{ scope.row.enable ? '停用' : '启用' }}</el-button>
          <el-button type="default" size="mini" @click="handleDetail(scope.row)">详情</el-button>
          <el-button type="primary" size="mini" @click="handleEdit(scope.row, true)" v-if="scope.row.menuType !== 'PAGE'">添加子菜单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <form-dialog :visible.sync="visible" :form="formInfo" @success="editorSuccess" :child="addChild"></form-dialog>
    <detail-dialog :visible.sync="detailVisible" :form="formInfo"></detail-dialog>
  </div>
</template>

<script>
  import FormDialog from './templates/form'
  import DetailDialog from './templates/detail'
  import { getMenuList, updateMenuStatus } from '@/api/system/menu'
  // import { traceTreePath } from '@/utils/traceTreePath'
  export default {
    name: 'MenuList',
    components: {
      FormDialog,
      DetailDialog
    },
    data() {
      return {
        tableData: [],
        visible: false, // 表单弹窗
        formInfo: null, // 表单信息
        addChild: false, // 是否添加子级操作
        expandRowKeys: [],
        detailVisible: false // 详情
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList(row = {}, resolve) {
        getMenuList({
          parentId: row.menuId || ''
        }).then(res => {
          res.result.forEach(item => {
            item.leaf = item.hasChildrenList
          })
          if (row.menuId) {
            row.children = res.result
            resolve && resolve(res.result)
          } else {
            this.tableData = res.result
          }
        })
      },
      // 加载子级
      loadChildren(tree, treeNode, resolve) {
        this.getList(tree, resolve)
      },
      handleEdit(row, status, scope) {
        this.formInfo = row || null
        this.addChild = status
        this.visible = true
      },
      handleStop(row) {
        // 启用停用
        this.$confirm(`确定要${row.enable ? '停用' : '启用'}该菜单吗？`, '提示', {
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          updateMenuStatus(row.menuId).then(res => {
            this.$notify.success(row.enable ? '停用成功' : '启用成功')
            row.enable = !row.enable
          })
        })
      },
      handleDetail(row) {
        // 查看详情
        this.formInfo = row
        this.detailVisible = true
      },
      handleExpandChange(row, expanded) {
        // 表格的展开和关闭
        if (expanded) {
          this.expandRowKeys.push(row.id.toString())
        } else {
          const index = this.expandRowKeys.indexOf(row.id.toString())
          if (index > -1) {
            this.expandRowKeys.splice(index, 1)
          }
        }
      },
      editorSuccess() {
        // 编辑成功
        this.tableData = []
        this.getList()
      }
    }
  }
</script>

<style scoped lang="scss"></style>
