
<template>
<scale-box :width="1920" :height="1080" bgc="transparent" :delay="100">
<div class="bigbox">

    <div class="header1">
        <!-- 头部数据 -->
        <h1>智能大棚监控页面</h1>
      
        <router-link to="/login" style="text-decoration:none">
            <div class="D">
            <buttom1></buttom1>
            </div>
        </router-link>
        <div class="showtime"> 
        </div>
    </div>
    <!-- 主题页面盒子 -->
    <div class="mainbox">

    <div class="column">
        <div class="panel">
            <p class="a">环境信息及其报警状况</p>
            <TableChart></TableChart>
            <div class="panel-footer"></div>
        </div>


        <div class="panel">
            <HeatMap></HeatMap>
            <div class="panel-footer"></div>
        </div>


        <div class="panel">
            <h2>各项指标实时数据</h2>
            <BarChart2 title="空气温度" color="#1089E7" b_data="24" r_data="50" unit="℃"></BarChart2>
            <BarChart2 title="空气湿度" color="#F57474" b_data="40" r_data="100" unit="℃"></BarChart2>
            <BarChart2 title="光照强度" color="#56D0E3" b_data="20" r_data="100" unit="klx"></BarChart2>
            <BarChart2 title="二氧化碳" color="#F8B448" b_data="400" r_data="1000" unit="ppm"></BarChart2>
            <BarChart2 title="土壤湿度" color="#8B78F6" b_data="33" r_data="100" unit="%"></BarChart2>
            <BarChart2 title="PH" color="green" b_data="7" r_data="14" unit=""></BarChart2>
            <div class="panel-footer"></div>
        </div>
    </div>


    <div class="column">
        <div class="panel3">
          <div class="chart7">
                <Sphere completionRate="100" title="系统运行状态评分" color="#98FB98"></Sphere>
          </div>
          <div class="chart7">
                <Sphere  completionRate="80" title="温室实时环境评分" color="rgba(153, 102, 255, 1)"></Sphere>
          </div>
          <div class="panel-footer"></div>
        </div>
        
        <div class="panel4">
            <h2>实时监控画面</h2>
            <!-- <div class="chart8">
            </div> -->
            <Monitoring></Monitoring>
        </div>
    </div>
    
    
    
    <div class="column">
        <div class="panel">
                <div class="chart1">
                    <BarChart></BarChart>
                </div>
            <div class="panel-footer"></div>
        </div>
       

        <div class="panel2">
               <h1 class="cccc">设备状态及指标正常度</h1>
               <!-- 设备状态 -->
                <div class="device1">
                    <div class="chart2">
                        <div class="chart6">
                        <Device1 title="CN-077 温度传感器" color="green"></Device1>
                        </div>
                        <div class="chart6">
                        <Device1 title="CN-088 湿度传感器" color="red"></Device1>
                        </div>
                        <div class="chart6">
                        <Device1 title="CN-099 光照传感器" color="green"></Device1>
                        </div>
                        <div class="chart6">
                        <Device1 title="CN-5二氧化碳传感器" color="green"></Device1>
                        </div>
                        <div class="chart6">
                        <Device1 title="CN-66 加热器" color="red"></Device1>
                        </div>
                    </div>
                    <div class="chart2">
                        <div class="chart6">
                        <Device1 title="CN-072 加湿器" color="green"></Device1>
                        </div>
                        <div class="chart6">
                        <Device1 title="CN-011 压力传感器" color="red"></Device1>
                        </div>
                        <div class="chart6">
                        <Device1 title="CN-022 遮光带" color="green"></Device1>
                        </div>
                        <div class="chart6">
                        <Device1 title="CN-087 流量传感器" color="green"></Device1>
                        </div>
                        <div class="chart6">
                        <Device1 title="CN-033 负压风机" color="red"></Device1>
                        </div>
                    </div>
                </div>
                <!-- 指标正常度 -->
                <div class="device2">
                   <div class="chart3">
                        <div class="chart5">
                            <Device2 title="二氧化碳" grade="0.7"></Device2>
                        </div>
                        <div class="chart5">
                            <Device2 title="空气湿度" grade="0.2"></Device2>
                        </div>
                        <div class="chart5">
                            <Device2 title="空气温度" grade="0.4"></Device2>
                        </div>
                   </div>

                    
                   <div class="chart3">
                        <div class="chart5">
                            <Device2 title="光照强度" grade="0.4"></Device2>
                        </div>
                        <div class="chart5">
                            <Device2 title="PH" grade="1"></Device2>
                        </div>
                        <div class="chart5">
                            <Device2 title="土壤湿度" grade="0.5"></Device2>
                        </div>
                   </div>
                </div>
            <div class="panel-footer"></div>
        </div>
    </div>

    </div>
</div> 
</scale-box>
</template>



<script>
    import "../../js/index.js";
    import "lib-flexible/flexible.js";
    import BarChart from "./BarChart.vue";
    import Device1 from "./Device1.vue";
    import Device2 from "./Device2.vue";
    import BarChart2 from "./BarChart2.vue";
    import HeatMap from "./HeatMap.vue";
    import TableChart from "./TableChart.vue";
    import Sphere from "./Sphere.vue";
    import buttom1 from "../tools/buttomm.vue";
    import ScaleBox from "vue2-scale-box";
    import Monitoring from "../Management/Monitoring4.vue";
export default{
    name: 'Screen',
    data(){
      return{
        temperature:null,
        air_humidity:null,
        intensity:null,
        carbondioxide:null,
        ph:null,
        soil_humidity:null,  
      }
    },
    components:{
        BarChart,
        BarChart2,
        Device1,
        Device2,
        HeatMap,
        TableChart,
        Sphere,
        buttom1,
        Monitoring,
        ScaleBox,
    },
    created(){
   
    },
    destroyed(){
        clearInterval(this.timer);
    },

}
 
</script>

<style scoped>

    @import "../../css/index.css";
    @import '../../assets/fonts/font.css';
    .cccc{
        position:relative;
        color:white;
        text-align:center;
        align-items: center;
        font-size:20px;
        line-height:20px;
        top:7px;
    
    }
    .D{
        position: relative;
        left:0px;
        bottom:30px;
    }

</style>