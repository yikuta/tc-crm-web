<template>
  <dialog-modal :title="form ? '编辑区域设置' : '区域设置'" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini" :model="formInfo" :rules="rules" ref="form">
      <el-form-item label="员工" prop="userId">
<!--        <el-select v-model="formInfo.userId" filterable placeholder="请选择员工" :disabled="!!form">-->
<!--          <el-option v-for="(item, index) in userList" :key="index" :value="item.userId" :label="item.fullName"></el-option>-->
<!--        </el-select>-->
        <span v-if="formInfo.userId">{{ formInfo.fullName }}</span>
        <selected-people v-model="userSelect" v-else></selected-people>
      </el-form-item>
      <el-form-item label="负责区域" prop="areaCodeList">
        <el-row v-for="(item, index) in areaList" :key="index" type="flex" :gutter="10" :class="{ 'padding-bottom-sm': areaList.length - 1 > index }">
          <el-col :span="6">
            <el-select v-model="item.province" placeholder="请选择省份" @change='val=>handleChange(val,"city", index)'>
              <el-option v-for="(areaItem, j) in area.province" :key="j" :label="areaItem.name" :value="areaItem.code"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="item.city" placeholder="请选择城市" @change='val=>handleChange(val, "district", index)'>
              <el-option v-for="(areaItem, j) in area.city[item.province]" :key="j" :label="areaItem.name" :value="areaItem.code"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="item.district" placeholder="请选择区域">
              <el-option v-for="(areaItem, j) in area.district[item.city]" :key="j" :label="areaItem.name" :value="areaItem.code"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-plus" circle @click="handleAdd" v-if="index === areaList.length - 1"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDelete(index)" v-if="areaList.length > 1"></el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="formInfo.enable">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  import { getAllUser, getArea } from '@/api/basic'
  import { saveUserArea, updateUserArea } from '@/api/system/area'
  import SelectedPeople from '@/components/SelectedPeople/index'
  export default {
    name: 'AreaForm',
    components: {
      DialogModal,
      SelectedPeople
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
      }
    },
    data() {
      return {
        dialogVisible: false,
        formInfo: {
          userId: null,
          enable: true,
          areaCodeList: [] // 区域集合
        },
        rules: {
          userId: [
            { required: true, message: '请选择员工', trigger: 'blur' }
          ],
          areaCodeList: [
            { required: true, message: '请选择负责区域', trigger: 'blur' }
          ]
        },
        userList: [],
        areaList: [
          { province: null, city: null, district: null }
        ], // 选择的区域列表
        area: {
          province: [],
          city: {},
          district: {}
        },
        userSelect: {} // 选择的员工
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        if (n) {
          this.dealForm()
          !this.userList.length && this.getAllUser()
          !this.area.province.length && this.handleChange('all', 'province')
        }
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      getAllUser() {
        getAllUser().then(res => {
          this.userList = res.result
        })
      },
      handleAdd() {
        // 添加一行区域
        this.areaList.push({ province: null, city: null, district: null })
      },
      handleDelete(index) {
        if (this.areaList.length === 1) return
        this.areaList.splice(index, 1)
      },
      handleChange(val, name, index) {
        /*
        * 区域变化
        * val 区 code
        * name 区域 key 名称 province city district
        * index 索引 -1 表示不处理
        * */
        getArea(val).then(res => {
          if (name === 'province') {
            this.area[name] = res.result
          }
          if (name === 'city') {
            this.area[name][val] = res.result
            if (index !== -1) {
              this.areaList[index][name] = ''
              this.areaList[index].district = ''
            }
          }
          if (name === 'district') {
            this.area[name][val] = res.result
            if (index !== -1) {
              this.areaList[index][name] = ''
            }
          }
          this.$forceUpdate()
        })
      },
      handleVisible(status, name, item) {
        // 下拉框状态
        if (status) {
          const code = name === 'province' ? item.province : item.city
          if (code) {
            getArea(code).then(res => {
              if (name === 'province') {
                this.area.city[item.province] = res.result
              }
              if (name === 'city') {
                this.area.district[item.city] = res.result
              }
              this.$forceUpdate()
            })
          }
        }
      },
      handleSubmit(done) {
        // 确定
        // 判断省市区是否还有未选择的
        let flag = false
        this.areaList.forEach(item => {
          if (!item.province || !item.city || !item.district) {
            flag = true
          }
        })
        if (flag) {
          // this.$message.error('请选择负责区域')
        } else {
          this.formInfo.areaCodeList = []
          this.areaList.forEach(item => {
            this.area.district[item.city].forEach(area => {
              if (area.code === item.district) {
                this.formInfo.areaCodeList.push(area.id)
              }
            })
          })
        }
        // 设置用户信息
        this.formInfo.userId = this.userSelect.id
        this.$refs.form.validate(result => {
          if (result) {
            const fn = this.form ? updateUserArea : saveUserArea
            fn(this.formInfo).then(res => {
              this.$notify.success('保存成功')
              this.$emit('success')
              this.$emit('update:visible', false)
            })
          }
        })
      },
      dealForm() {
        this.$refs.form && this.reset()
        // 处理表单数据
        if (this.form) {
          // 设置表单信息
          this.formInfo = {
            ...this.form,
            areaCodeList: []
          }
          // 设置员工信息
          this.userSelect = {
            id: this.form.userId,
            name: this.form.fullName
          }
          // 区域列表有数据
          if (this.form.areaList.length) {
            this.areaList = [] // 将原有的默认填写窗口清空
            // 处理地址信息
            // 判断是否已经有了对应的key，如果有了就不再添加，防止地址重复加载
            this.form.areaList.forEach(item => {
              // 判断是否已经有了数组
              // 处理城市
              if (this.area.city[item.provinceCode]) {
                // 有了就不管
              } else {
                this.area.city[item.provinceCode] = []
                this.handleChange(item.provinceCode, 'city', -1)
              }
              // 处理市区
              if (this.area.district[item.cityCode]) {
                // 有了不处理
              } else {
                this.area.district[item.cityCode] = []
                this.handleChange(item.cityCode, 'district', -1)
              }
              this.areaList.push({
                province: item.provinceCode,
                city: item.cityCode,
                district: item.areaCode
              })
            })
          }
        }
      },
      reset() {
        this.$refs.form.clearValidate()
        this.areaList = [
          { province: null, city: null, district: null }
        ]
        this.userSelect = {}
        this.formInfo = {
          userId: null,
          areaCodeList: [],
          enable: true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
