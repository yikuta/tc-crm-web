<template>
  <div class="myMessage">
    <el-tabs v-model="activeName" @tab-click="handleDataList">
      <el-tab-pane label="系统通知" name="SYSTEM_MESSAGE">
        <el-card class="cardItem cursor" v-for="item in dataList" :key="item.messageId">
          <div class="top">
            <span class="title">{{item.messageTitle}}</span>
            <span class="sendTime">{{item.sendTime}}</span>
          </div>
          <div>{{item.messageContent}}<el-button @click="handleClick(item)" type="text">查看详情</el-button></div>
        </el-card>
        <pagination
          :current="currentPage"
          :total="totalCount"
          :pageSize="pageSize"
          @onPageChange="onPageChange"
          @onSizeChange="onSizeChange"
        />
      </el-tab-pane>
      <el-tab-pane label="工作通知" name="WORK_MESSAGE">
        <el-card class="cardItem cursor" v-for="item in dataList" :key="item.messageId">
          <div class="top">
            <span class="title">{{item.messageTitle}}</span>
            <span class="sendTime">{{item.sendTime}}</span>
          </div>
          <div>{{item.messageContent}}<el-button @click="handleClick(item)" type="text">查看详情</el-button></div>
        </el-card>
        <pagination
          :current="currentPage"
          :total="totalCount"
          :pageSize="pageSize"
          @onPageChange="onPageChange"
          @onSizeChange="onSizeChange"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import { MatchType, DataType } from '@/constant/search'
import Pagination from '@/components/Pagination'
import { getMyMessageList } from '@/api/system/message'
export default {
  data() {
    return {
      activeName: 'SYSTEM_MESSAGE',
      currentPage: 1,
      pageSize: 20,
      totalCount: 0,
      dataList: []
    }
  },
  components: {
    Pagination
  },
  mounted() {
    this.handleDataList()
  },
  methods: {
    handleDataList() {
      // const obj = [{
      //   messageType: { value: this.activeName, name: 'messageType', matchType: MatchType.EQUAL, type: DataType.ENUM }
      // }]
      this._getMyMessageList(this.activeName)
    },
    _getMyMessageList(data) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return getMyMessageList({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        orderby: 'createTime',
        sort: 'desc',
        mssageType: data
      }).then((res) => {
        loading.close()
        if (res.code === 200) {
          this.dataList = res.result.itemVOs || []
          this.totalCount = res.result.totalCount
        }
      }).catch(() => {
        loading.close()
      })
    },
    onPageChange(page) {
      this.currentPage = page
      this.handleDataList()
    },
    onSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.handleDataList()
    },
    handleClick(item) {
      this.$router.push(`/message/detail/${item.messageId}`)
    }
  }
}
</script>
<style lang='scss' scoped>
.myMessage {
  /deep/ .cardItem {
    margin-bottom: 20px;
    .top {
      margin-bottom: 12px;
    }
    .title {
      margin-right: 100px;
      font-weight: bold;
    }
    .sendTime {
      color: #ccc;
    }
  }
}
</style>
