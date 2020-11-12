<template>
  <div class="app-container">
    <el-row class="padding-bottom-sm border-bottom-main margin-bottom-sm">
      <el-col :span="12" class="text-left">
        <span class="padding-right-sm text-main">公海</span>
      </el-col>
      <el-col :span="12" class="text-right">
        <el-button type="primary" size="mini" @click="handleEdit">编辑</el-button>
        <el-button type="danger" size="mini" @click="handleDelete">删除</el-button>
      </el-col>
    </el-row>
    <el-row class="padding-top padding-bottom-sm border-bottom-main margin-bottom-sm">
      <el-col :span="24" class="text-left">
        <span class="padding-right-sm text-seat">基本信息</span>
      </el-col>
    </el-row>
    <template v-if="tableData.openSeaName">
      <div class="desc-list">
        <div class="desc-item">
          <span class="label">公海名称：</span>
          <span class="content">{{ tableData.openSeaName }}</span>
        </div>
        <div class="desc-item">
          <span class="label">管理员：</span>
          <span class="content">{{ tableData.admin && tableData.admin.fullName }}</span>
        </div>
        <div class="desc-item">
          <span class="label">成员：</span>
          <span class="content">
          <el-tag v-for="(item, index) in tableData.memberNameList" size="mini" :type="['primary', 'success', 'info', 'warning', 'danger'][index % 4]" :key="index">{{ item.fullName }}</el-tag>
        </span>
        </div>
        <div class="desc-item">
          <span class="label">分配领取规则：</span>
          <span class="content">{{ tableData.receiveRule === 'MEMBER_VISIBLE' ? '成员可见可领取，管理员可分配' : '成员不可见，管理员可分配' }}</span>
        </div>
      </div>
      <el-row class="padding-top padding-bottom-sm border-bottom-main margin-bottom-sm">
        <el-col :span="24" class="text-left">
          <span class="padding-right-sm text-seat">规则设置</span>
        </el-col>
      </el-row>
      <div class="desc-list">
        <div class="desc-item">
          <span class="label">客户认领上限：</span>
          <span class="content">{{ tableData.memberUplimit }}</span>
        </div>
        <div class="desc-item">
          <span class="label">客户业务范围：</span>
          <span class="content">{{ tableData.openSeaCustomerRangeVoList | openSeaCustomerRangeVoList }}</span>
        </div>
      </div>
    </template>
    <form-dialog :visible.sync="visible" :form="tableData" @success="getInfo"></form-dialog>
  </div>
</template>

<script>
  import FormDialog from './templates/form'
  import { getOpenSeaDetail, deleteOpenSea } from '@/api/system/sea'
  export default {
    name: 'HighSeasDetail',
    components: {
      FormDialog
    },
    data() {
      return {
        id: null,
        tableData: {},
        visible: false,
        formInfo: null
      }
    },
    filters: {
      openSeaCustomerRangeVoList(value) {
        try {
          if (value.length) {
            let name = ''
            value.forEach(val => {
              name = name ? `${name} 且 "${val.customerRangeFieldType}" ${val.comparisonConditionType} "${val.value}"` : `"${val.customerRangeFieldType}" ${val.comparisonConditionType} "${val.value}"`
            })
            return name
          } else {
            return '无'
          }
        } catch (e) {
          return '无'
        }
      }
    },
    created() {
      this.id = this.$route.query.id
      this.getInfo()
    },
    methods: {
      getInfo() {
        getOpenSeaDetail(this.id).then(res => {
          this.tableData = res.result
        })
      },
      handleEdit() {
        this.visible = true
      },
      handleDelete() {
        this.$confirm('确定要删除当前公海吗？', '删除提示', {
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(res => {
          deleteOpenSea(this.id).then(res => {
            if (res.code === 200) {
              this.$notify.success('删除成功')
              this.$router.push('/system/highSeas/index')
            }
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
