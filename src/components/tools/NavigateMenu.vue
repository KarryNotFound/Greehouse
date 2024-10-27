<template>
  <div class="nm">
  <el-row class="tac">
      <el-col :span="25">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#778899"
          text-color="#fff"
          active-text-color="#ffd04b"
          >
          <el-submenu index="1">
            <template slot="title" >
              <i class="el-icon-location" @click="togo1"></i>
              <span @click="togo1" class="aa">环境及设备管理</span>
            </template>
  
            <el-menu-item-group>
              <i class="a">设备管理</i>
              <el-menu-item index="1-1" >
                <div class="a1" @click="togo1">
                <i>运行状态</i>
                </div>
              </el-menu-item>
              <el-menu-item index="1-2">
                <div class="a1" @click="togo2">
                <i>监测统计</i>
                </div>
              </el-menu-item>
            </el-menu-item-group>
  
            <el-menu-item-group>
              <i class="a">数据查询</i>
              <el-menu-item index="1-3">
                <div class="a1" @click="togo3">
                <i>历史数据查询</i>
                </div>
              </el-menu-item>
            </el-menu-item-group>
  
          </el-submenu>
  
          <el-menu-item index="2" @click="togo4">
            <i class="el-icon-menu"></i>
            <span slot="title">环境智能预警</span>
          </el-menu-item>
  
          <el-menu-item index="3" @click="togo5">
            <i class="el-icon-document"></i>
            <span slot="title">视频监控</span>
          </el-menu-item>
  
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span class="aa">智慧服务</span>
            </template>
            <el-menu-item index="4-1">
              <div class="a1" @click="togo6">
                <i>智慧问答</i>
              </div>
            </el-menu-item>
            <el-menu-item index="4-2">
              <div class="a1" @click="togo7">
                <i>病虫害检测</i>
              </div>
            </el-menu-item>
          </el-submenu>
          
        </el-menu>
      </el-col>
    </el-row>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        id: -1,
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      togo1() {
        this.id = 1;
        this.$emit('transmit', "/ 环境及设备管理 / 运行状态");
      },
      togo2() {
        this.id = 2;
        this.$emit('transmit', "/ 环境及设备管理 / 监测统计");
      },
      togo3() {
        this.id = 3;
        this.$emit('transmit', "/ 环境及设备管理 / 历史数据查询");
      },
      togo4() {
        this.id = 4;
        this.$emit('transmit', "/ 环境智能预警");
      },
      togo5() {
        this.id = 5;
        this.$emit('transmit', "/ 视频监控");
      },
      togo6() {
        this.id = 6;
        this.$emit('transmit', "/ 智慧服务 / 智慧问答");
      },
      togo7() {
        this.id = 7;
        this.$emit('transmit', "/ 智慧服务 / 病虫害检测");
      }
    },
    watch: {
      id: function (newVal) {
        window.location.href = "#/management/" + this.id;
      }
    }
  }
  </script>
  
  <style scoped>
  .a {
    position: relative;
    color: yellow;
    left: 48px;
    bottom: 8px;
    font-weight: 800;
    font-size: 18px;
    text-align: center;
    align-content: center;
  }
  
  .a1 {
    position: relative;
    color: white;
    bottom: 2px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    background-color: rgb(176, 171, 171, 0.1);
    height: 100%;
    width: 200%;
    right: 40px;
    text-align: center;
    align-content: center;
  }
  
  .a1 i {
    position: relative;
    color: white;
    font-weight: 800;
    right: 25px;
    top: 10px;
    font-size: 20px;
  }
  
  .nm {
    height: 765px;
  }
  
  .nm .el-menu-item {
    height: 160px;
    width: 200px;
    font-size: 19px;
    text-align: center;
    align-content: center;
  }
  
  .el-submenu {
    text-align: center;
    align-content: center;
  }
  
  .el-icon-location,
  .el-icon-document,
  .el-icon-setting {
    color: white;
  }
  
  .aa {
    font-size: 18px;
    left: 20%;
    font-size: 19px;
  }
  </style>
  