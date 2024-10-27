<template>
    <div class="flex justify-center items-center">
        <h1>{{title}}</h1>
      <div
        class="7"
        ref="wavechart"
        :style="{ position:'relative',width: '300px', height: '300px' ,top:'80px',left:'30px'}"
      ></div>
    </div>
</template>


<script>
import * as echarts from "echarts";
import "echarts-liquidfill";
export default {
  props: { completionRate: Number , title : String,color :String},
  data(){
    return{
        rate:65
    }
},
  methods: {
    draw() {
       let newVal = this.rate;
       let word = "";
       const wavechart = echarts.init(this.$refs.wavechart);
//ECharts5 除了一贯的默认主题外，还内置了'dark'主题。可以像这样切换成深色模式：var chart = echarts.init(dom, 'dark');
      window.onresize = wavechart.resize;//在窗口大小改变时，相应的元素能够适应新的窗口尺寸。
      const option = {
        title: {
          text: [`{a|${newVal}}`, `{b|${word}}`].join(""),//'\n'换行，主标题
          textStyle: {//主标题文字的样式
            rich: {//在 rich 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。例子：formatter: ['{a|这段文本采用样式a}','{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'].join('\n')
              a: {
                fontSize: 40,
                 },
            },
            b:{
              fontSize:100,
              color:'red'
            },
            color: "#E2F8FF",
            fontSize: 25,
            lineHeight: 24,
            fontWeight: 400,
          },
          subtext: "",//副标题
          subtextStyle: {fontSize: 20},//副标题文字的样式
          left: "center",
          top: "center",//title 组件离容器上侧的距离。
        },
        series: [
          {
            type: "liquidFill",
            center: ["50%", "50%"],
            radius: "98%",
            data: [newVal / 100],
            direction: "right", //波浪的方向｛left right none}
            outline: {
              show: true, //是否显示轮廓 布尔值
              borderDistance: 15, // 外部边框与图表的距离 数字
              itemStyle: {
                borderColor: {
                  // 边框的颜色
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: ["rgba(32, 128, 223,1)"], // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: ["rgba(62, 146, 226,0.7)"], // 50% 处的颜色
                    },
                    {
                      offset: 1,
                      color: ["rgba(6, 11, 30, 0.5)"], // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                borderWidth: 1, // 边框的宽度
                shadowOffsetX: 0,
                shadowOffsetY: 8,
                shadowColor: "#000000", //外部轮廓的阴影颜色
              },
            },
            itemStyle: {
              opacity: 0.8, // 波浪的透明度·
              shadowBlur: 0, // 波浪的阴影范围
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: [this.color], // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: ["rgba(102, 217, 255, 1)"], // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            backgroundStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: ["rgba(13, 25, 38,1)"], // 0% 处的颜色
                  },
                  {
                    offset: 0.6,
                    color: ["rgba(34, 64, 94, 1)"], // 60% 处的颜色
                  },
                  {
                    offset: 0.93,
                    color: ["rgba(64, 127, 191, 1)"], // 93% 处的颜色
                  },
                  {
                    offset: 1,
                    color: ["rgba(51, 254, 255, 0.8)"], // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            label: {
              // 数据展示样式
              show: false,
            },
          },
        ],
      };
      wavechart.setOption(option);
    },
  },
  mounted() {
    let v = this.completionRate;
    this.rate = v;
  },
  watch: {
        rate: function (newVal) {
        this.draw(newVal);
    },
  },
};
</script>

<style scoped>
    @import "../../css/index.css";
</style>