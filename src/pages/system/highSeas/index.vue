<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="公海管理" name="0">
        <search-form @success="handleSearch"></search-form>
        <el-row class="padding-top padding-bottom-sm border-bottom-main">
          <el-col :span="24" class="text-right">
            <el-button type="primary" size="mini" @click="handleEdit(false)">新建</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" size="mini">
          <el-table-column label="公海名称" prop="openSeaName"></el-table-column>
          <el-table-column label="客户认领上限" prop="claimUpperLimit"></el-table-column>
          <el-table-column label="客户总数" prop="customerCount"></el-table-column>
          <el-table-column label="公海成员">
            <template slot-scope="scope">
              <el-tag v-for="(item, index) in scope.row.customerNameList" :key="index" size="mini" :type="['primary', 'success', 'info', 'warning', 'danger'][index % 4]">{{ item }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="公海管理员" prop="adminName"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="handleEdit(scope.row)" size="mini">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="私有客户规则" name="1">
        <el-form label-width="150px" size="mini">
          <el-form-item label="收回规则">
            <div class="">
              <el-radio v-model="formInfo.automaticRecycling" :label="false">不自动收回</el-radio>
            </div>
            <div class="">
              <el-radio v-model="formInfo.automaticRecycling" :label="true">自动收回</el-radio>
              <el-input placeholder="请输入数量" class="margin-right-sm" style="width:100px;" v-model="formInfo.recoverDays"></el-input>
              天未跟进，自动收回到公海
              <el-select v-model="formInfo.openSeaId">
                <el-option v-for="(item, index) in tableData" :key="index" :label="item.openSeaName" :value="item.openSeaId"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="客户保有量上限">
            每个员工最多保有<el-input placeholder="请输入数量" style="width:100px;" class="margin-right-sm margin-left-sm" v-model="formInfo.customerStockMax"></el-input>个客户
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="客户分配领取规则" name="2">
        <el-form label-width="150px" size="mini">
          <el-form-item label="客户分配领取规则">
            <div><el-radio v-model="customerDistributionRuleType" label="BUSINESS_TYPE">不受区域限制</el-radio></div>
            <div><el-radio v-model="customerDistributionRuleType" label="AREA">受区域限制</el-radio><span class="text-sm text-seat">只分配给负责区域内的员工、或只能由负责区域内的员工领取</span></div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <form-dialog :visible.sync="visible" :form="null" @success="getList()"></form-dialog>
  </div>
</template>

<script>
  import SearchForm from './templates/search'
  import FormDialog from './templates/form'
  import { getOpenSeaList, getPrivateCustomerRule, updatePrivateCustomerRule } from '@/api/system/sea'
  export default {
    name: 'HighSeas',
    components: {
      SearchForm, FormDialog
    },
    data() {
      return {
        activeName: '0',
        tableData: [],
        formInfo: {
          automaticRecycling: false, // 是否自动回收
          customerStockMax: 0, // 最多的员工数
          openSeaId: null, // 自动回收到公海
          recoverDays: 0 // 多少天未跟进则自动回收，仅回收规则为自动回收时传
        },
        visible: false,
        customerDistributionRuleType: 'BUSINESS_TYPE' // 'BUSINESS_TYPE', 'AREA'
      }
    },
    created() {
      this.getList()
      this.getInfo()
    },
    methods: {
      getList(name) {
        getOpenSeaList(name).then(res => {
          if (res.code === 200) {
            this.tableData = res.result
          }
        })
      },
      getInfo() {
        getPrivateCustomerRule().then(res => {
          const result = res.result
          this.formInfo = {
            automaticRecycling: result.automaticRecycling, // 是否自动回收
            customerStockMax: result.customerStockMax, // 最多的员工数
            openSeaId: result.openSeaId, // 自动回收到公海
            recoverDays: result.recoverDays // 多少天未跟进则自动回收，仅回收规则为自动回收时传
          }
          this.customerDistributionRuleType = result.customerDistributionRuleType
        })
      },
      handleEdit(row) {
        if (row) {
          this.$router.push(`/system/highSeas/detail?id=${row.openSeaId}`)
        } else {
          this.visible = true
        }
      },
      handleTabClick() {},
      handleSave() {
        const data = {
          ...this.formInfo
        }
        if (this.activeName === '2') {
          data.customerDistributionRuleType = this.customerDistributionRuleType
        }
        updatePrivateCustomerRule(data).then(res => {
          this.$notify.success('保存成功')
        })
      },
      handleSearch(name) {
        this.getList(name)
      }
    }
  }
</script>

<style scoped>

</style>
