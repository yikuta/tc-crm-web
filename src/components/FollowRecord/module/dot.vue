<template>
  <div class="dot-box">
    <div class="address-box">
      <el-input v-model="config.value" placeholder="请选择地址" disabled></el-input>
    </div>
    <ali-map ref="addmap" :center="mapCenter" :markers='markers' :events='events' :markerEvents='markerEvents' search @onSearch="getAddress" width='100%' height='500px'/>
  </div>
</template>

<script>
  import AliMap from '@/components/Map/AliMap.vue'
  export default {
    name: 'DotModel',
    components: {
      AliMap
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      config: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
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
    methods: {
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
                  this.config.value = result.regeocode.formattedAddress
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
                        this.config.vlaue = data.regeocode.formattedAddress
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
              this.config.value = result.regeocode.formattedAddress
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dot-box{}
</style>
