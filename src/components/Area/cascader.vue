<template>
  <el-cascader class="address-sub" :size="size"  :placeholder="placeholder" :props="{ value: 'code', label: 'name' }" :options="options" ref="cascader" v-model="currentValue" @change="setChange" @expand-change="handleChange"></el-cascader>
</template>

<script>
  import { getArea } from '@/api/basic'
  export default {
    name: 'Area',
    props: {
      value: {
        type: Array,
        default: () => {
          return []
        }
      },
      level: {
        type: Number,
        default: 3
      },
      size: {
        type: String,
        default: 'mini' // medium / small / mini
      },
      require: { // 是否有不限选项
        type: Boolean,
        default: true
      },
      syncChange: { // 即时改变
        type: Boolean,
        default: false
      },
      load: { // 自动加载
        type: Boolean,
        default: false
      },
      areaRange: { // 范围取值，如果 为 true ，有不限选项
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: 0
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        options: [],
        currentValue: [''],
        isLoad: [],
        isDefault: false,
        checkIndex: 0,
        isChecking: 0, // 正在加载
        changeBySelf: false, // 通过自身改变，防止出发checkValue
        timer: null
      }
    },
    created() {
      if (this.load) {
        this.$emit('input', [510000, 510100])
        let len = 0
        this.timer = setInterval(() => {
          if (len === 150) {
            clearInterval(this.timer)
            return
          }
          len++
          if (this.isChecking >= 2) {
            this.defaultChange([510000, 510100])
            clearInterval(this.timer)
          }
        }, 200)
      } else {
        this.checkValue(true)
      }
    },
    methods: {
      checkValue(status) {
        if (this.checkIndex) return
        this.checkIndex++
        if ((this.value && this.value.length) || !status) {
          // 判断是否有默认值，并进行循环获取和处理
          this.currentValue = this.value
          const fn = ({ province = null, city = null } = {}) => {
            this.getAreaList({ province, city }).then((res) => {
              this.isChecking++
              if (res.code === 200) {
                if (province || city) {
                  this.isLoad = province
                }
                const flag = this.detailData(res.result, province, city)
                if (flag) {
                  if (this.value[0] && !province) {
                    fn({ province: this.value[0] })
                  }
                  if (this.value[1] && province && !city) {
                    fn({ province: this.value[0], city: this.value[1] })
                  }
                }
              }
            }).catch(err => {
              const res = err.response
              if (res) {
                // 获取区域失败
              }
            })
          }
          fn()
          // this.getList({ province: this.value[0] || null, city: this.value[1] || null })
        } else {
          this.getList()
        }
        this.checkIndex--
      },
      getList({ province = null, city = null } = {}) {
        this.getAreaList({ province, city }).then((res) => {
          if (res.code === 200) this.detailData(res.result, province, city)
        }).catch(err => {
          const res = err.response
          if (res) {
            // 获取区域失败
            console.log(res) // eslint-disable-line
          }
        })
      },
      detailData(data, province, city) {
        // 数据插入到对应的地方
        if (this.level === 1) {
          console.log('只有一层') // eslint-disable-line
        }
        if (this.level === 2 && !province && !city) {
          data.forEach((value, index) => {
            value.children = []
          })
        }
        if (this.level === 3 && !city) {
          data.forEach((value, index) => {
            value.children = []
          })
        }
        if (province && !city) {
          // 有省份
          try {
            const p = this.options.filter(o => o.code === province)[0]
            p.children = data
          } catch (err) {
            console.log(err) // eslint-disable-line
          }
        } else if (province && city) {
          // 有省份有城市
          try {
            const p = this.options.filter(o => o.code === province)[0]
            const c = p.children.filter(o => o.code === city)[0]
            if (c.children) {
              // 判断检测是否需要添加子集
              c.children = data
            }
          } catch (err) {
            console.log(err) // eslint-disable-line
          }
        } else if (!province && city) {
          // 异常处理，有城市但是没有身份
          this.$message('数据有误，请刷新页面')
        } else {
          // 没异常，没省份没城市
          this.options = data
        }
        if (this.options[0].code && this.require && this.areaRange) {
          this.options.unshift({
            id: '', name: '不限'
          })
        }
        this.changeBySelf = false
        return true
      },
      getAreaList({ province = null, city = null } = {}) {
        /*
        * 获取区域列表，如果参数为空，默认传递 all
        * 如果都有值取 city
        * province
        * city
        * */
        let code = 'all'
        if (province && !city) {
          // 如果有省份取省份
          code = province
        }
        if (city) {
          code = city
        }
        return getArea(code)
      },
      setCurrentValue(value) {
        this.currentValue = value
      },
      handleChange(value) {
        // this.$emit('input',value)
        /*
        if (this.syncChange) {
          const obj = {
            label: this.$refs.cascader.currentLabels,
            value: value
          }
          this.$emit('change', obj)
          console.log(JSON.stringify(obj))
        }
        */
        // 判断需要的层级，如果相等则禁止往下继续加载
        // if (this.level === value.length) return
        this.changeBySelf = true
        this.getList({ province: value[0], city: value[1] || null })
      },
      defaultChange(val) {
        const obj = {
          label: this.$refs.cascader.currentLabels,
          value: val
        }
        this.$emit('change', obj)
      },
      setChange(val) {
        /*
        * 设置变化
        * 可用于获取当前选中的数据
        * */
        if (!val.length) {
          this.$emit('input', val)
          this.$emit('change', val)
          return
        }
        const node = this.$refs.cascader.getCheckedNodes()
        const newArr = node[0].pathNodes.map(item => {
          return {
            name: item.data.name,
            code: item.data.code,
            id: item.data.id
          }
        })
        this.handleChange(val)
        this.$emit('input', val)
        if (this.syncChange) {
          this.$emit('change', newArr)
        } else {
          if (this.level === val.length) {
            this.$emit('change', newArr)
          }
        }
        return newArr
      },
      clear() {
        this.$refs.cascader.handleClear()
      },
      getAreaIds(key) {
        /*
        * 获得想要的数据 返回数组 [0,0,0]
        * key 可选 id 或者 code
        * */
        const node = this.$refs.cascader.getCheckedNodes()
        const arr = []
        const fn = (obj) => {
          arr.unshift(obj.data[key])
          if (obj.parent) {
            fn(obj.parent)
          }
        }
        fn(node[0])
        return arr
      }
    },
    watch: {
      value(news, old) {
        this.setCurrentValue(news)
        // 监听改变
        if (news.length && !this.changeBySelf) {
          this.checkValue(true)
        }
      },
      currentValue(news) {
      }
    },
    destroyed() {
      // 销毁定时器。防止出现组件已销毁但定时器还在运行的bug
      clearInterval(this.timer)
    }
  }
</script>

<style lang="scss" scoped>

</style>
