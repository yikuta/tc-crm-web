<template>
  <div>
    <el-table size="mini" :data="tableData">
      <el-table-column label="操作时间" prop="createTime"></el-table-column>
      <el-table-column label="操作人" prop="operator"></el-table-column>
      <el-table-column label="操作行为" prop="crmOperationType.operation"></el-table-column>
      <el-table-column label="操作目标" prop="operationTarget">
        <template slot-scope="scope">
          <el-button type="text" @click="gotoDetail(scope.row)">{{scope.row.operationTargetName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作详情" prop="content"></el-table-column>
    </el-table>
    <pagination :current="currentPage" :total="totalCount" :pageNo="pageSize" @onPageChange="handleCurrentChange" @onSizeChange="handleSizeChange" />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { findOperationLogByPage } from '@/api/resource/detail'
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      totalCount: 0,
      tableData: []
    }
  },
  components: {
    Pagination
  },
  mounted() {
    this.onSearch()
  },
  methods: {
    onSearch() {
      this._findOperationLogByPage({
        operationLogModule: 'CUSTOMER_OPERATION',
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        isPrivate: false,
        targetId: this.$route.query.id && Number(this.$route.query.id)
      })
    },
    gotoDetail(row) {
      this.$router.push({ path: `/client/detail/${row.operationTarget}` })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.onSearch()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.onSearch()
    },
    _findOperationLogByPage(data) {
      return findOperationLogByPage(data).then((res) => {
        if (res.code === 200) {
          const result = res.result || []
          this.currentPage = result.pageNo
          this.totalCount = result.totalCount
          this.tableData = result.itemVOs
        }
      })
    }
  }
}
</script>
