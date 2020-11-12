<template>
  <el-card class="search-content">
    <el-form label-width="100px" size="mini" class="search-content">
      <el-form-item label="公海名称">
        <el-select v-model="form['openSea.id'].value">
          <el-option v-for="(item, index) in option.sea" :key="index" :value="item.openSeaId" :label="item.openSeaName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户分类">
        <el-select v-model="form.customerType.value">
          <el-option v-for="(item, index) in option.customerType" :key="index" :value="item.id" :label="item.customerTypeValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input placeholder="请输入客户名称" v-model="form.customerName.value"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input placeholder="请输入联系人" v-model="form.contacts.value"></el-input>
      </el-form-item>
      <el-form-item label="所在地区">
        <area-cascader @change="handleArea" ref="areaCascader"></area-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import { getOpenSeaList } from '@/api/system/sea'
  import { queryCustomerTypeList } from '@/api/system/customer'
  import { MatchType, DataType } from '@/constant/search'
  import searchTool from '@/utils/searchTool'
  export default {
    name: 'SearchBar',
    components: {
      areaCascader: resolve => {
        return require(['@/components/Area/cascader'], resolve)
      }
    },
    data() {
      return {
        dataOptions: [
          { id: 0, value: '全部' },
          { id: 1, value: '我负责的' },
          { id: 2, value: '我部门负责的' },
          { id: 2, value: '我下属负责的' },
          { id: 2, value: '我联合跟进的' },
          { id: 2, value: '我参与的' }
        ],
        clientOptions: [
          { id: 0, value: '全部' },
          { id: 1, value: '供应商' },
          { id: 1, value: '自营业务商家' },
          { id: 2, value: '自提点商家' }
        ],
        form: {
          'openSea.id': { value: null, name: 'openSea.id', matchType: MatchType.EQUAL, type: DataType.NUMBER },
          customerType: { value: null, name: 'customerTypeId', matchType: MatchType.EQUAL, type: DataType.NUMBER },
          customerName: { value: '', name: 'customerName', matchType: MatchType.CONTAIN, type: DataType.STRING },
          contacts: { value: '', name: 'contacts', matchType: MatchType.CONTAIN, type: DataType.STRING },
          regionId: { value: null, name: 'regionId', matchType: MatchType.EQUAL, type: DataType.NUMBER }
        },
        option: {
          sea: [],
          customerType: []
        }
      }
    },
    created() {
      this.getOpenSeaList()
      this.getCustomerTypeList()
    },
    methods: {
      getOpenSeaList() {
        // 公海列表
        getOpenSeaList().then(res => {
          if (res.code === 200) {
            this.option.sea = res.result
            if (res.result.length) {
              this.form['openSea.id'].value = res.result[0].openSeaId
              this.handleSearch()
            }
          }
        })
      },
      getCustomerTypeList() {
        // 模板分类列表
        queryCustomerTypeList(1).then(res => {
          if (res.code === 200 && res.result.length) {
            this.option.customerType = res.result
            // this.formInfo.templateId = res.result[0].customerTemplateId
          }
        })
      },
      handleReset() {
        this.form = {
          'openSea.id': { value: null, name: 'openSea.id', matchType: MatchType.EQUAL, type: DataType.NUMBER },
          customerType: { value: null, name: 'customerTypeId', matchType: MatchType.EQUAL, type: DataType.NUMBER },
          customerName: { value: '', name: 'customerName', matchType: MatchType.CONTAIN, type: DataType.STRING },
          contacts: { value: '', name: 'contacts', matchType: MatchType.CONTAIN, type: DataType.STRING },
          regionId: { value: null, name: 'regionId', matchType: MatchType.EQUAL, type: DataType.NUMBER }
        }
        this.$refs.areaCascader.clear()
      },
      handleSearch() {
        this.$emit('success', {
          searchs: JSON.stringify(searchTool(this.form))
        })
      },
      handleArea(area) {
        // 区域变化
        if (area.length === 3) {
          this.form.regionId.value = area[2].id
        }
      },
      getForm() {
        return this.form
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
