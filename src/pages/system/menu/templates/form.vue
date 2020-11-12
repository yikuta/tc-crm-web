<template>
  <dialog-modal :title="formInfo.id ? '编辑菜单' : '新建菜单'" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" showClose @success="handleSubmit">
    <el-form label-width="100px" size="mini" :model="formInfo" :rules="rules" ref="form">
      <el-form-item label="上级菜单" prop="parentId">
        <div v-if="child || formInfo.id">{{ formInfo.parentMenuName || '无' }}</div>
        <div v-else>
          <el-cascader
            :disabled="!!formInfo.id || child"
            v-model="menuIds"
            :options="menuList"
            placeholder="请选择上级菜单(不选默认则表示根目录)"
            :props="props"
            style="width: 100%"
            ref="parentMenu"
            clearable
            @change="handleMenuChange"
          ></el-cascader>
          <span class="text-sm text-seat">只有目录和菜单才能作为上级菜单</span>
        </div>
      </el-form-item>
      <el-form-item label="菜单类型" required>
        <el-radio-group v-model="formInfo.menuType">
          <el-radio label="CATALOG" :disabled="(parentMenu !== 'CATALOG' && !!menuIds.length) || !!formInfo.id">目录</el-radio>
          <el-radio label="MENU" :disabled="(parentMenu !== 'CATALOG' && !!menuIds.length) || !!formInfo.id">菜单</el-radio>
          <el-radio label="PAGE" :disabled="(parentMenu === 'CATALOG' && !!menuIds.length) || !!formInfo.id">页面</el-radio>
        </el-radio-group>
        <div class="text-sm text-seat">目录和菜单会展示在左侧菜单栏，页面只能在菜单页面中展示上级菜单为“目录”时只能添加目录或菜单，上级菜单为“菜单”时只能添加页面</div>
      </el-form-item>
      <el-form-item label="菜单名称" prop="menuName">
        <el-input placeholder="请输入菜单名称" v-model="formInfo.menuName" :maxLength="30"></el-input>
      </el-form-item>
      <el-form-item label="授权标识" prop="permissionIdentification">
        <el-input placeholder="请输入授权标识" v-model="formInfo.permissionIdentification"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序" prop="displayOrdernum">
        <el-input-number v-model="formInfo.displayOrdernum" :min="1" :max="999" label="设置显示顺序" size="mini"></el-input-number>
      </el-form-item>
      <el-form-item label="菜单图标" prop="menuIcon">
        <el-input placeholder="请输入图标代码" v-model="formInfo.menuIcon" :maxLength="200"></el-input>
        <div class="text-sm text-seat">获取图标请访问：http://fontawesome.io/icons/</div>
      </el-form-item>
      <el-form-item label="备注说明">
        <el-input placeholder="请输入备注说明" v-model="formInfo.remark" :maxLength="200" type="textarea"></el-input>
      </el-form-item>
    </el-form>
  </dialog-modal>
</template>

<script>
  import DialogModal from '@/components/Dialog/index.vue'
  import { saveMenuList, updateMenu, getMenuDetail, getMenuList } from '@/api/system/menu'
  export default {
    name: 'MenuForm',
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
      },
      child: { // 是否添加子级
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogVisible: false,
        formInfo: {
          menuId: null,
          creatorId: this.$store.getters.userInfo.userId, // 创建者 id
          parentId: null,
          menuType: '', // 菜单类型['CATALOG', 'MENU', 'PAGE']
          menuName: '',
          permissionIdentification: '', // 标识
          displayOrdernum: 1, // 显示顺序
          menuIcon: '',
          remark: ''
        },
        rules: {
          parentId: [
            { required: true, message: '请选择上级菜单', trigger: 'blur' }
          ],
          menuName: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { pattern: /^[0-9a-zA-Z\u4e00-\u9fa5 ]+$/, message: '请输入正确的菜单名称', trigger: true },
            { pattern: /^\S+/, message: '菜单名称不能包含空格', trigger: true }
          ],
          permissionIdentification: [
            { required: true, message: '请输入标识名称', trigger: 'blur' }
          ],
          displayOrdernum: [
            { required: true, message: '请输入显示顺序', trigger: 'blur' }
          ],
          menuIcon: [
            { required: true, message: '请输入图标名称', trigger: 'blur' }
          ]
        },
        menuList: [], // 缓存的菜单列表
        menuIds: [], // id 列表
        props: {
          children: 'children',
          label: 'menuName',
          value: 'menuId',
          clearable: true,
          checkStrictly: true,
          lazy: true,
          lazyLoad: this.getMenuList
        },
        parentMenu: '' // 上级菜单的名称
      }
    },
    watch: {
      visible(n) {
        this.dialogVisible = this.visible
        if (n) {
          this.reset()
          this.dealForm()
        }
      },
      dialogVisible(n) {
        this.$emit('update:visible', n)
      }
    },
    methods: {
      handleSubmit(done) {
        // 确定
        if (this.form && !this.child) {
          this.formInfo.parentId = '0'
        } else {
          this.formInfo.parentId = this.menuIds[this.menuIds.length - 1] || ''
        }
        this.$refs.form.validate(result => {
          if (result) {
            const fn = this.formInfo.id ? updateMenu : saveMenuList
            fn(this.formInfo).then(res => {
              this.$notify.success('保存成功')
              this.$emit('success')
              this.$emit('update:visible', false)
            })
          }
        })
      },
      getMenuList(node, resolve) {
        getMenuList({
          menuName: '',
          parentId: node && node.data ? node.data.menuId : '',
          status: true
        }).then(res => {
          res.result.forEach(item => {
            item.leaf = !item.hasChildrenList
            item.disabled = item.menuType === 'PAGE'
          })
          if (node && node.data && node.data.menuId) {
            node.data.children = res.result
            resolve && resolve(res.result)
          } else {
            this.menuList = res.result
          }
        })
      },
      dealForm() {
        // 处理表单数据
        if (this.form) {
          if (this.child) {
            // 处理基础数据
            this.formInfo.parentId = this.form.menuId
            this.formInfo.parentMenuName = this.form.menuName
            this.parentMenu = this.form.menuType
            this.menuIds = [this.form.menuId]
            // 处理菜单类型选项
            if (this.form.menuType === 'MENU') {
              this.formInfo.menuType = 'PAGE'
            }
          } else {
            getMenuDetail(this.form.menuId).then(res => {
              this.formInfo = {
                ...res.result,
                id: this.form.menuId
              }
              this.parentMenu = res.result.menuType
            })
          }
        } else {
          this.reset()
        }
      },
      handleMenuChange(val) {
        // 选择了上级菜单 ['CATALOG', 'MENU', 'PAGE']
        const nodes = this.$refs.parentMenu.getCheckedNodes()
        if (!nodes.length) {
          this.parentMenu = ''
        } else {
          this.parentMenu = nodes[0].data.menuType
          // 如果上级菜单是菜单，只能选择页面
          if (this.parentMenu === 'MENU') {
            this.formInfo.menuType = 'PAGE'
          }
          // 如果上级菜单是目录，不能选择页面
          if (this.parentMenu === 'CATALOG' && this.formInfo.menuType === 'PAGE') {
            this.formInfo.menuType = 'CATALOG'
          }
        }
      },
      reset() {
        this.formInfo = {
          menuId: null,
          creatorId: this.$store.getters.userInfo.userId, // 创建者 id
          parentId: null,
          menuType: 'CATALOG', // 菜单类型['CATALOG', 'MENU', 'PAGE']
          menuName: '',
          permissionIdentification: '', // 标识
          displayOrdernum: 1, // 显示顺序
          menuIcon: '',
          remark: ''
        }
        this.parentMenu = ''
        this.menuIds = []
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
