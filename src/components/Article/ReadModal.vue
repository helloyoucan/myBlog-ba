<template>
  <div class="read-modal diyscrollbar" v-bind:class="{show :isShow}">
    <span class="el-icon-close" v-on:click="closeModal"></span>
    <div class="article">
      <div class="a-title">{{readArticle && readArticle.title}}</div>
      <div class="a-tags">
        <el-tag type="primary" v-for="t in readArticle && readArticle.tags">{{t}}</el-tag>
      </div>
      <div class="a-msg">
        <span class="am-time">更新时间&nbsp;:&nbsp;{{readArticle && readArticle.meta.updateAt.replace('T', ' ').slice(0, -5)}}</span>
        <span class="am-read">阅读&nbsp;:&nbsp;{{readArticle && readArticle.read}}</span>
        <span class="am-comment">评论&nbsp;:&nbsp;{{readArticle.comments ? readArticle.comments.length : 0}}</span>
      </div>
      <div class="a-content markdown-body" v-html="readArticle.content">
      </div>
      <div class="a-comment">
        <h3>{{readArticle.comments ? readArticle.comments.length : 0}}条留言</h3>
        <ul>
          <li>
            <div class="ac-item" v-for="(c,index) in readArticle.comments">
              <div class="aci-msg">
                {{index + 1}}楼&nbsp;{{c.time}}
              </div>
              <div class="aci-content">{{c.content}}</div>
              <div class="aci-handel">
                <el-button v-on:click="delComment(c)" type="text">删除</el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: '',
    props: ['isShow', 'readArticle'],
    data() {
      return {}
    },
    methods: {
      closeModal(){
        this.$emit('closeReadModal');
      },
      delComment(c){
        this.$confirm('确定删除留言"' + c.content + '" ?', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          this.$http.post("/delComment", {
            id: c._id,
          })
            .then((response) => {
              if (response.data.isSuccess) {
                this.$message.success('删除留言成功');
                this.$emit('getData', this.readArticle._id);
              } else {
                this.$message.error('删除留言删除留言失败');
                if (!response.data.isSignin) {
                  this.$router.push('/Login');
                }
              }
            })
            .catch((error) => {
              this.$message.error('删除留言失败');
            });
        }).catch(() => {
          return
        });
      },
    },
    created()
    {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .read-modal {
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
    overflow: auto;
    &.show {
      /*display: block;*/
      transform: scale(1, 1);
    }
    .el-icon-close {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 20px;
      &:hover {
        color: red;
      }
    }
  }

  .article {
    max-width: 607px;
    margin: 40px auto;
    .a-title {
      font-size: 24px;
    }
    .a-tags {
      padding: 5px 0 3px;
    }
    .a-msg {
      font-size: 12px;
      color: #555;
    }

    .a-content {
      padding: 10px 0;
      img {
        max-width: 100%;
      }
    }
    .a-comment {
      h3 {
        font-size: 16px;
        margin: 16px 0;
      }
    }
    .ac-item {
      font-size: 14px;
      padding: 10px 5px 5px;
      border-top: 1px solid #eee;
      overflow: hidden;
    }
    .aci-msg {

    }
    .aci-content {
      margin: 5px;
      width: calc(100% - 58px);
      float: left;
    }
    .aci-handel {
      width: 24px;
      padding: 0 10px;
      float: left;
    }
  }
</style>
