<template>
    <div>
      <div class="myBarChart2" ref="barchart2"></div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import "lib-flexible/flexible.js";

export default {
    props: {
        title: {
            type: String
        },
        color: {
            type: String
        },
        b_data: {
            type: Number
        },
        r_data: {
            type: Number
        },
        unit: {
            type: String
        }
    },
    data() {
        return {
            myChart: null,
            //2.指定配置
            option: {
                grid: {
                    top: '1%',
                    left: '22%',
                    bottom: '10%',
                },
                //不显示x
                xAxis: {
                    show: false,
                },
                //不显示y轴线和刻度
                yAxis: [
                    {
                        axisLabel: {
                            color: "white",
                            fontSize: 19 // 修改字体大小为19px
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        type: 'category',
                        data: [this.title],

                    },
                    {
                        axisLabel: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        type: 'category',
                        data: [this.title],
                    }
                ],
                series: [
                    {
                        name: '条',
                        type: 'bar',
                        data: [this.b_data],
                        yAxisIndex: 0,
                        //修改圆角
                        itemStyle: {
                            barBorderRadius: 20,
                            //此时color修改柱子颜色
                            color: this.color,
                        },
                        //修改柱子宽度
                        barWidth: 10,
                        //设置第一组柱子的显示数据
                        label: {
                            normal: {
                                show: true,
                                //图形内显示
                                position: "inside",
                                //文字显示形式
                                //{c}会自动解析为数据,data中的
                                formatter: '{c}' + this.unit,
                                color: 'white',
                                fontWeight: 1000,
                                fontSize: 15
                            }
                        }
                    },
                    //第二组柱子
                    {
                        name: '框',
                        type: 'bar',
                        data: [this.r_data],
                        barWidth: 15,
                        yAxis: 1,
                        yAxisIndex: 1,
                        itemStyle: {
                            color: "none",
                            borderWidth: 3,
                            borderColor: "#00c1de",
                            barBorderRadius: 15,
                        },
                    }
                ],
            }
        }
    },
    mounted() {
        this.drawEcharts();
    },
    methods: {
        drawEcharts() {
            this.myChart = echarts.init(this.$refs.barchart2);
            this.myChart.setOption(this.option);
            window.addEventListener("resize", this.resizefun);
        },
        resizefun() {
            this.myChart.resize();
        }
    }
}
</script>

<style scoped>
.myBarChart2 {
    position: relative;
    height: 40px;
    top: 0;
    bottom: 0;
}
</style>
