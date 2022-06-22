import {createApp } from 'vue'
import router from './router'
import axios from 'axios'
import AntD, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from './store'
import App from './App.vue'

// import baseURL from './env'
// import env from './env'
// mock开关
const mock = false
if (mock) {
  require('./mock/api')
}

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
// 接口错误拦截
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {

  var token = localStorage.getItem('token');
  if(token){
    config.headers['token'] = token; // 这样设置，是添加 
   }
   return config
});
axios.interceptors.response.use(
  function(response) {

          // eslint-disable-next-line no-console
          console.log( response)
    if(response.headers.token){
      var token = response.headers.token;
      localStorage.setItem('token',token)
    }
    let res = response.data

            if (typeof(res) == "string"){
              // eslint-disable-next-line no-console
              console.log(res)
             return {"id": -1}
            }
    if (res.status == 0) {
      return res.data
    } else if (res.status == 10) {
      window.location.href = '/#/login'
      return Promise.reject(res)
    } else {
      message.warning(res.message)
      return Promise.reject(res)
    }
  },
  (error) => {
    let res = error.response
    message.error(res.message)
    return Promise.reject(error)
  }
)
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { 
  
      if (sessionStorage.getItem("username") != '' && sessionStorage.getItem("username") != "undefined" && sessionStorage.getItem("username") != null) {
          next();
      } else {  
        message.info("请先登录")
          next({
              path: '/login',
              query: { redirect: from.fullPath }
          })
      }
  } else { 
      next();
  }
})
const app = createApp(App)
app.config.globalProperties.$axios = axios
app
  .use(AntD)
  .use(router)
  .use(store)
  .mount('#app')
