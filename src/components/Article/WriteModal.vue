<template>
  <div class="write-modal" v-bind:class="{show :isShow}">
    <div class="wm-title">{{wmTitle}}
      <span class="el-icon-close" v-on:click="closeModal"></span>
    </div>
    <div class="title">
      <el-input
        size="large"
        placeholder="请输入标题"
        v-model="title">
      </el-input>
    </div>
    <div class="add-tags">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
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
    <mavon-editor v-model="content" :save="saveContent" class="editor" v-on:change="isChangeContent"></mavon-editor>
    <div class="wm-handel">
      <el-button :disabled="saveDisable" v-on:click="saveContent" type="primary">保存</el-button>
      <el-button>关闭</el-button>
    </div>
  </div>
</template>
<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: 'WriteModal',
    components: {mavonEditor},
    props: ['isShow'],
    data() {
      return {
        wmTitle: '写文章',
        title: '',
        content: '',
        saveDisable: true,
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      }
    },
    watch: {
      title: function (val, oldVal) {
        this.isChangeContent()
      },
      dynamicTags: function (val, oldVal) {
        this.isChangeContent()
      },
    },
    methods: {
      closeModal(){
        this.$emit('closeWriteModal');
      },
      isChangeContent(){
        if (this.saveDisable) {
          this.saveDisable = false;
        }
      },
      saveContent(){

      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .write-modal {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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
