<template>
  <dialog-modal :title="!!formInfo.id ? '编辑字段' : '新建字段'" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose
                @success="handleSubmit">
    <el-row class="component-form">
      <el-col :span="4" v-if="!formInfo.id || !form.fieldId">
        <div class="select-btn" v-for="(item, index) in modelOption" :key="index" :title="item.remark"
             @click="handleChangeSelect(item)" :class="{'active': typeSelect.id === item.id}" v-if="item.enable">{{ item.name }}
        </div>
      </el-col>
      <el-col :span="20">
        <div class="margin-bottom-sm">
          <div class="text-df">{{ typeSelect.name }}</div>
          <div class="text-sm text-seat">{{ typeSelect.remark }}</div>
        </div>
        <el-form :model="formInfo" :rules="rules" size="mini" label-width="150px" ref="form">
          <el-form-item label="字段名称" prop="fieldName">
            <el-input placeholder="请输入字段名称" v-model="formInfo.fieldName"></el-input>
          </el-form-item>
          <el-form-item prop="apiName">
            <template slot="label">
              API Name
              <el-popover placement="bottom-start" width="200" trigger="hover">
                <template>
                  <div class="text-sm">
                    <p>命名规则</p>
                    <p>API Name主要提供给开发人员使用，如无需要，建议不要修改</p>
                    <p>1. 只允许英文字母开头</p>
                    <p>2. 中间允许使用英文字母，数字，下划线</p>
                    <p>3. 如果是自定义对象，必须以 __c 结尾</p>
                    <p>4. 除结尾的 __c 外下划线不允许连续出现</p>
                    <p>5. 不能超过200个字符</p>
                  </div>
                </template>
                <span slot="reference"><i class="el-icon-question cursor"></i></span>
              </el-popover>
            </template>
            <el-input placeholder="请输入 API Name" v-model="formInfo.apiName" :disabled="!!formInfo.id" :maxLength="200"></el-input>
          </el-form-item>
          <el-form-item label="提示信息">
            <el-input placeholder="请输入提示信息" v-model="formInfo.tipsMessage"></el-input>
          </el-form-item>
          <el-form-item label="是否允许重复" prop="allowRepetition">
            <el-radio-group v-model="formInfo.allowRepetition" :disabled="!!formInfo.id">
              <el-radio :label="true">允许重复</el-radio>
              <el-radio :label="false">不允许重复</el-radio>
            </el-radio-group>
            <div class="text-sm text-seat">该属性保存后不支持编辑</div>
          </el-form-item>
          <!-- start 多行文本 -->
          <el-form-item label="最大字符数" v-if="typeSelect.id === 2" required :error="defaultSetErrorMessage.maxWord">
            <el-input placeholder="请输入最大字符数" v-model="defaultSet.maxWord"></el-input>
          </el-form-item>
          <!-- end -->
          <!-- start 单选 -->
          <el-form-item label="选项值设置" v-if="typeSelect.id === 3" required :error="defaultSetErrorMessage.singleChoice">
            <el-row v-for="(item, index) in defaultSet.singleChoice" :key="index" class="margin-bottom-sm">
              <el-col :span="12">
                <el-input placeholder="请输入选项值" v-model="item.value" :disabled="!item.enable"></el-input>
              </el-col>
              <el-col :span="12" class="padding-left-sm">
                <el-button type="primary" size="mini" icon="el-icon-plus" circle @click="handleChoiceAdd('singleChoice')" v-if="defaultSet.singleChoice.length - 1 === index"></el-button>
                <el-button type="danger" size="mini" icon="el-icon-minus" circle @click="handleChoiceDelete('singleChoice', index)" v-if="defaultSet.singleChoice.length > 1"></el-button>
                <el-button type="text" @click="handleChoiceDefault('singleChoice', index)" :disabled="item.default">{{ item.default ? '默认' : '设为默认' }}</el-button>
                <el-tag class="cursor" @click="handleChoiceEnable('singleChoice', index)" :type="item.enable ? 'success' : 'danger'" size="mini">{{ item.enable ? '启用' : '禁用' }}</el-tag>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- end -->
          <!-- start 多选 -->
          <el-form-item label="选项值设置" v-if="typeSelect.id === 4" required :error="defaultSetErrorMessage.multipleChoice">
            <el-row v-for="(item, index) in defaultSet.multipleChoice" :key="index" class="margin-bottom-sm">
              <el-col :span="12">
                <el-input placeholder="请输入选项值" v-model="item.value" :disabled="!item.enable"></el-input>
              </el-col>
              <el-col :span="12" class="padding-left-sm">
                <el-button type="primary" size="mini" icon="el-icon-plus" circle @click="handleChoiceAdd('multipleChoice')" v-if="defaultSet.multipleChoice.length - 1 === index"></el-button>
                <el-button type="danger" size="mini" icon="el-icon-minus" circle @click="handleChoiceDelete('multipleChoice', index)" v-if="defaultSet.multipleChoice.length > 1"></el-button>
                <el-button type="text" @click="handleChoiceDefault('multipleChoice', index)" :disabled="item.default">{{ item.default ? '默认' : '设为默认' }}</el-button>
                <el-tag class="cursor" @click="handleChoiceEnable('multipleChoice', index)" :type="item.enable ? 'success' : 'danger'" size="mini">{{ item.enable ? '启用' : '禁用' }}</el-tag>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- end -->
          <!-- start 数字 -->
          <template  v-if="typeSelect.id === 5">
            <el-form-item label="允许最大整数位数" required :error="defaultSetErrorMessage.number.integer">
              <el-select placeholder="请选择允许最大的整数位数" v-model="defaultSet.integer">
                <el-option v-for="(item, index) in 20" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="小数位数" required :error="defaultSetErrorMessage.number.decimal">
              <el-select placeholder="请输入允许最大小数位数" v-model="defaultSet.decimal">
                <el-option v-for="(item, index) in 20" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </template>
          <!-- end -->
          <!-- start 布尔值 -->
          <el-form-item label="选项值设置" v-if="typeSelect.id === 10" required :error="defaultSetErrorMessage.boolean">
            <el-row v-for="(item, index) in defaultSet.boolean" :key="index" class="padding-bottom-sm">
              <el-col :span="12">
                <el-input placeholder="请输入选项值" v-model="item.value"></el-input>
              </el-col>
              <el-col :span="12" class="padding-left-sm">
                <el-button type="text" @click="handleChoiceDefault('boolean', index)" :disabled="item.default">{{ item.default ? '默认' : '设为默认' }}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- end -->
          <!-- start --><!-- end -->
        </el-form>
      </el-col>
    </el-row>
  </dialog-modal>
</template>

<script>
  /*
  * fieldTypeDtoList
  * enable (boolean, optional): 是否启用 true启用 false禁用
  * fieldType (string, optional): 字段类型名
  * fieldTypeConditionValue (string, optional): 字段类型值
  * isDefault (boolean, optional): 是否为默认值
  * */
  import DialogModal from '@/components/Dialog/index.vue'
  import { ObjectTypeOption } from '@/utils/filters'
  import { saveOpenObject, updateOpenObject, getOpenObjectDetail } from '@/api/system/object'
  export default {
    name: 'RoleForm',
    components: {
      DialogModal
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      form: {
        type: Object,
        default: () => {
          return {}
        }
      },
      tab: {
        type: String,
        default: 'CUSTOMER'
      }
    },
    data() {
      return {
        dialogVisible: false,
        formInfo: {
          creatorId: this.$store.getters.userInfo.userId, // 创建者 id
          fieldName: '', // 字段名称
          apiName: '', // api name
          enable: true, // 是否启用
          tipsMessage: '', // 提示信息
          allowRepetition: false, // 是否允许重复
          fieldType: 'Single_LineText', // 字段类型 ['Single_LineText', 'Multiline_Text', 'Single_Choice', 'Multiple_Choice', 'Number', 'Phone', 'DATE', 'TIME', 'DATE_TIME', 'BOOLEAN', 'PERCENTTAGE']
          objectFieldType: 'CUSTOMER', // ['CUSTOMER', 'FOLLOW']
          fieldTypeDtoList: [] // 自定义的对象集
        },
        rules: {
          fieldName: [
            { required: true, message: '请输入字段名称', trigger: 'blur' }
          ],
          apiName: [
            { required: true, message: '请输入API Name', trigger: 'blur' },
            { pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '中间允许使用英文字母、数字、下划线且只允许英文字母开头', trigger: 'blur' }
          ],
          allowRepetition: [
            { required: true, message: '当前选项必选一个', trigger: 'blur' }
          ]
        },
        typeSelect: { id: 1, name: '单行文本', component: 'text', type: 'Single_LineText', ref: 'textModel', remark: '适用于填写简单的文字，如：姓名', enable: true },
        modelOption: ObjectTypeOption,
        defaultSet: {
          maxWord: 10, // 最大字符数
          singleChoice: [ // 单选
            {
              value: '',
              default: true,
              enable: true
            }
          ],
          multipleChoice: [ // 多选
            {
              value: '',
              default: true,
              enable: true
            }
          ],
          number: { // 数字
            integer: 1, // 允许最大整数
            decimal: 1 // 小数位数
          },
          boolean: [ // 布尔值
            {
              value: '',
              default: true
            },
            {
              value: '',
              default: false
            }
          ]
        },
        defaultSetErrorMessage: { // 自定义验证器
          maxWord: '',
          singleChoice: '',
          multipleChoice: '',
          number: {
            integer: '',
            decimal: ''
          },
          boolean: ''
        }
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        if (n) {
          this.reset()
          this.dealForm()
        }
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      handleSubmit(done) {
        // 保存
        this.$refs.form.validate(result => {
          if (result) {
            // 对数据中额外的数据进行处理 2 3 4 5 10
            // 针对每个进行提示比较麻烦，所以暂时不做
            // 先对数据进行置空
            this.formInfo.fieldTypeDtoList = ''
            let defaultSet = []
            let repeatValue = [] // 验重
            if (this.typeSelect.id === 2) {
              // 多行
              if (!this.defaultSet.maxWord) {
                this.$message.error('最大字符数不能为空或0！')
                return
              } else {
                defaultSet = [
                  {
                    enable: true,
                    fieldType: this.typeSelect.type,
                    fieldTypeConditionValue: this.defaultSet.maxWord,
                    isDefault: true
                  }
                ]
              }
            }
            if (this.typeSelect.id === 3) {
              // 单选
              this.defaultSet.singleChoice.forEach((value, index) => {
                if (!value.value) {
                  this.$message.error('请填写或删除选项中为空的项！')
                  throw Error('请填写或删除选项中为空的项！')
                }
              })
              // 没有抛出错误就证明没毛病
              this.defaultSet.singleChoice.forEach(value => {
                if (repeatValue.includes(value.value)) {
                  // 如果有值了就抛出错误
                  this.$message.error(`${value.value}重复，请修改后再提交`)
                  throw Error(`${value.value}重复，请修改后再提交`)
                } else {
                  repeatValue.push(value.value)
                }
                defaultSet.push({
                  fieldType: this.typeSelect.type,
                  fieldTypeConditionValue: value.value,
                  isDefault: value.default,
                  enable: value.enable,
                  id: value.id || ''
                })
              })
            }
            if (this.typeSelect.id === 4) {
              // 多选
              this.defaultSet.multipleChoice.forEach((value, index) => {
                if (!value.value) {
                  this.$message.error('请填写或删除选项中为空的项！')
                  throw Error('请填写或删除选项中为空的项！')
                }
              })
              // 没有抛出错误就证明没毛病
              this.defaultSet.multipleChoice.forEach(value => {
                if (repeatValue.includes(value.value)) {
                  // 如果有值了就抛出错误
                  this.$message.error(`${value.value}重复，请修改后再提交`)
                  throw Error(`${value.value}重复，请修改后再提交`)
                } else {
                  repeatValue.push(value.value)
                }
                defaultSet.push({
                  fieldType: this.typeSelect.type,
                  fieldTypeConditionValue: value.value,
                  isDefault: value.default,
                  enable: value.enable,
                  id: value.id || ''
                })
              })
            }
            if (this.typeSelect.id === 5) {
              // 数字
              defaultSet.push({
                fieldType: this.typeSelect.type,
                fieldTypeConditionValue: this.defaultSet.number.integer,
                isDefault: true,
                enable: true
              })
              defaultSet.push({
                fieldType: this.typeSelect.type,
                fieldTypeConditionValue: this.defaultSet.number.decimal,
                isDefault: true,
                enable: true
              })
            }
            if (this.typeSelect.id === 10) {
              // 布尔值
              this.defaultSet.boolean.forEach((value, index) => {
                if (!value.value) {
                  this.$message.error('请填写或删除选项中为空的项！')
                  throw Error('请填写或删除选项中为空的项！')
                }
              })
              // 没有抛出错误就证明没毛病
              this.defaultSet.boolean.forEach(value => {
                if (repeatValue.includes(value.value)) {
                  // 如果有值了就抛出错误
                  this.$message.error(`${value.value}重复，请修改后再提交`)
                  throw Error(`${value.value}重复，请修改后再提交`)
                } else {
                  repeatValue.push(value.value)
                }
                defaultSet.push({
                  fieldType: this.typeSelect.type,
                  fieldTypeConditionValue: value.value,
                  isDefault: true,
                  enable: true
                })
              })
            }
            this.formInfo.fieldTypeDtoList = defaultSet
            const fn = this.formInfo.id ? updateOpenObject : saveOpenObject
            fn(this.formInfo).then(res => {
              this.$notify.success('保存成功')
              this.$emit('change')
              this.$emit('update:visible', false)
            })
          }
        })
      },
      dealForm() {
        // 处理表单数据
        if (this.form) {
          getOpenObjectDetail(this.form.fieldId).then(res => {
            this.formInfo = {
              id: res.result.fieldId, // 字段 id
              objectFieldType: this.tab,
              creatorId: res.result.creatorId, // 创建者 id
              fieldName: res.result.fieldName, // 字段名称
              apiName: res.result.apiName, // api name
              enable: res.result.enable, // 是否启用
              tipsMessage: res.result.tipsMessage, // 提示信息
              allowRepetition: res.result.allowRepetition, // 是否允许重复
              fieldType: res.result.fieldType, // 字段类型 ['Single_LineText', 'Multiline_Text', 'Single_Choice', 'Multiple_Choice', 'Number', 'Phone', 'DATE', 'TIME', 'DATE_TIME', 'BOOLEAN', 'PERCENTTAGE']
              fieldTypeDtoList: [] // 自定义的对象集
            }
            // 处理当前选中的项中额外的数据
            if (res.result.fieldTypeCondition) {
              const condition = JSON.parse(res.result.fieldTypeCondition)
              if (res.result.fieldType === 'Multiline_Text') {
                // 多行文本处理
                this.defaultSet.maxWord = condition[0].fieldTypeConditionValue
              }
              if (res.result.fieldType === 'Single_Choice') {
                // 单选
                if (this.defaultSet.singleChoice.length) {
                  this.defaultSet.singleChoice = []
                }
                // 处理脏数据
                if (!condition.length) {
                  this.defaultSet.singleChoice.push({
                    value: '',
                    default: false,
                    enable: true
                  })
                }
                condition.forEach(value => {
                  this.defaultSet.singleChoice.push({
                    value: value.fieldTypeConditionValue,
                    default: value.isDefault,
                    enable: value.enable,
                    id: value.id
                  })
                })
              }
              if (res.result.fieldType === 'Multiple_Choice') {
                // 多选
                if (this.defaultSet.multipleChoice.length) {
                  this.defaultSet.multipleChoice = []
                }
                // 处理脏数据
                if (!condition.length) {
                  this.defaultSet.multipleChoice.push({
                    value: '',
                    default: false,
                    enable: true
                  })
                }
                condition.forEach(value => {
                  this.defaultSet.multipleChoice.push({
                    value: value.fieldTypeConditionValue,
                    default: value.isDefault,
                    enable: value.enable,
                    id: value.id
                  })
                })
              }
              if (res.result.fieldType === 'Number') {
                // 数字
                this.defaultSet.number.integer = condition[0].fieldTypeConditionValue
                this.defaultSet.number.decimal = condition[1].fieldTypeConditionValue
              }
              if (res.result.fieldType === 'BOOLEAN') {
                // 布尔
                if (this.defaultSet.boolean.length) {
                  this.defaultSet.boolean = []
                }
                condition.forEach(value => {
                  this.defaultSet.boolean.push({
                    value: value.fieldTypeConditionValue,
                    default: value.isDefault
                  })
                })
              }
            }
            // 处理默认选中的侧边栏选项
            this.modelOption.forEach(value => {
              if (value.type === res.result.fieldType) {
                this.typeSelect = value
              }
            })
          })
        } else {
          this.reset()
        }
      },
      handleChangeSelect(item) {
        // 处理字段类型
        this.formInfo.fieldType = item.type
        this.typeSelect = item
      },
      handleChoiceAdd(name) {
        // 单选或多选添加按钮
        this.defaultSet[name].push({
          value: '',
          default: false,
          enable: true
        })
      },
      handleChoiceDefault(name, index) {
        // 设置默认
        // 判断当前选项是否被禁用
        if (!this.defaultSet[name][index].enable) {
          this.$message.error('当前选项已被禁用，禁止设置为默认项')
          return
        }
        this.defaultSet[name].forEach((value, j) => {
          value.default = index === j
        })
      },
      handleChoiceEnable(name, index) {
        // 设置启用禁用
        // 如果是禁用，则验证是否还有未禁用的选项
        if (this.defaultSet[name][index].enable) {
          // 验证是否只有一个选项
          if (this.defaultSet[name].length === 1) {
            this.$message.error('请最少保持一个选项值为启用状态')
            return
          }
          // 验证是否是默认项
          if (this.defaultSet[name][index].default) {
            this.$message.error('当前选项为默认项，禁止设置为禁用')
            return
          }
          // 验证如果是否全部都被设置成了默认
          let num = 0
          this.defaultSet[name].forEach(item => {
            if (!item.enable) ++num
          })
          if (num === this.defaultSet[name].length - 1) {
            // 如果除了当前全部都被禁用
            this.$message.error('请最少保持一个选项值为启用状态')
            return
          }
        }
        this.defaultSet[name][index].enable = !this.defaultSet[name][index].enable
      },
      handleChoiceDelete(name, index) {
        // 单选或者多选删除按钮
        // 只有一个不允许删除
        if (this.defaultSet[name].length === 1) {
          this.$message.error('请最少保持一个选项值')
          return
        }
        // 禁止删除默认项
        if (this.defaultSet[name][index].default) {
          this.$message.error('当前选项为默认项， 禁止删除')
          return
        }
        this.defaultSet[name].splice(index, 1)
      },
      reset() {
        this.formInfo = {
          creatorId: this.$store.getters.userInfo.userId, // 创建者 id
          fieldName: '', // 字段名称
          apiName: '', // api name
          enable: true, // 是否启用
          tipsMessage: '', // 提示信息
          allowRepetition: false, // 是否允许重复
          fieldType: 'Single_LineText', // 字段类型 ['Single_LineText', 'Multiline_Text', 'Single_Choice', 'Multiple_Choice', 'Number', 'Phone', 'DATE', 'TIME', 'DATE_TIME', 'BOOLEAN', 'PERCENTTAGE']
          objectFieldType: this.tab, // ['CUSTOMER', 'FOLLOW']
          fieldTypeDtoList: [] // 自定义的对象集
        }
        this.defaultSet = {
          maxWord: 10, // 最大字符数
          singleChoice: [ // 单选
            {
              value: '',
              default: true,
              enable: true
            }
          ],
          multipleChoice: [ // 多选
            {
              value: '',
              default: true,
              enable: true
            }
          ],
          number: { // 数字
            integer: 1, // 允许最大整数
            decimal: 1 // 小数位数
          },
          boolean: [ // 布尔值
            {
              value: '',
              default: true
            },
            {
              value: '',
              default: false
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  .component-form {
    .select-btn {
      padding: 5px 0;
      cursor: pointer;
      text-align: center;
      margin-right: 10px;

      &.active {
        background: $colorBrand;
        color: #fff;
        border-radius:5px;
      }
    }
  }
</style>
