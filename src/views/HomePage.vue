<!--
 * @FilePath: \wxprogrom-back-web\src\views\HomePage.vue
 * @Author: Solitude-DDD
 * @Date: 2022-08-19 21:38:01
 * @Description: 后台主页面
-->
<template>
  <div class="container">
    <div class="side">
      <div class="side-header">沈理社团后台管理系统</div>
      <!-- 初版：
      <div class="accordion">
        <input id="collapse1" type="radio" name="tap-input" hidden />
        <input id="collapse2" type="radio" name="tap-input" hidden />
        <article>
          <label for="collapse1">发布</label>
          <router-link to="/home/active"><p>社团活动</p></router-link>
          <router-link to="/home/presence"><p>社团风采</p></router-link>
        </article>
        <article>
          <label for="collapse2">报名</label>
          <router-link to="/home/regClub"><p>社团报名信息展示</p></router-link>
          <router-link to="/home/regStu"><p>学生社团报名信息展示</p></router-link>
          <router-link to="/home/regAct"><p>各活动报名信息展示</p></router-link>
        </article>
      </div> -->
      <el-row class="tac">
        <el-col :span="12" style="width: 100.4%">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :unique-opened="false"
            background-color="rgba(0, 21, 41, 1)"
            text-color="#ffffff"
          >
            <el-menu-item index="1">
              <span slot="title"><router-link to="/home/main">智云首页</router-link></span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title"><span>传感设备</span></template>
              <!-- <router-link to="/home/active"><el-menu-item index="2-1">社团活动</el-menu-item></router-link> -->
              <router-link to="/home/presence"><el-menu-item index="2-1">传感设备展示</el-menu-item></router-link>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><span>项目管理</span></template>
              <!-- <router-link to="/home/regClub"><el-menu-item index="3-1">社团报名信息展示</el-menu-item></router-link> -->
              <router-link to="/home/regStu"><el-menu-item index="3-1">学生社团报名信息展示</el-menu-item></router-link>
              <!-- <router-link to="/home/regAct"><el-menu-item index="3-3">各活动报名信息展示</el-menu-item></router-link> -->
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="main"><router-view></router-view></div>
  </div>
</template>

<script>
export default {}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

.container {
  display: flex;
}

.side {
  background-color: rgba(0, 21, 41, 1);
  width: 250px;
  min-height: 100vh;
}

.side-header {
  width: 250px;
  height: 65px;
  text-align: center;
  line-height: 65px;
  background-color: #100164;
  color: white;
  font-weight: 700;
}

.main {
  width: 100%;
  min-height: 100vh;
}

.router-link-active {
  text-decoration: none;
  color: #fff;
}

a {
  text-decoration: none;
  color: #fff;
}

el-menu-item {
  display: block;
}

/* 初版样式：
.accordion {
  width: 250px;
}
.accordion article {
  cursor: pointer;
}
.accordion label {
  display: block;
  text-indent: 2em;
  height: 40px;
  background-color: rgba(0, 21, 41, 1);
  cursor: pointer;
  line-height: 40px;
  font-size: 16px;
  color: #fff;
}
.accordion a {
  text-decoration: none;
}
.accordion p {
  overflow: hidden;
  text-indent: 2em;
  margin: 0;
  border: 1px solid black;
  background-color: #000c17;
  color: #cccccc;
  border-top: none;
  border-bottom-width: 0;
  max-height: 0;
  line-height: 40px;
  font-size: 14px;
  transition: all 0.5s ease;
}
.open p {
  background-color: #1890ff;
  color: #ffffff;
}
input:nth-child(1):checked ~ article:nth-of-type(1) p,
input:nth-child(2):checked ~ article:nth-of-type(2) p {
  border-bottom-width: 1px;
  max-height: 130px;
}*/
</style>
