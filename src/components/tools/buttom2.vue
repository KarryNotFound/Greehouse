<template>
  <div>
    <label class="switch"  @change="handleChange">
      <input type="checkbox">
      <span class="slider"></span>
    </label>
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex';
import mqttClient from '../../js/mqttServer';

export default {
  props: ["title"],
  data() {
    return {
      isChecked: false,
      is_water_on : false,
      is_water_off : true,
      is_fan_on :false,
      is_fan_off :true,
      is_sun_on : false,
      is_sun_off: true,
      is_led_on : false,
      is_led_off :true,
      is_temperature_on:false,
      is_temperature_off:true
    };
  },
  computed:{
    ...mapState([
      '_temperature','_airHumidity','_intensity','_carbondioxide','_ph','_soilHumidity','_uid'
    ]),


  },
  methods: {
    handleChange(event) {
      this.isChecked = event.target.checked;
      this.$emit('transmit', { checked: this.isChecked });
      if (this.isChecked) {
        this.open1();
      } else {
        this.open2();
      }
    },
    open1() {
      if(this.isChecked){
      this.$notify({
        title: '设备已打开',
        message: this.title + '已成功打开',
        type: 'success',
        duration: 1500
      });
    }
    },
    open2() {
      if(!this.isChecked){
      this.$notify({
        title: '设备已关闭',
        message: this.title + '已成功关闭',
        type: 'error',
        duration: 1500
      });
    }
    },
    ...mapActions([
      'fetchData',
      'updateData'
    ])


  },
  created() {
    this.fetchData();
    this.timer = setInterval(() => {
      console.log(this._temperature);
      if (this.title === "补光灯" && this.isChecked) {
        if(this.is_led_off){
        mqttClient.publish('Control',"打开灯光")
        this.is_led_off=false;
        this.is_led_on=true;
      }
        // if(this.is_temperature_off){
        //   this.is_temperature_off = false;
        //   this.is_temperature_on = true;
        //   mqttClient.publish('Control',["temperature_on"])
        // }
        // this.$store.commit('setTemperature',this._temperature+1);

      }else if(this.title === "补光灯" && !this.isChecked && this.is_led_on){
        this.is_led_on = false;
        this.is_led_off = true;
        mqttClient.publish('Control',"关闭灯光")
      }
      else if (this.title === "空气加热器" && this.isChecked) {
        if(this.is_led_off){
        mqttClient.publish('Control',"打开加热器")
        this.is_temperature_off=false;
        this.is_temperature_on=true;
      }
        // if(this.is_temperature_off){
        //   this.is_temperature_off = false;
        //   this.is_temperature_on = true;
        //   mqttClient.publish('Control',["temperature_on"])
        // }
        // this.$store.commit('setTemperature',this._temperature+1);

      }else if(this.title === "空气加热器" && !this.isChecked && this.is_temperature_on){
        this.is_temperature_on = false;
        this.is_temperature_off = true;
        mqttClient.publish('Control',"关闭加热器")

      }else if(this.title === "空气加湿器" && this.isChecked){

        this.$store.commit('setAirHumidity',this._airHumidity+1);

      }else if(this.title === "灌溉系统" && this.isChecked){
        if(this.is_water_off){
          mqttClient.publish('Control',"打开水泵")
          this.is_water_on = true;
          this.is_water_off = false;
        }
        // this.$store.commit('setSoilHumidity',this._soilHumidity+1);

      }else if(this.title === "灌溉系统" && !this.isChecked && this.is_water_on){

        mqttClient.publish('Control',"关闭水泵")
        this.is_water_on = false;
        this.is_water_off = true;

      }else if(this.title === "遮阳帘" && this.isChecked){

        if(this.is_sun_off){
          this.is_sun_off = false;
          this.is_sun_on = true;
          mqttClient.publish('Control',"打开遮阳帘")
        }
        if(this._intensity-0.5>20){
          this.$store.commit('setIntensity',this._intensity-0.5);
        }

      }else if(this.title === "遮阳帘" && !this.isChecked && this.is_sun_on){
            this.is_sun_on = false;
            this.is_sun_off = true;
            mqttClient.publish('Control',"关闭遮阳帘")
      }else if(this.title === "负压风机" && this.isChecked){

        if(this.is_fan_off){
          this.is_fan_off = false;
          this.is_fan_on = true;
          mqttClient.publish('Control',"打开排气扇");
        }


        // if(this._carbondioxide>400 && this._carbondioxide-25>400){

        // this.$store.commit('setCarbonDioxide',this._carbondioxide-25);

        // }else if(this._carbondioxide<400 && this._carbondioxide+25 <400){

        // this.$store.commit('setCarbonDioxide',this._carbondioxide+25);

        // }else{
        //       this.$store.commit('setCarbonDioxide',400);
        // }

        // if(this._temperature>22.6 && this._temperature-2>22.6){

        // this.$store.commit('setTemperature',this._temperature-2);

        // }else if(this._temperature<22.6 && this._temperature+2 <22.6){

        // this.$store.commit('setTemperature',this._temperature+2);

        // }else{

        //   this.$store.commit('setTemperature',22.6);

        // }
  
      }else if(this.title === "负压风机" && !this.isChecked && this.is_fan_on){
        this.is_fan_on = false;
        this.is_fan_off = true;
        mqttClient.publish('Control',"关闭排气扇");
      } 

      else if(this.title=== "自动控制" && this.isChecked){
          
      if(this._intensity<50){
        mqttClient.publish('Control',"打开灯光");
      }

      if(this._intensity>70){
        mqttClient.publish('Control',"关闭灯光");
      }
      //   if(this._carbondioxide>800 && this._carbondioxide-25>800){

      //   this.$store.commit('setCarbonDioxide',this._carbondioxide-25);

      //   }else if(this._carbondioxide<800 && this._carbondioxide+25 <800){

      //     this.$store.commit('setCarbonDioxide',this._carbondioxide+25);

      //   }else{
      //     this.$store.commit('setCarbonDioxide',800);
      //   }


      //   if(this._temperature>25 && this._temperature-2>25){

      //     this.$store.commit('setTemperature',this._temperature-2);

      //   }else if(this._temperature<25 && this._temperature+2 <25){

      //     this.$store.commit('setTemperature',this._temperature+2);

      //   }else{
      //     this.$store.commit('setTemperature',25);
      //   }


      //   if(this._airHumidity>60 && this._airHumidity-2>60){

      //   this.$store.commit('setAirHumidity',this._airHumidity-2);

      //   }else if(this._airHumidity<60 && this._airHumidity+2 <60){

      //   this.$store.commit('setAirHumidity',this._airHumidity+2);

      //   }else{
      //     this.$store.commit('setAirHumidity',60);
      //   }


      //   if(this._soilHumidity>25 && this._soilHumidity-2>25){

      //   this.$store.commit('setSoilHumidity',this._soilHumidity-2);

      //   }else if(this._soilHumidity<25 && this._soilHumidity+2 <25){

      //       this.$store.commit('setSoilHumidity',this._soilHumidity+2);

      //   }else{

      //      this.$store.commit('setSoilHumidity',25);

      //   }




      //   if(this._intensity>25 && this._intensity-2>25){

      //     this.$store.commit('setIntensity',this._intensity-2);

      //   }else if(this._intensity<25 && this._intensity+2 <25){

      //     this.$store.commit('setIntensity',this._intensity+2);

      //   }else{

      //     this.$store.commit('setIntensity',25);

      //   }


      //   if(this.ph>7 && this.ph-0.5>7){

      //   this.$store.commit('setPh',this._ph-0.5);

      //   }else if(this.ph<7 && this.ph+0.5 <7){

      //      this.$store.commit('setPh',this._ph+0.5);

      //   }else{
      //       this.$store.commit('setPh',7);
      //   }


      //   if(this._temperature<25 && this.is_temperature_off){
      //     mqttClient.publish('Control',["temperature_on"]);
      //     this.is_temperature_off= false;
      //     this.is_temperature_on = true;
      //   }else if(this._temperature>25 && this.is_temperature_on){
      //     mqttClient.publish('Control',["temperature_off"]);
      //     this.is_temperature_off =true;
      //     this.is_temperature_on = false;
      //   }

      //   if(this.intensity>25 && this.is_sun_off){
      //     mqttClient.publish('Control',["sun_on"]);
      //     this.is_sun_off = false;
      //     this.is_sun_on = true;
      //   }else if(this.intensity < 25 && this.is_sun_on){
      //     mqttClient.publish('Contorl',["sun_off"]);
      //     this.is_sun_off = true;
      //     this.is_sun_on = false;
      //   }

      //   if((this._carbondioxide > 800 || this._temperature>25) && this.is_fan_off){
      //     mqttClient.publish('Control',["fan_on"]);
      //     this.is_fan_off = false;
      //     this.is_fan_on = true;
      //   }else if(this._carbondioxide<800 && this_temperature<25 && this.is_fan_on){
      //     mqttClient.publish('Control',["fan_off"]);
      //     this.is_fan_off = true;
      //     this.is_fan_on = false;
      //   }

      }
      this.updateData();
  
    }, 1000); // 每隔1秒更新一次数据，可以根据实际需求调整
  },
  destroyed() {
    clearInterval(this.timer); // 组件销毁时清除定时器
  }
}
</script>




<style lang="css" scoped>
.switch {
  --switch_width: 2em;
  --switch_height: 1em;
  --thumb_color: #e8e8e8;
  --track_color: #e8e8e8;
  --track_active_color: rgb(2, 199, 2);
  --outline_color: #000;
  font-size: 18px;
  position: relative;
  top: 5px;
  display: inline-block;
  width: var(--switch_width);
  height: var(--switch_height);
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  box-sizing: border-box;
  border: 2px solid var(--outline_color);
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--track_color);
  transition: 0.15s;
  border-radius: var(--switch_height);
}

.slider:before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  height: var(--switch_height);
  width: var(--switch_height);
  border: 2px solid var(--outline_color);
  border-radius: 100%;
  left: -2px;
  bottom: -2px;
  background-color: var(--thumb_color);
  transform: translateY(-0.2em);
  box-shadow: 0 0.2em 0 var(--outline_color);
  transition: 0.15s;
}

input:checked + .slider {
  background-color: var(--track_active_color);
}

input:focus-visible + .slider {
  box-shadow: 0 0 0 2px var(--track_active_color);
}

input:hover + .slider:before {
  transform: translateY(-0.3em);
  box-shadow: 0 0.3em 0 var(--outline_color);
}

input:checked + .slider:before {
  transform: translateX(calc(var(--switch_width) - var(--switch_height))) translateY(-0.2em);
}

input:hover:checked + .slider:before {
  transform: translateX(calc(var(--switch_width) - var(--switch_height))) translateY(-0.3em);
  box-shadow: 0 0.3em 0 var(--outline_color);
}
</style>
