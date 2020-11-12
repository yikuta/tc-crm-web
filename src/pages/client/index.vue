<template>
  <div class="ap-container">
    <search-form @success="handleSearch"></search-form>
    <el-row class="padding-top padding-bottom-sm border-bottom-main">
      <el-col :span="24" class="text-right">
        <el-button v-np="'CUSTOMER_NEW'" type="primary" size="mini" @click="cateVisible = true">新建</el-button>
        <el-button v-np="'CUSTOMER_MERGE'" type="primary" size="mini" @click="handleMerge" :disabled="selectList.length !== 2">合并</el-button>
        <el-button v-np="'CUSTOMER_MOVE_SEA'" type="primary" size="mini" @click="seaVisible = true" :disabled="selectList.length !== 1">转入公海</el-button>
        <el-button v-np="'CUSTOMER_CHANGE_ADMIN'" type="primary" size="mini" @click="leadVisible = true" :disabled="selectList.length !== 1">变更负责人</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" size="mini" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="客户名称" prop="customerName"></el-table-column>
      <el-table-column label="客户编号" prop="customerNo"></el-table-column>
      <el-table-column label="联系人" prop="contacts"></el-table-column>
      <el-table-column label="联系人电话" prop="contactsPhone"></el-table-column>
      <el-table-column label="客户分类" prop="customerTypeName"></el-table-column>
      <el-table-column label="负责人" prop="leaderName"></el-table-column>
      <el-table-column label="合作状态" prop="cooperationStatus"></el-table-column>
      <el-table-column label="地区" prop="region"></el-table-column>
      <el-table-column label="创建人" prop="creatorName"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="最后跟进时间" prop="lastFollowUpTime"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button v-np="'CUSTOMER_VIEW_DETAIL'" type="text" @click="handleDetail(scope.row)">详情</el-button>
          <el-button v-np="'CUSTOMER_EDIT'" type="text" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :current="listQuery.pageNo" :total="listQuery.totalCount" :pageNo="listQuery.pageSize" @onPageChange="handleCurrentChange" @onSizeChange="handleSizeChange" />
    <client-cate :visible.sync="cateVisible"></client-cate>
    <switch-pool :visible.sync="seaVisible" @change="handleChangeSea"></switch-pool>
    <change-peron :visible.sync="leadVisible" @change="handleUserChange"></change-peron>
  </div>
</template>

<script>
  import SearchForm from './templates/index/search'
  import ClientCate from './templates/index/clientCate'
  import switchPool from './templates/detail/switchPool'
  import ChangePeron from './templates/detail/changePerson'
  import { getCustomerList, updateCustomerResponsibleUser, moveToOpenSea } from '@/api/customer/menu'
  export default {
    name: 'ClientIndex',
    components: {
      SearchForm,
      ClientCate,
      switchPool,
      ChangePeron,
      Pagination: resolve => {
        return require(['@/components/Pagination'], resolve)
      }
    },
    data() {
      return {
        tableData: [],
        cateVisible: false,
        seaVisible: false,
        leadVisible: false,
        listQuery: {
          pageNo: 1,
          pageSize: 20,
          totalCount: 0
        },
        selectList: [],
        searchs: '',
        dataRange: 'ALL'
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getCustomerList({
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          dataRange: this.dataRange,
          userId: 1,
          searchs: this.searchs
        }).then(res => {
          this.listQuery.pageNo = res.result.pageNo
          this.listQuery.pageSize = res.result.pageSize
          this.listQuery.totalCount = res.result.totalCount
          if (res.code === 200) {
            this.tableData = res.result.itemVOs
          }
        })
      },
      handleDetail(row) {
        this.$router.push(`/client/detail/${row.id}`)
      },
      handleEdit(row) {
        this.$router.push(`/client/form/${row.id}`)
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
            this.$message.error('不同客户分类的客户不能合并')
          }
        } else {
          this.$message.error('请选择两个需要合并的客户')
        }
      },
      handleSelectionChange(lst) {
        // 已选数据
        this.selectList = lst
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
        this.dataRange = result.dataRange
        this.getList()
      },
      handleChangeSea(result) {
        // 转入公海
        if (this.selectList.length > 1) {
          this.$message.error('客户转入公海请选择一条数据！')
          return
        }
        if (result) {
          let idx = 0
          this.selectList.forEach(item => {
            moveToOpenSea({
              openSeaId: result.openSeaId,
              id: item.id,
              userId: this.$store.getters.userInfo.userId,
              customerOrResourceName: this.selectList[0].customerName,
              publicSeaName: result.openSeaName
            }).then(res => {
              if (res.code === 200) {
                idx = idx + 1
                this.getList()
                this.$notify.success('转入成功')
              }
            })
          })
          if (this.selectList.length && idx) {
            this.getList()
          }
        }
      },
      handleUserChange(result) {
        // 变更负责人
        if (this.selectList.length > 1) {
          this.$message.error('变更客户负责人请选择一条数据！')
          return
        }
        if (result) {
          let idx = 0
          this.selectList.forEach(item => {
            updateCustomerResponsibleUser({
              id: item.id,
              responsibleUserId: result.id,
              customerOrResourceName: '', // 销售线索名称
              newPrincipalUser: result.name,
              oldPrincipalUser: this.selectList[0].customerName
            }).then(res => {
              if (res.code === 200) {
                idx = idx + 1
                this.getList()
                this.$notify.success('变更成功')
              }
            })
          })
          if (this.selectList.length === idx) {
            // 如果相等则全部成功
          }
          if (this.selectList.length && idx) {
            this.getList()
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
