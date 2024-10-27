import mqtt from 'mqtt';

const options = {
  clean: true, // 保持会话
  connectTimeout: 4000, // 超时时间
  // 认证信息
  clientId: 'KyMms_abcabcabc',
  username: 'admin',
  password: 'public',
};

// 连接到 MQTT 服务器
const client = mqtt.connect('ws://121.37.246.8:8083/mqtt', options);

// 连接事件
client.on('connect', () => {
  console.log('Connected to MQTT broker');
});

// 错误事件
client.on('error', (err) => {
  console.error('Connection error: ', err);
  client.end();
});

export default client;
