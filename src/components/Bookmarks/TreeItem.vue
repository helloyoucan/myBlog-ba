<template>
  <span>
  <span>{{node.data.label}}</span>
    <span>
      <el-button size="mini">添加</el-button>
       <el-button size="mini">删除</el-button>
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
    methods: {},
    created(){
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
