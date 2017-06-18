<template>
  <div class="read-modal" v-bind:class="{show :isShow}">
    <span class="el-icon-close" v-on:click="closeModal"></span>
    <div class="article">
      <div class="a-title">文章标题</div>
      <div class="a-tags">
        <el-tag type="primary">标签三</el-tag>
        <el-tag type="primary">标签三</el-tag>
      </div>
      <div class="a-msg">
        <span class="am-time">更新时间&nbsp;:&nbsp;2016.05.12&nbsp;05:56</span>
        <span class="am-read">阅读&nbsp;:&nbsp;56</span>
        <span class="am-comment">评论&nbsp;:&nbsp;2</span>
      </div>
      <div class="a-content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci delectus, fugiat in ipsum maxime nihil obcaecati porro quasi quo recusandae reprehenderit soluta veniam, veritatis? Aspernatur eius ex facere nobis ratione!
      </div>
      <div class="a-comment">
        <h3>2条留言</h3>
        <ul>
          <li>
            <div class="ac-item">
              <div class="aci-msg">
                1楼&nbsp;2017.05.21&nbsp;12:25
              </div>
              <div class="aci-content">留言内容1</div>
              <div class="aci-handel">
                <el-button type="text">删除</el-button>
              </div>
            </div>
          </li>
          <li>
            <div class="ac-item">
              <div class="aci-msg">
                2楼&nbsp;2017.05.21&nbsp;12:25
              </div>
              <div class="aci-content">留言内容2</div>
              <div class="aci-handel">
                <el-button type="text">删除</el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: '',
    props: ['isShow'],
    components: {},
    data() {
      return {}
    },
    methods: {
      closeModal(){
        this.$emit('closeReadModal');
      }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .read-modal {
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
