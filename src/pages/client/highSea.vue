<template>
  <div class="app-container">
    <search-form @success="handleSearch" ref="searchForm"></search-form>
    <el-row class="padding-top padding-bottom-sm border-bottom-main">
      <el-col :span="24" class="text-right">
        <el-button v-np="'CUSTOMER_NEW'" type="primary" size="mini" @click="handleAddGenerate">新建</el-button>
        <el-button v-np="'CUSTOMER_MERGE'" type="primary" size="mini" @click="handleMerge" :disabled="selectList.length !== 2">合并</el-button>
        <el-button type="default" size="mini" @click="handleGoHighSea">公海日志</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" size="mini" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="客户名称" prop="customerName"></el-table-column>
      <el-table-column label="客户编号" prop="customerNo"></el-table-column>
      <el-table-column label="联系人" prop="contacts"></el-table-column>
      <el-table-column label="联系人电话" prop="contactsPhone"></el-table-column>
      <el-table-column label="客户分类" prop="customerTypeName"></el-table-column>
      <el-table-column label="成交状态" prop="cooperationStatus"></el-table-column>
      <el-table-column label="地区" prop="region"></el-table-column>
      <el-table-column label="创建人" prop="creatorName"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="$router.push(`/client/detail/${row.id}?sea=1`)" v-np="'CUSTOMER_VIEW_DETAIL'">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :current="listQuery.pageNo" :total="listQuery.totalCount" :pageNo="listQuery.pageSize" @onPageChange="handleCurrentChange" @onSizeChange="handleSizeChange" />
    <client-cate :visible.sync="cateVisible" :form="cateForm"></client-cate>
  </div>
</template>

<script>
  import { getOpenSeaCustomerList } from '@/api/highSea'
  export default {
    name: 'HighSea',
    components: {
      SearchForm: resolve => {
        return require(['./templates/highSea/search'], resolve)
      },
      ClientCate: resolve => {
        return require(['./templates/highSea/clientCate'], resolve)
      },
      Pagination: resolve => {
        return require(['@/components/Pagination'], resolve)
      }
    },
    data() {
      return {
        tableData: [],
        cateVisible: false,
        listQuery: {
          pageNo: 1,
          pageSize: 20,
          totalCount: 0
        },
        selectList: [],
        searchs: '',
        cateForm: null
      }
    },
    created() {
      // this.getList()
    },
    methods: {
      getList() {
        getOpenSeaCustomerList({
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          userId: this.$store.getters.userInfo.userId,
          searchs: this.searchs
        }).then(res => {
          if (res.code === 200) {
            this.listQuery.pageNo = res.result.pageNo
            this.listQuery.pageSize = res.result.pageSize
            this.listQuery.totalCount = res.result.totalCount
            this.tableData = res.result.itemVOs
          }
        })
      },
      handleSelectionChange(lst) {
        // 已选数据
        this.selectList = lst
      },
      handleMerge() {
        // 合并
        if (this.selectList.length === 2) {
          // 如果只选了两个
          if (this.selectList[0].customerTemplateId === this.selectList[1].customerTemplateId) {
            this.$router.push({
              path: `/client/merge?id1=${this.selectList[0].id}&id2=${this.selectList[1].id}`
            })
          } else {
            this.$message.error('当前选择模板 ID 不一致')
          }
        } else {
          this.$message.error('请选择两个需要合并的客户')
        }
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
        // 查询
        this.listQuery = {
          pageNo: 1,
          pageSize: 20,
          totalCount: 0
        }
        this.searchs = result.searchs
        this.getList()
      },
      handleAddGenerate() {
        // 新建公海客户
        this.cateForm = this.$refs.searchForm.getForm()
        this.cateVisible = true
      },
      handleGoHighSea() {
        // 公海日志
        const form = this.$refs.searchForm.getForm()
        this.$router.push(`/client/log?id=${form['openSea.id'].value}`)
      }
    }
  }
</script>

<style scoped lang="scss"></style>
