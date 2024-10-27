<template>
    <div class="gradio-container">
      <iframe
        id="gradioIframe"
        :src="gradioUrl"
        width="100%"
        height="1000px"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <div class="speech-container">
        <button @click="startRecognition">开始语音识别</button>
        <button @click="stopRecognition">停止语音识别</button>
        <button @click="sendToMQTT">确定</button> <!-- 添加发送到 MQTT 的按钮 -->
        <p>{{ result }}</p>
        <p>连接状态: {{ connectionStatus }}</p> <!-- 显示 MQTT 连接状态 -->
      </div>
    </div>
  </template>
  
  <script>
  import mqttClient from '../../js/mqttServer'; // 引入 MQTT 连接实例
  
  export default {
    data() {
      return {
        gradioUrl: "https://app-b9a8j2d775a4w9e6.aistudio-app.com/",
        result: "点击按钮开始语音识别...",
        recognition: null,
        notifyInstance: null,
        connectionStatus: 'Connecting...', // 显示连接状态
      };
    },
    mounted() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'zh-CN';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
  
        this.recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          this.result = transcript;
  
          this.sendTextToGradio(transcript);
          this.copyToClipboard(transcript);
        };
  
        this.recognition.onend = () => {
          console.log('语音识别结束。');
        };
      } else {
        this.result = '你的浏览器不支持语音识别 API。';
      }
  
      // MQTT 连接设置
      mqttClient.on('connect', () => {
        this.connectionStatus = 'Connected to MQTT broker';
        console.log('Connected to MQTT broker');
  
        // 订阅主题
        mqttClient.subscribe('input', (err) => {
          if (!err) {
            console.log('Subscribed to topic input');
          }
        });
      });
  
      mqttClient.on('error', (err) => {
        this.connectionStatus = 'Connection failed: ' + err.message;
        console.error('Connection error: ', err);
      });
  
      mqttClient.on('message', (topic, message) => {
        console.log(`Received message on topic ${topic}: ${message.toString()}`);
      });
    },
    methods: {
      startRecognition() {
        if (this.recognition) {
          this.recognition.start();
          this.result = '正在聆听...';
        } else {
          this.result = '语音识别在你的浏览器中不受支持。';
        }
      },
      stopRecognition() {
        if (this.recognition) {
          this.recognition.stop();
        } else {
          this.result = '语音识别在你的浏览器中不受支持。';
        }
      },
      sendTextToGradio(test) {
        const iframeWindow = document.getElementById('gradioIframe').contentWindow;
        iframeWindow.postMessage(
          { type: 'setText', text: test },
          'https://8102884f694d7e3022.gradio.live/'
        );
      },
      copyToClipboard(text) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text)
            .then(() => {
              console.log('文本已成功复制到剪切板:', text);
              this.showNotification('语音识别内容已添加至剪贴板');
            })
            .catch((err) => {
              console.error('复制到剪切板失败:', err);
            });
        } else {
          console.warn('Clipboard API 不受支持');
        }
      },
      showNotification(message) {
        if (this.notifyInstance) {
          this.notifyInstance.close();
        }
        this.notifyInstance = this.$notify({
          title: '提示',
          message: message,
          type: 'success',
          duration: 2000
        });
      },
      sendToMQTT() {
        if (this.result) {
          mqttClient.publish('input', this.result); // 将当前识别结果发送到 MQTT 的 input 主题
          this.showNotification(`已将内容 "${this.result}" 上传给助手，请点击Submit发送`);
        } else {
          this.showNotification('没有内容可以发送，请先进行语音识别。');
        }
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  .gradio-container {
    width: 100%;
    height: 100%;
  }
  
  .speech-container {
    margin-top: 20px;
    button {
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
      margin-right: 10px;
    }
    p {
      margin-top: 10px;
      font-size: 18px;
    }
  }
  </style>
  