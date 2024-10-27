<template>
  <scale-box :width="1920" :height="1080" bgc="transparent" :delay="100">
  <div>
    <div class="mainbox4">
      <div class="Login_A">
        <p class="Login_A i_1">智能温室种植平台</p>
        <p class="Login_A i_2">intelligent greenhouse planting platform</p>

      </div>
      <div class="Login_A">
        <LoginTool></LoginTool>
      </div>

    </div>
  </div>
  </scale-box>
</template>


<script>
    import LoginTool from "./LoginTool.vue";
    import ScaleBox from "vue2-scale-box";
export default {
    components:{
        LoginTool,
        ScaleBox
    }
}
</script>

<style scoped>
.mainbox4{
  display:flex;
  flex-flow:column;
  min-width:1024px;
  max-width:1920px;
  min-height: 840px;
  margin: 0 auto;
  padding: 10px 10px 0;
  background: url(../../assets/images/Loginbg2.jpg)
  no-repeat top center;
}

.mainbox4 .Login_A{
  flex:1;

}

.Login_A .i_1{
  position:relative;
  width:35%;
  left:40%;
  top:140px;
  font-size:70px;

}

.Login_A .i_2{
  position:relative;
  width:45%;
  left:33%;
  top:160px;
  font-size:40px;
 
}

.mainbox4 .Login_A:nth-child(2){
  flex:10
}

</style>