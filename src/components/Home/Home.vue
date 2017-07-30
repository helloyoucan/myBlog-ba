<template>
  <div>
    <div class="chart-list">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="chart">
            <!--<line-chart :chart-data="datacollection1"></line-chart>-->
          </div>
        </el-col>
        <el-col :span="12">
          <div class="chart">
            <!--<line-chart :chart-data="datacollection2"></line-chart>-->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
//  import LineChart from './LineChart'
  export default {
    name: '',
    components: {
      //LineChart
    },
    data() {
      return {
        datacollection1: {
          labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          datasets: [
            {
              label: '浏览次数',
              backgroundColor: '#99A9BF',
              data: [14, 12, 43, 15, 20, 16, 42, 15, 36, 15, 12, 23]
            }
          ]
        }, datacollection2: {
          labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          datasets: [
            {
              label: '添加文章数量',
              backgroundColor: '#E5E9F2',
              data: [45, 57, 57, 87, 99, 71, 14, 14, 78, 97, 41, 56]
            }
          ]
        },
      }
    },
    methods: {},
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
  .chart-list {
    padding: 10px;
    height: calc(100% - 20px);
  }

  .el-col {
    .chart {
      padding: 50px;
    }
  }
</style>
