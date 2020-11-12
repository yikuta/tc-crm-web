<template>
  <div class="page-container">
      <search-form>
        <template slot="form">
          <el-form-item label="角色名称">
            <el-input v-model="form.name" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item label="角色状态">
            <el-select v-model="form.enable" placeholder="请选择角色状态">
              <el-option label="全部" value="" />
              <el-option v-for="(item, index) in options" :label="item.value" :value="item.id" :key="index" />
            </el-select>
          </el-form-item>
          <el-form-item label="角色名称">
            <el-input v-model="form.name" placeholder="请输入角色名称" />
          </el-form-item>
        </template>
      </search-form>
      供应商管理列表
  </div>
</template>
<script>
  import SearchForm from './templates/SearchForm'
  export default {
    name: 'SupplierList',
    components: { SearchForm },
    data() {
      return {
        form: {
          name: '',
          enable: ''
        },
        options: [
          { id: 1, value: '启用' },
          { id: 0, value: '停用' }
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
