<template>
  <div v-loading="fullLoading"
       element-loading-text="拼命加载中" class="login-bg" :style="{'background-image':'url('+bg+')'}">
    <div class="login-panle">
      <div class="title">
        <h1>后台登陆</h1>
      </div>
      <div class="login-form">
        <el-form :model="formData" :rules="loginRules" ref="formData" label-width="0px">
          <el-form-item prop="username">
            <el-input type="text" placeholder="用户名" v-model="formData.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="formData.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input class="captcha-input" type="text" placeholder="验证码" v-model="formData.captcha"
                      auto-complete="off"></el-input>
            <el-tooltip class="item" effect="dark" content="点击更换验证码" placement="top">
              <div class="captcha-img" alt="验证码" @click="getCaptcha()" v-html="formData.captchaImgUrl"></div>
              <!--<img @click="changeCaptchaImg()" class="captcha-img" alt="验证码" :src="formData.captchaImgUrl"/>-->
            </el-tooltip>

          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="submitForm('formData')" :loading="isBtnLoading">登录
            </el-button>
          </el-form-item>
          <el-form-item>
            <a href="javascript:;">登录遇到问题?</a>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import {Loading} from 'element-ui';
  var bg = require('@/assets/img/login-bg.jpg');
  export default {
    name: 'Login',
    data() {
      var validateUseName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {

          callback();
        }
      };
      var validateCaptcha = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          callback();
        }
      };
      return {
        bg,
        isBtnLoading: false,
        formData: {
          password: '',
          username: '',
          captcha: '',
          captchaImgUrl: '', //验证码
        },
        loginRules: {
          password: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          username: [{
            validator: validateUseName,
            trigger: 'blur'
          }],
          captcha: [{
            validator: validateCaptcha,
            trigger: 'blur'
          }]
        }
      }
    },
    computed: {
      // 仅读取，值只须为函数
      fullLoading: function () {
        return this.$store.state.fullLoading;
      },
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isBtnLoading = true;
            this.$http.post("/signin", {
              username: this.formData.username,
              password: this.formData.password,
              captcha: this.formData.captcha
            }).then((response) => {
              if (response.data.isSuccess) {
                this.$router.push('/Index');
                if (sessionStorage) {
                  sessionStorage.setItem('user', JSON.stringify(response.data.user));
                }
                this.$store.commit('setFullLoading', true);
                this.$store.commit('setLocalLoading', true);
                this.$message.success(response.data.message);
              } else {
                this.formData.captcha = '';
                this.getCaptcha();
                this.$message.error(response.data.message);
                this.isBtnLoading = false;
              }
            })
              .catch((error) => {
                this.$message.error("登录失败");
                this.formData.captcha = '';
                this.getCaptcha();
                this.isBtnLoading = false;
              });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getCaptcha(){
        this.$http.get("/captcha")
          .then((response) => {
            this.formData.captchaImgUrl = response.data;
          })
          .then((error) => {

          })
      },
    },
    created(){
      this.getCaptcha();
    }
  }
</script>
<style>
  .login-bg {
    height: 100%;
    position: relative;
  }

  .title {
    text-align: center;
  }

  .title h1 {
    font-weight: 500;
    font-size: 36px;
    line-height: 2em;
  }

  .login-panle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    transform: translate(-50%, -70%);
  }

  .login-form {
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .5);
    padding: 22px;
  }

  .login-form input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  }

  .login-form .el-button.login-btn {
    width: 100%;
  }

  .login-form .el-form-item:last-child {
    margin-bottom: 0;
  }

  .login-form .el-form-item:nth-last-child(2) {
    margin-bottom: 11px;
  }

  .login-form .captcha-input {
    width: -moz-calc(100% - 104px);
    width: -webkit-calc(100% - 104px);
    width: calc(100% - 104px);
  }

  .captcha-img {
    cursor: pointer;
    float: right;
    height: 36px;
    width: 100px;
  }

  .login-form .el-form-item:last-child .el-form-item__content {
    line-height: 1em;
  }
</style>
