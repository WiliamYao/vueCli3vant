import Vue from 'vue'
import App from './App.vue'
import { router } from './router/router';
import store from './store/store'
import Axios from 'axios'
import  qs from "qs"
import "amfe-flexible";
import './vant/vant'
import 'amfe-flexible/index.js'
Vue.config.productionTip = false

Vue.prototype.$axios = Axios
Vue.prototype.HOST = '/api'
// Axios.defaults.baseURL = 'https://112.29.169.12:7083/portal-wap/noLogin/';
Axios.defaults.baseURL = 'https://www.ahwxcs.com/wap/noLogin/';
//Axios.defaults.baseURL = 'https://a.ahwxcs.com/wap';

// https://a.ahwxcs.com/wap/publish/wap/resource/noLogin/H5/UICenter/Login.html

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加请求拦截器

Axios.interceptors.request.use(function (config) {

    if (config.method == "post" || config.method == "get") {
        config.data = qs.stringify(config.data);
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {

    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
