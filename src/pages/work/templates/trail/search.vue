<template>
  <el-card class="search-content">
    <el-form label-width="100px" size="mini" class="search-content">
      <el-form-item label="跟进人">
<!--        <el-input type="text" v-model="form.userName" />-->
        <selected-people v-model="userSelect" @on-selected="handleSelect" cmpName="跟进人" :cmpSearchBox="2"></selected-people>
      </el-form-item>
      <el-form-item label="跟进日期">
        <el-date-picker
          v-model="form.time"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期">
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
  export default {
    name: 'Trail',
    components: {
      SelectedPeople: resolve => {
        return require(['@/components/SelectedPeople/index'], resolve)
      }
    },
    data() {
      return {
        form: {
          userId: '',
          time: ''
        },
        userSelect: {}
      }
    },
    methods: {
      handleSearch() {
        this.$emit('success', this.form)
      },
      handleReset() {
        this.form = {
          userId: '',
          time: ''
        }
        this.userSelect = {}
      },
      handleSelect(result) {
        if (result) {
          this.form.userId = result.id
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
