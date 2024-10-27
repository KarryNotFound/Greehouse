<template>
  <div>
    <h1>大棚一周数据</h1>
    <div ref="barchart1" class="myBarChart1"></div>
  </div>
</template>

<script>
import * as echarts from "echarts"
import "lib-flexible/flexible.js"
export default {
  data() {
    return {
      chart: null,
      option: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '0%',
          textStyle: {
            color: '#4c9bfd',
            fontSize: 15,
          },
          data: ["空气湿度", '空气温度', '二氧化碳', 'ph', '土壤湿度', '光照强度']
        },
        grid: {
          bottom: '4%',
          left: '3%',
          right: '4%',
          show: true,
          color: "#02a6b5",
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#4c9bfd'
          },
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#4c9bfd'
          },
          splitLine: {
            lineStyle: {
              color: '#012f4a'
            }
          }
        },
        series: [
          {
            name: "空气湿度",
            type: 'line',
            smooth: true,
            data: [],
            tooltip: {
              valueFormatter: value => value / 10 + '%'
            },
            color: "green",
          },
          {
            name: '空气温度',
            type: 'line',
            smooth: true,
            data: [],
            tooltip: {
              valueFormatter: value => value / 10 + '℃'
            },
            color: "#F57474",
          },
          {
            name: '二氧化碳',
            type: 'line',
            smooth: true,
            data: [],
            tooltip: {
              valueFormatter: value => value + 'ppm'
            },
            color: "#56D0E3",
          },
          {
            name: 'ph',
            type: 'line',
            smooth: true,
            data: [],
            tooltip: {
              valueFormatter: value => value / 100,
            },
            color: "white",
          },
          {
            name: '土壤湿度',
            type: 'line',
            smooth: true,
            data: [],
            tooltip: {
              valueFormatter: value => value / 10 + '%'
            },
            color: "yellow",
          },
          {
            name: '光照强度',
            type: 'line',
            smooth: true,
            data: [],
            tooltip: {
              valueFormatter: value => value + 'klx'
            },
            color: "#8B78F6",
          },
        ]
      },
      timer: null
    }
  },
  mounted() {
    this.drawEcharts();
    this.startTimer();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    async fetchData() {
      try {
        let response = await this.$http.get("/environment/findAll");
        let data = response.data; // 假设数据结构是一个包含7组数据的数组
        this.updateChart(data);
      } catch (error) {
        console.error(error);
      }
    },
    updateChart(data) {
      let airHumidity = [];
      let airTemperature = [];
      let carbonDioxide = [];
      let ph = [];
      let soilHumidity = [];
      let lightIntensity = [];

      data.forEach((item, index) => {
        airHumidity.push(item.airHumidity);
        airTemperature.push(item.temperature);
        carbonDioxide.push(item.carbondioxide);
        ph.push(item.ph);
        soilHumidity.push(item.soilHumidity);
        lightIntensity.push(item.intensity);
      });

      this.option.series[0].data = airHumidity;
      this.option.series[1].data = airTemperature;
      this.option.series[2].data = carbonDioxide;
      this.option.series[3].data = ph;
      this.option.series[4].data = soilHumidity;
      this.option.series[5].data = lightIntensity;

      this.chart.setOption(this.option);
    },
    drawEcharts() {
      this.chart = echarts.init(this.$refs.barchart1);
      this.chart.setOption(this.option);
      window.addEventListener("resize", this.resizefun);
    },
    resizefun() {
      this.chart.resize();
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.fetchData();
      }, 100); // 每隔1秒更新一次数据
    }
  }
}
</script>

<style scoped>
h1 {
  height: 30px;
  color: white;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
}
.myBarChart1 {
  position: relative;
  height: 270px;
  top: 15px;
  left: 0;
  bottom: 0;
}
</style>
