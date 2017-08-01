<template>
  <div>
    <div class="recycle-bin">
      <div class="rb-handel">
        <el-button v-on:click="batchRestoreArticle" type="primary">还原</el-button>
        <el-button v-on:click="batchDelArticle" type="danger">删除</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="articleList"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="title"
          label="文章名">
        </el-table-column>
        <el-table-column
          prop="meta.createAt"
          label="创建日期">
        </el-table-column>
        <el-table-column
          prop="meta.deleteAt"
          label="删除日期">
        </el-table-column>
        <el-table-column
          scope="scope"
          label="操作">
          <template scope="scope">
            <el-button v-on:click="readArticle(articleList[scope.$index]._id)" type="text" size="small">查看</el-button>
            <el-button v-on:click="restoreArticle([articleList[scope.$index]._id],[articleList[scope.$index].title])"
                       type="text" size="small">还原
            </el-button>
            <el-button
              v-on:click="delArticle([articleList[scope.$index]._id],[articleList[scope.$index].title],[articleList[scope.$index].fileName])"
              type="text" size="small">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
      <v-read-modal
        v-bind:isShow="isShowReadModal"
        v-bind:readArticle="readArticleData"
        v-on:closeReadModal="closeReadModal"></v-read-modal>
    </div>
  </div>
</template>
<script>
  import ReadModal from './ReadModal.vue'
  export default {
    name: '',
    components: {
      'v-read-modal': ReadModal,
    },
    data() {
      return {
        isShowReadModal: false,
        articleList: [],
        readArticleData: '',
        list: {
          keyword: '',//搜索的关键字
          currentPage: 1,//当前页
          currentNum: 10,//每页数量
          total: 100,//每页数量
        },
      }
    }
    ,
    methods: {
      closeReadModal(){
        this.isShowReadModal = false;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.list.currentNum = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.list.currentPage = val;
        this.getData();
      },
      readArticle(id){
        this.$store.commit('setLocalLoading', true);
        this.$http.get("/article/getById/" + id)
          .then((response) => {
            this.$store.commit('setLocalLoading', false);
            if (response.data.isSuccess) {
              this.readArticleData = response.data.results;
              this.isShowReadModal = true;
            } else {
              this.$message.error('获取文章失败');
            }
          })
          .catch((error) => {
            this.$message.error('获取文章失败');
          });
      },
      restoreArticle(ids, titles){
        this.$confirm('是否要还原文章"' + titles.join(',') + '" ?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }
        ).then(() => {
          this.$http.post("/article/softDel", {
            ids: ids,
            isDel: true
          })
            .then((response) => {
              if (response.data.isSuccess) {
                this.$message.success('还原文章成功');
                this.getData();
              } else {
                this.$message.error('还原文章失败');
              }
            })
            .catch((error) => {
              this.$message.error('还原文章失败');
            });
        }).catch(() => {
          return
        });
      },
      delArticle(ids, titles, fileNames){
        this.$confirm('是否要永久删除文章"' + titles.join(',') + '" ?', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          this.$http.post("/article/recycle/del", {
            ids: ids,
            fileNames: fileNames
          })
            .then((response) => {
              if (response.data.isSuccess) {
                this.$message.success('永久删除文章成功');
                this.getData();
              } else {
                this.$message.error('永久删除文章失败');
              }
            })
            .catch((error) => {
              this.$message.error('永久删除文章失败');
            });
        }).catch(() => {
          return
        });
      },
      batch(callback){
        if (this.multipleSelection.length) {
          var ids = [], titles = [], fileNames = [];
          this.multipleSelection.forEach(function (value, index, array) {
            titles.push(value.title);
            ids.push(value._id);
            fileNames.push(value.fileName);
          });
          callback(ids, titles, fileNames);
        } else {
          this.$message.warning('请先选中数据');
        }
      },
      batchRestoreArticle(){
        this.batch((ids, titles) => {
          this.restoreArticle(ids, titles);
        });

      },
      batchDelArticle(){
        this.batch((ids, titles, fileNames) => {
          this.delArticle(ids, titles, fileNames);
        });
      },
      getData(){
        this.$store.commit('setLocalLoading', true);
        this.$http.post("/article/recycleBin", this.list)
          .then((response) => {
            if (response.data.isSuccess) {
              this.articleList = response.data.articlesList;
              this.list = response.data.list;
              this.$store.commit('setLocalLoading', false);
            } else {
              this.$message.error('获取数据失败');
            }
          })
          .catch((error) => {
            this.$message.error('获取数据失败');
          });
      }
    },
    created(){
      this.getData();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .recycle-bin {
    padding: 10px;
    position: relative;
    height: calc(100% - 20px);
  }

  .rb-handel {
    padding-bottom: 10px;
  }

  .page {
    padding: 10px 0;
  }
</style>
