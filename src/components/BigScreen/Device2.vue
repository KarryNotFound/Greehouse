<template>
    <div>
    <div ref="devicechart2" class="myDeviceChart2"></div>  
    </div>
</template>

<script>
import * as echarts from "echarts"
import "lib-flexible/flexible.js"
export default {
    props:{
      title:{
        type:String
      },
      grade:{
        type:Number
      }
    },
    data(){
        return{
        myChart:null,
        option:{
            series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#FF6E76'],
              [0.5, '#FDDD60'],
              [0.75, '#58D9F9'],
              [1, '#7CFFB2']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '40%',
          width: 5,
          offsetCenter: [0, '10%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 18,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        axisLabel: {
          show:'none',
          color: '#464616',
          fontSize: 10,
          distance: -60,
          rotate: 'tangential',
          formatter: function (value) {
            if (value === 0.875) {
              return;
            } else if (value === 0.625) {
              return;
            } else if (value === 0.375) {
              return;
            } else if (value === 0.125) {
              return;
            }
            return;
          }
        },
        title: {
          offsetCenter: [0, '-125%'],
          fontSize:17,
          fontWeight:1000,
          color:this.myColor,
        },
        detail: {
          fontSize: 40,
          offsetCenter: [0, '100%'],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 100) + '';
          },
          color: 'white',
        },
        data: [
          {
            value: this.grade,
            name: this.title,
          }
          
        ],
      }
    ]
        }
    }
    },
    mounted(){
        this.drawEcharts();
    },
    methods:{
        drawEcharts(){
            this.myChart = echarts.init(this.$refs.devicechart2);

            this.myChart.setOption(this.option);

            window.addEventListener("resize",this.resizefun);
        },
        resizefun(){
            this.myChart.resize();
        }
    }
}
</script>

<style scoped>

.myDeviceChart2{
    position:relative;
    height:120px;
    width:150px;
    left:15px;
    top:25px;
}
</style>