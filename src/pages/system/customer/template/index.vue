<template>
  <div>
    <el-row class="padding-bottom-sm border-bottom-main">
      <el-col :span="24" class="text-right">
        <el-button type="primary" size="mini" @click="handleEdit(false)">新建</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" size="mini">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="模板编号" prop="templateNum"></el-table-column>
      <el-table-column label="模板名称" prop="customerTemplateName"></el-table-column>
      <el-table-column label="适用客户分类" prop="customerTypeName"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.enable ? 'success' : 'info'" size="mini">{{ scope.row.enable ? '启用' : '停用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row)" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getCustomerTemplateList } from '@/api/system/customer'
  export default {
    name: 'ClientIndex',
    data() {
      return {
        tableData: [],
        pagination: {
          pageNo: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getCustomerTemplateList({
          ...this.pagination
        }).then(res => {
          this.tableData = res.result.itemVOs
        })
      },
      handleEdit(row) {
        this.$router.push(`/system/customer/form/${row.customerTemplateId || ''}`)
      }
    }
  }
</script>

<style scoped>

</style>
