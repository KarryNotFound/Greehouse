<template>
    <div class="scrollable-area-container">
        <template>
 
 <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
 </template>
      <el-scrollbar class="scrollable-area">
        <div class="Chart">
            <bar-chart-3 title="airhumidity" color="red"></bar-chart-3>
        </div>
        <div class="Chart2">
        </div>

        <div class="Chart">
          <bar-chart-3 title="temperature" color="orange"></bar-chart-3>
        </div>

        <div class="Chart2">
        </div>

        <div class="Chart">
          <bar-chart-3 title="intensity" color="blue"></bar-chart-3>
        </div>

        <div class="Chart2">
        </div>

        <div class="Chart">
          <bar-chart-3 title="soilhumidity" color="green"></bar-chart-3>
        </div>

        <div class="Chart2">
        </div>

        <div class="Chart">
          <bar-chart-3 title="ph" color="cyan"></bar-chart-3>
        </div>

        <div class="Chart2">
        </div>

        <div class="Chart">
          <bar-chart-3 title="carbondioxide" color="gray"></bar-chart-3>
        </div>
     
      </el-scrollbar>
    </div>
  </template>
  
  <script>
  import { Scrollbar } from 'element-ui';
import BarChart3 from './BarChart3.vue';

  
  export default {
    name: 'ScrollableArea',
    components: {
      [Scrollbar.name]: Scrollbar,
      BarChart3
    }
  };
  </script>
  
  <style scoped>
  .scrollable-area-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
  }
  
  .scrollable-area {
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
  

  .Chart{
    height:400px;
    width:100%
  }

  .Chart2{
    height:250px;
    width:100%
  }

  .el-scrollbar__wrap::-webkit-scrollbar-track {
  background: #f1f1f1; /* 滚动条轨道的背景色 */
}


  </style>

  