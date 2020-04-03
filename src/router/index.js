import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/HelloWorld'
import Echart from '@/views/echart/echart'
import Tree from '@/views/tree/tree'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    {
      title: '首页',
      path: '/home',
      name: 'Home',
      component: Home,
      children: []
    },
    {
      title: 'Echart',
      path: '/echart',
      name: 'Echart',
      component: Echart,
      children: []
    },
    {
      title: 'Tree',
      path: '/tree',
      name: 'Tree',
      component: Tree,
      children: []
    }
  ]
})
