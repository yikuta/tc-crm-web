<template>
    <div class="record-component">
      <el-row class="padding-bottom">
        <el-col :span="12" class="">跟进记录</el-col>
        <el-col :span="12" class="text-right" v-if="recordLists.currentUserOperationVo">
          <el-button type="success" size="mini" v-np="'FOLLOW_RECORD_NEW'" v-show="recordLists.currentUserOperationVo.permission.value == 2" @click="saleVisible = true">新建</el-button>
        </el-col>
        <!-- <el-col :span="12" class="text-right">
          <el-button type="success" size="mini" v-np="'FOLLOW_RECORD_NEW'" @click="saleVisible = true">新建</el-button>
        </el-col> -->
      </el-row>
      <el-card v-for="(record, index) in recordLists.followRecords" :key="index">
        <div>
          <el-row class="text-df padding-bottom-sm">
            <el-col :span="6" class="text-second">跟进人</el-col>
            <el-col :span="18">
              <el-row>
                <el-col :span="12">{{record.createUser}}</el-col>
                <el-col :span="12" class="text-right">
                  <el-tag size="mini" type="success">{{record.recordType.describe}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="text-df padding-bottom-sm">
            <el-col :span="6" class="text-second">创建时间</el-col>
            <el-col :span="18">{{record.createTime}}</el-col>
          </el-row>
          <el-row class="text-df padding-bottom-sm" v-for="(item, index) in JSON.parse(record.record)" :key="index">
            <!-- <el-col :span="6" class="text-second">{{item.fieldName}}</el-col>
            <el-col :span="18">{{item.value}}</el-col> -->
            <template v-if="item">
              <el-col :span="6" class="text-second">{{item.fieldName}}</el-col>
              <el-col :span="18" v-if="item.apiName === 'RECORD_CONTENT'" v-html="item.value"></el-col>
              <el-col :span="18" v-else>{{item | getObjectFieldValue}}</el-col>
            </template>
          </el-row>
        </div>
        <div class="text-right">
          <el-popover placement="bottom" width="500" trigger="click" popper-class="thread-detail-record">
            <div v-for="(record, index) in record.comments" :key="index" class="border-bottom-seat margin-bottom-sm text-df">
              <div class="padding-bottom-sm">
                <span>{{record.createUser}}</span>
                <span class="padding-left text-second text-sm">{{record.createTime}}</span>
              </div>
              <div class="text-sm padding-bottom-sm">{{record.comment}}</div>
              <div class="" v-if="recordLists.currentUserOperationVo">
                <el-button type="text" size="mini" v-np="'FOLLOW_RECORD_DELETE'" @click="handleDelete(record)" v-show="recordLists.currentUserOperationVo.permission.value == 2">删除</el-button>
              </div>
              <!-- <el-button type="text" size="mini" v-np="'FOLLOW_RECORD_DELETE'" @click="handleDelete(record)">删除</el-button> -->
            </div>
            <el-button :disabled="!record.comments.length" type="text" slot="reference" size="mini">查看回复（{{record.comments.length}}）</el-button>
          </el-popover>
          <div v-if="recordLists.currentUserOperationVo">
            <el-button type="text" size="mini" @click="handleReply(record)" v-show="recordLists.currentUserOperationVo.permission.value == 2">回复</el-button>
          </div>
          <!-- <el-button type="text" size="mini" @click="handleReply(record)">回复</el-button> -->
        </div>
      </el-card>
      <reply-dialog :visible.sync="visible" :recordId="recordId" @on-freshData="onFreshData"></reply-dialog>
      <sale-form :visible.sync="saleVisible" @on-freshData="onFreshData"></sale-form>
    </div>
</template>

<script>
  import { deleteComment } from '@/api/resource/detail'
  import ReplyDialog from './reply'
  import SaleForm from './saleForm'
  export default {
    name: 'StepRecord',
    components: {
      ReplyDialog,
      SaleForm
    },
    props: {
      recordLists: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        recordList: [
          { name: '跟进人' },
          { name: '创建时间' },
          { name: '记录内容' },
          { name: '跟进类型' },
          { name: '定位打卡' },
          { name: '定位打卡时间' },
          { name: '跟进联系人' }
        ],
        visible: false,
        recordId: null,
        saleVisible: false,
        keyValue: []
      }
    },
    methods: {
      handleReply(row) {
        // 回复
        this.recordId = row.recordId
        this.visible = true
      },
      handleDelete(row) {
        // 删除
        this.$confirm('确定要删除这条评论吗？', '提示', {
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          this._deleteComment(row.id)
        })
      },
      onFreshData() {
        this.$emit('on-freshData')
      },
      getText(val) {
        if (Array.isArray(val)) {
          let text = ''
          val.map((item, index) => {
            index > 0 ? text += ',' + item : text += item
          })
          return text
        } else {
          return val
        }
      },
      _deleteComment(data) {
        return deleteComment(data).then((res) => {
          if (res.code === 200) {
            this.$notify.success('删除成功')
            this.$emit('on-freshData')
          }
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
