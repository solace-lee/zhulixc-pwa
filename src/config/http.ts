import axios from 'axios'
import { configApi } from '@/config/config.ts'
// import store from '@/vuex/store.js'
import router from '../router'

let http = axios.create()
http.defaults.baseURL = configApi.home
http.defaults.timeout = 5000
http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

// 请求拦截
http.interceptors.request.use((config: { headers?: any }) => {
  // 如果有token,添加到请求报文 后台会根据该报文返回status
  const token:string | boolean = window.localStorage.getItem('token') || false
  if (token) {
    config.headers.ZLXC_TOKEN = token
  }
  return config
},

(error: { response: { status: string; }; }) => {
  // 对请求错误做些什么
  const toast = '网络错误,请稍后再试(' + error.response.status + ')'
  // store.commit('SET_LOADING', toast);
  setTimeout(() => {
    // store.commit('SET_LOADING', true);
  }, 300)
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response: any) {
  // 对响应数据做点什么
  // 加到时器主要是为了 展示Loading效果 项目中应去除
  // setTimeout(() => {
  // store.commit('SET_LOADING', false);
  // }, 300)
  return response
},

// 对响应错误做点什么
function (error: { response: { status: string | number; }; }) {
  // console.log(error);
  if (error.response) {
    // 如果返回401 即没有权限，跳到登录页重新登录
    if (error.response.status === 401) {
      // store.commit('CHANGE_TOKEN', 0);
      // if (window.localStorage.getItem('token')) {
      //   window.localStorage.removeItem('token')
      // }
      // router.replace({
      //   path: '/login',
      //   query: {
      //     redirect: router.currentRoute.fullPath
      //   }
      // })
    } else {
      const toast = '网络错误,请稍后再试(' + error.response.status + ')'
      // store.commit('SET_LOADING', toast);
      setTimeout(() => {
        // store.commit('SET_LOADING', true);
      }, 300)
    }
  }

  return Promise.reject(error)
})

export default http
