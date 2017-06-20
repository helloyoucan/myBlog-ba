<template>
  <span>
  <span>{{node.data.label}}</span>
    <span class="t-handel">
      <el-button v-on:click.stop="addNode(node.data)" size="mini">添加</el-button>
      <el-button v-on:click.stop="editNode(node.data)" size="mini">修改</el-button>
      <el-button v-on:click.stop="delNode(node)" size="mini">删除</el-button>
    </span>
  </span>
</template>
<script>

  export default {
    name: '',
    components: {},
    props: ['node'],
    data() {
      return {}
    },
    methods: {
      addNode(node){
        console.log(node);
      },
      editNode(){

      },
      delNode(node){

      },

    },
    created(){
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .t-handel {
    float: right;
    & > .el-button {
      margin-left: 0px;
      &:last-child:hover {
        color: red;
        border-color: red;
      }
    }
  }

  span.red {
    color: red;
  }
</style>
