import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 首页
      name: 'home',
      component: Home
    },
    {
      path: '/partA', // partA
      name: 'partA',
      component: () => import('./views/home/partA.vue')
    },
    {
      path: '/classify', // 分类页
      name: 'classify',
      component: () => import('./views/classify/Classify.vue')
    },
    {
      path: '/car', // 购物车
      name: 'car',
      component: () => import('./views/car/Car.vue')
    },
    {
      path: '/me', // 用户中心
      name: 'me',
      component: () => import('./views/me/Me.vue')
    },
    // twh
    {
      path: '/register', // 注册
      name: 'register',
      component: () => import('./views/me/register/register.vue')
    },
    {
      path: '/login', // 注册
      name: 'login',
      component: () => import('./views/me/login/login.vue')
    }
  ]
})
