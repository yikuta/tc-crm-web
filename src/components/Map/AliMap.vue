<template>
  <div class="wrapper">
    <el-amap-search-box v-if="search" class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
    <el-amap
      ref="map"
      :vid="vid"
      :amap-manager="amapManager"
      :center="markers.length ? markers[0] : center"
      :zoom="zoom"
      :events="events"
      class="amap-container"
      :style="{height,width}"
    >
      <el-amap-marker
        v-for="(marker, index) in markers"
        :position="marker"
        :vid="index"
        :key="index"
        :draggable='true'
        :events='markerEvents'
      ></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
  import VueAMap from 'vue-amap'

  export default {
    name: 'AliMap',
    props: {
      center: {
        type: Array,
        default: () => [104.06306, 30.54574]
      },
      zoom: {
        // 缩放范围[3-18]
        type: Number,
        default: 16.5
      },
      height: {
        type: String,
        default: '200px'
      },
      width: {
        type: String,
        default: '360px'
      },
      markers: {
        type: Array,
        default: () => []
      },
      events: {
        type: Object,
        default: () => {}
      },
      markerEvents: {
        type: Object,
        default: () => {}
      },
      search: { // 是否显示搜索组件
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        amapManager: new VueAMap.AMapManager(),
        vid: new Date().getTime() + '_' + parseInt(Math.random() * 100, 10),
        lng: 0,
        lat: 0,
        loaded: false,
        searchOption: {
          city: '',
          citylimit: true
        },
        plugin: [{
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 100, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: 'RB', // 定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: 'all',
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng
                  self.lat = result.position.lat
                  self.center = [self.lng, self.lat]
                  self.loaded = true
                  self.$nextTick()
                }
              })
            }
          }
        }]
      }
    },
    created() {
    },
    methods: {
      onSearchResult(data) {
        if (this.search) {
          this.$emit('onSearch', data)
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .wrapper{position:relative;
    .search-box{top:50px;}
  }
</style>
