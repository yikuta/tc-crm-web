import Layout from '@/pages/Layout'

const thread = {
  path: '/thread',
  component: Layout,
  name: 'ThreadManage',
  meta: { title: '线索管理', icon: 'el-icon-s-data' },
  children: [
    {
      path: 'index',
      name: 'ThreadList',
      component: () => import('@/pages/thread/index'),
      meta: { title: '销售线索', icon: 'el-icon-tickets' },
      auth: 'CUSTOMER_RESOURCE'
    },
    {
      path: 'form',
      hidden: true,
      name: 'ThreadForm',
      component: () => import('@/pages/thread/form'),
      meta: { title: '新建线索', icon: 'el-icon-tickets', noCache: true },
      auth: 'CREATE_CUSTOMER_RESOURCE'
    },
    {
      path: 'editForm',
      hidden: true,
      name: 'ThreadFormById',
      component: () => import('@/pages/thread/form'),
      meta: { title: '编辑线索', icon: 'el-icon-tickets', noCache: true },
      auth: 'UPDATE_CUSTOMER_RESOURCE'
    },
    {
      path: 'merge',
      hidden: true,
      name: 'ThreadMerge',
      component: () => import('@/pages/thread/merge'),
      meta: { title: '线索合并', icon: 'el-icon-tickets', noCache: true },
      auth: 'MERGE_CUSTOMER_RESOURCE'
    },
    {
      path: 'conversion',
      hidden: true,
      name: 'ThreadConversion',
      component: () => import('@/pages/thread/conversion'),
      meta: { title: '线索转换客户', icon: 'el-icon-tickets', noCache: true },
      auth: 'RESOURCE_CHANGE_TO_CUSTOMER'
    },
    {
      path: 'pool',
      name: 'ThreadPool',
      component: () => import('@/pages/thread/pool'),
      meta: { title: '线索池', icon: 'el-icon-tickets' },
      auth: 'CUSTOMER_RESOURCE_POOL'
    },
    {
      path: 'poolLog',
      name: 'ThreadPoolLog',
      component: () => import('@/pages/thread/log'),
      meta: { title: '线索池日志', icon: 'el-icon-tickets' },
      auth: 'CUSTOMER_RESOURCE_POOL'
    },
    {
      path: 'detail',
      hidden: true,
      name: 'ThreadDetail',
      component: () => import('@/pages/thread/detail'),
      meta: { title: '线索详情', icon: 'el-icon-tickets', noCache: true },
      auth: 'CUSTOMER_RESOURCE_DETAIL'
    }
  ]
}

export default thread
