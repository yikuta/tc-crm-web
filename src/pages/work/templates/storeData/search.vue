<template>
  <el-card class="search-content">
    <el-form label-width="100px" size="mini" class="search-content">
      <el-form-item label="门店名称">
        <el-input placeholder="请输入门店名称" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="当前状态">
        <el-select v-model="form.status">
          <el-option v-for="(item, index) in options" :key="index" :value="item.id" :label="item.label"></el-option>
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
  export default {
    name: 'ThreadSearch',
    data() {
      return {
        form: {
          name: '',
          status: 5 // 'ENABLE', 'DISABLE', 'SELLING', 'CANCEL']
        },
        options: [
          { id: 5, value: 'ALL', label: '全部' },
          { id: 1, value: 'ENABLE', label: '已启用' },
          { id: 2, value: 'DISABLE', label: '已禁用' },
          { id: 3, value: 'SELLING', label: '销店中' },
          { id: 4, value: 'CANCEL', label: '已注销' }
        ]
      }
    },
    methods: {
      handleReset() {
        this.form = {
          name: '',
          status: 5
        }
      },
      handleSearch() {
        this.$emit('success', this.form)
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
