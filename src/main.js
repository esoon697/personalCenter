// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import 'element-ui/lib/theme-chalk/index.css'
// 引入element-ui相关组件
import {
  Button,
  Message,
  MessageBox,
  // Loading,
  Dialog,
  Popover,
  Submenu,
  MenuItem,
  Menu,
  MenuItemGroup,
  Row,
  Col,
  RadioGroup,
  RadioButton,
  Tree
} from 'element-ui'

// 引入ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入折线图/柱状图等组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
require('echarts/lib/chart/radar')
require('echarts/lib/chart/pie')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

Vue.component(Button.name, Button)
Vue.component(Message.name, Message)
Vue.component(MessageBox.name, MessageBox)
// Vue.component(Loading.name, Loading)
Vue.component(Dialog.name, Dialog)
Vue.component(Popover.name, Popover)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(RadioButton.name, RadioButton)
Vue.component(Tree.name, Tree)
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$loading = Loading.service

// vue全局注入echarts
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

const base = 'http://182.148.48.236:54321/source/personalCenter/'
Vue.prototype.base = base

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
