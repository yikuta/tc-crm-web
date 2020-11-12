<template>
  <div class="search-content">
    <el-form ref="form" :model="form" label-width="100px" size="mini">
      <el-form-item label="标题" prop="title.value">
        <el-input v-model="form.title.value" placeholder="标题" clearable></el-input>
      </el-form-item>
      <el-form-item label="模板状态" prop="templateStatus.value">
        <el-select v-model="form.templateStatus.value">
          <el-option label="全部" value="" />
          <el-option label="启用" :value="true"></el-option>
          <el-option label="禁用" :value="false"></el-option>
          <!-- <el-option v-for="item of templateStatus" :key="item.code" :label="item.name" :value="item.code"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="消息类型" prop="messageType.value">
        <el-select v-model="form.messageType.value" placeholder="请选择" clearable>
          <el-option label="全部" value="" />
          <el-option label="系统通知" value="crm.CrmMessageType_1"></el-option>
          <el-option label="工作通知" value="crm.CrmMessageType_2"></el-option>
          <!-- <el-option v-for="item in messageTypes" :key="item.id" :label="item.value" :value="item.id"></el-option> -->
        </el-select>
      </el-form-item>
    </el-form>
    <div class="search-btn">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { MatchType, DataType } from '@/constant/search'
export default {
  name: 'Search',
  props: {
    hasBusiness: {
      type: Boolean,
      default: () => false
    },
    messageTypes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        title: { value: '', name: 'messageTitle', matchType: MatchType.CONTAIN, type: DataType.STRING },
        messageType: { value: '', name: 'messageType', matchType: MatchType.EQUAL, type: DataType.ENUM },
        templateStatus: { value: '', name: 'enable', matchType: MatchType.EQUAL, type: DataType.STRING }
        // businessType: { value: '', name: 'businessType', matchType: MatchType.EQUAL, type: DataType.STRING }
      },
      templateStatus: [],
      businessTypes: []
    }
  },
  mounted() {
    this.handleInit()
  },
  methods: {
    handleInit() {
      // getMessageTypeList().then(res => {
      //   if (res.code === 200) {
      //     this.messageTypes = res.result || []
      //   }
      // })
    }
  }
}
</script>

<style lang='scss' scoped>
.search-content {
  /deep/ .el-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 25%;
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
