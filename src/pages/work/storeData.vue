<template>
  <div class="app-container">
    <search-form @success="handleSearch"></search-form>
    <el-table :data="tableData">
      <el-table-column label="门店名称" prop="storeName"></el-table-column>
      <el-table-column label="门店编码" prop="storeCode"></el-table-column>
      <el-table-column label="入驻时间" prop="createTime"></el-table-column>
      <el-table-column label="当前状态">
        <template slot-scope="{ row }">
          <el-tag :type="row.enable ? 'success' : 'info'" size="mini">{{ row.enable ? '启用' : '停用' }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <pagination :current="listQuery.pageNo" :total="listQuery.totalCount" :pageNo="listQuery.pageSize" @onPageChange="handleCurrentChange" @onSizeChange="handleSizeChange" />
  </div>
</template>

<script>
  import SearchForm from './templates/storeData/search'
  import { getShopDataDetail2 } from '@/api/work'
  export default {
    name: 'StoreData',
    components: {
      SearchForm,
      Pagination: resolve => {
        return require(['@/components/Pagination'], resolve)
      }
    },
    data() {
      return {
        tableData: [],
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          totalCount: 0
        },
        shopName: '', // 店铺名称
        status: 5 // 状态
      }
    },
    created() {
      this.getShopDataDetail()
    },
    methods: {
      getShopDataDetail() {
        getShopDataDetail2({
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          shopName: this.shopName,
          status: this.status
        }).then(res => {
          if (res.code === 200) {
            this.listQuery.totalCount = res.result.totalCount
            this.tableData = res.result.itemVOs
          }
        })
      },
      handleSizeChange(size) {
        this.listQuery.pageSize = size
        this.listQuery.pageNo = 1
        this.getShopDataDetail()
      },
      handleCurrentChange(page) {
        this.listQuery.pageNo = page
        this.getShopDataDetail()
      },
      handleSearch(result) {
        this.shopName = result.name
        this.status = result.status
        this.pageNo = 1
        this.getShopDataDetail()
      }
    }
  }
</script>

<style scoped>

</style>
