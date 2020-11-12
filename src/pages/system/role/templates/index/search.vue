<template>
  <el-card class="search-content">
    <el-form label-width="100px" size="mini" class="search-content">
      <el-form-item label="角色名称">
        <el-input placeholder="请输入角色名称" v-model="form.roleName.value"></el-input>
      </el-form-item>
      <el-form-item label="角色状态">
        <el-select v-model="form.enable.value">
          <el-option v-for="(item, index) in options" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import { MatchType, DataType } from '@/constant/search'
  import searchTool from '@/utils/searchTool'
  export default {
    name: 'SearchBar',
    data() {
      return {
        form: {
          roleName: { value: '', name: 'roleName', matchType: MatchType.CONTAIN, type: DataType.STRING },
          enable: { value: null, name: 'enable', matchType: MatchType.EQUAL, type: DataType.BOOLEAN }
        },
        options: [
          { id: 0, value: null, label: '全部' },
          { id: 1, value: true, label: '正常' },
          { id: 2, value: false, label: '停用' }
        ]
      }
    },
    methods: {
      handleSearch() {
        this.$emit('success', JSON.stringify(searchTool(this.form)))
      },
      handleReset() {
        this.form = {
          roleName: { value: '', name: 'roleName', matchType: MatchType.CONTAIN, type: DataType.STRING },
          enable: { value: null, name: 'enable', matchType: MatchType.EQUAL, type: DataType.BOOLEAN }
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
