<template>
  <div>
    <div class="t-r-handel">
      <el-button type="primary">添加</el-button>
      <el-button type="danger">删除</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      border
      tooltip-effect="dark"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="书签名">
      </el-table-column>
      <el-table-column
        label="链接">
        <template scope="scope">
          <a class="single-line" v-bind:href="scope.row.url" target="_blank">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="classify"
        label="分类">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新日期">
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>

  export default {
    name: '',
    components: {},
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData3: [{
          name: '百度一下',
          url: 'http://www.baidu.com',
          classify: '常用',
          updateTime: '2017/04/04'
        }, {
          name: '百度一下',
          url: 'www.baidu.com',
          classify: '常用',
          updateTime: '2017/04/04'
        }, {
          name: '百度一下',
          url: 'www.baidu.com',
          classify: '常用',
          updateTime: '2017/04/04'
        }, {
          name: '百度一下',
          url: 'www.baidu.com',
          classify: '常用',
          updateTime: '2017/04/04'
        },],
        multipleSelection: [],
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .t-r-handel {
    padding-bottom: 10px;
  }

  .single-line {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
