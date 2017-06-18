<template>
  <div class="write-modal" v-bind:class="{show :isShow}">
    <div class="wm-title">{{wmTitle}}
      <span class="el-icon-close" v-on:click="closeModal"></span>
    </div>
    <el-input
      size="large"
      placeholder="请输入标题"
      v-model="title">
    </el-input>
    <mavon-editor v-model="content" class="editor"></mavon-editor>
    <div class="wm-handel">
      <el-button type="primary">保存</el-button>
      <el-button>关闭</el-button>
    </div>
  </div>
</template>
<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: '',
    components: {mavonEditor},
    props: ['isShow'],
    data() {
      return {
        wmTitle: '写文章',
        title: '',
        content: '',
      }
    },
    methods: {
      closeModal(){
        this.$emit('closeModal');
      },
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
    .el-input, .el-input__inner {
      border-radius: 0;
    }
    .el-input__inner {
      border-left: none;
      border-right: none;
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
    height: calc(100% - 149px);
    .content-input-wrapper {
      width: calc(100% - 50px)!important;
    }
  }

  .wm-handel {
    padding: 10px;
  }
</style>
