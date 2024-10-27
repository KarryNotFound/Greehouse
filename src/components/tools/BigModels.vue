<template>
    <div class="container">
      <div class="button-group">
        <button @click="currentView = 'BigModel'">切换到 BigModel</button>
        <button @click="currentView = 'BigMode2'">切换到 BigMode2</button>
      </div>
      <!-- 动态组件切换 -->
      <component :is="currentView"></component>
    </div>
  </template>
  
  <script>
  import BigModel from './BigModel.vue';
  import BigMode2 from './BigMode2.vue';
  
  export default {
    components: {
      BigModel,
      BigMode2
    },
    data() {
      return {
        currentView: 'BigModel' // 初始显示 BigModel 组件
      };
    }
  };
  </script>
  
  <style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
  }
  
  .button-group {
    margin-bottom: 20px;
  }
  
  button {
    margin-right: 10px;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  