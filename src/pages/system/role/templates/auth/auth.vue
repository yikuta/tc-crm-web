<template>
  <div>
    <div v-for="(item, index) in permissionList" :key="index" class="padding-bottom">
      <div class="padding-bottom-sm margin-bottom-sm text-main border-bottom-seat">
        {{ item.permissionDetailType }}
<!--        <el-checkbox>全选</el-checkbox>-->
      </div>
      <el-checkbox :indeterminate="checkAll[item.permissionDetailType].isIndeterminate" v-model="checkAll[item.permissionDetailType].all" @change="handleCheckAllChange(item)">全选</el-checkbox>
      <el-checkbox v-for="(check, j) in item.permissionName" :key="j" v-model="check.isSelect" @change="handleCheckChange(item)">{{ check.permissionName }}</el-checkbox>
    </div>
    <div class="">
      <el-button type="primary" @click="handleSubmit(1)" size="mini">保存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AuthForm',
    props: {
      permissionList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        checkList: [],
        isIndeterminate: false,
        checkAll: {}
      }
    },
    watch: {
      permissionList: {
        handler(n) {
          this.init()
        },
        deep: true
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        // 构建
        this.permissionList.forEach(parent => {
          let num = 0 // 已经勾选的数据
          parent.permissionName.forEach(child => {
            if (child.isSelect) {
              num = num + 1
            }
          })
          this.checkAll[parent.permissionDetailType] = {
            isIndeterminate: !!(num && num !== parent.permissionName.length),
            all: num === parent.permissionName.length
          }
        })
        this.$forceUpdate()
      },
      handleSubmit() {
        this.$emit('change', 1)
      },
      handleCheckChange(parent) {
        // 单选变化
        // let num = 0 // 已经勾选的数据
        // parent.permissionName.forEach(child => {
        //   if (child.isSelect) {
        //     num = num + 1
        //   }
        // })
        // this.checkAll[parent.permissionDetailType] = {
        //   isIndeterminate: num && num !== parent.permissionName.length,
        //   all: num === parent.permissionName.length
        // }
      },
      handleCheckAllChange(parent) {
        // 全选
        parent.permissionName.forEach(item => {
          item.isSelect = this.checkAll[parent.permissionDetailType].all
        })
        // this.init()
      }
    }
  }
</script>

<style lang="scss" scoped></style>
