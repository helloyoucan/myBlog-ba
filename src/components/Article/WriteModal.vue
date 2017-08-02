<template>
  <div class="write-modal diyscrollbar" v-bind:class="{show :isShow}">
    <div class="wm-title">{{wmTitle}}
      <span class="el-icon-close" v-on:click="closeModal"></span>
    </div>
    <div class="title">
      <el-input
        size="large"
        placeholder="请输入标题"
        v-model="article.title">
      </el-input>
    </div>
    <div class="add-tags">
      <el-tag
        :key="tag"
        v-for="tag in article.tags"
        :closable="true"
        :close-transition="false"
        @close="handleClose(tag)"
      >
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
    <mavon-editor v-on:imgAdd="$imgAdd" v-on:imgDel="$imgDel"
                  v-model="article.content" :save="saveContent" class="editor"
                  v-on:change="isChangeContent"></mavon-editor>
    <div class="wm-handel">
      <el-button :disabled="saveDisable" v-on:click="saveContent" type="primary">保存</el-button>
      <el-button v-on:click="closeModal">关闭</el-button>
    </div>
  </div>
</template>
<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import api from '@/url/PersonalInfo.js'
  export default {
    name: 'WriteModal',
    components: {mavonEditor},
    props: ['isShow', 'eidtArticle'],
    data() {
      return {
        wmTitle: '写文章',
        article: {
          _id: '',
          title: '',
          content: '',
          tags: [],
        },
        inputVisible: false,
        inputValue: '',
        saveDisable: true,
        img_file: {},
      }
    },
    watch: {
      title: function (val, oldVal) {
        this.isChangeContent()
      },
      tags: function (val, oldVal) {
        this.isChangeContent()
      },
      isShow: function (val) {
        if (val) {
          if (this.eidtArticle != '') {
            this.article = this.eidtArticle;
          }

        } else {//关闭时清空输入的内容
          this.article = {
            _id: '',
            title: '',
            content: '',
            tags: [],
          };
        }
      },
    },
    methods: {
      closeModal(){
        if (this.article.title != ""
          || this.article.content != ""
          || this.article.tags.length != 0) {
          this.$confirm('当前输入的信息还没保存,确定退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('closeWriteModal');
          }).catch(() => {
            return
          });
        } else {
          this.$emit('closeWriteModal');
        }
      },
      isChangeContent(){
        if (this.saveDisable) {
          this.saveDisable = false;
        }
      },
      saveContent(){
        this.uploadimg(() => {
          this.$http.post("/article/save", this.article)
            .then((response) => {
              if (response.data.isSuccess) {
                this.$message.success('保存成功');
                this.$emit('getArticlesList');
                this.$emit('closeWriteModal');
              } else {
                this.$message.error('保存失败:' + response.data.message);
              }
            })
            .catch((error) => {
              this.$message.error('保存失败');
            });
        })

      },
      handleClose(tag) {
        this.article.tags.splice(this.article.tags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.article.tags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      $imgAdd(pos, $file){
        this.img_file[pos] = $file;
      },
      $imgDel(pos){
        delete this.img_file[pos];
      },
      uploadimg(callback){
        var formdata = new FormData();
        var imgArr = [];
        for (var _img in this.img_file) {
          formdata.append('imageFile', this.img_file[_img]);
          imgArr.push(_img);
        }
        if (imgArr.length > 0) {
          this.$http({
            url: api.uploadIcon,
            method: 'post',
            data: formdata,
            headers: {'Content-Type': 'multipart/form-data'},
          }).then((response) => {
            if (response.data.isSuccess) {
              imgArr.forEach((value, index, arr) => {
                this.article.content = this.article.content.replace(value, response.data.paths[index]);
              });
              this.img_file = {};
              callback();
            } else {
              this.$message.error('上传图片失败');
            }
          })
            .catch((error) => {
              this.$message.error('上传图片失败');
            });
        }

      },
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .write-modal {
    position: fixed;
    top: 75px;
    bottom: 15px;
    left: 0;
    right: 15px;
    border: 5px solid #555;
    background-color: white;
    z-index: 2;
    /*display: none;*/
    transform: scale(0, 0);
    transition: transform .5s;
    &.show {
      /*display: block;*/
      transform: scale(1, 1);
    }
    .title {
      .el-input, .el-input__inner {
        border-radius: 0;
      }
      .el-input__inner {
        border-left: none;
        border-right: none;
        border-bottom-width: 3px;
        &:hover, &:focus {
          border-top-color: #bfcbd9;
        }
      }
    }

  }

  .add-tags {
    padding: 5px 5px 8px;
    height: 30px;
    line-height: 30px;
    .el-tag {
      margin-right: 5px;
    }
    .input-new-tag {
      width: 100px;
    }
  }

  .wm-title {
    font-size: 20px;
    padding: 10px 10px 15px;
    span {
      float: right;
      &:hover {
        color: red;
      }
    }
  }

  .editor {
    height: calc(100% - 192px);
    .content-input-wrapper {
      width: calc(100% - 50px) !important;
    }
  }

  .wm-handel {
    padding: 10px;
  }
</style>
