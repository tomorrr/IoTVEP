/*
 * @FilePath: \back-web\src\request\myAxios.js
 * @Author: Solitude-DDD
 * @Date: 2022-08-13 23:07:28
 * @Description: 简单封装axios
 */
import router from '@/router'
import axios from 'axios'
const baseURL = 'http://127.0.0.1:4523/m1/2585213-0-default'

export async function myAxios(method, url, Data, header) {
  // 形参说明：方法、接口地址后缀、处理成json格式的数据
  if (method == 'get') {
    const { data: res } = await axios.get(baseURL + url, { params: Data })
    return res
  } else {
    if (header == { 'Content-Type': 'multipart/form-data' }) {
      const { data: res } = await axios({
        method: method,
        url: baseURL + url,
        headers: header,
        data: Data,
      })
      return res
    } else {
      const { data: res } = await axios({
        method: method,
        url: baseURL + url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: Data,
      })
      return res
    }
  }
}

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器:
/* 如果判断为未登录(401)则删除重置token
 * localStorage.removeItem('token');
 * this.$router.push('/login')
 */
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.data.code === 401) {
      localStorage.removeItem('token') // 删除已经失效或过期的token
      router.replace({
        path: '/login', // 到登录页重新获取token
      })
    }
    return Promise.reject(error)
  }
)
