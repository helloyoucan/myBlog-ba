<template>
  <div class="main" :class="{hideMenu:isHideKMenu}">
    <v-header @hideMenu="hideMenu" v-on:showChangePassword="showChangePassword"></v-header>
    <v-sidebar class="layout-left diyscrollbar" @SetBreadcrumb="SetBreadcrumb">
    </v-sidebar>
    <div class="layout-right">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="title in breadcrumb" v-bind:key="title">{{title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <router-view class="content diyscrollbar" v-loading="localLoading"
                   element-loading-text="拼命加载中..."></router-view>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" size="tiny">
      <el-form :model="form" :rules="formRules" ref="form" label-width="80px">
        <el-form-item label="昵称" prop="name">
          <el-input type="text" v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {Loading} from 'element-ui';
  import vHeader from './common/Header'
  import vSidebar from './common/Sidebar'
  export default {
    name: 'Index',
    components: {
      vHeader,
      vSidebar,
    },
    data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'));
        } else {
          callback();
        }
      };
      var validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账户'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        breadcrumb: [],
        isHideKMenu: false,
        dialogFormVisible: false,
        form: {
          name: '小灿',
          username: '123',
          password: '',
          checkPass: '',
        },
        formRules: {
          name: [
            {validator: validateName, trigger: 'blur'}
          ],
          username: [
            {validator: validateUserName, trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validateCheckPass, trigger: 'blur'}
          ],
        }
      }
    },
    computed: {
      // 仅读取，值只须为函数
      localLoading: function () {
        return this.$store.state.localLoading;
      },
    },
    methods: {
      SetBreadcrumb(text_arr) {
        this.breadcrumb = text_arr;
        this.$store.commit('setLocalLoading', true);
      },
      hideMenu() {
        this.isHideKMenu = !this.isHideKMenu;
      },
      showChangePassword(){
        this.dialogFormVisible = true;
      },
      changePassword(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post("/saveUser", this.form)
              .then((response) => {
                if (response.data.isSuccess) {
                  this.$message.success('修改成功');
                  this.dialogFormVisible = false;
                } else {
                  this.$message.error('修改失败:' + response.data.message);
                  if (!response.data.isSignin) {
                    this.$router.push('/Login');
                  }
                }
              })
              .catch((error) => {
                this.$message.error('修改失败');
              });
          } else {
            return false;
          }
        });
      },
    },
    created(){
      this.$store.commit('setFullLoading', false);
    },
  }
</script>

<style>
  .main {
    height: 100%;
    background-color: #eef1f6;
  }

  .layout-left {
    width: 200px;
    float: left;
    height: -moz-calc(100% - 60px);
    height: -webkit-calc(100% - 60px);
    height: calc(100% - 60px);
    transition: margin-left ease .5s;
  }

  .layout-right {
    overflow: auto;
    /*background-color: #fff;*/
    padding: 15px;
    margin-left: 200px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .2) inset;
    height: -moz-calc(100% - 90px);
    height: -webkit-calc(100% - 90px);
    height: calc(100% - 90px);
    transition: margin-left ease .5s;
  }

  .hideMenu .layout-left {
    margin-left: -200px;
  }

  .hideMenu .layout-right {
    margin-left: 0px;
  }

  .content {
    margin-top: 5px;
    background-color: #fff;
    height: -moz-calc(100% - 18px);
    height: -webkit-calc(100% - 18px);
    height: calc(100% - 18px);
    overflow: auto;
    box-shadow: 0 5px 6px rgba(0, 0, 0, .2);
  }

  .diyscrollbar::-webkit-scrollbar-track {
    /*border-radius: 0;*/
  }

  .diyscrollbar::-webkit-scrollbar-thumb {
    /*border-radius: 0;*/
    background-color: #C3C3C3;
  }
</style>
