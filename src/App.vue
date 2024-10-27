<template>
  <div id="app">
    <router-link to="/screen"></router-link>
    <!-- <buttom1></buttom1> -->
    <router-view></router-view>
  </div>
</template>

<script>
  import Screen from "./components/BigScreen/Screen.vue"
  import Login from "./components/Login/Login.vue"
import router from "./router";
export default {
  name: 'App',
  components: {
      Screen,
      Login
  }
}
</script>

<style>
#app {
        margin:0;
        padding:0;
        box-sizing: border-box;
}

</style>
