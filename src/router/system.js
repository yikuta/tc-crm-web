import Layout from '@/pages/Layout'
import ChildLayout from '@/pages/Layout/ChildLayout'

const system = {
  path: '/system',
  component: Layout,
  name: 'System',
  meta: { title: '系统设置', icon: 'el-icon-setting' },
  auth: '',
  children: [
    {
      path: 'menu',
      name: 'MenuList',
      meta: { title: '菜单管理', icon: 'el-icon-tickets' },
      component: () => import('@/pages/system/menu/index'),
      auth: 'MENU_MANAGE'
    },
    {
      path: 'department',
      name: 'DepartmentList',
      meta: { title: '部门管理', icon: 'el-icon-tickets' },
      component: () => import('@/pages/system/department/index'),
      auth: 'DEPARTMENT_MANAGE'
    },
    {
      path: '/system/role',
      redirect: '/system/role/index',
      name: 'SupplierManage',
      component: ChildLayout,
      meta: { title: '角色管理', icon: 'el-icon-tickets' },
      auth: 'CRM_ROLE_MANAGE',
      children: [
        {
          path: 'index',
          name: 'RoleList',
          meta: { title: '角色管理', icon: 'el-icon-tickets' },
          component: () => import('@/pages/system/role/index'),
          auth: 'CRM_ROLE_MANAGE'
        },
        {
          path: 'auth',
          name: 'AuthList',
          hidden: true,
          meta: { title: '权限管理', icon: 'el-icon-tickets' },
          component: () => import('@/pages/system/role/auth'),
          auth: 'ROLE_PERMISSION_MANAGE'
        },
        {
          path: 'dist',
          name: 'DistList',
          meta: { title: '角色分配列表', icon: 'el-icon-tickets' },
          component: () => import('@/pages/system/role/distList'),
          auth: 'CRM_ROLE_DISTRIBUTION'
        },
        {
          path: 'dist/form',
          name: 'DistForm',
          hidden: true,
          meta: { title: '角色分配', icon: 'el-icon-tickets' },
          component: () => import('@/pages/system/role/distForm'),
          auth: 'DISTRIBUTION_ROLE'
        }
      ]
    },
    {
      path: '/system/message',
      redirect: '/system/message/index',
      name: 'MessageManage',
      component: ChildLayout,
      meta: { title: '消息管理', icon: 'el-icon-tickets' },
      auth: 'MAIL_MANAGE',
      children: [
        {
          path: 'index',
          name: 'MessagesList',
          meta: { title: '站内信管理', icon: 'el-icon-tickets' },
          component: () => import('@/pages/system/message/index'),
          auth: 'MAIL_MANAGE'
        },
        {
          path: 'messageList',
          name: 'MessageList',
          hidden: true,
          meta: { title: '消息列表', icon: 'el-icon-tickets' },
          component: () => import('@/pages/system/message/messageMailList'),
          auth: 'MESSAGE_LIST'
        }
      ]
    },
    {
      path: 'area',
      name: 'AreaSet',
      meta: { title: '区域设置', icon: 'el-icon-tickets' },
      component: () => import('@/pages/system/area/index'),
      auth: 'AREA_MANAGE'
    },
    {
      path: 'dict',
      name: 'DictionaryList',
      meta: { title: '对象字段', icon: 'el-icon-tickets' },
      component: () => import('@/pages/system/dictionary/index'),
      auth: 'OBJECT_FIELD_MANAGE'
    },
    {
      path: '/system/customer',
      name: 'CustomerTemplate',
      meta: { title: '客户模板设置', icon: 'el-icon-tickets' },
      component: ChildLayout,
      auth: 'CUSTOMER_TEMPLATE_MANAGE',
      children: [
        {
          path: 'index',
          name: 'CustomerTemplateList',
          meta: { title: '客户模板设置', icon: 'el-icon-tickets' },
          component: () => import('@/pages/system/customer/template/index')
        },
        {
          path: 'form',
          name: 'CustomerTemplateForm',
          hidden: true,
          meta: { title: '新建模板', icon: 'el-icon-tickets', noCache: true },
          component: () => import('@/pages/system/customer/template/form'),
          auth: 'CREATE_NEW_TEMPLATE'
        },
        {
          path: 'form/:id',
          name: 'CustomerTemplateFormEdit',
          hidden: true,
          meta: { title: '编辑模板', icon: 'el-icon-tickets' },
          component: () => import('@/pages/system/customer/template/form'),
          auth: 'UPDATE_TEMPLATE'
        }
      ]
    },
    {
      path: '/system/highSeas',
      name: 'HighSeasManage',
      meta: { title: '客户公/私海管理', icon: 'el-icon-tickets' },
      component: ChildLayout,
      auth: 'CUSTOMER_OPEN_SEA_MANAGE',
      children: [
        {
          path: 'index',
          name: 'HighSeasList',
          meta: { title: '公/私海管理', icon: 'el-icon-tickets' },
          component: () => import('@/pages/system/highSeas/index'),
          auth: 'CUSTOMER_OPEN_SEA_MANAGE'
        },
        {
          path: 'detail',
          name: 'HighSeasDetail',
          hidden: true,
          meta: { title: '公海详情', icon: 'el-icon-tickets' },
          component: () => import('@/pages/system/highSeas/detail'),
          auth: 'CUSTOMER_OPENSEA_DETAIL'
        }
      ]
    },
    {
      path: 'dataAuth',
      name: 'DataAuth',
      meta: { title: '数据权限设置', icon: 'el-icon-tickets' },
      component: () => import('@/pages/system/auth/data'),
      auth: 'DATA_PERMISSION_CONFIG'
    },
    {
      path: 'log',
      name: 'SystemLog',
      component: () => import('@/pages/system/log/log'),
      meta: { title: 'CRM操作日志', icon: 'el-icon-tickets' },
      auth: 'CRM_OPERATION_LOG'
    },
    {
      path: 'businessConnection',
      name: 'BusinessConnection',
      meta: { title: '业务系统对接', icon: 'el-icon-tickets' },
      component: () => import('@/pages/system/businessConnection/index'),
      auth: 'SYSTEM_BUSINESS_DOCKING_MANAGE'
    }
  ]
}

export default system
