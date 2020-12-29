import { createRouter, createWebHistory } from 'vue-router'
import managerLayout from '@/layout/managerLayout.vue'
import baseLayout from '@/layout/baseLayout.vue'

const routes = [
  {
    path     : '/',
    name     : '/',
    redirect : { name: 'manage_welcome' }
  },
  {
    path      : '/base',
    name      : 'base',
    redirect  : { name: 'base_welcome' },
    component : baseLayout,
    children  : [
      {
        path      : 'welcome',
        name      : 'base_welcome',
        meta      : { title: '欢迎页' },
        component : () => import('@/views/welcome')
      }
    ]

  },
  {
    path      : '/manage',
    name      : 'manage',
    meta      : { title: '' },
    redirect  : { name: 'manage_welcome' },
    component : managerLayout,
    children  : [
      {
        path      : 'welcome',
        name      : 'manage_welcome',
        meta      : { title: '欢迎页' },
        component : () => import('@/views/welcome')
      },
      {
        path      : 'demo',
        name      : 'manage_demo',
        meta      : { title: '测试页面' },
        component : () => import('@/views/demo')
      },
      {
        path      : 'lessonSchedule',
        name      : 'manage_lessonSchedule',
        meta      : { title: '全部课表' },
        component : () => import('@/views/LessonSchedule')
      }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
