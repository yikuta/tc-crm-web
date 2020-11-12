import Layout from '@/pages/Layout'

const supplier = {
  path: '/message',
  component: Layout,
  name: 'Message',
  meta: { title: '消息', icon: 'el-icon-s-management' },
  auth: '',
  children: [
    {
      path: 'index',
      name: 'myMessageList',
      meta: { title: '消息', icon: 'el-icon-bell' },
      component: () => import('@/pages/system/message/myMessage'),
      auth: 'MESSAGE_MANAGE'
    },
    {
      path: 'detail/:id',
      name: 'myMessageDetail',
      meta: { title: '消息详情', icon: 'el-icon-bell' },
      component: () => import('@/pages/system/message/myMessageDetail')
    }
  ]
}

export default supplier
