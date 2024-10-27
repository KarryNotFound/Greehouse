<template>
  <div class="mainbox2">
    <div class="panel1">
      <div class="A">
        <real-time-data></real-time-data>
      </div>
      <div class="A">
        <device-control></device-control>
      </div>
    </div>
    <div class="panel1">
        <div class="chart">
            <device-3 titleName="空气温度" min1="15" max1="40"></device-3>
        </div>
        <div class="chart">
          <device-3 titleName="空气湿度" min1="0" max1="100"></device-3>
        </div>
        <div class="chart">
          <device-3 titleName="二氧化碳" min1="0" max1="2000"></device-3>
        </div>
        <div class="chart">
          <device-3 titleName="光照强度" min1="0" max1="130"></device-3>
        </div>
    </div>
  </div>
</template>

<script>
import Device3 from '../tools/Device3.vue'
import DeviceControl from './DeviceControl.vue'
import RealTimeData from './RealTimeData.vue'
export default {
  components: { RealTimeData, DeviceControl, Device3 },

}
</script>

<style lang="less" scoped>
    .mainbox2{
      display:flex;
      flex-flow:column;
        height:1000px;
        .panel1{
          display:flex;
          flex:1;
          .A:nth-child(1){
            flex:5;
            border: 3px solid rgba(2,166,181);
        }
        .A:nth-child(2){
            flex:4;
            border: 3px solid rgba(2,166,181);
        }
        }

        .panel1:nth-child(2){
          position: relative;
          border: 3px solid rgba(2,166,181);
          display:flex;
          .chart{
            flex:1;
            border: 2px solid rgba(2,166,181);
          }
        }
    }

</style>