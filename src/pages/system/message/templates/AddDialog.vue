<template>
  <div class="app-container">
    <el-dialog :title="this.id ? '编辑模板':'新建模板'" :visible="visible" @update:visible="onChange" width="960px">
      <el-form class="form" ref="form" :model="form" :rules="rules" size="mini">
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="8">
                <el-form-item label="消息类型" prop="crmMessageType" label-width="90px">
                  <el-select v-model="form.crmMessageType" clearable @change="handleChangeMessage" :disabled="this.id ? true : false">
                    <el-option label="未选择" value=""></el-option>
                    <el-option v-for="item of messageTypes" :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="form.crmMessageType">
                <el-form-item :label="`模版编号 ${templateCodeType}`" prop="messegeTemplateNum" label-width="120px">
                  <el-input
                    v-model="form.messegeTemplateNum"
                    placeholder="模板编号 不填写则使用自增"
                    clearable
                    :disabled="this.id ? true : false"
                    />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-form-item label="消息标题" prop="messageTitle" label-width="90px">
              <el-input v-model="form.messageTitle" placeholder="消息标题" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-row>
              <el-col :span="8">
                <el-form-item label="站内信前缀" prop="messagePre" label-width="90px">
                  <el-input v-model="form.messagePre" placeholder="例：天呈生活CRM" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="" label-width="10px">
                  <span>例：【天呈食材CRM】小小酥回复了你的跟进记录</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <el-form-item label="消息内容" prop="messageContent" label-width="90px">
              <el-input type="textarea" v-model="form.messageContent" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="tip">
        <p class="head">注意：</p>
        <ul>
          <li>1、最多支持5个参数；</li>
          <li>
            <p style="margin-bottom:10px">2、参数填写方式：</p>
            <p>消息内容：变更<span style="color:#66B1FF">客户李里里</span>的负责人为<span style="color:#66B1FF">小小酥</span>，操作人：<span style="color:#66B1FF">张经理</span>；</p>
            <p style="margin-bottom:10px">模板中应填写的消息内容：变更｛0｝{1}的负责人为{2}，操作人：{3}；</p>
            <p>参数值占位符：｛0｝，｛1｝，｛2｝，｛3｝｛4｝，填写其他无效</p>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="plain" size="mini" @click="onChange(false)">取消</el-button>
        <el-button type="primary" size="mini" @click="handleSave" :loading="loading">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { asyncMessageTemplateSave, asyncMessageTemplateUpdate, getMessageTemplateDetail, asyncMessageTemplateValidate } from '@/api/system/message'
  export default {
    name: 'AddDialog',
    props: {
      visible: Boolean,
      id: {
        type: Number,
        default: () => 0
      },
      templateStatus: {
        type: String,
        default: () => 'MESSAGE_TEMPLATE_STATUS_ON'
      },
      messageTypes: {
        type: Array,
        default: () => []
      }
    },
    data() {
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          callback()
        } else {
          const reg = /^[0-9]{0,4}$/g
          if (reg.test(value)) {
            callback()
          } else {
            callback('请输入4个字符以内的数字')
          }
        }
      }
      return {
        form: {
          id: '',
          crmMessageType: '', // 消息类型
          messegeTemplateNum: '', // 模板编号
          messageTitle: '', // 标题
          messagePre: '', // 前缀
          messageContent: '' // 内容
        },
        loading: false,
        rules: {
          crmMessageType: [{ required: true, message: '请选择消息类型', trigger: 'change' }],
          messegeTemplateNum: [
            { validator: validateCode, trigger: 'blur' }
          ],
          messagePre: [
            { max: 6, message: '请输入6位以内（包含）字符作为短信前缀', trigger: 'blur' }
          ],
          messageTitle: [
            { required: true, message: '请输入消息标题', trigger: 'blur' },
            { max: 20, message: '请输入1-20个字符作为消息标题', trigger: 'blur' }
          ],
          messageContent: [
            { required: true, message: '请输入消息内容', trigger: 'blur' },
            { max: 200, message: '请输入1-200位字符作为消息内容', trigger: 'blur' }
          ]
        },
        // messageTypes: [],
        templateCodeType: 'XT',
        codeValidate: true
      }
    },
    created() {
      this.handleInit()
    },
    watch: {
      visible(newVal) {
        if (newVal) {
          if (this.id) {
            this.form.id = this.id
            this.handleDetail()
          }
        }
      }
    },
    methods: {
      handleInit() {
        // getMessageTypeList().then(res => {
        //   if (res.code === 200) {
        //     this.messageTypes = res.result || []
        //   }
        // })
      },
      handleDetail() {
        getMessageTemplateDetail(this.id).then(res => {
          if (res.code === 200) {
            let messageType = ''
            this.messageTypes.map((item) => {
              if (item.value === res.result.messageType) {
                messageType = item.id
              }
            })
            this.form = {
              id: res.result.messageTemplateId,
              crmMessageType: messageType, // 消息类型
              messegeTemplateNum: res.result.templateNum.slice(2), // 模板编号
              messageTitle: res.result.messageTemplateTitle, // 标题
              messagePre: res.result.messageTemplatePre, // 前缀
              messageContent: res.result.messageContent // 内容
            }
            console.log(this.form)
          }
        })
      },
      // 保存
      handleSave() {
        this.$refs.form.validate(isSuccess => {
          if (isSuccess) {
            if (!this.codeValidate) {
              this.$message.error('模版编号已被其他模版使用')
              return
            }
            const { id, crmMessageType, messageTitle, messagePre, messageContent, messegeTemplateNum } = this.form
            this.loading = true
            if (id) {
              // 编辑
              asyncMessageTemplateUpdate({
                messageTemplateId: id,
                crmMessageType,
                messageTitle,
                messagePre,
                messageContent,
                // templateStatus: this.templateStatus,
                messegeTemplateNum: messegeTemplateNum ? this.templateCodeType + messegeTemplateNum : null,
                templateType: 'IM'
              }).then(res => {
                this.loading = false
                if (res.code === 200) {
                  this.$message.success('保存成功')
                  this.onChange(false)
                  this.$emit('update')
                }
              }).catch(() => {
                this.loading = false
              })
            } else {
              // 新建
              asyncMessageTemplateSave({
                // id,
                crmMessageType,
                messageTitle,
                messagePre,
                messageContent,
                // templateStatus: this.templateStatus,
                messegeTemplateNum: messegeTemplateNum ? this.templateCodeType + messegeTemplateNum : null,
                templateType: 'IM'
              }).then(res => {
                this.loading = false
                if (res.code === 200) {
                  this.$message.success('保存成功')
                  this.onChange(false)
                  this.$emit('update')
                }
              }).catch(() => {
                this.loading = false
              })
            }
          }
        })
      },
      onChange(visible) {
        if (!visible) {
          this.$refs.form.resetFields()
          this.form.messegeTemplateNum = ''
        }
        this.$emit('update:visible', visible)
      },
      handleChangeMessage(val) {
        // const arr = this.messageTypes.filter(item => item.code === val)
        // if (arr && arr.length) {
        //   this.templateCodeType = arr[0].value || ''
        // } else {
        //   this.templateCodeType = ''
        // }
      },
      handleBlurCode() {
        asyncMessageTemplateValidate({
          messegeTemplateNum: this.templateCodeType + this.form.messegeTemplateNum,
          templateType: 'SM',
          crmMessageType: this.form.crmMessageType
        }).then(res => {
          if (res.code === 200) {
            this.codeValidate = true
          } else {
            this.codeValidate = false
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
.tip{
  color: #AAAAAA;
  font-size: 12px;
  p{
    margin: 0;
    padding: 0;
  }
  .head{
    margin-left: 25px;
  }
  ul{
    padding-left: 25px;
    li{
      list-style: none;
      margin-top: 10px;
    }
  }
}
</style>
