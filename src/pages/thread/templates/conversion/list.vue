<template>
  <div class="">
    <search-form ref="searchForm" @on-search="onSearch"></search-form>
    <el-table v-if="tableData.length" :data="tableData" size="mini" class="margin-top">
      <el-table-column label="#" type="index" width="55"></el-table-column>
      <el-table-column label="客户名称" prop="customerName"></el-table-column>
      <el-table-column label="客户编号" prop="customerNo"></el-table-column>
      <el-table-column label="联系人" prop="contacts"></el-table-column>
      <el-table-column label="联系人电话" prop="contactsPhone"></el-table-column>
      <el-table-column label="客户分类" prop="customerName">
        <template slot-scope="{ row }">
          <span v-if="row.customerTypeName">{{ row.customerTypeName.customerTypeValue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人" prop="companyName"></el-table-column>
      <el-table-column label="成交状态" prop="customerName"></el-table-column>
      <el-table-column label="地区" prop="region"></el-table-column>
      <el-table-column label="创建人" prop="creatorName"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">详情</el-button>
          <el-button size="mini" type="primary" @click="handleSelect(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :current="currentPage" :total="totalCount" :pageNo="pageSize" @onPageChange="handleCurrentChange" @onSizeChange="handleSizeChange" />
  </div>
</template>

<script>
  import { queryCustomerList } from '@/api/resource/menu'
  import SearchForm from './search.vue'
  import searchTool from '@/utils/searchTool'
  import Pagination from '@/components/Pagination'
  export default {
    name: 'ClientList',
    components: { SearchForm, Pagination },
    data() {
      return {
        currentPage: 1,
        pageSize: 20,
        totalCount: 0,
        tableData: [],
        loading: true
      }
    },
    mounted() {
      this.onSearch()
    },
    methods: {
      onSearch() {
        const req = searchTool(JSON.parse(JSON.stringify(this.$refs.searchForm.form)))
        this._queryCustomerList(req, this.$refs.searchForm.dataRange)
      },
      handleEdit() {},
      handleSelect(row) {
        debugger
        const data = {
          id: Number(this.$route.query.resourceId),
          type: 2,
          customerId: row.id,
          customerOrResourceName: this.$route.query.resourceName,
          customerName: row.customerName
        }
        this.$emit('on-change', data)
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
      _queryCustomerList(data, dataRange) {
        return queryCustomerList({
          searchs: JSON.stringify(data),
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          dataRange: dataRange,
          userId: this.$store.getters.userInfo.userId
        }, dataRange).then((res) => {
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

<style scoped>

</style>
