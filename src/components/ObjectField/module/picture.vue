<template>
  <div class="">
    <el-upload
      class="avatar-uploader"
      action="upload"
      :http-request="uploadRequest"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeUpload" :disabled="disabled">
      <img v-if="config.value" :src="config.value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  import { uploadFileRequest } from '@/api/basic'
  const defaultConfig = {
    image: {
      desc: '图片',
      accept: 'jpeg|jpg|png|gif'
    },
    video: {
      desc: '视频',
      accept: 'mp4|avi|mkv' // mp4|avi|mov|3gp|wmv|mkv|mpg|vob|flv
    },
    audio: {
      desc: '音频',
      accept: 'mp3|wav'
    },
    file: {
      desc: '文件',
      accept: 'xlsx|xltx|xlsm|xls|csv|pdf|docx|dotx|dotm|docm|doc|sheet'
    }
  }

  export default {
    name: 'PictureModel',
    props: {
      value: {
        type: String,
        default: ''
      },
      config: {
        type: Object,
        default: () => {}
      },
      type: { // 文件类型
        type: String,
        default: 'IMAGE' // VIDEO | FILE | AUDIO
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      fileType: function() {
        return this.type.toLowerCase()
      }
    },
    data() {
      return {
        imageUrl: ''
      }
    },
    created() {
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      validate(file) {
        const { accept, desc } = defaultConfig[this.fileType]
        const regexp = new RegExp(`.(${this.accept || accept})$`)
        if (!regexp.test(file.name.toLowerCase())) {
          this.$message(`只允许上传${this.accept || accept}格式的${desc}`)
          return false
        }

        if (Number(this.maxSize) !== 0 && file.size / 1024 / 1024 > this.maxSize) {
          this.$message(`上传${desc}大小不能超过${this.maxSize}MB`)
          return false
        }
        return true
      },
      beforeUpload(file) {
        return this.validate(file)
      },
      uploadRequest(data) {
        const reader = new FileReader()
        reader.readAsArrayBuffer(data.file)
        reader.onload = (res) => {
          const byte = new Uint8Array(res.currentTarget.result)
          const binary = []
          for (let i = 0; i < byte.length; i++) {
            binary.push(byte[i])
          }
          const loading = this.$loading({
            lock: true,
            text: `${defaultConfig[this.fileType].desc}上传中...`,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          const nameArray = data.file.name.split('.')
          uploadFileRequest({
            date: binary,
            filePath: this.fileType.toLowerCase(),
            fileName: nameArray[0], // `${getTimestamp()}_${randomInteger(0, 1000)}/${nameArray[0]}`
            fileType: nameArray[1] // data.file.type.split('/')[1]
          }).then(res => {
            if (res.code === 200) {
              if (this.fileType === 'image') {
                const _this = this
                const img = new Image()
                img.src = res.result.fileUrl
                this.config.value = res.result.fileUrl
                img.onload = function() {
                  _this.filesList.push({ ...res.result, width: img.width, height: img.height })
                }
              } else {
                this.filesList.push(res.result)
              }
              this.$message.success('上传成功')
            } else {
              this.$refs[this.fileType].uploadFiles.pop()
            }
            loading.close()
          }).catch(() => {
            this.$notify.error('上传出错')
            loading.close()
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-uploader {
    /deep/ .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
</style>
