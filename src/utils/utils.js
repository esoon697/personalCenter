// const STORAGE_KEY = 'userinfo'
import Vue from 'vue'

// 判断数据是否为空
Vue.prototype.isblank = function (chr) {
  if (chr === null || chr === '' || chr === undefined || chr === 'undefined' || chr === 'null' || chr.length === 0) {
    return true
  };
  chr = chr.toString()
  chr = chr.replace(/(^\s*)|\s*$/g, '')
  if (chr === null || chr === '' || chr === undefined || chr === 'undefined' || chr === 'null' || chr.length === 0) {
    return true
  };
  return false
}
Vue.prototype.storageGet = function (key, type = 'localStorage') {
  if (type === 'localStorage') {
    return JSON.parse(window.localStorage.getItem(key) || '[]')
  } else if (type === 'sessionStorage') {
    return JSON.parse(window.sessionStorage.getItem(key) || '[]')
  } else {
    alert('type error')
  }
}
Vue.prototype.storageSet = function (key, value, type = 'localStorage') {
  if (type === 'localStorage') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else if (type === 'sessionStorage') {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }
}
