<template>
  <el-card class="search-content">
    <el-form label-width="100px" size="mini" class="search-content">
      <el-form-item label="数据范围">
        <el-select v-model="dataRange">
          <el-option v-for="(item, index) in options" :key="index" :value="item.id" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input placeholder="请输入客户名称" v-model="form.name.value"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="default">重置</el-button>
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
        options: [
          { id: 'ALL', value: '全部' },
          { id: 'MY_RESPONSIBLE', value: '我负责的' },
          { id: 'MY_DEPARTMENT_RESPONSIBLE', value: '我部门负责的' },
          { id: 'MY_SUBORINATE_RESPONSIBLE', value: '我下属负责的' },
          { id: 'MY_FOLLOW', value: '我联合跟进的' },
          { id: 'MY_JOIN', value: '我参与的' }
        ],
        dataRange: 'ALL',
        form: {
          name: { value: '', name: 'name', matchType: MatchType.CONTAIN, type: DataType.STRING }
        }
      }
    },
    methods: {
      search() {
        this.$emit('on-search')
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
