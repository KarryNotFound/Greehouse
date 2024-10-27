<template>
    <div>
      <h2>变量值：{{ counter }}</h2>
      <button ref="incrementBtn" @click="incrementCounter">点击我+1</button>
      <button @click="startAutoClick">开始自动点击</button>
      <button @click="stopAutoClick">停止自动点击</button>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        counter: 1,  // 初始值设为 1
        intervalId: null,  // 保存自动点击的定时器ID
        message: "等待操作中..."
      };
    },
    methods: {
      // 手动点击按钮触发的事件
      incrementCounter() {
        this.counter++;
        this.message = `手动点击：变量值现在是 ${this.counter}`;
        console.log(this.message);
      },
      // 开始自动点击按钮
      startAutoClick() {
        this.message = "开始自动点击...";
        const button = this.$refs.incrementBtn;
        this.intervalId = setInterval(() => {
          // 自动触发点击事件
          button.click();
          this.message = `自动点击：变量值现在是 ${this.counter}`;
        }, 1000);  // 每秒触发一次
      },
      // 停止自动点击
      stopAutoClick() {
        clearInterval(this.intervalId);
        this.message = "自动点击已停止。";
      }
    }
  };
  </script>
  