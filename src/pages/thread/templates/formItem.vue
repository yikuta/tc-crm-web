<template>
  <div>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'Single_LineText'">
      <el-input type="text" :placeholder="'填写' + formItem.fieldName" v-model="form.text" @change="valChange"></el-input>
    </el-form-item>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'Multiline_Text'">
      <el-input type="textarea" :placeholder="'填写' + formItem.fieldName" v-model="form.text" @change="valChange"></el-input>
    </el-form-item>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'Single_Choice'">
      <el-input type="textarea" :placeholder="'填写' + formItem.fieldName" v-model="form.singleChoise" @change="valChange"></el-input>
    </el-form-item>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'Multiple_Choice'">
      <el-checkbox-group v-model="form.checkbox" @change="valChange">
        <el-checkbox v-for="(field, index) in JSON.parse(formItem.fieldTypeCondition)" :key="index" :label="field.fieldTypeConditionValue">{{field.fieldTypeConditionValue}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'Number'">
      <el-input type="text" :placeholder="'填写' + formItem.fieldName" v-model="form.num" @change="valChange"></el-input>
    </el-form-item>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'Phone'">
      <el-input type="text" :placeholder="'填写' + formItem.fieldName" v-model="form.phone" @change="valChange"></el-input>
    </el-form-item>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'DATE'">
      <el-date-picker
        type="date"
        @change="valChange"
        v-model="form.date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'TIME'">
      <el-time-select placeholder="选择时间" v-model="form.time" @change="valChange"></el-time-select>
    </el-form-item>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'DATE_TIME'">
      <el-date-picker
        type="datetime"
        @change="valChange"
        v-model="form.dateTime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'BOOLEAN'">
      <el-checkbox :label="JSON.parse(formItem.fieldTypeCondition).fieldTypeConditionValue" v-model="form.bool" @change="valChange">{{JSON.parse(formItem.fieldTypeCondition).fieldTypeConditionValue}}</el-checkbox>
    </el-form-item>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'PERCENTTAGE'">
      <el-input type="text" :placeholder="'填写' + formItem.fieldName" v-model="form.percenttage" @change="valChange"></el-input>%
    </el-form-item>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'IMAGE'">
      <el-upload class="upload" action="upload" :http-request="_reqUpload" :show-file-list="false" :before-upload="beforePicUpload">
        <img v-if="form.image" :src="form.image" class="cover" />
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'AREA'">
      <el-cascader v-model="form.area" :options="areaOptions" :props="optionsProps" @change="valChange"></el-cascader>
    </el-form-item>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'LOCATION'">
      <el-input type="text" :placeholder="'填写' + formItem.fieldName" v-model="form.location" @change="valChange"></el-input>
    </el-form-item>
    <el-form-item :label="formItem.fieldName" v-if="formItem.fieldType == 'RICH_TEST'">
      <el-input type="text" :placeholder="'填写' + formItem.fieldName" v-model="form.richText" @change="valChange"></el-input>
      <!-- <u-editor v-model="form.richText" :config="editorConfig"></u-editor> -->
    </el-form-item>
  </div>
</template>
<script>
import { queryArea, uploadFile } from '@/api/resource/menu'
// import UEditor from '@/components/UEditor/index'
export default {
  name: 'fieldItem',
  components: {
    // UEditor
  },
  model: {
    prop: 'fieldItem',
    event: 'on-changed'
  },
  props: {
    formItem: {
      type: Object,
      default: () => {}
    },
    fieldItem: {}
  },
  data() {
    return {
      areaOptions: [],
      optionsProps: {
        // checkStrictly: true,
        value: 'id',
        label: 'name',
        children: 'childrenList'
      },
      form: {
        text: '',
        singleChoise: '',
        checkbox: [],
        num: null,
        phone: '',
        date: '',
        time: '',
        dateTime: '',
        bool: null,
        percenttage: '',
        image: '',
        area: [],
        location: '',
        richText: ''
      },
      editorConfig: {
        initialFrameWidth: 500, // 初始化编辑器宽度,默认1000
        initialFrameHeight: 320 // 初始化编辑器高度,默认320
      },
      fieldType: [
        { type: 'Single_LineText', name: '单行文本' },
        { type: 'Multiline_Text', name: '多行文本' },
        { type: 'Single_Choice', name: '单选' },
        { type: 'Multiple_Choice', name: '多选' },
        { type: 'Number', name: '数字' },
        { type: 'Phone', name: '手机号' },
        { type: 'DATE', name: '日期' },
        { type: 'TIME', name: '时间' },
        { type: 'DATE_TIME', name: '日期时间' },
        { type: 'BOOLEAN', name: '布尔值' },
        { type: 'PERCENTTAGE', name: '百分数' },
        { type: 'IMAGE', name: '图片' },
        { type: 'AREA', name: '地区' },
        { type: 'LOCATION', name: '定位' },
        { type: 'RICH_TEST', name: '富文本' }
      ]
    }
  },
  methods: {
    valChange(val) {
      this.$emit('on-val-change', this.formItem.fieldName, val)
    },
    async beforePicUpload(file) {
      // console.log('beforePicUpload')
      if (!/(jpeg|jpg|JPEG|JPG|png|PNG|gif|GIF)$/.test(file.type)) {
        this.$message('只允许上传jpg/png/gif格式的图片')
        throw new Error('只允许上传jpg/png/gif格式的图片')
      }
      if (file.size / 1024 / 1024 > 1) {
        this.$message('上传图片大小不能超过1MB')
        throw new Error('上传图片大小不能超过1MB')
      }
      return true
    },
    _reqUpload(data) {
      const _this = this
      const reader = new FileReader()
      reader.readAsArrayBuffer(data.file)
      reader.onload = function(res) {
        const byte = new Uint8Array(res.currentTarget.result)
        const binary = []
        for (let i = 0; i < byte.length; i++) {
          binary.push(byte[i])
        }
        uploadFile({ date: binary, filePath: 'image', fileName: new Date().getTime() + '', fileType: data.file.type.split('/')[1] })
          .then(res => {
            if (res.code === 200) {
              _this.$message({
                message: '上传成功',
                type: 'success'
              })
              _this.formItem.modelVal = res.result.fileUrl
              _this.$emit('on-val-change', _this.formItem.fieldName, res.result.fileUrl)
            }
          })
          .catch(() => {
            _this.$message({
              type: 'error',
              message: '上传失败'
            })
          })
      }
    },
    _queryArea() {
      return queryArea().then((res) => {
        if (res.code === 200) {
          this.areaOptions = res.result || []
        }
      })
    }
  }
}
</script>
