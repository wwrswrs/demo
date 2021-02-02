// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入vant ui框架
import vantUI from "vant"
Vue.use(vantUI)
//引入css样式
import "vant/lib/index.css"
Vue.config.productionTip = false
//引入公共公式转换的样式
import "./rester"
//引入公共样式
import "./assets/css/reset.css"

//设置图片服务器
Vue.prototype.$imgUrl="http://localhost:3000"


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
