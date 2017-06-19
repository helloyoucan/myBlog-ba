<template>
  <div>
    <div class="tree">
      <div class="t-left">
        <div class="tl-handel">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <el-button type="primary" :plain="true">添加</el-button>
        </div>
        <el-tree
          class="filter-tree"
          :data="treeData"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          :render-content="renderContent"
          ref="tree2">
        </el-tree>
      </div>
      <div class="t-right">
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
              <a v-bind:href="scope.row.url" target="_blank">{{scope.row.url}}</a>
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
    </div>
  </div>
</template>
<script>
  let id = 1000;
  import TreeItem from './TreeItem.vue';
  export default {
    name: '',
    components: {},
    data() {
      return {
        filterText: '',
        treeData: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
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
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      renderContent(h, node) {
        return h(TreeItem, {
          props: {
            node: node
          }
        });
      }, handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    }
    ,
    created()
    {
      this.$emit('setLoading', true);
      setTimeout(() => {
        this.$emit('setLoading', false);
      }, 1000);
    }
    ,
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .tree {
    padding: 10px;
    height: calc(100% - 20px);
    overflow: hidden;
    .t-left {
      float: left;
      width: 300px;
      .el-tree {
        margin-top: 10px;
        border: none;
      }
    }
    .tl-handel {
      .el-input {
        width: 230px;
      }
      .el-button {
        float: right;
      }
    }
    .t-right {
      position: relative;
      margin-left: 320px;
      width: calc(100% - 320px);
    }
    .t-r-handel {
      padding-bottom: 10px;
    }
  }
</style>
