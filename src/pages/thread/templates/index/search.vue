<template>
  <el-card class="search-content">
    <el-form :model="form" label-width="100px" size="mini" class="search-content">
      <el-form-item label="状态">
        <el-select v-model="form.select.value">
          <el-option v-for="(item, index) in options" :key="index" :value="item.id" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.resourceName.value" placeholder="请输入联系人姓名"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          align="center"
          v-model="form.createTime.value"
          type="daterange"
          size="mini"
          style="width:100%"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="{ disabledDate (time) { return time.getTime() - 1 >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime() + 86400000 - 1 }}">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="门店名称">
        <el-input v-model="form.shopName.value" placeholder="请输入门店名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="reset">重置</el-button>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import { MatchType, DataType } from '@/constant/search'
  export default {
    name: 'ThreadSearch',
    data() {
      return {
        form: {
          type: { value: 'crm.CustomerResourceType_1', name: 'type', matchType: MatchType.EQUAL, type: DataType.ENUM },
          select: { value: '', name: 'status', matchType: MatchType.EQUAL, type: DataType.ENUM },
          resourceName: { value: '', name: 'resourceName', matchType: MatchType.CONTAIN, type: DataType.STRING },
          shopName: { value: '', name: 'shopName', matchType: MatchType.CONTAIN, type: DataType.STRING },
          createTime: { value: '', name: 'createTime', matchType: MatchType.BETWEEN, type: DataType.DATE }
        },
        options: [
          { id: '', value: '全部' },
          { id: 'crm.CustomerResourceConvertStatus_1', value: '已转换' },
          { id: 'crm.CustomerResourceConvertStatus_2', value: '未转换' }
        ]
      }
    },
    created() {
      if (this.$route.name === 'ThreadPool') {
        this.form.type.value = 'crm.CustomerResourceType_2'
      }
    },
    methods: {
      search() {
        // 1
        this.$emit('on-search')
      },
      reset() {
        // 2
        if (this.$route.name === 'ThreadPool') {
          this.form = {
            type: { value: 'crm.CustomerResourceType_2', name: 'type', matchType: MatchType.EQUAL, type: DataType.ENUM },
            select: { value: '', name: 'status', matchType: MatchType.EQUAL, type: DataType.ENUM },
            resourceName: { value: '', name: 'resourceName', matchType: MatchType.CONTAIN, type: DataType.STRING },
            shopName: { value: '', name: 'shopName', matchType: MatchType.CONTAIN, type: DataType.STRING },
            createTime: { value: '', name: 'createTime', matchType: MatchType.BETWEEN, type: DataType.DATE }
          }
        } else {
          this.form = {
            type: { value: 'crm.CustomerResourceType_1', name: 'type', matchType: MatchType.EQUAL, type: DataType.ENUM },
            select: { value: '', name: 'status', matchType: MatchType.EQUAL, type: DataType.ENUM },
            resourceName: { value: '', name: 'resourceName', matchType: MatchType.CONTAIN, type: DataType.STRING },
            shopName: { value: '', name: 'shopName', matchType: MatchType.CONTAIN, type: DataType.STRING },
            createTime: { value: '', name: 'createTime', matchType: MatchType.BETWEEN, type: DataType.DATE }
          }
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
