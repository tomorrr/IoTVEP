<template>
  <div class="background" style="width: 100%; height: 100%">
    <div class="background-white">
      <div class="stu_title_two">智云首页</div>
    </div>
    <div style="padding-top: 20px"></div>
    <div class="background-white stuverify">
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div>
              <el-statistic group-separator="," :precision="2" :value="value2" :title="title">
                <template slot="prefix"> <i class="el-icon-s-flag" style="color: red"></i> </template
              ></el-statistic>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-statistic title="平台项目数量">
                <template slot="formatter"> 321 </template>
              </el-statistic>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-statistic :value="like ? 521 : 520" title="平台传感器设备数量">
                <template slot="suffix">
                  <span @click="like = !like" class="like">
                    <i class="el-icon-star-on" style="color: red" v-show="!!like"></i>
                    <i class="el-icon-star-off" v-show="!like"></i>
                  </span>
                </template>
              </el-statistic>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-statistic title="我的项目数量">
                <template slot="formatter"> 1 </template>
              </el-statistic>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
// import { myAxios } from '@/request/myAxios'
export default {
  data() {
    return {
      like: true,
      value1: 4154.564,
      value2: 2222,
      title: '平台用户数量',
    }
  },
}
</script>
<style scoped>
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
.stu_title_two {
  padding-top: 18px;
  padding-bottom: 18px;
  font-size: 24px;
}
.background-white {
  background-color: white;
}
.stuverify {
  height: 200px;
  padding: 20px;
  margin: 10px;
  border-radius: 15px 15px 15px 15px;
}
</style>
