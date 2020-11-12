<template>
  <el-card class="search-content">
    <el-form label-width="100px" size="mini" class="search-content">
      <el-form-item label="公海名称">
        <el-input placeholder="请输入角色名称" v-model="openSeaName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'SearchBar',
    data() {
      return {
        openSeaName: ''
      }
    },
    methods: {
      handleReset() {
        this.openSeaName = ''
      },
      handleSearch() {
        this.$emit('success', this.openSeaName)
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
