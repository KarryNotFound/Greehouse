<template>
    <div>
      <h1>Speech Recognition Demo</h1>
      <button @click="startRecognition">Start Recognition</button>
      <p>{{ result }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        result: 'Click the button and start speaking...',
        recognition: null,
      };
    },
    mounted() {
      // 检查浏览器是否支持 Web Speech API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'zh-CN'; // 设置语言
        this.recognition.continuous = false; // 设置为非连续识别
        this.recognition.interimResults = false; // 设置为非即时结果
  
        // 监听结果事件
        this.recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          this.result = `You said: ${transcript}`;
        };
  
        // 监听识别结束
        this.recognition.onend = () => {
          console.log('Speech recognition ended.');
        };
      } else {
        this.result = 'Your browser does not support Speech Recognition API.';
      }
    },
    methods: {
      startRecognition() {
        if (this.recognition) {
          this.recognition.start();
          this.result = 'Listening...';
        } else {
          this.result = 'Speech Recognition is not supported in your browser.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 24px;
  }
  button {
    margin-top: 10px;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
  }
  p {
    margin-top: 20px;
    font-size: 18px;
  }
  </style>
  