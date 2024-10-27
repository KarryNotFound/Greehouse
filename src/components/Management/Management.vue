<template>
    <scale-box :width="1920" :height="1080" bgc="transparent" :delay="100">
      <div>
        <el-container>
          <el-aside width="200px" class="A">
            <div class="B">
              <div class="C1">
                <i class="el-icon-cloudy"></i>
              </div>
              <div class="C1">
                <h2>智能温室种植平台</h2>
              </div>
            </div>
            <navigate-menu @transmit="getName"></navigate-menu>
          </el-aside>
  
          <el-container>
            <el-header class="custom-header">
              <header-menu :title="name"></header-menu>    
            </el-header>
  
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </scale-box>
  </template>
  
  <script>
  import HeaderMenu from "../tools/HeaderMenu.vue";
  import NavigateMenu from '../tools/NavigateMenu.vue';
  import NavigateMenu2 from '../tools/NavigateMenu2.vue';
  import Buttomm from '../tools/buttomm.vue';
  import ScaleBox from 'vue2-scale-box';
  
  export default {
    data() {
      return {
        name: "",
        count: 0, // 声明 count
        notifyInstance: null // 保存通知实例
      }
    },
    created() {
      this.fetchWarningCount();
      this.interval = setInterval(this.fetchWarningCount, 200); 
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
    components: {
      HeaderMenu,
      NavigateMenu,
      NavigateMenu2,
      Buttomm,
      ScaleBox
    },
    watch: {
      count(newCount) {
        // 当 count 发生变化时，更新通知
        if (this.notifyInstance) {
          this.notifyInstance.close(); // 关闭现有的通知
        }
        if (newCount != 0) {
          this.notifyInstance = this.$notify({
            title: `您有${newCount}条未处理的报警信息!`,
            message: "请前往智能预警平台查看",
            type: "warning",
            duration: 5000
          });
        }
      }
    },
    methods: {
      getName(name) {
        this.name = name;
      },
      fetchWarningCount() {
        this.$http.get("/warning/info/findCount")
          .then(response => {
            this.count = response.data;
            console.log(this.count);
          })
          .catch(error => {
            console.error("Failed to fetch warning count:", error);
          });
      }
    }
  }
  </script>
  
  <style scoped>
  @import url("//unpkg.com/element-ui@2.15.14/lib/theme-chalk/index.css");
  
  .el-header, .el-footer {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  .A .B{
    display:flex;
  }
  
  .A .B .C1{
    flex:1;
  }
  
  .A .B .C1:nth-child(2){
    flex:15
  }
  
  .A .B .C1 .el-icon-cloudy{
    position: relative;
    height:30px;
    left:12px;
    top:22px;
    font-size:10px;
  }
  
  .A h2{
    position:relative;
    height:60px;
    top:0px;
    text-align: center;
    align-content: center;
    font-size:19px;
    left:5px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 1080px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 1000px;
  }
  

  
  .custom-header .header-menu {
    font-size: 20px;
  }
  </style>
  