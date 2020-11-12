import Layout from '@/pages/Layout'

const work = {
  path: '/work',
  component: Layout,
  name: 'WorkManage',
  meta: { title: '工作台', icon: 'el-icon-menu' },
  children: [
    {
      path: 'index',
      name: 'workBoard',
      component: () => import('@/pages/work/index'),
      meta: { title: '工作台', icon: 'el-icon-tickets' },
      auth: 'WORK_BENCH'
    },
    {
      path: 'trail',
      name: 'Trail',
      component: () => import('@/pages/work/trail'),
      meta: { title: '客户拜访轨迹', icon: 'el-icon-tickets' },
      auth: 'CUSTOMER_VISIT_TRAJECTORY'
    },
    {
      path: 'data',
      name: 'StoreData',
      component: () => import('@/pages/work/storeData'),
      meta: { title: '门店数据', icon: 'el-icon-tickets' },
      auth: 'STORE_DATA'
    }
  ]
}

export default work
