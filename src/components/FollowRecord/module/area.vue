<template>
  <div class="area">
    <el-select v-model="areaValue[0]" placeholder="请选择省份" @change="handleChange('province')">
      <el-option v-for="(item, index) in areaOption.province" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-select v-model="areaValue[1]" placeholder="请选择城市" @change="handleChange('city')">
      <el-option v-for="(item, index) in areaOption.city" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-select v-model="areaValue[2]" placeholder="请选择市区" @change="handleChange('area')">
      <el-option v-for="(item, index) in areaOption.area" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
  import { getArea } from '@/api/basic'
  export default {
    name: 'AreaModel',
    props: {
      config: {
        type: Object,
        default: () => {}
      },
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        areaValue: [],
        areaOption: {
          province: [],
          city: [],
          area: []
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList(code, name) {
        // 获得省市区信息
        getArea(code || 'all').then(res => {
          if (res.code === 200) {
            if (name) {
              this.areaOption[name] = res.result
            } else {
              this.areaOption.province = res.result
            }
          }
        })
      },
      handleChange(name) {
        const getInfo = (name, index) => {
          const info = this.areaOption[name].filter(item => item.id === this.areaValue[index])
          if (info.length) {
            return info[0]
          } else {
            return null
          }
        }
        if (name === 'province') {
          // 省份
          // 省份变化，清空城市和区域
          this.areaOption.city = []
          this.areaOption.area = []
          // 清空已选值
          this.areaValue[1] = null
          this.areaValue[2] = null
          this.config.value = []
          const info = getInfo('province', 0)
          if (info) {
            this.getList(info.code, 'city')
          } else {
            this.$message.error('没匹配到数据')
          }
        } else if (name === 'city') {
          // 城市
          // 城市变化，清空区域
          this.areaOption.area = []
          // 清空已选值
          this.areaValue[2] = null
          this.config.value = []
          const info = getInfo('city', 1)
          if (info) {
            this.getList(info.code, 'area')
          } else {
            this.$message.error('没匹配到数据')
          }
        } else {
          // 区域
          // 在区域处理 value 值
          const province = getInfo('province', 0)
          const city = getInfo('city', 1)
          const area = getInfo('area', 2)
          console.log(province, city, area)
          this.config.value = [province.id, city.id, area.id]
        }
      }
    }
  }
</script>

<style lang="scss" scoped></style>
