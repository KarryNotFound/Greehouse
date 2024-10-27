<template>
    <div>
      
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
           >
            <el-menu-item index="1"  style="font-size:19px">处理中心&nbsp;{{title}}</el-menu-item>


            <el-menu-item index="5"></el-menu-item>
            </el-menu>
        </div>
</template>

<script>
 export default {
    props:["title"],
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>

</style>