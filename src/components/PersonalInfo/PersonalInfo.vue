<template>
  <div>
    <div class="row">
      <div class="left">头像&nbsp;:</div>
      <div class="right">
        <el-upload
          class="avatar-uploader"
          name="imageFile"
          :action="url.uploadIcon"
          :on-error="uploadIconFail"
          :show-file-list="false"
          :on-success="uploadIconSuccess">
          <img v-if="info.iconUrl" :src="info.iconUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <div class="row">
      <div class="left">昵称&nbsp;:</div>
      <div class="right">
        <el-input v-model="info.name" placeholder="请输入昵称"></el-input>
      </div>
    </div>
    <div class="row">
      <div class="left">邮箱&nbsp;:</div>
      <div class="right">
        <form id="form-emails">
          <div class="e-col" v-for="(e,index) in info.emails">
            <el-input v-bind:value="e" v-on:change="info.emails[index]=$event" placeholder="请输入邮箱"></el-input>
            <el-button v-if="index" type="text" v-on:click="info.emails.splice(index, 1)">删除</el-button>
          </div>
        </form>
        <el-button v-on:click="addEmails" type="primary">添加</el-button>
      </div>
    </div>
    <div class="row">
      <div class="left">其它&nbsp;:</div>
      <div class="right">
        <form id="form-others">
          <div class="form-upload-col" v-for="(o,index) in info.others">
            <el-upload
              class="avatar-uploader"
              name="imageFile"
              :action="url.uploadIcon"
              :show-file-list="false"
              :http-request="uploadOtherIcon"
              :data="{index:index}">
              <img v-if="o.iconUrl" :src="o.iconUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input v-bind:value="o.name" v-on:change="o.name=$event"
                      placeholder="请输入描述"></el-input>
            <el-input v-bind:value="o.url" v-on:change="o.url=$event" placeholder="请输入地址"></el-input>
            <el-button v-if="index" type="text" v-on:click="info.others.splice(index, 1)">删除</el-button>
          </div>
        </form>
        <el-button v-on:click="addOthers" type="primary">添加</el-button>
      </div>
    </div>
    <div class="row">
      <div class="left"></div>
      <div class="right">
        <el-button v-on:click="save" type="success" size="large" :loading="btnSaveLoading">{{btnText}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/url/PersonalInfo.js'
  export default {
    name: 'PersonalInfo',
    data() {
      return {
        url: {
          uploadIcon: api.uploadIcon.toString(),
        },
        info: {
          _id: "",
          iconUrl: '',
          name: '',
          emails: [],
          others: [],
        },
        btnSaveLoading: false,
        btnText: "保存",
      };
    },
    methods: {
      uploadIconSuccess(res, file) {
        if (file.response.isSuccess) {
          this.info.iconUrl = file.response.paths[0];
        } else {
          this.$message.error('上传图片失败');
        }
      },
      uploadIconFail(err, file, fileList){
        this.$message.error('上传图片失败');
      },
      uploadOtherIcon(obj){
        var formdata = new FormData();
        formdata.append('imageFile', obj.file);
        this.$http.post(api.uploadIcon, formdata)
          .then((response) => {
            if (response.data.isSuccess) {
              this.info.others[obj.data.index].iconUrl = response.data.paths[0];
            } else {
              this.$message.error('上传图片失败');
            }
          })
          .catch((error) => {
            this.$message.error('上传图片失败');
          });
      },
      addEmails(){
        this.info.emails.push('');
      },
      addOthers(){
        this.info.others.push({
          iconUrl: '',
          name: '',
          url: ''
        });
      },
      getData(callback){
        this.$http.get("/getPersonalDetails")
          .then((response) => {
            if (response.data.isSuccess) {
              if (response.data.message != null) {
                this.info = response.data.message;
              }
              callback();
            } else {
              this.$message.error('获取个人信息失败');
            }
          })
          .catch((error) => {
            this.$message.error('获取个人信息失败');
          });
      },
      save(){
        this.$http.post("/savePersonalDetails", this.info)
          .then((response) => {
            if (response.data.isSuccess) {
              this.$message.success('保存成功');
            } else {
              this.$message.error('保存失败');
              if (!response.data.isSignin) {
                this.$router.push('/Login');
              }
            }
          })
          .catch((error) => {
            this.$message.error('保存失败');
          });
      },
    },
    created(){
      this.getData(() => {
        this.$store.commit('setLocalLoading', false);
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  div.row {
    margin-top: 25px;
    padding: 0 20px;
    &:first-child {
      .left {
        line-height: 120px;
      }
      .avatar-uploader .el-upload {
        border-radius: 50%;
      }
      .avatar-uploader-icon {
        width: 120px;
        height: 120px;
        line-height: 120px;
        font-size: 28px;
      }
      .avatar {
        width: 120px;
        height: 120px;
      }
    }
    .left {
      width: 230px;
      float: left;
      font-size: 18px;
      text-align: right;
      padding-right: 20px;
      line-height: 36px;
    }

    .right {
      margin-left: 250px;
      .el-input {
        max-width: 300px;
      }
      .el-button--text {
        span:hover {
          color: #FF4949;
        }
      }
    }
  }

  .e-col {
    margin-bottom: 10px;
  }

  .form-upload-col {
    overflow: hidden;
    margin-bottom: 10px;
    .avatar-uploader .el-upload {
      float: left;
      margin-right: 6px;
    }
    .el-input {
      margin: 3px 0;
      &:nth-child(2) {
        width: 120px;
      }
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #555;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color: #8c939d;
    text-align: center;
  }

  .avatar {
    width: 40px;
    height: 40px;
    display: block;
  }

</style>
