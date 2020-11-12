<template>
  <dialog-modal title="菜单详情" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="first">
        <el-row>
          <el-col :span="12" class="padding-bottom-sm">
            <el-col :span="8" class="text-right">菜单名称：</el-col>
            <el-col :span="16" class="text-second">{{ menuDetail.menuName }}</el-col>
          </el-col>
          <el-col :span="12" class="padding-bottom-sm">
            <el-col :span="8" class="text-right">上级菜单：</el-col>
            <el-col :span="16" class="text-second">{{ menuDetail.parentMenuName || '顶级' }}</el-col>
          </el-col>
          <el-col :span="12" class="padding-bottom-sm">
            <el-col :span="8" class="text-right">层级：</el-col>
            <el-col :span="16" class="text-second">{{ menuDetail.hierarchy || 0 }}</el-col>
          </el-col>
          <el-col :span="12" class="padding-bottom-sm">
            <el-col :span="8" class="text-right">显示顺序：</el-col>
            <el-col :span="16" class="text-second">{{ menuDetail.displayOrdernum || 0 }}</el-col>
          </el-col>
          <el-col :span="12" class="padding-bottom-sm">
            <el-col :span="8" class="text-right">菜单类型：</el-col>
            <el-col :span="16" class="text-second">{{ menuDetail.menuType }}</el-col>
          </el-col>
          <el-col :span="12" class="padding-bottom-sm">
            <el-col :span="8" class="text-right">状态：</el-col>
            <el-col :span="16" class="text-second">
              <el-badge is-dot class="badge-item" :type="menuDetail.enable ? 'success' : 'danger'"></el-badge>
              <span>{{menuDetail.enable ? '正常' : '停用'}}</span>
            </el-col>
          </el-col>
          <el-col :span="12" class="padding-bottom-sm">
            <el-col :span="8" class="text-right">绑定角色：</el-col>
            <el-col :span="16" class="text-second">{{ menuDetail.bindRoleCount }}</el-col>
          </el-col>
          <el-col :span="12" class="padding-bottom-sm">
            <el-col :span="8" class="text-right">菜单图标：</el-col>
            <el-col :span="16" class="text-second">{{ menuDetail.menuIcon }}</el-col>
          </el-col>
          <el-col :span="12" class="padding-bottom-sm">
            <el-col :span="8" class="text-right">权限标识：</el-col>
            <el-col :span="16" class="text-second">{{ menuDetail.permissionIdentification }}</el-col>
          </el-col>
          <el-col :span="12" class="padding-bottom-sm">
            <el-col :span="8" class="text-right">备注说明：</el-col>
            <el-col :span="16" class="text-second">{{ menuDetail.remark }}</el-col>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="绑定角色" name="second">
        <el-tag v-for="(item, index) in menuBindRoleList" :key="index" type="danger" size="mini">{{ item.roleName }}</el-tag>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer">
      <el-button size="mini" @click="close" type="primary">确定</el-button>
    </div>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  import { getMenuDetail, getBindMenuRoleList } from '@/api/system/menu'
  export default {
    name: 'MenuDetail',
    components: {
      DialogModal
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
        activeName: 'first',
        dialogVisible: false,
        menuDetail: {
          bindRoleCount: 0,
          displayOrdernum: 0,
          enable: true,
          hierarchy: 1,
          isSelect: false,
          memberId: null,
          menuIcon: '',
          menuName: '',
          menuType: '',
          parentMenuName: null,
          permissionIdentification: '',
          remark: ''
        },
        menuBindRoleList: [] // 菜单绑定的角色列表
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        if (n) {
          this.getDetail()
        }
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      getDetail() {
        getMenuDetail(this.form.menuId).then(res => {
          if (res.code === 200) {
            this.menuDetail = res.result
          }
        })
        getBindMenuRoleList(this.form.menuId).then(res => {
          if (res.code === 200) {
            this.menuBindRoleList = res.result
          }
        })
      },
      handleClick() {},
      close() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
