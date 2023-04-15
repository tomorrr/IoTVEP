<!--
 * @Author: panghu 9902348+yang-yirui@user.noreply.gitee.com
 * @Date: 2022-06-19 17:30:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-08 17:00:14
 * @FilePath: \back-web\src\views\ClubPresence.vue
 * @Description: 社团风采发布页
-->
<template class="background">
  <!-- 标题 -->
  <div class="background" style="width: 100%; height: 100%">
    <div class="background-white">
      <div class="stu_title">传感设备/ 传感设备展示</div>
      <div class="stu_title_two">传感设备展示</div>
    </div>
    <div style="padding-top: 20px"></div>
    <div class="background-white stuverify">
      <!-- 搜索 -->
      <div class="search">
        <div>
          社团名称:
          <el-input v-model="name" placeholder="请输入" size="small" style="width: 20vw"></el-input>
        </div>
        <div>
          <el-button type="small" id="btn-search" @click="getmessage()">查询</el-button>
          <el-button
            type="small"
            id="btn-remove"
            @click="
              name = ''
              getmessage()
            "
            >重置</el-button
          >
        </div>
      </div>
      <!-- 社团风采列表 -->
      <div class="main-list">
        <el-row>
          <el-col
            class="list-col"
            :span="4"
            v-for="(o, index) in tableData"
            :key="index"
            :offset="index % 5 != 0 ? 1 : 0"
          >
            <el-card :body-style="{ padding: '-5px' }">
              <div class="main-img-container">
                <img :src="o.cover" class="image" />
              </div>
              <div style="padding: 4px">
                <div class="bottom clearfix">
                  <div class="list-value" style="font-size: 16px; line-height: 18px; justify-content;: center">
                    <span class="list-value-msg" style="width: 100%; text-align: center">{{ o.name }}</span>
                  </div>
                  <hr
                    style="filter: alpha(opacity=100, finishopacity=0, style=3)"
                    width="100%"
                    color="#cccccc"
                    SIZE="1"
                  />
                  <div class="list-value" style="margin: 4px">
                    <span class="list-value-intro">{{ o.intro }}</span>
                  </div>
                  <div class="list-value" style="text-align: end; justify-content: flex-end">
                    <span class="list-value-msg">{{ o.name }}</span>
                  </div>
                  <div class="list-button"></div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- 无数据时背景板 -->
        <div class="no-data-board" v-if="!this.getData_status">
          <span class="board-tig">暂无数据</span>
        </div>
        <!-- 翻页 -->
        <div class="turn-page">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="this.page"
            :page-count="this.pages"
            @size-change="handleSizeChange"
            :page-sizes="[5, 10, 15, 20, 25, 30]"
            :page-size="this.number"
            :total="this.numbers"
            layout=" total, prev, pager, next, sizes, jumper"
            :hide-on-single-page="this.Paging_state"
            :pager-count="5"
          >
          </el-pagination>
          <button class="turn-btn">确定</button>
        </div>
      </div>
      <!-- 详情弹窗 -->
      <div>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="700px" center>
          <div style="display: flex; justify-content: space-between">
            <!-- 左部分 -->
            <div style="width: 400px">
              <div>
                <p>社团名称: {{ tableData_two.name }}</p>
              </div>
              <div>
                <p>社团介绍: {{ tableData_two.intro }}</p>
              </div>
              <div>
                <p>社团标语: {{ tableData_two.slogan }}</p>
              </div>
              <div>
                <span>招新群聊：</span>
                <div class="main-img-container" style="width: 100px">
                  <img :src="tableData_two.group" class="image" />
                </div>
              </div>
            </div>
            <!-- 分界线 -->
            <div class="vertical-divider"></div>
            <!-- 右部分 -->
            <div>
              <span>海报: </span>
              <div class="main-img-container" style="width: 200px">
                <img :src="tableData_two.cover" class="image" />
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click=";(centerDialogVisible = false), (centerDialogVisible_two = true)">查看日常</el-button>
            <el-button @click="centerDialogVisible = false">返 回</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 查看日常弹窗 -->
      <div>
        <el-dialog title="日常" :visible.sync="centerDialogVisible_two" width="650px" center>
          <div style="display: grid; grid-template-columns: 200px 200px 200px; grid-template-rows: 200px 200px 200px">
            <div class="main-img-container" style="margin: 15px" v-for="index in tableData_two.imgs" :key="index">
              <img :src="index" class="image" />
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible_two = false">返 回</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- 发布弹窗 -->
    <div class="release-page">
      <el-dialog title="社团风采发布" :visible.sync="dialogFormVisible" width="1000px" :before-close="handleClose">
        <el-form :rules="rules" ref="form" :model="form" style="display: flex; justify-content: space-between">
          <div class="r-left-container">
            <el-form-item label="社团名称 :" prop="name" :label-width="formLabelWidth">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="社团简介 :" prop="intro" :label-width="formLabelWidth">
              <el-input v-model="form.intro" type="textarea" :autosize="{ minRows: 6, maxRows: 6 }"></el-input>
            </el-form-item>
            <el-form-item label="社团标语 :" prop="slogan" :label-width="formLabelWidth">
              <el-input v-model="form.slogan" type="textarea" :autosize="{ minRows: 3, maxRows: 3 }"></el-input>
            </el-form-item>
            <el-form-item label="社团类别 :" prop="classes" :label-width="formLabelWidth" style="margin-bottom: 0">
              <el-select v-model="form.classes" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="vertical-divider"></div>
          <div class="r-center-container" style="display: flex; flex-direction: column; justify-content: space-between">
            <el-form-item label="社团海报 :" prop="cover" :label-width="formLabelWidth">
              <el-upload
                list-type="picture-card"
                :class="{ hide: hidecover }"
                name="file"
                :on-preview="coverPreview"
                :on-remove="coverRemove"
                :on-change="coverChange"
                :http-request="coverUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="coverVisible" append-to-body>
                <img width="100%" :src="coverPath" alt="活动海报" />
              </el-dialog>
            </el-form-item>
            <el-form-item label="招新群聊 :" prop="group" :label-width="formLabelWidth" style="margin-bottom: 0">
              <el-upload
                list-type="picture-card"
                :class="{ hide: hidegroup }"
                name="file"
                :on-preview="groupPreview"
                :on-remove="groupRemove"
                :on-change="groupChange"
                :http-request="groupUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="groupVisible" append-to-body>
                <img width="100%" :src="groupPath" alt="招新群聊二维码" />
              </el-dialog>
            </el-form-item>
          </div>
          <div class="vertical-divider"></div>
          <div class="r-right-container">
            <el-form-item label="社团日常 :" prop="fileList" :label-width="formLabelWidth" style="margin-bottom: 0">
              <el-upload
                list-type="text"
                :on-preview="imagePreview"
                :on-remove="imageRemove"
                :on-change="imageChange"
                :file-list="form.fileList"
                :http-request="imageUpload"
                limit="9"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">最多9张，只能上传图片文件且不超过500kb</div>
              </el-upload>
              <el-dialog :visible.sync="imageVisible" append-to-body>
                <img width="100%" :src="imagePath" :alt="imagePath" />
              </el-dialog>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('form')">重 置</el-button>
          <el-button type="primary" @click="relmessage()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { myAxios } from '@/request/myAxios'
export default {
  data() {
    return {
      //搜索框数据
      name: '',
      r_name: '',
      //分页获取上传数据
      page: 1,
      number: 5,
      pages: 0,
      numbers: 0,
      Paging_state: false,
      //是否返回数据
      getData_status: false,
      //详情弹框信息
      centerDialogVisible: false,
      //查看日常
      centerDialogVisible_two: false,
      tableData: [],
      //详情信息
      tableData_two: {},
      //发布弹框信息
      formLabelWidth: '90px',
      dialogFormVisible: false,
      options: [
        {
          label: '思想政治类',
          value: 1,
        },
        {
          label: '学术科技类',
          value: 2,
        },
        {
          label: '文化体育类',
          value: 3,
        },
        {
          label: '志愿公益类',
          value: 4,
        },
        {
          label: '创新创业类',
          value: 5,
        },
        {
          label: '自律互助类',
          value: 6,
        },
      ],
      form: {
        name: '',
        intro: '',
        slogan: '',
        group: '',
        cover: '',
        imgs: [],
        classes: '',
        fileList: [],
      },
      limitCount: 1,
      coverPath: '',
      coverVisible: false,
      hidecover: false,
      groupPath: '',
      groupVisible: false,
      hidegroup: false,
      imagePath: '',
      imageVisible: false,
      rules: {
        name: [{ required: true, message: '请输入社团名称', trigger: 'blur' }],
        intro: [{ required: true, message: '请输入社团简介', trigger: 'blur' }],
        slogan: [{ required: true, message: '请输入社团标语', trigger: 'blur' }],
        classes: [{ required: true, message: '请选择社团类型', trigger: 'change' }],
        cover: [{ required: true, message: '请上传社团海报', trigger: 'change' }],
        group: [{ required: true, message: '请上传招新群聊二维码', trigger: 'change' }],
        fileList: [{ required: true, type: 'array', message: '请上传社团日常风采图', trigger: 'change' }],
      },
    }
  },
  // mounted: function () {
  //   this.getmessage()
  // },
  methods: {
    //获取or更新学生认证信息
    getmessage() {
      if (this.name != this.r_name) {
        this.page = 1
        this.number = 5
      }
      let mydata = {
        name: this.name,
        page: this.page,
        number: this.number,
      }
      myAxios('get', '/equipment/list', mydata)
        .then((res) => {
          this.r_name = this.name
          if (JSON.stringify(res.data) === '{}') {
            this.getData_status = false
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error',
            })
          } else {
            this.getData_status = true
            this.tableData = res.data.clubs
            this.pages = res.data.pages
            this.numbers = res.data.numbers
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            showClose: true,
            message: err.response.data.msg,
            type: 'error',
          })
        })
    },

    //打开详情窗口
    Allactive(val) {
      this.centerDialogVisible = true
      this.tableData_two = val
    },
    // 关闭发布窗口（保留信息）
    handleClose(done) {
      this.$confirm('确认关闭？').then(() => {
        done()
      })
      this.getmessage()
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      if (this.form.cover != '') {
        this.form.cover = ''
        this.coverPath = ''
        this.rules.cover = [{ required: true, message: '请重新上传活动封面', trigger: 'change' }]
      }
      if (this.form.group != '') {
        this.form.group = ''
        this.groupPath = ''
        this.rules.group = [{ required: true, message: '请重新上传活动群聊二维码', trigger: 'change' }]
      }
      if (this.form.fileList != []) {
        this.imagePath = ''
        this.form.fileList = []
      }
    },
    //社团风采发布
    relmessage() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          for (let i = 0; i < this.form.fileList.length; i++) {
            this.form.imgs.push(this.form.fileList[i].url)
          }
          let mydata = {
            name: this.form.name,
            intro: this.form.intro,
            slogan: this.form.slogan,
            imgs: this.form.imgs,
            group: this.form.group,
            cover: this.form.cover,
            classes: this.form.classes,
          }
          console.log(mydata)
          myAxios('post', '/clubs/presence', mydata)
            .then((res) => {
              console.log(res)
              this.$message({
                showClose: true,
                message: '发布成功！',
                type: 'success',
              })
              setTimeout(() => {
                this.$router.go(0)
              }, 200)
            })
            .catch((err) => {
              // console.log(this.form)
              // console.log(mydata)
              this.$message({
                showClose: true,
                message: err.response.data.msg,
                type: 'error',
              })
            })
          this.dialogFormVisible = false
        } else {
          this.$message('活动信息请填写完整')
          return false
        }
      })
    },
    //翻页
    handleSizeChange(val) {
      this.number = val
      console.log(`当前页: ${val}`)
      this.getmessage()
    },
    handleCurrentChange(val) {
      this.page = val
      console.log(`每页 ${val} 条`)
      this.getmessage()
    },
    //上传图片的方法:
    coverUpload(params) {
      let param = new FormData()
      param.append('file', params.file)
      myAxios('post', '/UploadImage', param, { 'Content-Type': 'multipart/form-data' })
        .then((res) => {
          this.form.cover = res.data
          this.$message({
            showClose: true,
            message: '图片上传成功！',
            type: 'success',
          })
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err.response.data.msg,
            type: 'error',
          })
        })
    },
    // 处理图片预览效果
    coverPreview(file) {
      this.coverPath = file.url
      this.coverVisible = true
    },
    coverRemove(file, fileList) {
      if (fileList.length == 0) {
        this.form.cover = ''
        this.rules.cover = [{ required: true, message: '请上传活动封面', trigger: 'change' }]
      }
      this.hidecover = fileList.length >= this.limitCount
    },
    coverChange(file, fileList) {
      if (fileList.length == 1) {
        this.rules.cover = [{ required: true, message: '请上传活动封面', trigger: 'change' }]
      }
      this.$refs['form'].clearValidate('cover')
      this.hidecover = fileList.length >= this.limitCount
    },
    groupUpload(params) {
      let param = new FormData()
      param.append('file', params.file)
      myAxios('post', '/UploadImage', param, { 'Content-Type': 'multipart/form-data' })
        .then((res) => {
          this.form.group = res.data
          this.$message({
            showClose: true,
            message: '图片上传成功！',
            type: 'success',
          })
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err.response.data.msg,
            type: 'error',
          })
        })
    },
    // 处理图片预览效果
    groupPreview(file) {
      this.groupPath = file.url
      this.groupVisible = true
    },
    groupRemove(file, fileList) {
      if (fileList.length == 0) {
        this.form.group = ''
        this.rules.group = [{ required: true, message: '请上传活动群聊二维码', trigger: 'change' }]
      }
      this.hidegroup = fileList.length >= this.limitCount
    },
    groupChange(file, fileList) {
      if (fileList.length == 1) {
        this.rules.group = [{ required: true, message: '请上传活动群聊二维码', trigger: 'change' }]
      }
      this.$refs['form'].clearValidate('group')
      this.hidegroup = fileList.length >= this.limitCount
    },
    //上传图组的方法：
    // 处理图片预览效果
    imagePreview(file) {
      this.imagePath = file.url
      this.imageVisible = true
    },
    imageUpload(params) {
      let param = new FormData()
      param.append('file', params.file)
      myAxios('post', '/UploadImage', param, { 'Content-Type': 'multipart/form-data' })
        .then((res) => {
          this.form.fileList.push({ name: params.file.name, status: 'success', uid: params.file.uid, url: res.data })
          this.$message({
            showClose: true,
            message: '图片上传成功！',
            type: 'success',
          })
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err.response.data.msg,
            type: 'error',
          })
        })
    },
    imageRemove(file) {
      console.log(file)
      for (let i = 0; i < this.form.fileList.length; i++) {
        if (this.form.fileList[i].uid == file.uid) {
          this.form.fileList.splice(i, 1)
        }
      }
    },
    imageChange(file, fileList) {
      if (fileList.length != 0) {
        this.rules.fileList = [{ required: true, message: '请上传活动群聊二维码', trigger: 'change' }]
      }
      this.$refs['form'].clearValidate('fileList')
    },
  },
  mounted() {
    this.getmessage()
  },
}
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.button_del {
  padding: 0;
  float: right;
}
.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.background {
  background-color: #f2f2f2;
  min-width: 950px;
}
.background-white {
  background-color: white;
}
.stu_title {
  padding: 20px;
  font-size: 10px;
  padding-bottom: 10px;
}
.stu_title_two {
  padding: 20px;
  padding-top: 0px;
  font-weight: 800;
}
.search {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
}
.stuverify {
  padding: 20px;
  margin: 10px;
  border-radius: 15px 15px 15px 15px;
}
.main-list {
  padding: 0 20px;
  margin: 20px 0 0 0;
}
.main-img-container {
  /* 宽高1：1.6 */
  aspect-ratio: 10 / 16;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-col {
  margin-bottom: 20px;
}
.list-value {
  font-size: 12px;
  margin: 0 0 6px 0;
  display: flex;
  flex-direction: row;
}
.list-value-msg {
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-value-intro {
  width: 100%;
  height: 5em;
  text-indent: 2em;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
.list-button {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

/* 分页 */
.turn-page {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.turn-btn {
  height: 28px;
  margin-top: 2px;
  margin-left: 5px;
  color: #606266;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  padding: 4px 10px;
  font-size: 13px;
  cursor: pointer;
}
.turn-btn:hover {
  color: #409eff;
  background-color: #ecf5ff;
  border-color: #b3d8ff;
}

.vertical-divider {
  display: inline-block;
  width: 1px;
  background-color: #dcdfe6;
}
.hide .el-upload--picture-card {
  display: none;
}
.hide .el-upload--picture {
  display: none;
}
.hide .el-upload-list--picture-card {
  line-height: 0;
}
.no-data-board {
  width: 100%;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.board-tig {
  font-size: 24px;
  color: #a7abb7;
  letter-spacing: 2px;
}
</style>
