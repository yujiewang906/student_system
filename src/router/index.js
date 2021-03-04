import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import User from '@/components/User'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/user',
      name: 'User',
      component: User
    },{
      path: '/',
      name: 'login',
      component: Login
    }
  ]
})
