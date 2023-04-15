<!--
 * @FilePath: \wxprogrom-back-web\src\views\LoginPage.vue
 * @Author: Solitude-DDD
 * @Date: 2022-07-15 01:08:56
 * @Description: 后台登录页面
-->
<template>
  <div id="Login" class="login">
    <div class="login-main-container">
      <!-- 切换登录方式 -->
      <el-row class="header-container" type="flex" justify="end" v-if="stutes">
        <span class="header-content" @click="changeStatus('email')">切换邮箱</span>
      </el-row>
      <el-row class="header-container" type="flex" justify="end" v-else>
        <span class="header-content" @click="changeStatus('user')">切换账号</span>
      </el-row>
      <h2>沈理社团后台管理</h2>
      <!-- 账号密码登录 -->
      <el-form
        v-if="stutes"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="50px"
        style="margin-right: 50px"
      >
        <el-form-item prop="username">
          <el-input placeholder="账号" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 邮箱验证登录 -->
      <el-form
        v-else
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="50px"
        style="margin-right: 50px"
      >
        <el-form-item prop="email">
          <el-input placeholder="邮箱" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="verification">
          <el-row type="flex" align="center" justify="space-between">
            <el-input
              style="width: 60%"
              placeholder="验证码"
              v-model="ruleForm.verification"
              autocomplete="off"
            ></el-input>
            <el-button style="width: 35%" plain v-show="show" @click="getCode">获取验证码</el-button>
            <el-button style="width: 35%" plain v-show="!show">{{ count }} S</el-button>
          </el-row>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-button style="width: 340px" type="primary" @click="submitForm('ruleForm')">登 录</el-button>
      </el-row>
      <el-row class="footer-content" type="flex" justify="center">来自 琴理工作室</el-row>
    </div>
  </div>
</template>

<script>
import { myAxios } from '@/request/myAxios'
import { mapMutations } from 'vuex'
export default {
  data() {
    // 验证输入情况
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    let validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        callback()
      }
    }
    let validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        email: '',
        verification: '',
      },
      rules: {
        username: [{ validator: validateName, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        verification: [{ validator: validateCode, trigger: 'blur' }],
      },
      stutes: true, // 记录登录方式
      show: true, // 记录验证码获取情况
      count: '', // 验证码倒计时
      timer: null,
      userToken: '',
    }
  },
  methods: {
    // 调用vuex，存储token
    ...mapMutations(['changeLogin']),
    // 切换登录方式
    changeStatus(data) {
      if (data == 'email') {
        this.stutes = false
      } else if (data == 'user') {
        this.stutes = true
      }
      this.$refs['ruleForm'].resetFields() // 重置
    },
    // 获取验证码
    getCode() {
      if (this.ruleForm.email == '') {
        this.$message('请输入邮箱')
      } else {
        let data = {
          email: this.ruleForm.email,
        }
        myAxios('get', '/EmailCode', data)
          .then((res) => {
            this.$message(res.msg)
            const TIME_COUNT = 60
            if (!this.timer) {
              this.count = TIME_COUNT
              this.show = false
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--
                } else {
                  this.show = true
                  clearInterval(this.timer)
                  this.timer = null
                }
              }, 1000)
            }
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: err.response.data.msg,
              type: 'error',
            })
          })
      }
    },
    // 点击登录
    submitForm(formName) {
      this.$refs[formName]
        .validate()
        .then(() => {
          if (this.stutes == true) {
            let data = {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
            }
            myAxios('post', '/login/user', data)
              .then((res) => {
                this.userToken = res.data.token
                // 将用户token保存到vuex中
                this.changeLogin({ token: this.userToken })
                this.$router.push('/home')
              })
              .catch((err) => {
                this.$message({
                  showClose: true,
                  message: err.response.data.msg,
                  type: 'error',
                })
              })
          } else {
            let data = {
              email: this.ruleForm.email,
              verification: this.ruleForm.verification,
            }
            myAxios('post', '/login/email', data)
              .then((res) => {
                this.userToken = res.data.token
                // 将用户token保存到vuex中
                this.changeLogin({ token: this.userToken })
                this.$router.push('/home')
              })
              .catch((err) => {
                this.$message({
                  showClose: true,
                  message: err.response.data.msg,
                  type: 'error',
                })
              })
          }
        })
        .catch(() => {
          this.$message('请完善您的信息')
        })
    },
  },
}
</script>

<style>
h2 {
  text-align: center;
  color: #1890ff;
}
.login {
  height: 100%;
  min-width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-main-container {
  width: 440px;
  border-radius: 5px;
  background: #f8f8f8;
  box-shadow: 0px 0px 2px 2px #f2f2f2;
}
.header-container {
  padding: 10px 10px 0 10px;
}
.header-content {
  cursor: pointer;
  color: #7f7f7f;
  font-size: 13px;
}
.footer-content {
  margin: 20px 0;
  color: #a1a1a1;
  font-size: 12px;
}
</style>
