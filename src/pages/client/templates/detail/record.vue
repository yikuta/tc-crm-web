<template>
    <div class="record-component">
      <el-row class="padding-bottom-sm margin-bottom-sm border-bottom-seat">
        <el-col :span="12" class="">跟进记录</el-col>
        <el-col :span="12" class="text-right" v-if="[0, 4].includes(auth)">
          <el-button type="success" size="mini" @click="saleVisible = true" v-np="'FOLLOW_RECORD_NEW'">新建</el-button>
        </el-col>
      </el-row>
      <el-card v-for="(item, index) in recordList" :key="index">
        <div>
          <el-row class="text-df padding-bottom-sm">
            <el-col :span="6" class="text-second">跟进人</el-col>
            <el-col :span="18">
              <el-row>
                <el-col :span="12">{{ item.createUser }}</el-col>
                <el-col :span="12" class="text-right" v-if="item.recordType">
                  <el-tag size="mini" type="success">{{ item.recordType && item.recordType.describe }}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="text-df padding-bottom-sm">
            <el-col :span="6" class="text-second">创建时间</el-col>
            <el-col :span="18">{{ item.createTime }}</el-col>
          </el-row>
          <el-row class="text-df padding-bottom-sm" v-for="(item, index) in JSON.parse(item.record)" :key="index">
            <template v-if="item">
              <el-col :span="6" class="text-second">{{item.fieldName}}</el-col>
              <el-col :span="18" v-if="item.apiName === 'RECORD_CONTENT'" v-html="item.value"></el-col>
              <el-col :span="18" v-else>{{item | getObjectFieldValue}}</el-col>
            </template>
          </el-row>
        </div>
        <div class="text-right">
          <el-popover placement="bottom" width="500" trigger="click" popper-class="thread-detail-record">
            <div v-for="(item, index) in item.comments" :key="index" class="border-bottom-seat margin-bottom-sm text-df">
              <div class="padding-bottom-sm">
                <span>{{ item.createUser }}</span>
                <span class="padding-left text-second text-sm">{{ item.createTime }}</span>
              </div>
              <div class="text-sm padding-bottom-sm">{{ item.comment }}</div>
              <div class="">
                <el-button type="text" size="mini" @click="handleDelete(item)" v-np="'FOLLOW_RECORD_DELETE'">删除</el-button>
              </div>
            </div>
            <el-button type="text" slot="reference" size="mini" :disabled="!item.comments.length">查看回复（{{ item.comments.length }}）</el-button>
          </el-popover>
          <el-button type="text" size="mini" @click="handleReply(item)" v-if="[0, 4].includes(auth)">回复</el-button>
        </div>
      </el-card>
      <reply-dialog :visible.sync="visible" :recordId="recordId" @success="getFollowRecord"></reply-dialog>
      <sale-form :visible.sync="saleVisible" :customerId="customerId" @success="getFollowRecord"></sale-form>
    </div>
</template>

<script>
  import ReplyDialog from './reply'
  import SaleForm from './saleForm'
  import { getFollowRecord } from '@/api/customer/compare'
  import { deleteComment } from '@/api/resource/detail'
  export default {
    name: 'StepRecord',
    components: {
      ReplyDialog,
      SaleForm
    },
    props: {
      customerId: {
        type: [Number, String],
        default: 0
      },
      auth: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        recordList: [],
        visible: false, // 回复弹窗
        saleVisible: false, // 新建记录
        recordId: 0 // 记录 id
      }
    },
    created() {
      this.getFollowRecord()
    },
    methods: {
      getFollowRecord() {
        getFollowRecord(this.customerId).then(res => {
          if (res.code === 200) {
            this.recordList = res.result
          }
        })
      },
      handleReply(item) {
        // 回复
        this.recordId = item.recordId
        this.visible = true
      },
      handleDelete(item) {
        // 删除
        this.$confirm('确定要删除这条评论吗？', '提示', {
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          deleteComment(item.id).then(res => {
            if (res.code === 200) {
              this.$notify.success('删除成功')
              this.getFollowRecord()
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss">
.thread-detail-record{
  height:400px;overflow-y: auto;
}
</style>
