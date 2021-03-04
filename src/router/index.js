import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import User from '@/components/User'
import One from '@/components/One'
import Student from '@/components/Student'
import Log from '@/components/Log'

Vue.use(Router)

export default new Router({

  routes: [

    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/one',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/One.vue'),
          meta: { title: '系统首页' }
        },{
          path: '/user',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/User.vue'),
          meta: { title: '用户管理' }
        },{
          path: '/student',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/Student.vue'),
          meta: { title: '学生管理' }
        },{
          path: '/log',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/Log.vue'),
          meta: { title: '日志管理' }
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../components/Login.vue'),
      meta: { title: '登录' }
    },
  ]




})
