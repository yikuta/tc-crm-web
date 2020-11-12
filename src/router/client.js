import Layout from '@/pages/Layout'

const client = {
  path: '/client',
  component: Layout,
  name: 'ClientManage',
  meta: { title: '客户管理', icon: 'el-icon-s-custom' },
  auth: '',
  children: [
    {
      path: 'index',
      name: 'ClientList',
      component: () => import('@/pages/client/index'),
      meta: { title: '客户列表', icon: 'el-icon-tickets' },
      auth: 'CUSTOMER_LIST'
    },
    {
      path: 'form',
      name: 'ClientForm',
      hidden: true,
      component: () => import('@/pages/client/form'),
      meta: { title: '新建客户', icon: 'el-icon-tickets', noCache: true },
      auth: 'SAVE_CUSTOMER'
    },
    {
      path: 'form/:id',
      name: 'ClientFormEdit',
      hidden: true,
      component: () => import('@/pages/client/form'),
      meta: { title: '编辑客户', icon: 'el-icon-tickets', noCache: true },
      auth: 'UPDATE_CUSTOMER'
    },
    {
      path: 'merge',
      name: 'ClientMerge',
      hidden: true,
      component: () => import('@/pages/client/merge'),
      meta: { title: '合并客户', icon: 'el-icon-tickets', noCache: true },
      auth: 'MERGE_CUSTOMER'
    },
    {
      path: 'detail/:id',
      name: 'ClientDetail',
      hidden: true,
      component: () => import('@/pages/client/detail'),
      meta: { title: '客户详情', icon: 'el-icon-tickets', noCache: true },
      auth: 'CUSTOMER_DETAIL'
    },
    {
      path: 'highSea',
      name: 'HighSeaList',
      component: () => import('@/pages/client/highSea'),
      meta: { title: '公海', icon: 'el-icon-tickets' },
      auth: 'CUSTOMER_OPENSEA_LIST'
    },
    {
      path: 'log',
      name: 'ClientLog',
      component: () => import('@/pages/client/log'),
      meta: { title: '公海日志', icon: 'el-icon-tickets' },
      hidden: true
    }
  ]
}

export default client
