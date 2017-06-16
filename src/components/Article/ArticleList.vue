<template>
  <div class="article-list">
    <div class="handel">
      <el-input
        placeholder="输入文章名"
        icon="search"
        v-model="search"
        :on-icon-click="searchHandle">
      </el-input>
      <el-button type="primary"><i class="el-icon-plus"></i>添加文章</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    components: {},
    data() {
      return {
        search: '',
      }
    },
    methods: {
      searchHandle(){

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
    .handel {
      position: absolute;
      right: 10px;
      top: 10px;
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
          transition: width 1.5s;
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
  }

</style>
