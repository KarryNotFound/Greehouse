<template>
  <div style="width: 100%; height: 100%; ">
    <div style="width: 100%; height: 20%; position:relative; top:20px; font-size:16px; font-family:alimama; font-weight: 1500; "><h2>{{title}}</h2></div>
    <div ref="chart" style="width: 100%; height: 80%;"></div>
  </div>
 </template>
  
  <script>
  import * as echarts from 'echarts';

  export default {
    props:{titleName:String,min1:Number,max1:Number},
    name: 'GaugeChart',
    data() {
      return {
        title:this.titleName,
        myChart: null,
        chartOption: {
          series: [
            {
              min:this.min1,
              max:this.max1,
              radius:"100%",
              type: 'gauge',
              axisLine: {
                lineStyle: {
                  width: 30,
                  color: [
                  ]
                }
              },
              pointer: {
                itemStyle: {
                  color: 'auto'
                }
              },
              axisTick: {
                distance: -30,
                length: 8,
                lineStyle: {
                  color: '#fff',
                  width: 2
                }
              },
              splitLine: {
                distance: -30,
                length: 30,
                lineStyle: {
                  color: '#fff',
                  width: 3
                }
              },
              axisLabel: {
                color: 'inherit',
                distance:40,
                fontSize: 25
              },
              detail: {
                valueAnimation: true,
                formatter: '{value}',
                color: 'inherit',
                fontSize:30,
                offsetCenter: [0, '70%'] // 修改这个值来改变文字的方位
              },
              data: [
                {
                  value:null,
                }
              ]
            }
          ]
        }
      };
    },
    created(){
    if(this.title=="空气温度"){
          this.chartOption.series[0].axisLine.lineStyle.color=[
                          [0.2, '#FF3333'],
                          [0.3,'orange'],
                          [0.5,'#32CD32'],
                          [0.6,'orange'],
                          [1, '#FF3333']
          ];
          this.chartOption.series[0].detail.formatter +="℃";
        }else if(this.title=="空气湿度"){
          this.chartOption.series[0].axisLine.lineStyle.color=[
                          [0.3,'#FF3333'],
                          [0.5,'orange'],
                          [0.7,'#32CD32'],
                          [0.9,'orange'],
                          [1, '#FF3333']
          ];
          this.chartOption.series[0].detail.formatter +="%";
        }else if(this.title=="二氧化碳"){
          this.chartOption.series[0].axisLine.lineStyle.color=[
                          [0.1,'#FF3333'],
                          [0.3,'orange'],
                          [0.6,'#32CD32'],
                          [0.8,'orange'],
                          [1, '#FF3333']
          ];
          this.chartOption.series[0].detail.formatter +="ppm";
        }else if(this.title=="光照强度"){
          this.chartOption.series[0].axisLine.lineStyle.color=[
                          [0.1,'#FF3333'],
                          [0.2,'orange'],
                          [0.6,'#32CD32'],
                          [0.8,'orange'],
                          [1, '#FF3333']
          ];
          this.chartOption.series[0].detail.formatter +="klx";
        }


        this.fetchData();
        this.timer = setInterval(() => {
         this.fetchData();
        }, 1000); 
    },
    destroyed() {
     clearInterval(this.timer); // 组件销毁时清除定时器
    },
    mounted() {
      this.initChart();
      // this.updateChart();
      window.addEventListener("resize",this.resizefun);
    },
    beforeDestroy() {
      if (this.myChart) {
        this.myChart.dispose();
      }
    },
    methods: {
      resizefun(){
          if(this.myChart){
            this.myChart.resize();
          }
      },
      fetchData() {
          // 发送请求获取最新数据，并更新Vue组件中的数据
          let _this = this;
            this.$http.get('/environment/day/findByUid/'+'1')
            .then(function(response){
                if(_this.title=="空气温度"){
                   _this.chartOption.series[0].data[0].value = response.data.temperature
                }else if(_this.title=="空气湿度"){
                  _this.chartOption.series[0].data[0].value = response.data.airHumidity
                }else if(_this.title=="二氧化碳"){
                  _this.chartOption.series[0].data[0].value = response.data.carbondioxide
                }else if(_this.title=="光照强度"){
                 _this.chartOption.series[0].data[0].value = response.data.intensity
                }
                _this.myChart.setOption(_this.chartOption);
            })

        },
      initChart() {
        this.myChart = echarts.init(this.$refs.chart);
        this.myChart.setOption(this.chartOption);
      },
      updateChart() {
        setInterval(() => {
          this.myChart.setOption({
            series: [
              {
                data: [
                  {
                    value: +(Math.random() * 100).toFixed(2)
                  }
                ]
              }
            ]
          });
        }, 2000);
      }
    }
  };
  </script>
  
  <style scoped>
  /* 样式可以根据需要进行调整 */
  </style>