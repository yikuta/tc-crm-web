<template>
  <div class="app-container">
    <search-form ref="search" @on-search="onSearch"></search-form>
    <el-row class="padding-top padding-bottom-sm border-bottom-main">
      <el-col :span="24" class="text-right">
        <el-button type="primary" size="mini" v-np="'RESOURCE_NEW'" @click="$router.push({ path: '/thread/form', query: { type: 'add', isPrivate: 'public' } })">新建</el-button>
        <el-button type="primary" size="mini" v-np="'RESOURCE_MERGE'" @click="merge">合并</el-button>
        <!-- <el-button type="primary" size="mini" @click="handleEdit(false)">分配</el-button> -->
        <el-button size="mini" @click="$router.push({ path: '/thread/poolLog' })">线索池日志</el-button>
      </el-col>
    </el-row>
    <div class="">
      <el-table :data="tableData" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="resourceName" label="联系人"></el-table-column>
        <el-table-column prop="shopName" label="门店名称"></el-table-column>
        <el-table-column prop="phoneNumber" label="联系人电话"></el-table-column>
        <el-table-column prop="principalUser" label="负责人"></el-table-column>
        <el-table-column prop="status.describe" label="状态"></el-table-column>
        <el-table-column label="地区">
          <template slot-scope="scope">
            {{getarea(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column prop="createUser" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-np="'RESOURCE_VIEW_DETAIL'" @click="$router.push({ path: '/thread/detail', query: { resourceId: scope.row.resourceId, type: 'public' } })">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :current="currentPage" :total="totalCount" :pageNo="pageSize" @onPageChange="handleCurrentChange" @onSizeChange="handleSizeChange" />
    </div>
  </div>
</template>

<script>
  import searchTool from '@/utils/searchTool'
  import { getMenuList } from '@/api/resource/menu'
  import SearchForm from './templates/index/search.vue'
  import Pagination from '@/components/Pagination'
  export default {
    name: 'ThreadManage',
    components: {
      SearchForm,
      Pagination
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 20,
        totalCount: 0,
        tableData: [],
        selected: [],
        ChangePersonVisible: false,
        SwitchPoolVisible: false
      }
    },
    mounted() {
      this.onSearch()
    },
    methods: {
      onSearch() {
        const req = searchTool(JSON.parse(JSON.stringify(this.$refs.search.form)))
        this._getMenuList(req)
      },
      merge() {
        // 合并
        if (this.selected.length !== 2) {
          this.$message({
            message: '请选择两条线索进行合并',
            type: 'error'
          })
          return false
        }
        this.$router.push({ path: '/thread/merge', query: { resourceId1: this.selected[0].resourceId, resourceId2: this.selected[1].resourceId } })
      },
      handleSelectionChange(val) {
        this.selected = val
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
      getarea(row) {
        const area = JSON.parse(JSON.stringify(row.regionVo)).reverse()
        let text = ''
        area.map((item) => {
          text += item.name
        })
        return text
      },
      handleEdit(row) {},
      _getMenuList(data) {
        return getMenuList({
          searchs: JSON.stringify(data),
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          orderby: 'createTime',
          sort: 'desc'
        }).then((res) => {
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

<style scoped lang="scss">

</style>
