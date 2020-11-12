<template>
  <div class="app-container">
    <search-bar @success="handleSearch"></search-bar>
    <el-row class="margin-top-sm trail-content">
      <el-col :span="8">
        <el-card>
          <div class="padding-bottom border-bottom-seat margin-bottom cursor" v-for="(item, index) in tableData" :key="index" @click="handleShowMarker(item)">
            <div class="text-df padding-bottom-sm"><el-tag class="margin-right-sm" type="danger" size="mini">{{ index + 1 }}</el-tag>{{ item.shopName }}</div>
            <div class="text-sm text-second padding-bottom-sm">跟进人：{{ item.followUsername }}</div>
            <div class="text-sm text-second padding-bottom-sm">定位打卡：{{ item.positionVo && item.positionVo.address }}</div>
            <div class="text-sm text-second">定位打卡时间：{{ item.followTime }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" class="padding-left-sm">
        <ali-map height="800px" width="800px" :center="['104.06306', '30.54574']" :markers="positionVoList"></ali-map>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { visitCustomer } from '@/api/work'
  export default {
    name: 'TrailPage',
    components: {
      SearchBar: resolve => {
        return require(['./templates/trail/search'], resolve)
      },
      AliMap: resolve => {
        return require(['@/components/Map/AliMap'], resolve)
      }
    },
    data() {
      return {
        tableData: [],
        followTime: '',
        followUserId: '',
        positionVoList: []
      }
    },
    created() {
      this.visitCustomer()
    },
    methods: {
      visitCustomer() {
        visitCustomer({
          dataRange: 'ALL',
          dateEnum: 'ALL_TIME',
          followTime: this.followTime,
          followUserId: this.followUserId
        }).then(res => {
          if (res.code === 200) {
            this.tableData = res.result
            if (this.tableData.length) {
              this.positionVo = this.tableData[0].positionVo
            }
          }
        })
      },
      handleSearch(result) {
        this.followTime = result.time
        this.followUserId = result.userId
        this.visitCustomer()
      },
      handleShowMarker(item) {
        // 显示地图
        if (item.positionVo) {
          this.positionVoList = item.positionVo.map(item => {
            return [item.lon, item.lat]
          })
        } else {
          this.$message.error('当前记录没有坐标')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.trail-content{height:800px;}
</style>
