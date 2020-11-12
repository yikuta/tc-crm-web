<template>
  <el-card class="search-content">
    <el-form label-width="100px" size="mini" class="search-content">
      <el-form-item label="数据范围">
        <el-select v-model="dataRange">
          <el-option v-for="(item, index) in dataOptions" :key="index" :value="item.id" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户分类">
        <el-select v-model="form.customerTypeId.value">
          <el-option v-for="(item, index) in clientOptions" :key="index" :value="item.id" :label="item.customerTypeValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input placeholder="请输入客户名称" v-model="form.customerName.value"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input placeholder="请输入联系人" v-model="form.contacts.value"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          align="center"
          type="daterange"
          size="mini"
          style="width:100%"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          v-model="form.createTime.value"
          :picker-options="{ disabledDate (time) { return time.getTime() - 1 >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime() + 86400000 - 1 }}">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input placeholder="请输入客户名称" v-model="form['user.fullName'].value"></el-input>
      </el-form-item>
      <el-form-item label="最后跟进时间">
        <el-date-picker
          align="center"
          type="daterange"
          size="mini"
          style="width:100%"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          v-model="form.lastFollowUpTime.value"
          :picker-options="{ disabledDate (time) { return time.getTime() - 1 >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime() + 86400000 - 1 }}">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import { queryCustomerTypeList } from '@/api/system/customer'
  import { MatchType, DataType } from '@/constant/search'
  import searchTool from '@/utils/searchTool'
  export default {
    name: 'SearchBar',
    data() {
      return {
        dataOptions: [
          { id: 'ALL', value: '全部' },
          { id: 'MY_RESPONSIBLE', value: '我负责的' },
          { id: 'MY_DEPARTMENT_RESPONSIBLE', value: '我部门负责的' },
          { id: 'MY_SUBORDINATE_RESPONSIBLE', value: '我下属负责的' },
          { id: 'MY_FOLLOW', value: '我联合跟进的' },
          { id: 'MY_JOIN', value: '我参与的' }
        ],
        clientOptions: [],
        dataRange: 'ALL',
        customerType: null,
        form: {
          customerName: { value: '', name: 'customerName', matchType: MatchType.CONTAIN, type: DataType.STRING }, // 客户名称
          customerTypeId: { value: null, name: 'customerTypeId', matchType: MatchType.EQUAL, type: DataType.BOOLEAN }, // 客户分类
          contacts: { value: '', name: 'contacts', matchType: MatchType.CONTAIN, type: DataType.STRING }, // 联系人
          createTime: { value: '', name: 'createTime', matchType: MatchType.BETWEEN, type: DataType.DATE }, // 创建时间
          lastFollowUpTime: { value: '', name: 'lastFollowUpTime', matchType: MatchType.BETWEEN, type: DataType.DATE }, // 最后跟进时间
          'user.fullName': { value: '', name: 'user.fullName', matchType: MatchType.CONTAIN, type: DataType.STRING }
        }
      }
    },
    created() {
      this.getTypeList()
    },
    methods: {
      getTypeList() {
        queryCustomerTypeList(1).then(res => {
          if (res.code === 200 && res.result.length) {
            this.clientOptions = res.result
          }
        })
      },
      handleSearch() {
        this.$emit('success', {
          searchs: JSON.stringify(searchTool(this.form)),
          dataRange: this.dataRange
        })
      },
      handleReset() {
        this.dataRange = 'ALL'
        this.form = {
          customerName: { value: '', name: 'customerName', matchType: MatchType.CONTAIN, type: DataType.STRING }, // 客户名称
          customerTypeId: { value: null, name: 'customerTypeId', matchType: MatchType.EQUAL, type: DataType.BOOLEAN }, // 客户分类
          contacts: { value: '', name: 'contacts', matchType: MatchType.CONTAIN, type: DataType.BOOLEAN }, // 联系人
          createTime: { value: '', name: 'createTime', matchType: MatchType.EQUAL, type: DataType.BOOLEAN }, // 创建时间
          lastFollowUpTime: { value: '', name: 'lastFollowUpTime', matchType: MatchType.EQUAL, type: DataType.BOOLEAN }, // 最后跟进时间
          'user.fullName': { value: '', name: 'user.fullName', matchType: MatchType.CONTAIN, type: DataType.BOOLEAN }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-content {
    /deep/ .el-form {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 33%;
        .el-select {
          width: 100%;
        }
      }
    }
    .search-btn {
      text-align: right;
    }
  }
</style>
