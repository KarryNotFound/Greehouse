<template>
    <div>
      <div>
        <img id="player" :src="videoSrc" style="width: 100%; height: 950px" v-if="videoSrc"/>
        <p v-else>正在等待视频流...</p>
      </div>
    </div>
  </template>
  
  <script>
  import mqtt from 'mqtt'
  
  export default {
    data() {
      return {
        message: '',
        videoSrc: '',       // 存储当前显示的视频流图像
        mqttClient: null,   // MQTT 客户端对象
        connectionTimeout: null,  // 连接超时定时器
        isConnected: false, // 标志 MQTT 是否已连接
      }
    },
    mounted() {
      this.connectMqtt();  // 组件挂载时连接 MQTT
    },
    methods: {
      // 连接 MQTT 方法
      connectMqtt() {
        const mqttServer = "ws://121.37.246.8:8083/mqtt"; // WebSocket连接地址
        const mqttTopic = "camera/stream"; // 主题与 Android 端一致
        this.mqttClient = mqtt.connect(mqttServer);
  
        this.mqttClient.on('connect', () => {
          this.setMessageHtml("MQTT连接成功");
          this.isConnected = true;  // 连接成功时设置为 true
          this.mqttClient.subscribe(mqttTopic, (err) => {
            if (!err) {
              this.setMessageHtml("订阅成功: " + mqttTopic);
              clearTimeout(this.connectionTimeout); // 清除连接超时定时器
            } else {
              this.setMessageHtml("订阅失败: " + mqttTopic);
              this.showConnectionFailed(); // 显示连接失败提示
            }
          });
        });
  
        this.mqttClient.on('message', (topic, payload) => {
          if (topic === mqttTopic) {
            // 处理消息并更新视频流图像
            this.videoSrc = 'data:image/jpeg;base64,' + payload.toString();
            this.isConnected = true; // 每次收到消息时，更新连接状态为已连接
          }
        });
  
        this.mqttClient.on('error', (err) => {
          this.setMessageHtml("MQTT连接错误: " + err);
          this.isConnected = false; // 连接错误时标记为未连接
          this.showConnectionFailed(); // 显示连接失败提示
        });
  
        this.mqttClient.on('close', () => {
          this.setMessageHtml("MQTT连接关闭");
          this.isConnected = false; // 连接关闭时标记为未连接
          // 在连接关闭时，不要立即清除图像，而是仅记录连接状态
        });
  
        // 设置连接超时
        this.connectionTimeout = setTimeout(() => {
          if (!this.isConnected) {
            this.setMessageHtml("连接超时");
            this.showConnectionFailed(); // 显示连接失败提示
          }
        }, 5000); // 5 秒后提示连接失败
      },
      setMessageHtml(message) {
        this.message += message + "<br/>";
      },
      showConnectionFailed() {
        if (!this.isConnected) {
          this.setMessageHtml("当前未连接，正在重试...");
          // 不要清空 videoSrc，这样即使断开连接也不会丢失最后一帧图像
        }
      }
    }
  }
  </script>
  
  <style scoped>
  #message {
    margin-bottom: 10px;
  }
  </style>
  