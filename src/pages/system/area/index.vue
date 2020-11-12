<template>
  <div class="app-container">
    <el-row class="padding-bottom-sm border-bottom-main">
      <el-col :span="24" class="text-right">
        <span class="text-second text-sm padding-right-sm">未设置负责区域的员工默认可负责所有区域</span>
        <el-button type="primary" size="mini" @click="handleEdit(false)">新建</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" size="mini">
      <el-table-column label="员工姓名" prop="fullName">
        <template slot-scope="{ row }">{{ row.fullName }}{{ row.phone && `(${row.phone})` }}</template>
      </el-table-column>
      <el-table-column label="负责区域" width="500">
        <template slot-scope="scope">
          <el-tag v-for="(item, index) in scope.row.areaList" size="mini" :type="['primary', 'success', 'info', 'warning', 'danger'][index % 5]" :key="index">{{ item.provinceName || '' }}{{ item.cityName || '' }}{{ item.areaName || '' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-badge is-dot class="badge-item" :type="scope.row.enable ? 'success' : 'danger'"></el-badge>
          <span>{{scope.row.enable ? '正常' : '停用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后修改时间" prop="lastUpdateTime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row)" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <form-dialog :visible.sync="visible" :form="formInfo" @success="getList"></form-dialog>
  </div>
</template>

<script>
  import FormDialog from './templates/form.vue'
  import { getUserAreaList } from '@/api/system/area'
  export default {
    name: 'AreaIndex',
    components: {
      FormDialog
    },
    data() {
      return {
        tableData: [],
        formInfo: null,
        visible: false,
        pagination: {
          pageSize: 10,
          pageNo: 1
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getUserAreaList({
          ...this.pagination
        }).then(res => {
          if (res.code === 200) {
            this.tableData = res.result.itemVOs
          }
        })
      },
      handleEdit(row) {
        if (row) {
          this.formInfo = row
        } else {
          this.formInfo = null
        }
        this.visible = true
      }
    }
  }
</script>

<style scoped>

</style>
