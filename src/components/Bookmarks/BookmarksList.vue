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
          default-expand-all
          :filter-node-method="filterNode"
          :render-content="renderContent"
          ref="tree2">
        </el-tree>
      </div>
      <v-list class="t-right"></v-list>

    </div>
  </div>
</template>
<script>
  let id = 1000;
  import TreeItem from './TreeItem.vue';
  import List from './List.vue'
  export default {
    name: '',
    components: {
      'v-list': List
    },
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
      },
    }
    ,
    created()
    {
      setTimeout(() => {
        this.$store.commit('setLocalLoading', false);
      },0);
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
  }
</style>
