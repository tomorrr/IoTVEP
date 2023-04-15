/*
 * @FilePath: \wxprogrom-back-web\src\main.js
 * @Author: Solitude-DDD
 * @Date: 2022-07-15 00:26:17
 * @Description: 初始化vue实例并使用需要的插件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
