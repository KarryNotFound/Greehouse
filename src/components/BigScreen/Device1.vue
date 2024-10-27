<template>
    <div>
        <div ref="devicechart1" class="myDeviceChart1"></div>
    </div>
</template>

<script>
import * as echarts from "echarts"
import "lib-flexible/flexible.js"
export default {
    props:["title","color"],
    created:function(){

    },
        data(){
            return{
            myChart:null,
            option:{
                grid: {
        top: '1%',
        left: '70%',
        bottom: '10%',
      },
      //不显示x
      xAxis: {
        show:false
      },
      //不显示y轴线和刻度
      yAxis:[
      {
          axisLabel:{
              color:"white",
              fontWeight:800,
              fontSize:17,
          },
          axisLine:{
              show:false,
          },
          axisTick:{
              show:false,
          },
        type: 'category',
        data: [this.title],
        },
        {
          axisLabel:{
            show:false,
        },
        axisLine:{
            show:false,
        },
        axisTick:{
            show:false,
        },
      type: 'category',
      data: [''],
        }
      ],
      series: [
        {

          name: '条',
          type: 'bar',
          data: [
            {
              value:10,
              itemStyle:{
                normal:{
                  color:"none",
                }
              }
            },
            {
              value:5,
            }],
          yAxisIndex:0,
          //修改圆角
          itemStyle:{
              barBorderRadius:10,
              //此时color修改柱子颜色
              color: this.color,
          },
          //修改柱子宽度
          barWidth:14,
          //设置第一组柱子的显示数据
          label:{
              normal:{
                  show:false,
                  //图形内显示
                  position:"inside",
                  //文字显示形式
                  //{c}会自动解析为数据,data中的
                  formatter: '{c}'+"%",
              }
            }
          },
          ///第二组柱子
         {
          name: '框',
          type: 'bar',
          data: [5],
          barWidth:15,
          yAxis:1,
          yAxisIndex:1,
          itemStyle:{
            color:"none",
            borderWidth:3,
            borderColor:"black",
            barBorderRadius:15,
        },
        }
    ],
        }
    }
},
        mounted(){
            this.drawEcharts();
        },
        methods:{
            drawEcharts(){  
                this.myChart = echarts.init(this.$refs.devicechart1);

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
  .myDeviceChart1{
    position: relative;
    height:50px;
    width:250px;
    top:20px;
    left:14px;
    bottom: 0;
}

</style>