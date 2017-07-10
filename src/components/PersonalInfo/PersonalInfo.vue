<template>
  <div>
    <div class="row">
      <div class="left">头像&nbsp;:</div>
      <div class="right">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="uploadIconSuccess"
          :before-upload="beforeUploadIcon">
          <img v-if="iconUrl" :src="iconUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <div class="row">
      <div class="left">昵称&nbsp;:</div>
      <div class="right">
        <el-input v-model="name" placeholder="请输入昵称"></el-input>
      </div>
    </div>
    <div class="row">
      <div class="left">邮箱&nbsp;:</div>
      <div class="right">
        <form id="form-emails">
          <div class="e-col" v-for="(e,index) in emails">
            <el-input v-bind:value="e" v-on:change="emails[index]=$event" placeholder="请输入邮箱"></el-input>
            <el-button v-if="index" type="text" v-on:click="emails.splice(index, 1)">删除</el-button>
          </div>
        </form>
        <el-button v-on:click="addEmails" type="primary">添加</el-button>
      </div>
    </div>
    <div class="row">
      <div class="left">Github&nbsp;:</div>
      <div class="right">
        <el-input v-model="github" placeholder="请输入Github地址"></el-input>
      </div>
    </div>
    <div class="row">
      <div class="left">其它&nbsp;:</div>
      <div class="right">
        <form id="form-others">
          <div class="form-upload-col" v-for="(o,index) in others">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="uploadOtherIconSuccess"
              :before-upload="beforeUploadOtherIcon"
              :data="{index:index}">
              <img v-if="o.iconUrl" :src="o.iconUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input v-bind:value="o.name" v-on:change="o.name=$event"
                      placeholder="请输入描述"></el-input>
            <el-input v-bind:value="o.url" v-on:change="o.url=$event" placeholder="请输入地址"></el-input>
            <el-button v-if="index" type="text" v-on:click="others.splice(index, 1)">删除</el-button>
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
  import Vue from 'vue'
  export default {
    name: 'PersonalInfo',
    data() {
      return {
        iconUrl: '',
        name: '',
        emails: ['0000', '1111'],
        github: '',
        others: [{
          iconUrl: '',
          name: '1',
          url: '1'
        }, {
          iconUrl: '',
          name: '2',
          url: '2'
        }],
        btnSaveLoading: false,
        btnText: "保存",
      };
    },
    methods: {
      uploadIconSuccess(res, file) {
        //this.iconUrl = URL.createObjectURL(file.raw);
      },
      beforeUploadIcon(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      uploadOtherIconSuccess(res, file){

      },
      beforeUploadOtherIcon(file){

      },
      addEmails(){
        this.emails.push('');
      },
      addOthers(){
        this.others.push({
          iconUrl: '',
          name: '',
          url: ''
        });
      },
      save(){
        console.log(this.name);
        this.$http.post('/savePersonalDetails', {})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    },
    created(){
      setTimeout(() => {
        this.$store.commit('setLocalLoading', false);
      }, 0);
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
