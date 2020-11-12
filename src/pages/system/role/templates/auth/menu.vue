<template>
  <div>
    <el-tree ref="tree" show-checkbox node-key="menuId" :data="menuAuth" :default-checked-keys="defaultCheckedKeys" default-expand-all :expand-on-click-node="false" :props="defaultProps"></el-tree>
    <div class="">
      <el-button type="primary" @click="handleSubmit(1)" size="mini">保存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AuthMenu',
    props: {
      menuAuth: { // 列表
        type: Array,
        default: () => []
      },
      defaultProps: { // 默认节点
        type: Object,
        default: () => {
          return {
            children: 'menuVoList',
            label: 'menuName'
          }
        }
      }
    },
    data() {
      return {
        defaultCheckedKeys: []
      }
    },
    watch: {
      menuAuth: {
        handler() {
          this.init()
        },
        deep: true
      }
    },
    methods: {
      init() {
        // 构建
        const forEach = (lst) => {
          lst.forEach(item => {
            if (item.isSelect) {
              this.defaultCheckedKeys.push(item.menuId)
            }
            if (item.menuVoList && item.menuVoList.length) {
              forEach(item.menuVoList)
            }
          })
        }
        forEach(this.menuAuth)
      },
      handleSubmit() {
        const ids = this.$refs.tree.getCheckedNodes().map(item => {
          return item.menuId
        })
        this.$emit('change', ids)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
