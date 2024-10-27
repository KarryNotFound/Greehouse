<template>
  <div style="width: 100%; height: 100%;">
    <h1>{{message}}</h1>
    <div ref="chart" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'LineChartComponent',
  props:["title","color"],
  data() {
    return {
      chart: null,
      message:null,
      option: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line',
            areaStyle: {},
            smooth:true,
            itemStyle: {
              color: this.color // 曲线的颜色
            },
            lineStyle: {
              color: this.color // 线条的颜色
            }
          }
        ]
      }
    };
  },
  mounted() {
    if(this.title == "airhumidity"){
      this.message = "空气湿度(%)"; 
    }
    else if(this.title == "temperature"){
      this.message = "空气温度(℃)"; 
    }
    else if(this.title == "soilhumidity"){
      this.message = "土壤湿度(%)"; 
    }
    else if(this.title == "intensity"){
      this.message = "光照强度(klx)"; 
    }
    else if(this.title == "ph"){
      this.message = "PH值(1-14)"; 
    }
    else if(this.title == "carbondioxide"){
      this.message = "二氧化碳浓度(ppm)"; 
    }
    this.initChart();
    this.fetchData();
    this.timer = setInterval(()=>{
        this.fetchData();
    },1000);

    window.addEventListener('resize', this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart);
    if (this.chart) {
      this.chart.dispose();
    }

    clearInterval(this.timer);
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(this.option);
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    fetchData() {
      let _this = this;
      let xData = [];
      let yData = [];
      if(this.title){
      console.log("/"+_this.title+"/real/findAll")
      this.$http.get("/"+_this.title+"/real/findAll").then(function(response){
        console.log(response);
        response.data.forEach(item => {
          xData.push(_this.formatDate(item.time));
          yData.push(item.value);
        });
        console.log(xData);
        _this.option.xAxis.data = xData;
        _this.option.series[0].data = yData;
        _this.chart.setOption(_this.option);  // Update chart option after setting new data
      });
    }else{
      return;
    }
    },
    formatDate(date) {
      const d = new Date(date);
      const hours = (`0${d.getHours()}`).slice(-2);
      const minutes = (`0${d.getMinutes()}`).slice(-2);
      const seconds = (`0${d.getSeconds()}`).slice(-2);
      return `${hours}:${minutes}:${seconds}`;
    },
  }
}

</script>

<style scoped>
h1{
    position: relative;
    font-size: 20px;
    top:20px;
}
</style>