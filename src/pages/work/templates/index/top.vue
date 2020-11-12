<template>
  <el-card class="search-content">
    <el-form label-width="100px" size="mini" class="search-content">
      <el-form-item label="负责范围">
        <el-select v-model="form.dataRange">
          <el-option v-for="(item, index) in options" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期范围">
        <el-row>
          <el-col :span="8">
            <el-select v-model="form.dateEnum">
              <el-option v-for="(item, index) in optionsDay" :key="index" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="14" v-if="form.dateEnum === 'DEFINED_DATE'">
            <el-date-picker v-model="timeArr" align="right" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleDate"></el-date-picker>
          </el-col>
        </el-row>
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
    name: 'TopBar',
    data() {
      return {
        timeArr: [],
        form: {
          dataRange: 'ALL', // 查询数据范围
          dateEnum: 'ALL_TIME', // 日期范围
          startTime: '', // 开始时间
          endTime: '' // 结束时间
        },
        options: [
          { value: 'ALL', label: '全部' },
          { value: 'MY_RESPONSIBLE', label: '我负责的' },
          { value: 'MY_DEPARTMENT_RESPONSIBLE', label: '我部门负责的' },
          { value: 'MY_SUBORDINATE_RESPONSIBLE', label: '我下属负责的' }
          // { value: 'MY_FOLLOW', label: '我联合跟进的' },
          // { value: 'MY_JOIN', label: '我参与的' }
        ],
        optionsDay: [
          { value: 'ALL_TIME', label: '所有' },
          { value: 'TODAY', label: '今天' },
          { value: 'YESTERDAY', label: '昨天' },
          { value: 'THIS_WEEK', label: '本周' },
          { value: 'LAST_WEEK', label: '上周' },
          { value: 'THIS_MONTH', label: '本月' },
          { value: 'LAST_MONTH', label: '上月' },
          { value: 'DEFINED_DATE', label: '自定义' }
        ]
      }
    },
    methods: {
      handleDate(date) {
        if (date.length) {
          this.form.startTime = date[0]
          this.form.endTime = date[1]
        }
      },
      handleSearch() {
        this.$emit('success', this.form)
      },
      handleReset() {
        this.form = {
          dataRange: 'ALL', // 查询数据范围
          dateEnum: 'ALL_TIME', // 日期范围
          startTime: '', // 开始时间
          endTime: '' // 结束时间
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
