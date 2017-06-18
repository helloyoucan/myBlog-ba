<template>
  <div>
    <div class="recycle-bin">
      <div class="rb-handel">
        <el-button type="primary">还原</el-button>
        <el-button type="danger">删除</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="文章名">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="更新日期">
        </el-table-column>
        <el-table-column
          prop="address"
          label="删除日期">
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-button v-on:click="readArticle" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">还原</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      <v-read-modal v-bind:isShow="isShowReadModal" v-on:closeReadModal="closeReadModal"></v-read-modal>
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
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        currentPage: 4,

      }
    }
    ,
    methods: {
      closeReadModal(){
        this.isShowReadModal = false;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }, handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      readArticle(){
        this.isShowReadModal = true;
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
