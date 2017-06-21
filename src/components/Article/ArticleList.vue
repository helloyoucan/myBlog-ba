<template>
  <div class="article-list">
    <div class="handel">
      <el-input
        placeholder="输入文章名"
        icon="search"
        v-model="search"
        :on-icon-click="searchHandle">
      </el-input>
      <el-button v-on:click="addArticle" type="primary"><i class="el-icon-plus"></i>添加文章</el-button>
    </div>
    <ul>
      <li v-for="a in articleList">
        <div class="article-item">
          <div class="at-title">{{a.title}}</div>
          <div class="at-read">阅读量：{{a.reading}}</div>
          <div class="at-time">更新时间：{{a.update}}</div>
          <div class="at-tags">
            <el-tag type="primary" v-for="t in a.tags">{{t.name}}</el-tag>
          </div>
          <div class="at-preview">{{a.preview}}</div>
          <div class="at-handel">
            <el-button v-on:click="readArticle" :plain="true" type="success" icon="document"></el-button>
            <el-button :plain="true" type="primary" icon="edit"></el-button>
            <el-button :plain="true" type="danger" icon="delete"></el-button>
          </div>
        </div>
      </li>
    </ul>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
    <v-write-modal v-bind:isShow="isShowWriteModal" v-on:closeWriteModal="closeWriteModal"></v-write-modal>
    <v-read-modal v-bind:isShow="isShowReadModal" v-on:closeReadModal="closeReadModal"></v-read-modal>
  </div>
</template>
<script>
  import WriteModal from './WriteModal.vue'
  import ReadModal from './ReadModal.vue'
  export default {
    name: 'ArticleList',
    components: {
      'v-write-modal': WriteModal,
      'v-read-modal': ReadModal,
    },
    data() {
      return {
        search: '',
        isShowWriteModal: false,
        isShowReadModal: false,
        currentPage: 4,
        articleList: [
          {
            title: '文章标题文章标题文章标题文章标题',
            reading: '36',
            update: '更新时间',
            tags: [{
              name: 'html',
            }, {
              name: 'css'
            }],
            preview: '文章预览内容'
          },
          {
            title: '文章标题文章标题文章标题文章标题',
            reading: '36',
            update: '更新时间',
            tags: [{
              name: 'html',
            }, {
              name: 'css'
            }],
            preview: '文章预览内容'
          },
          {
            title: '文章标题文章标题文章标题文章标题',
            reading: '36',
            update: '更新时间',
            tags: [{
              name: 'html',
            }, {
              name: 'css'
            }],
            preview: '文章预览内容'
          },
          {
            title: '文章标题文章标题文章标题文章标题',
            reading: '36',
            update: '更新时间',
            tags: [{
              name: 'html',
            }, {
              name: 'css'
            }],
            preview: '文章预览内容'
          },
        ],
      }
    },
    methods: {
      searchHandle(){

      },
      addArticle(){
        this.isShowWriteModal = true;
      },
      readArticle(){
        this.isShowReadModal = true;
      },
      closeWriteModal(){
        this.isShowWriteModal = false;
      },
      closeReadModal(){
        this.isShowReadModal = false;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    created(){
      this.$emit('setLoading', true);
      setTimeout(() => {
        this.$emit('setLoading', false);
      }, 1000);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .article-list {
    position: relative;
    /*overflow: hidden;*/
    .handel {
      position: fixed;
      right: 25px;
      top: 105px;
      .el-input {
        /*width: 20px;*/
        height: 40px;
        input {
          float: right;
          border-radius: 20px;
          width: 0;
          z-index: -1;
          padding-right: 28px;
          height: 40px;
          transition: width 1.2s;
          &:focus {
            width: 300px;
          }
        }
        i {
          border-radius: 50%;
          z-index: 1;
          height: 40px;
          width: 40px;
        }
        &:hover {
          input {
            width: 300px;
          }
        }
      }
      .el-button {
        font-size: 17px;
        float: right;
        margin: 10px 0 0;
        border-radius: 20px;
        padding: 10px;
        width: 40px;
        overflow: hidden;
        transition: width .65s, padding .65s;
        &:hover {
          width: 130px;
          padding: 10px 15px;
        }
        i {
          margin-right: 12px;
        }
      }
    }
    & > ul {
      overflow: hidden;
    }
  }

  .article-item {
    float: left;
    max-width: 300px;
    padding: 7px;
    margin: 10px;
    border: 1px solid #ddd;
    transition: box-shadow .4s;
    &:hover {
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, .5);
    }
  }

  .at-title {
    font-family: "Microsoft YaHei";
    font-size: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @mixin at {
    padding-top: 7px;
  }

  .at-read {
    @include at();
  }

  .at-time {
    @include at();
  }

  .at-tags {
    @include at();
    .el-tag {
      margin-left: 5px;
      &:first-child {
        margin-left: 0;
      }
    }
  }

  .at-preview {
    @include at();
    font-size: 14px;
    display: -webkit-box !important;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .at-handel {
    @include at();
    .el-button {
      padding: 7px;
    }
  }

  .page {
    padding: 10px;
  }

</style>
