/*
 * @FilePath: \wxprogrom-back-web\src\router\index.js
 * @Author: Solitude-DDD
 * @Date: 2022-07-15 00:26:17
 * @Description: 引入各级路由页面或组件
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'
import LoginPage from '@/views/LoginPage'
// import Activity from '@/views/ClubActivity'
import Presence from '@/views/ClubPresence'
import RegStu from '@/views/RegisterStu'
// import RegClub from '@/views/RegisterClub'
// import RegAct from '@/views/RegisterAct'
import MainPage from '@/views/MainPage'

Vue.use(VueRouter)

const routes = [
  // 初始页面
  { path: '/', redirect: '/home' },
  // 页面配置
  {
    name: 'home',
    path: '/home',
    component: HomePage,
    redirect: '/home/main',
    children: [
      {
        name: 'mainPage',
        path: '/home/main',
        component: MainPage,
      },
      {
        name: 'presence',
        path: '/home/presence',
        component: Presence,
      },
      {
        name: 'regStu',
        path: '/home/regStu',
        component: RegStu,
      },
      // {
      //   name: 'regClub',
      //   path: '/home/regClub',
      //   component: RegClub,
      // },
      // {
      //   name: 'regAct',
      //   path: '/home/regAct',
      //   component: RegAct,
      // },
    ],
  },
  { name: 'login', path: '/login', component: LoginPage },
]

const router = new VueRouter({ linkActiveClass: 'open', routes })

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next()
//   } else {
//     let token = localStorage.getItem('token')
//     if (token === null || token === '') {
//       next('/login')
//     } else {
//       next()
//     }
//   }
// })

export default router
