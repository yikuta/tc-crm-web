import Layout from '@/pages/Layout'
import ChildLayout from '@/pages/Layout/ChildLayout'

const supplier = {
  path: 'supplier',
  component: Layout,
  name: 'Supplier',
  meta: { title: '供应商管理', icon: 'el-icon-s-management' },
  auth: '',
  children: [
    {
      path: '/supplier/manage',
      redirect: '/supplier/manage/list',
      name: 'SupplierManage',
      component: ChildLayout,
      children: [
        {
          path: 'list',
          name: 'SupplierList',
          meta: { title: '供应商列表', icon: 'el-icon-tickets' },
          component: () => import('@/pages/supplier/list')
        }
      ]
    }
  ]
}

export default supplier
