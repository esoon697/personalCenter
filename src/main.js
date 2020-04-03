// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
// import {
//   Button,
//   Message,
//   MessageBox,
//   Loading,
//   Dialog,
//   Popover,
//   Submenu,
//   MenuItem,
//   Menu
// } from 'element-ui'
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
// Vue.use(Message)
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

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
