<template>
  <div>
    <el-table size="mini" :data="tableData">
      <el-table-column label="操作时间" prop="createTime"></el-table-column>
      <el-table-column label="操作人" prop="operator"></el-table-column>
      <el-table-column label="日志类别" prop="crmLogType.describe"></el-table-column>
      <el-table-column label="操作模块" prop="operationLogModule.describe"></el-table-column>
      <el-table-column label="操作行为" prop="crmOperationType.operation"></el-table-column>
      <el-table-column label="操作目标" prop="operationTarget" width="220">
        <template slot-scope="scope">
          <div v-if="scope.row.crmLogType">
            <div v-if="scope.row.crmOperationType.value === 1 || scope.row.crmOperationType.value === 9">
              ——
            </div>
            <div v-else>
              <span v-if="scope.row.crmLogType.value === 1">{{scope.row.operationLogModule.describe}}</span>
              <el-button type="text" v-if="scope.row.crmLogType.value === 1" @click="gotoDetail(scope.row)">{{scope.row.operationTargetName.split(' ')[2] ? scope.row.operationTargetName.split(' ')[2] : scope.row.operationTargetName}}</el-button>
              <!-- <el-button type="text" v-else-if="scope.row.crmLogType.value === 13" @click="gotoDetail(scope.row)">{{scope.row.operationTargetName}}</el-button> -->
              <span v-else>{{scope.row.operationTargetName}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作详情" prop="content" width="220">
        <template slot-scope="scope">
<!--          <div v-if="scope.row.crmOperationType.value === 1 || scope.row.crmOperationType.value === 9">-->
<!--            <span v-if="scope.row.crmLogType.value === 1">{{scope.row.operationLogModule.describe}}</span>-->
<!--            <el-button type="text" v-if="scope.row.crmLogType.value === 1" @click="gotoDetail(scope.row)">{{scope.row.operationTargetName ? scope.row.operationTargetName : scope.row.content.split(' ')[1]}}</el-button>-->
<!--            <span v-else>{{scope.row.operationTargetName}}</span>-->
<!--          </div>-->
<!--          <div v-else-if="scope.row.crmOperationType.value === 4 || scope.row.crmOperationType.value === 12">——</div>-->
<!--          <div v-else>{{scope.row.content ? scope.row.content : '——'}}</div>-->
          {{ scope.row.content }}
        </template>
      </el-table-column>
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
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
    },
    gotoDetail(row) {
      if (row.operationLogModule.value === 1) {
        // 跳转客户详情
        this.$router.push({ path: '/client/detail/' + row.operationTarget })
      } else if (row.operationLogModule.value === 2) {
        this.$router.push({ path: '/thread/detail', query: { resourceId: row.operationTarget, type: row.isPrivate ? 'private' : 'public' } })
      }
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
