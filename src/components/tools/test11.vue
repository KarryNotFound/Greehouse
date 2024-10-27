<template>
  <div>
    <h1>MQTT in Vue</h1>
    <button @click="sendMessage">Send Message</button>
    <div>{{ message }}</div>
    <div>{{ connectionStatus }}</div> <!-- 显示连接状态 -->
  </div>
</template>

<script>
import mqttClient from '../../js/mqttServer';

export default {
  data() {
    return {
      message: '',
      connectionStatus: 'Connecting...', // 初始状态为连接中
    };
  },
  created() {
    // 连接到 MQTT 服务器并设置连接状态
    mqttClient.on('connect', () => {
      this.connectionStatus = 'Connected to MQTT broker';
      console.log('Connected to MQTT broker');
      
      // 订阅主题
      mqttClient.subscribe('mqtt135', (err) => {
        if (!err) {
          console.log('Subscribed to topic');
        }
      });
    });

    mqttClient.on('error', (err) => {
      this.connectionStatus = 'Connection failed: ' + err.message;
      console.error('Connection error: ', err);
    });

    // 接收消息
    mqttClient.on('message', (topic, message) => {
      this.message = message.toString();
    });
  },
  methods: {
    sendMessage() {
      // 发送消息
      mqttClient.publish('Control', '["water_off"]');
    },
  },
};
</script>
