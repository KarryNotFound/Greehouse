<template>
    <div id="app">
      <h1>实时视频流</h1>
      <img :src="imageSrc" alt="实时视频流" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        imageSrc: ""  // 用于存放接收的视频流
      };
    },
    mounted() {
      // 连接到 WebSocket 服务
      const socket = new WebSocket("ws://localhost:8081");
      
      // 监听 WebSocket 连接事件
      socket.onopen = () => {
        console.log("已连接到 WebSocket 服务器");
      };
  
      // 接收来自 WebSocket 的消息
      socket.onmessage = (event) => {
        // 将 Base64 编码的图片数据设置为 image 的 src
        this.imageSrc = `data:image/jpeg;base64,${event.data}`;
      };
  
      // 监听 WebSocket 关闭事件
      socket.onclose = () => {
        console.log("WebSocket 连接已关闭");
      };
    }
  };
  </script>
  
  <style scoped>
  #app {
    text-align: center;
  }
  
  img {
    width: 1600px;   /* 设置宽度为 600px */
    height: 1000px;  /* 设置高度为 900px */
    border: 1px solid #ddd;
  }
  </style>
  