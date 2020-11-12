<template>
  <div class="app-container">
    <el-row class="padding-top padding-bottom-sm margin-bottom border-bottom-main">
      <el-col :span="24" class="text-left">
        <span class="text-main padding-right-sm">{{ $route.query.resourceId ? '编辑线索' : '新建线索' }}</span>
      </el-col>
    </el-row>
    <el-form :model="form" ref="form" :rules="rules" size="mini" label-width="120px">
      <el-form-item label="联系人" prop="resourceName">
        <el-input v-model.trim="form.resourceName" placeholder="请输入联系人姓名"></el-input>
      </el-form-item>
      <el-form-item label="门店名称" prop="shopName">
        <el-input v-model.trim="form.shopName" placeholder="请输入门店名称"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话" prop="phoneNumber">
        <el-input v-model.trim="form.phoneNumber" placeholder="请输入联系人电话"></el-input>
      </el-form-item>
      <el-form-item label="门店店招" prop="shopBoardShow">
        <el-upload class="upload" action="upload" :http-request="_reqUpload" :show-file-list="false" :before-upload="beforePicUpload">
          <img v-if="form.shopBoardShow" :src="form.shopBoardShow" class="cover" />
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="定位地址" prop="positionAddress">
        <div class="dot-box">
          <div class="address-box">
            <el-input v-model="form.positionAddress" placeholder="请选择地址" readonly></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="">
        <div>
          <ali-map ref="addmap" :center="mapCenter" :markers='markers' :events='events' :markerEvents='markerEvents' search @onSearch="getAddress" width='100%' height='500px'/>
        </div>
      </el-form-item>
      <el-form-item label="地址" prop="selectedArea">
        <el-cascader v-model="selectedArea" :options="options" :props="optionsProps"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model.trim="form.address" type="text" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save" :loading="loading">保存</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getArea } from '@/api/basic'
  import { queryArea, saveResource, updateResource, uploadFile } from '@/api/resource/menu'
  import { getDetails } from '@/api/resource/detail'
  import AliMap from '@/components/Map/AliMap.vue'
  export default {
    name: 'ThreadForm',
    components: {
      AliMap
    },
    data() {
      return {
        loading: false,
        form: {
          resourceName: '',
          shopName: '',
          phoneNumber: '',
          shopBoardShow: '',
          shopBoard: '',
          lat: '',
          lon: '',
          positionAddress: '',
          regionId: '',
          address: '',
          remark: ''
          // resourceId: ''
        },
        rules: {
          resourceName: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' }
          ],
          shopName: [
            { required: true, message: '请输入门店名称', trigger: 'blur' }
          ],
          phoneNumber: [
            { required: true, message: '请输入联系人电话', trigger: 'blur' }
          ],
          shopBoardShow: [
            { required: true, message: '请上传门店店招', trigger: 'blur' }
          ],
          positionAddress: [
            { required: true, message: '请选择地址', trigger: 'blur' }
          ],
          selectedArea: [
            // { required: true, message: '请填写门店地区', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ]
        },
        options: [],
        optionsProps: {
          // checkStrictly: true,
          value: 'id',
          label: 'name',
          children: 'childrenList'
        },
        selectedArea: [],
        areaList: { province: null, city: null, district: null }, // 选择的区域列表
        area: {
          province: [],
          city: {},
          district: {}
        },
        markers: [[121.59996, 31.197646]],
        mapCenter: [121.59996, 31.197646],
        map: null,
        events: {},
        markerEvents: {}
      }
    },
    created() {
      let timer = setInterval(() => {
        // 设置当 AMapUI 已经存在的时候开始构建
        if (window.AMapUI && window.AMap) {
          this.mapInit()
          clearInterval(timer)
          timer = null
        }
      }, 500)
    },
    mounted() {
      // this.handleChange('all', 'province')
      this._queryArea()
      if (this.$route.query.type === 'edit') {
        this._getDetails(this.$route.query.resourceId)
      }
    },
    methods: {
      save() {
        // 1
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const form = JSON.parse(JSON.stringify(this.form))
            form.regionId = this.selectedArea[2]
            form.customerOrResourceName = form.resourceName
            if (this.$route.query.isPrivate === 'private') {
              form.type = 'PRIVATE_INFO'
            } else {
              form.type = 'PUBLIC_INFO'
            }
            if (this.$route.query.type === 'edit') {
              form.id = this.$route.query.resourceId
              this._updateResource(form)
            } else {
              this._saveResource(form)
            }
          }
        })
      },
      _saveResource(data) {
        this.loading = true
        return saveResource(data).then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.$notify.success(res.message)
            this.$router.go(-1)
          }
        }).catch(() => {
          this.loading = false
        })
      },
      _updateResource(data) {
        this.loading = true
        return updateResource(data).then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.$notify.success(res.message)
            this.$router.go(-1)
          }
        }).catch(() => {
          this.loading = false
        })
      },
      _getDetails(data) {
        return getDetails(data).then((res) => {
          if (res.code === 200) {
            const result = res.result
            this.form = {
              resourceName: result.customerResourceVo.resourceName,
              shopName: result.customerResourceVo.shopName,
              phoneNumber: result.customerResourceVo.phoneNumber,
              shopBoard: result.shopBoard,
              shopBoardShow: result.shopBoard.indexOf('http') > -1 ? result.shopBoard : result.shopBoardPre + result.shopBoard,
              regionId: '',
              address: result.address,
              remark: result.remark,
              lat: result.positionVo ? result.positionVo.lat : 31.197646,
              lon: result.positionVo ? result.positionVo.lon : 121.59996,
              positionAddress: result.positionVo ? result.positionVo.address : ''
            }
            this.$nextTick(() => {
              let mapCenter = []
              let markers = []
              if (result.positionVo) {
                if (result.positionVo.lat && result.positionVo.lon) {
                  mapCenter.push(Number(result.positionVo.lon))
                  mapCenter.push(Number(result.positionVo.lat))
                  markers.push(mapCenter)
                  this.mapCenter = mapCenter
                  this.markers = markers
                }
              }
            })
            const arr = result.customerResourceVo.regionVo.reverse()
            arr.map((item) => {
              this.selectedArea.push(item.id)
            })
          }
        })
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
        // 限制图片尺寸，目前注释掉，但后期可能会用
        // try {
        //   const { width, height } = await this.getImageMeasure(file)
        //   if (width > 800 || height > 800) {
        //     this.$message('上传图片尺寸不能高于800*800')
        //     return false
        //   }
        //   return true
        // } catch (err) {
        //   this.$message('上传图片失败，请重新上传')
        //   return false
        // }
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
                _this.form.shopBoard = res.result.filePath
                _this.form.shopBoardShow = res.result.fileUrl
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
            this.options = res.result || []
          }
        })
      },
      handleChange(val, name) {
        getArea(val).then(res => {
          if (name === 'province') {
            this.area[name] = res.result
          }
          if (name === 'city') {
            this.area[name][val] = res.result
            this.areaList[name] = ''
            this.areaList.district = ''
          }
          if (name === 'district') {
            this.area[name][val] = res.result
            this.areaList[name] = ''
            this.$forceUpdate()
          }
        })
      },
      setAddress(result) {
        this.form.positionAddress = result.regeocode.formattedAddress
        this.form.lat = this.mapCenter[1]
        this.form.lon = this.mapCenter[0]
        const addressComponent = result.regeocode.addressComponent
        this.form.address = addressComponent.province + addressComponent.city + addressComponent.district + addressComponent.township + addressComponent.street + addressComponent.streetNumber
        this.selectedArea = []
        this.options.map((pro) => {
          if (pro.coed === (addressComponent.adcode.slice(0, 2) + '0000')) {
            this.selectedArea.push(pro.id)
            pro.childrenList.map((city) => {
              if (city.coed === (addressComponent.adcode.slice(0, 4) + '00')) {
                this.selectedArea.push(city.id)
                city.childrenList.map((area) => {
                  if (area.coed === addressComponent.adcode) {
                    this.selectedArea.push(area.id)
                  }
                })
              }
            })
          }
        })
      },
      getAddress(data) {
        if (!data.length) return
        const { lng, lat } = data[0]
        this.markers = [[lng, lat]]
        this.mapCenter = [lng, lat]
        // 通过经纬度查询详细地址信息
        AMap.plugin('AMap.Geocoder', () => {
          const geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            // city: '010'
          })
          const lnglat = this.markers[0]
          geocoder.getAddress(lnglat, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              // result为对应的地理位置详细信息
              this.setAddress(result)
            }
          })
        })
      },
      mapInit() {
        this.map = new AMap.Map('container', {
          zoom: 16,
          resizeEnable: true
        })
        this.markerEvents = {
          dragend: (data) => {
            if (!data.lnglat) return
            const { lng, lat } = data.lnglat
            this.markers = [[lng, lat]]
            this.mapCenter = [lng, lat]
            // 通过经纬度查询详细地址信息
            AMap.plugin('AMap.Geocoder', () => {
              const geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                // city: '010'
              })
              const lnglat = this.markers[0]
              geocoder.getAddress(lnglat, (status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                  // result为对应的地理位置详细信息
                  this.form.realData = JSON.stringify(data.lnglat) // 定位的坐标系数据
                  // this.form.positionAddress = result.regeocode.formattedAddress
                  this.setAddress(result)
                }
              })
            })
          }
        }
        this.events = {
          init: () => {
            AMapUI.loadUI(['misc/PositionPicker'], () => {
              AMap.plugin('AMap.Geolocation', () => {
                const geolocation = new AMap.Geolocation({
                  enableHighAccuracy: true,
                  timeout: 10000,
                  buttonPosition: 'RB',
                  buttonOffset: new AMap.Pixel(10, 20),
                  zoomToAccuracy: true,
                  showMarker: true,
                  extensions: 'all'
                })
                this.map.addControl(geolocation)
                // 获取当前位置
                geolocation.getCurrentPosition((status, data) => {
                  if (data) {
                    const { lng, lat } = data.position
                    this.markers = [[lng, lat]]
                    this.mapCenter = [lng, lat]
                    if (this.markers && this.markers[0] && this.markers[0].length > 0) {
                      try {
                        this.setAddress(data)
                        // this.form.positionAddress = data.regeocode.formattedAddress
                      } catch (e) {
                        // 不作处理
                      }
                    }
                  }
                })
              })
            })
          },
          placeSearch(result) {
          }
        }
      }
    }
  }
</script>

<style scoped>
.app-container  /deep/ .cover {
  width: 180px;
}
</style>
