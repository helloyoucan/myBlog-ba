<template>
  <div class="article-list">
    <div class="handel">
      <el-input
        placeholder="输入文章名"
        icon="search"
        v-bind:class="{ showInput: search!='' }"
        v-model="search"
        :on-icon-click="searchHandle">
      </el-input>
      <el-button v-on:click="addArticle" type="primary"><i class="el-icon-plus"></i>添加文章</el-button>
    </div>
    <ul>
      <li v-for="a in articleList">
        <div class="article-item">
          <div class="at-title">{{a.title}}</div>
          <div class="at-read">阅读量：{{a.read}}</div>
          <div class="at-time">更新时间：{{a.meta.updateAt.replace('T', ' ').slice(0, -5)}}</div>
          <div class="at-tags">
            <el-tag type="primary" v-for="t in a.tags">{{t}}</el-tag>
          </div>
          <div class="at-preview">{{a.content.substring(0, 300)}}</div>
          <div class="at-handel">
            <el-button v-on:click="readArticle(a._id)" :plain="true" type="success" icon="document"></el-button>
            <el-button v-on:click="editArticle(a)" :plain="true" type="primary" icon="edit"></el-button>
            <el-button v-on:click="delArticle(a)" :plain="true" type="danger" icon="delete"></el-button>
          </div>
        </div>
      </li>
    </ul>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="list.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="list.currentNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.total">
      </el-pagination>
    </div>
    <v-write-modal v-bind:isShow="isShowWriteModal"
                   v-bind:eidtArticle="editArticleData"
                   v-on:getArticlesList="getData"
                   v-on:closeWriteModal="closeWriteModal"></v-write-modal>
    <v-read-modal
      v-bind:isShow="isShowReadModal"
      v-bind:readArticle="readArticleData"
      v-on:closeReadModal="closeReadModal"></v-read-modal>
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
        list: {
          keyword: '',//搜索的关键字
          currentPage: 1,//当前页
          currentNum: 10,//每页数量
          total: 100,//每页数量
        },
        editArticleData: '',
        readArticleData: '',
        articleList: [
          {
            title: '',
            read: '',
            update: '',
            meta: {
              updateAt: '',
            },
            tags: [{
              name: '',
            }],
            content: ''
          }],
      }
    },
    methods: {
      searchHandle(){
        this.list.keyword = this.search;
        this.getData();
      },
      addArticle(){
        this.editArticleData = '';
        this.isShowWriteModal = true;
      },
      readArticle(id){
        this.isShowReadModal = true;
        this.openLoading();
        this.$http.get("/article/getById/" + id)
          .then((response) => {
            this.closeLoading();
            if (response.data.isSuccess) {
              this.readArticleData = response.data.results;
            } else {
              this.$message.error('获取文章失败');
            }
          })
          .catch((error) => {
            this.$message.error('获取文章失败');
          });
      },
      editArticle(a){
        this.editArticleData = a;
        this.isShowWriteModal = true;
      },
      delArticle(a){
        this.$confirm('是否要删除文章"' + a.title + '" ?', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }
        ).then(() => {
          this.$http.post("/article/softDel", {ids: [a._id], isDel: false})
            .then((response) => {
              if (response.data.isSuccess) {
                this.$message.success('删除文章成功');
                this.getData();
              } else {
                this.$message.error('删除文章失败');
              }
            })
            .catch((error) => {
              this.$message.error('删除文章失败');
            });
        }).catch(() => {
          return
        });
      },
      closeWriteModal()
      {
        this.isShowWriteModal = false;
      }
      ,
      closeReadModal()
      {
        this.isShowReadModal = false;
      }
      ,
      handleSizeChange(val)
      {
        this.list.currentNum = val;
        this.getData()
      }
      ,
      handleCurrentChange(val)
      {
        this.list.currentPage = val;
        this.getData();
      }
      ,
      getData()
      {
        this.openLoading();
        this.$http.post("/article/list", this.list)
          .then((response) => {
            if (response.data.isSuccess) {
              this.articleList = response.data.articlesList;
              this.list = response.data.list;
              this.closeLoading();
            } else {
              this.$message.error('获取数据失败');
            }
          })
          .catch((error) => {
            this.$message.error('获取数据失败');
          });
      }
      ,
      closeLoading()
      {
        this.$store.commit('setLocalLoading', false);
      },
      openLoading()
      {
        this.$store.commit('setLocalLoading', true);
      }
    },
    created()
    {
      this.getData();
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
      .showInput {
        input {
          width: 300px;
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
