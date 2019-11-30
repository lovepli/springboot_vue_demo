import ElementUI from 'element-ui' //新添加
import 'element-ui/lib/theme-chalk/index.css' //新添加，避免后期打包样式不同，要放在import App from './App';之前
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import moment from 'moment'//导入文件


// 引用axios，并设置基础URL为后端服务api地址
var axios = require('axios')
//axios.defaults.baseURL = 'https://localhost:8443/api'   // 描述：支持跨域請求的文件
axios.defaults.baseURL = 'http://localhost:8443/api'
// 将API方法绑定到全局
Vue.prototype.$axios = axios
Vue.use(ElementUI)   //安装添加饿了么UI



// 绑定 moment 进行时间格式化 ✔
Vue.prototype.$moment = moment;//赋值使用

// 绑定 vue-resource（ajax）
Vue.use(VueResource)

// 如果我们通过全局配置了，请求的数据接口 根域名，则 ，在每次单独发起 http 请求的时候，请求的 url 路径，应该以相对路径开头，前面不能带 /  ，否则 不会启用根路径做拼接；
//Vue.http.options.root = 'http://120.79.197.130:8080/';
// 全局启用 emulateJSON 选项:如果Web服务器无法处理编码为application/json的请求，你可以启用emulateJSON选项。
Vue.http.options.emulateJSON = true;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
