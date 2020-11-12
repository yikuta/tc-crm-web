<template>
  <div class="wrapper">
    <el-table
      :data="tableData"
      style="width: 100%"
      :cell-style="{ textAlign:'center' }"
      :header-cell-style="{ textAlign:'center' }"
      size="mini"
      v-loading='loading'>
      <el-table-column label="消息模版编号" prop="templateNum" width="120"/>
      <el-table-column label="消息类型" prop="messageType" />
      <!-- <el-table-column label="业务判别" prop="businessTypeDesc" v-if="hasBusiness"/> -->
      <el-table-column label="消息标题" prop="messageTemplateTitle" />
      <!-- <el-table-column label="试听" prop="audio" v-if="isAudio">
        <template v-slot:default="{row}"><a class="listen" :href="row.content" target="_blank">试听</a></template>
      </el-table-column> -->
      <el-table-column label="消息内容" prop="messageContent" />
      <el-table-column prop="templateStatusDesc" label="状态" width="100">
        <template v-slot:default="{row}">
          <div>
            {{ row.status ? '启用' : '停用' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="creatorName"/>
      <el-table-column prop="createTime" label="创建时间" width="100"/>
      <el-table-column label="操作" width="220">
        <template v-slot:default="{row}">
          <el-button type="text" size="mini" @click="handleMessage(row)">查看消息</el-button>
          <el-button type="text" size="mini" @click="handleEdit(row)">编辑</el-button>
          <!-- <el-button type="text" size="mini" @click="handleCreate(row)" v-if="row.templateStatus === 'MESSAGE_TEMPLATE_STATUS_ON' && !isAudio">快速创建</el-button> -->
          <el-button type="text" size="mini" @click="handleStatusBtn(row)">{{row.status ? '停用' : '启用'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { asyncMessageTemplatesStatus } from '@/api/system/message'
  export default {
    name: 'TableArea',
    props: {
      tableData: { type: Array, default: () => [] },
      hasBusiness: {
        type: Boolean,
        default: () => false
      },
      isAudio: {
        type: Boolean,
        default: () => false
      }
    },
    data() {
      return {
        currentRow: {},
        loading: false
      }
    },
    methods: {
      // 启用/停用
      handleStatusBtn(row) {
        if (row.status) {
          this.$confirm('停用后将无法使用该模板发送站内信（非已创建的消息队列），确定停用吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false
          }).then(() => {
            asyncMessageTemplatesStatus(row.messageTemplateId).then(res => {
              if (res.code === 200) {
                this.$message.success('操作成功')
                this.$emit('onRrefresh')
              }
            })
          })
        } else {
          asyncMessageTemplatesStatus(row.messageTemplateId).then(res => {
            if (res.code === 200) {
              this.$message.success('操作成功')
              this.$emit('onRrefresh')
            }
          })
        }
      },
      handleCreate(row) {
        this.$router.push({
          path: 'messageAdd',
          query: { id: row.id, type: row.templateType }
        })
      },
      handleEdit(row) {
        this.$emit('onEdit', row)
      },
      // 查看消息
      handleMessage(row) {
        this.$router.push({ path: 'messageList', query: { messageTemplateId: row.messageTemplateId } })
      }
    }
  }
</script>

<style lang='scss' scoped>
.wrapper {
  margin: 0;
  .package-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .listen{
    color: #409EFF;
    cursor: pointer;
  }
}
</style>
