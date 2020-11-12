<template>
  <div class="app-container">
    <top-bar @success="handleSearch"></top-bar>
    <el-card class="text-right margin-top-sm text-sm">更新时间：{{ updateTime }}</el-card>
    <el-row class="padding-top-sm work-chart" :gutter="10" type="flex">
      <el-col :span="8">
        <el-card :body-style="{ padding: '10px' }" class="margin-bottom-sm">
          <div class="text-bold text-df">客户数据</div>
          <el-row class="text-sm text-center">
            <el-col :span="8" class="padding-top">
              <div>{{ workPlatFormCustomerVo.newIncreaseCustomerCount }}</div>
              <div>新增客户数</div>
            </el-col>
            <el-col :span="8" class="padding-top">
              <div>{{ workPlatFormCustomerVo.newIncreaseCustomerRecordCount }}</div>
              <div>新增跟进动态</div>
            </el-col>
            <el-col :span="8" class="padding-top">
              <div>{{ workPlatFormCustomerVo.newIncreaseCooperationCustomerCount }}</div>
              <div>新增合作客户</div>
            </el-col>
            <el-col :span="8" class="padding-top">
              <div>{{ workPlatFormCustomerVo.totalCooperationCustomerCount }}</div>
              <div>已合作客户</div>
            </el-col>
            <el-col :span="8" class="padding-top">
              <div>{{ workPlatFormCustomerVo.totalNotCooperationCustomerCount }}</div>
              <div>未合作客户</div>
            </el-col>
            <el-col :span="8" class="padding-top">
              <div>{{ workPlatFormCustomerVo.totalPauseCooperationCustomerCount }}</div>
              <div>暂停合作客户</div>
            </el-col>
          </el-row>
        </el-card>
        <el-card :body-style="{ padding: '10px' }">
          <div class="text-bold text-df">客户销售漏斗</div>
          <div style="width:100%;height:200px;">
            <e-charts :option="echartsOption" ref="echarts"></e-charts>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" class="ali-map-box">
        <el-card :body-style="{ padding: '10px' }">
          <div class="text-bold text-df padding-bottom-sm">客户拜访分布图</div>
          <div>
            <ali-map width="100%" height="315px" :center="['104.06306', '30.54574']" :markers="positionVoList"></ali-map>
          </div>
          <el-row class="text-sm text-second padding-top-sm">
            <el-col :span="12">拜访客户数总计：{{ visitCustomerCount || 0 }}</el-col>
            <el-col :span="12" class="text-right">
              <a href="javascript:void(0)" @click="$router.push('/work/trail')">更多详细数据></a>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '10px' }" class="margin-bottom-sm">
          <div class="text-bold text-df">销售线索数据</div>
          <el-row class="text-sm text-center">
            <el-col :span="8" class="padding-top">
              <div>{{ workPlatFormResourceVo.newIncreaseResourceCount }}</div>
              <div>新增线索数</div>
            </el-col>
            <el-col :span="8" class="padding-top">
              <div>{{ workPlatFormResourceVo.newIncreaseResourceFollowRecordCount }}</div>
              <div>新增跟进动态</div>
            </el-col>
            <el-col :span="8" class="padding-top">
              <div>{{ workPlatFormResourceVo.newIncreaseChangeCustomerCount }}</div>
              <div>新增转客户</div>
            </el-col>
            <el-col :span="8" class="padding-top">
              <div>{{ workPlatFormResourceVo.totalIncreaseResourceCount }}</div>
              <div>累计线索数</div>
            </el-col>
          </el-row>
        </el-card>
        <el-card :body-style="{ padding: '10px' }">
          <div class="text-bold text-df">线索转化漏斗</div>
          <div style="width:100%;height:200px;">
            <e-charts :option="echartsOption2" ref="echarts"></e-charts>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="margin-top-sm" :body-style="{ padding: '10px' }">
      <div class="text-bold text-df padding-bottom">门店（合作客户）销售数据</div>
      <el-row class="text-sm padding-bottom text-center">
        <el-col :span="4">
          <div>{{ shopStatisticsVo.totalShopCount || 0 }}</div>
          <div>门店总数</div>
        </el-col>
        <el-col :span="4">
          <div>{{ shopStatisticsVo.enableShopCount || 0 }}</div>
          <div>已启用门店</div>
        </el-col>
        <el-col :span="4">
          <div>{{ shopStatisticsVo.disableShopCount || 0 }}</div>
          <div>已禁用门店</div>
        </el-col>
        <el-col :span="4">
          <div>{{ shopStatisticsVo.sellingShopCount || 0 }}</div>
          <div>销售中门店</div>
        </el-col>
      </el-row>
      <div class="text-right text-sm text-second">
        <a href="javascript:void(0)" @click="$router.push('/work/data')">更多详细数据></a>
      </div>
    </el-card>
  </div>
</template>

<script>
  import TopBar from './templates/index/top'
  import ECharts from '@/components/Echarts/index'
  import AliMap from '@/components/Map/AliMap'
  import { queryWork } from '@/api/work'

  export default {
    name: 'WorkIndex',
    components: {
      ECharts,
      TopBar,
      AliMap
    },
    data() {
      return {
        echartsOption: {
          title: {
            text: '',
            subtext: ''
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}'
          },
          series: [
            {
              name: '客户销售漏斗',
              type: 'funnel',
              left: '10%',
              top: 30,
              // x2: 80,
              bottom: 30,
              width: '80%',
              // height: {totalHeight} - y - y2,
              min: 0,
              max: 100,
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              label: {
                show: true,
                position: 'inside'
              },
              labelLine: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
              },
              emphasis: {
                label: {
                  fontSize: 20
                }
              },
              data: [
                { value: 0, name: '客户' },
                { value: 0, name: '合作客户' }
              ]
            }
          ]
        },
        echartsOption2: {
          title: {
            text: '',
            subtext: ''
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}'
          },
          series: [
            {
              name: '客户销售漏斗',
              type: 'funnel',
              left: '10%',
              top: 30,
              // x2: 80,
              bottom: 30,
              width: '80%',
              // height: {totalHeight} - y - y2,
              min: 0,
              max: 100,
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              label: {
                show: true,
                position: 'inside'
              },
              labelLine: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
              },
              emphasis: {
                label: {
                  fontSize: 20
                }
              },
              data: [
                { value: 0, name: '转为客户' },
                { value: 0, name: '销售线索' }
              ]
            }
          ]
        },
        positionVoList: [],
        shopStatisticsVo: { // 商家门店统计数据
          disableShopCount: 0, // 禁用门店数量
          enableShopCount: 0, // 启用门店数量
          sellingShopCount: 0, // 销售中的门店数量
          totalShopCount: 0 // 门店总数
        },
        workPlatFormCustomerVo: { // 工作台客户
          newIncreaseCooperationCustomerCount: 0, // 新增合作客户数量
          newIncreaseCustomerCount: 0, // 新增客户数量
          newIncreaseCustomerRecordCount: 0, // 新增跟进记录数量
          totalCooperationCustomerCount: 0, // 累计合作客户数量
          totalCustomerCount: 0, // 累计客户数量
          totalNotCooperationCustomerCount: 0, // 累计未合作客户数量
          totalPauseCooperationCustomerCount: 0 // 累计暂停合作客户
        },
        workPlatFormResourceVo: { // 工作台线索
          newIncreaseChangeCustomerCount: 0, // 新增转客户数量
          newIncreaseResourceCount: 0, // 新增线索数量
          newIncreaseResourceFollowRecordCount: 0, // 新增跟进记录数量
          totalIncreaseResourceCount: 0 // 线索累计数量
        },
        updateTime: '', // 更新时间
        visitCustomerCount: 0, // 拜访客户统计
        form: {
          dataRange: 'ALL',
          dateEnum: 'ALL_TIME',
          endTime: '',
          followTime: '',
          followUsername: '',
          startTime: ''
        }
      }
    },
    created() {
      this.getDetail()
    },
    methods: {
      getDetail() {
        queryWork({
          dataRange: this.form.dataRange,
          dateEnum: this.form.dateEnum,
          endTime: this.form.endTime,
          followTime: this.form.followTime,
          followUsername: this.form.followUsername,
          startTime: this.form.startTime
        }).then(res => {
          if (res.code === 200) {
            this.shopStatisticsVo = res.result.shopStatisticsVo
            this.workPlatFormCustomerVo = res.result.workPlatFormCustomerVo
            this.workPlatFormResourceVo = res.result.workPlatFormResourceVo
            this.updateTime = res.result.updateDate
            this.visitCustomerCount = res.result.visitCustomerCount
            this.positionVoList = res.result.positionVoList.map(item => {
              return [item.lon, item.lat]
            })
            this.echartsOption.series[0].data = [
              { value: this.workPlatFormCustomerVo.totalCustomerCount, name: '客户' },
              { value: this.workPlatFormCustomerVo.totalCooperationCustomerCount, name: '合作客户' }
            ]
            this.echartsOption2.series[0].data = [
              { value: this.workPlatFormResourceVo.newIncreaseChangeCustomerCount, name: '转为客户' },
              { value: this.workPlatFormResourceVo.totalIncreaseResourceCount, name: '销售线索' }
            ]
            this.$refs.echarts.drawLine()
          }
        })
      },
      handleSearch(result) {
        this.form = {
          dataRange: result.dataRange,
          dateEnum: result.dateEnum,
          endTime: result.endTime,
          followTime: '',
          followUsername: '',
          startTime: result.startTime
        }
        this.getDetail()
      }
    }
  }
</script>

<style scoped lang="scss">
  .work-chart {
    >div{flex-shrink:1;}
    .ali-map-box {
      width: 500px;
      height: 400px;
      flex-shrink: 0;
    }
  }
</style>
