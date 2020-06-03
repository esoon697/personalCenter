// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import api from './axios/api'
// 引入工具文件
import './utils/utils'
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
  Radio,
  RadioGroup,
  RadioButton,
  Tree,
  Table,
  TableColumn,
  Select,
  Option,
  Pagination,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  Upload,
  Checkbox,
  Carousel,
  CarouselItem,
  DatePicker,
  TimeSelect,
  TimePicker,
  Cascader,
  Switch
} from 'element-ui'
import '../static/theme/index.css'

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
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(RadioButton.name, RadioButton)
Vue.component(Tree.name, Tree)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Pagination.name, Pagination)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Upload.name, Upload)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)
Vue.component(DatePicker.name, DatePicker)
Vue.component(TimeSelect.name, TimeSelect)
Vue.component(TimePicker.name, TimePicker)
Vue.component(Cascader.name, Cascader)
Vue.component(Switch.name, Switch)
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$loading = Loading.service

// vue全局注入echarts
Vue.prototype.$echarts = echarts

// 将api挂载到vue的原型上
Vue.prototype.$api = api

Vue.config.productionTip = false

const base = 'http://182.148.48.236:54321/source/personalCenter/'
Vue.prototype.base = base

// let currentURL = null
// let targetURL = null
// let comeBackURL = null
let orient = window.location.href
Vue.prototype.orient = orient
if (process.env.NODE_ENV == 'development') {
  // dev开发环境
  let currentURL = 'http://10.10.10.213:8080/centerIndex'
  let targetURL = 'http://10.10.10.213:5000/login'
  let comeBackURL = 'http://nys.yazhuokj.com/home'
  Vue.prototype.currentURL = currentURL
  Vue.prototype.targetURL = targetURL
  Vue.prototype.comeBackURL = comeBackURL
} else if (process.env.NODE_ENV == 'production') {
  // build生产环境
  let currentURL = 'http://personal.yazhuokj.com/centerIndex'
  let targetURL = 'http://portal.yazhuokj.com/login'
  let comeBackURL = 'http://edu.yazhuokj.com/home'
  Vue.prototype.currentURL = currentURL
  Vue.prototype.targetURL = targetURL
  Vue.prototype.comeBackURL = comeBackURL
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
