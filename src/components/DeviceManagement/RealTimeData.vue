<template>
    <div>
        <el-descriptions class="ss" title="环境监测数据"  :column="2" border >
        <el-descriptions-item label="名称" :labelStyle="{'text-align': 'center'}" label-class-name="my-label2" content-class-name="my-content2" :contentStyle="{'text-align': 'center'}">
          <el-tag style="font-size: 20px;" type="warning">智能大棚温室系统</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="评分" :labelStyle="{'text-align': 'center'}" label-class-name="my-label2" content-class-name="my-content2"  :contentStyle="{'text-align': 'center'}">
          <el-tag style="font-size: 20px;" lable-class-name="my-tag-1" type="success">优秀</el-tag>
        </el-descriptions-item>
        
    </el-descriptions>

      <el-descriptions :column="2" border>
       
        <el-descriptions-item label="空气温度" label-class-name="my-label" content-class-name="my-content"  :labelStyle="{'text-align': 'center'}">{{temperature}}℃</el-descriptions-item>
        <el-descriptions-item label="空气湿度" label-class-name="my-label" content-class-name="my-content" :labelStyle="{'text-align': 'center'}">{{air_humidity}}%</el-descriptions-item>
        <el-descriptions-item label="二氧化碳浓度" label-class-name="my-label" content-class-name="my-content" :labelStyle="{'text-align': 'center'}">{{carbondioxide}}ppm</el-descriptions-item>
        <el-descriptions-item label="光照强度" label-class-name="my-label" content-class-name="my-content" :labelStyle="{'text-align': 'center'}">{{intensity}}lx</el-descriptions-item>
        <el-descriptions-item label="土壤湿度" label-class-name="my-label" content-class-name="my-content" :labelStyle="{'text-align': 'center'}">{{soil_humidity}}%</el-descriptions-item>
        <el-descriptions-item label="PH" label-class-name="my-label" content-class-name="my-content" :labelStyle="{'text-align': 'center'}">{{ph}}</el-descriptions-item>
      
       
    
            </el-descriptions>



      
    </div>
  </template>
  
  <script>
  import mqttClient from '../../js/mqttServer'; // 引入 MQTT 连接实例
  export default {

    data(){
      return{
        temperature:null,
        air_humidity:null,
        intensity:null,
        carbondioxide:null,
        ph:null,
        soil_humidity:null,
      }
    },
    created(){
    this.fetchData();
    this.timer = setInterval(() => {
    this.fetchData();
    this.IsAddWarning();
  }, 1000); // 每隔5秒更新一次数据，可以根据实际需求调整
  // MQTT 连接设置
        mqttClient.on('connect', () => {
        this.connectionStatus = 'Connected to MQTT broker';
        console.log('Connected to MQTT broker');
  
        // 订阅主题
        mqttClient.subscribe('mqtt135', (err) => {
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
      this.processMessage(message); // 处理接收到的消息
    });

},
    destroyed() {
     clearInterval(this.timer); // 组件销毁时清除定时器
    },
    methods: {
      getCurrentTime() {
            // 获取当前时间
            let now = new Date();
            let year = now.getFullYear();
            let month = ('0' + (now.getMonth() + 1)).slice(-2); // 月份从0开始，需要加1
            let day = ('0' + now.getDate()).slice(-2);
            let hours = ('0' + now.getHours()).slice(-2);
            let minutes = ('0' + now.getMinutes()).slice(-2);
            let seconds = ('0' + now.getSeconds()).slice(-2);

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        fetchData() {
          // 发送请求获取最新数据，并更新Vue组件中的数据
          let _this = this;
            this.$http.get('/environment/day/findByUid/'+'1')
            .then(function(response){
                _this.temperature=response.data.temperature
                _this.air_humidity=response.data.airHumidity
                _this.carbondioxide=response.data.carbondioxide
                _this.intensity=response.data.intensity
                _this.soil_humidity=response.data.soilHumidity
                _this.ph=response.data.ph
            })
            
        },
        processMessage(message) {
    // 打印接收到的原始消息
    console.log(`Raw message received: ${message.toString()}`);

    let data = null; // 初始化 data 变量
    if (message && message.length > 0) {
        try {
            data = JSON.parse(message);
        } catch (error) {
            console.error("JSON 解析错误：", error);
            return; // 解析失败，提前返回
        }
    } else {
        console.warn("接收到空消息");
        return; // 空消息，提前返回
    }

    console.log('Parsed message:', data); // 打印解析后的 JSON 对象

    let hasChanged = false;

    // 截断为整数的函数
    const truncateToInteger = (value) => {
        return Math.trunc(value);
    };

    // 根据不同的数据类型处理
    if (data.Temp !== undefined || data.Humi !== undefined || data.Co2 !== undefined) {
        // 处理气体和温度数据
        if (data.Temp !== undefined) {
            const truncatedTemp = truncateToInteger(data.Temp);
            if (truncatedTemp !== 0 && truncatedTemp !== this.$store.state._temperature) {
                console.log(`Temperature changed: ${this.$store.state._temperature} -> ${truncatedTemp}`);
                this.$store.commit('setTemperature', truncatedTemp);
                hasChanged = true;
            }
        }

        if (data.Humi !== undefined) {
            const truncatedHumi = truncateToInteger(data.Humi);
            if (truncatedHumi !== 0 && truncatedHumi !== this.$store.state._airHumidity) {
                console.log(`Air Humidity changed: ${this.$store.state._airHumidity} -> ${truncatedHumi}`);
                this.$store.commit('setAirHumidity', truncatedHumi);
                hasChanged = true;
            }
        }

        if (data.Co2 !== undefined) {
            const truncatedCo2 = truncateToInteger(data.Co2);
            if (truncatedCo2 !== 0 && truncatedCo2 !== this.$store.state._carbondioxide) {
                console.log(`Carbon Dioxide changed: ${this.$store.state._carbondioxide} -> ${truncatedCo2}`);
                this.$store.commit('setCarbonDioxide', truncatedCo2);
                hasChanged = true;
            }
        }
    } else if (data.Soilhum !== undefined || data.Soiltemp !== undefined || data.Ph !== undefined) {
        // 处理土壤相关数据
        if (data.Soilhum !== undefined) {
            const truncatedSoilhum = truncateToInteger(data.Soilhum);
            if (truncatedSoilhum !== 0 && truncatedSoilhum !== this.$store.state._soilHumidity) {
                console.log(`Soil Humidity changed: ${this.$store.state._soilHumidity} -> ${truncatedSoilhum}`);
                this.$store.commit('setSoilHumidity', truncatedSoilhum);
                hasChanged = true;
            }
        }

        if (data.Soiltemp !== undefined) {
            const truncatedSoiltemp = truncateToInteger(data.Soiltemp);
            if (truncatedSoiltemp !== 0 && truncatedSoiltemp !== this.$store.state._soilTemperature) {
                console.log(`Soil Temperature changed: ${this.$store.state._soilTemperature} -> ${truncatedSoiltemp}`);
                this.$store.commit('setSoilTemperature', truncatedSoiltemp);
                hasChanged = true;
            }
        }

        if (data.Ph !== undefined) {
            const truncatedPh = truncateToInteger(data.Ph);
            if (truncatedPh !== 0 && truncatedPh !== this.$store.state._ph) {
                console.log(`pH changed: ${this.$store.state._ph} -> ${truncatedPh}`);
                this.$store.commit('setPh', truncatedPh);
                hasChanged = true;
            }
        }
    } else if (data.Light !== undefined) {
        // 处理光照数据
        if (data.Light === "0") {
            console.log('Light data is "0", skipping...');
            return; // 如果数据为 "0"，直接跳过
        }

        const truncatedLight = truncateToInteger(data.Light);
        if (truncatedLight !== 0 && truncatedLight !== this.$store.state._intensity) {
            console.log(`Light Intensity changed: ${this.$store.state._intensity} -> ${truncatedLight}`);
            this.$store.commit('setIntensity', truncatedLight);
            hasChanged = true;
        }
    } else {
        console.warn("接收到的数据格式不匹配:", data);
    }

    // 如果有数据变化，调用 store 中的 updateData 方法
    if (hasChanged) {
        console.log('Data has changed, calling updateData...');
        this.$store.dispatch('updateData', { state: this.$store.state });
    } else {
        console.log('No data changes detected.');
    }
}

,
async IsAddWarning() {
    // 环境温度报警信息
    if (this.temperature > 30) {
        try {
            const response = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "环境温度过高",
                state: "警告"
            });
            let isTrue = response.data;
            if (!isTrue) {
                const warningData = {
                    date: this.getCurrentTime(),
                    info: "环境温度过高",
                    state: "警告"
                };
                const addResponse = await this.$http.post("/warning/info/add", warningData);
                console.log("Warning added successfully:", addResponse);
            }
        } catch (error) {
            console.error("Failed to handle warning:", error);
        }
    }

    if (this.temperature < 20) {
        try {
            const response = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "环境温度过低",
                state: "警告"
            });
            let isTrue = response.data;
            if (!isTrue) {
                const warningData = {
                    date: this.getCurrentTime(),
                    info: "环境温度过低",
                    state: "警告"
                };
                const addResponse = await this.$http.post("/warning/info/add", warningData);
                console.log("Warning added successfully:", addResponse);
            }
        } catch (error) {
            console.error("Failed to handle warning:", error);
        }
    }

    // 环境温度恢复正常时处理警告状态
    if (this.temperature >= 20 && this.temperature <= 30) {
        try {
            const response1 = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "环境温度过高",
                state: "警告"
            });

            const response2 = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "环境温度过低",
                state: "警告"
            });

            if (response1.data) {
                const response3 = await this.$http.post("/warning/info/findOne", {
                    date: null,
                    info: "环境温度过高",
                    state: "警告"
                });

                const warningData1 = {
                    date: response3.data.date,
                    info: "环境温度过高",
                    state: "已处理"
                };
                console.log("Sending Request Data:", warningData1);  // 打印检查发送的数据格式
                const addResponse = await this.$http.post("/warning/info/update", warningData1);
                console.log("Warning updated successfully:", addResponse);
            }

            if (response2.data) {
                const response4 = await this.$http.post("/warning/info/findOne", {
                    date: null,
                    info: "环境温度过低",
                    state: "警告"
                });

                const warningData2 = {
                    date: response4.data.date,
                    info: "环境温度过低",
                    state: "已处理"
                };
                console.log("Sending Request Data:", warningData2);  // 打印检查发送的数据格式
                const addResponse = await this.$http.post("/warning/info/update", warningData2);
                console.log("Warning updated successfully:", addResponse);
            }
        } catch (error) {
            console.error("Failed to handle warning:", error);
        }
    }

    // 土壤湿度报警信息
    if (this.soil_humidity < 15) {
        try {
            const response = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "土壤湿度过低",
                state: "警告"
            });
            let isTrue = response.data;
            if (!isTrue) {
                const warningData = {
                    date: this.getCurrentTime(),
                    info: "土壤湿度过低",
                    state: "警告"
                };
                console.log("Sending Request Data:", warningData);  // 打印检查发送的数据格式
                const addResponse = await this.$http.post("/warning/info/add", warningData);
                console.log("Warning added successfully:", addResponse);
            }
        } catch (error) {
            console.error("Failed to handle warning:", error);
        }
    }

    if (this.soil_humidity > 70) {
        try {
            const response = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "土壤湿度过高",
                state: "警告"
            });
            let isTrue = response.data;
            if (!isTrue) {
                const warningData = {
                    date: this.getCurrentTime(),
                    info: "土壤湿度过高",
                    state: "警告"
                };
                console.log("Sending Request Data:", warningData);  // 打印检查发送的数据格式
                const addResponse = await this.$http.post("/warning/info/add", warningData);
                console.log("Warning added successfully:", addResponse);
            }
        } catch (error) {
            console.error("Failed to handle warning:", error);
        }
    }

    // 土壤湿度恢复正常时处理警告状态
    if (this.soil_humidity >= 15 && this.soil_humidity <= 70) {
        try {
            const response1 = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "土壤湿度过高",
                state: "警告"
            });

            const response2 = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "土壤湿度过低",
                state: "警告"
            });

            if (response1.data) {
                const response3 = await this.$http.post("/warning/info/findOne", {
                    date: null,
                    info: "土壤湿度过高",
                    state: "警告"
                });

                const warningData1 = {
                    date: response3.data.date,
                    info: "土壤湿度过高",
                    state: "已处理"
                };
                console.log("Sending Request Data:", warningData1);  // 打印检查发送的数据格式
                const addResponse = await this.$http.post("/warning/info/update", warningData1);
                console.log("Warning updated successfully:", addResponse);
            }

            if (response2.data) {
                const response4 = await this.$http.post("/warning/info/findOne", {
                    date: null,
                    info: "土壤湿度过低",
                    state: "警告"
                });

                const warningData2 = {
                    date: response4.data.date,
                    info: "土壤湿度过低",
                    state: "已处理"
                };
                console.log("Sending Request Data:", warningData2);  // 打印检查发送的数据格式
                const addResponse = await this.$http.post("/warning/info/update", warningData2);
                console.log("Warning updated successfully:", addResponse);
            }
        } catch (error) {
            console.error("Failed to handle warning:", error);
        }
    }

    // 光照强度报警信息
    if (this.intensity < 100) {
        try {
            const response = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "光照强度过低",
                state: "警告"
            });
            let isTrue = response.data;
            if (!isTrue) {
                const warningData = {
                    date: this.getCurrentTime(),
                    info: "光照强度过低",
                    state: "警告"
                };
                console.log("Sending Request Data:", warningData);  // 打印检查发送的数据格式
                const addResponse = await this.$http.post("/warning/info/add", warningData);
                console.log("Warning added successfully:", addResponse);
            }
        } catch (error) {
            console.error("Failed to handle warning:", error);
        }
    }

    if (this.intensity > 1000) {
        try {
            const response = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "光照强度过高",
                state: "警告"
            });
            let isTrue = response.data;
            if (!isTrue) {
                const warningData = {
                    date: this.getCurrentTime(),
                    info: "光照强度过高",
                    state: "警告"
                };
                console.log("Sending Request Data:", warningData);  // 打印检查发送的数据格式
                const addResponse = await this.$http.post("/warning/info/add", warningData);
                console.log("Warning added successfully:", addResponse);
            }
        } catch (error) {
            console.error("Failed to handle warning:", error);
        }
    }

    // 光照强度恢复正常时处理警告状态
    if (this.intensity >= 100 && this.intensity <= 1000) {
        try {
            const response1 = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "光照强度过高",
                state: "警告"
            });

            const response2 = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "光照强度过低",
                state: "警告"
            });

            if (response1.data) {
                const response3 = await this.$http.post("/warning/info/findOne", {
                    date: null,
                    info: "光照强度过高",
                    state: "警告"
                });

                const warningData1 = {
                    date: response3.data.date,
                    info: "光照强度过高",
                    state: "已处理"
                };
                console.log("Sending Request Data:", warningData1);  // 打印检查发送的数据格式
                const addResponse = await this.$http.post("/warning/info/update", warningData1);
                console.log("Warning updated successfully:", addResponse);
            }

            if (response2.data) {
                const response4 = await this.$http.post("/warning/info/findOne", {
                    date: null,
                    info: "光照强度过低",
                    state: "警告"
                });

                const warningData2 = {
                    date: response4.data.date,
                    info: "光照强度过低",
                    state: "已处理"
                };
                console.log("Sending Request Data:", warningData2);  // 打印检查发送的数据格式
                const addResponse = await this.$http.post("/warning/info/update", warningData2);
                console.log("Warning updated successfully:", addResponse);
            }
        } catch (error) {
            console.error("Failed to handle warning:", error);
        }
    }

    // 二氧化碳浓度报警信息
    if (this.carbondioxide < 300) {
        try {
            const response = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "二氧化碳浓度过低",
                state: "警告"
            });
            let isTrue = response.data;
            if (!isTrue) {
                const warningData = {
                    date: this.getCurrentTime(),
                    info: "二氧化碳浓度过低",
                    state: "警告"
                };
                console.log("Sending Request Data:", warningData);  // 打印检查发送的数据格式
                const addResponse = await this.$http.post("/warning/info/add", warningData);
                console.log("Warning added successfully:", addResponse);
            }
        } catch (error) {
            console.error("Failed to handle warning:", error);
        }
    }

    if (this.carbondioxide > 700) {
        try {
            const response = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "二氧化碳浓度过高",
                state: "警告"
            });
            let isTrue = response.data;
            if (!isTrue) {
                const warningData = {
                    date: this.getCurrentTime(),
                    info: "二氧化碳浓度过高",
                    state: "警告"
                };
                console.log("Sending Request Data:", warningData);  // 打印检查发送的数据格式
                const addResponse = await this.$http.post("/warning/info/add", warningData);
                console.log("Warning added successfully:", addResponse);
            }
        } catch (error) {
            console.error("Failed to handle warning:", error);
        }
    }

    // 二氧化碳浓度恢复正常时处理警告状态
    if (this.carbondioxide >= 300 && this.carbondioxide <= 700) {
        try {
            const response1 = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "二氧化碳浓度过高",
                state: "警告"
            });

            const response2 = await this.$http.post("/warning/info/findIsExist", {
                date: null,
                info: "二氧化碳浓度过低",
                state: "警告"
            });

            if (response1.data) {
                const response3 = await this.$http.post("/warning/info/findOne", {
                    date: null,
                    info: "二氧化碳浓度过高",
                    state: "警告"
                });

                const warningData1 = {
                    date: response3.data.date,
                    info: "二氧化碳浓度过高",
                    state: "已处理"
                };
                console.log("Sending Request Data:", warningData1);  // 打印检查发送的数据格式
                const addResponse = await this.$http.post("/warning/info/update", warningData1);
                console.log("Warning updated successfully:", addResponse);
            }

            if (response2.data) {
                const response4 = await this.$http.post("/warning/info/findOne", {
                    date: null,
                    info: "二氧化碳浓度过低",
                    state: "警告"
                });

                const warningData2 = {
                    date: response4.data.date,
                    info: "二氧化碳浓度过低",
                    state: "已处理"
                };
                console.log("Sending Request Data:", warningData2);  // 打印检查发送的数据格式
                const addResponse = await this.$http.post("/warning/info/update", warningData2);
                console.log("Warning updated successfully:", addResponse);
            }
        } catch (error) {
            console.error("Failed to handle warning:", error);
        }
    }
},
}

     
}
  </script>
  
  <style lang="css" >
    .ss .el-descriptions__title {
        position:relative;
        top:15px;
        color: black;
        font-size:25px;
        line-height:80px;
        left:40%;
    }

    .el-tag{
      font-size:40px;
    }

    .el-descriptions{
        padding:0px 20px;
    }

  .my-label {
    position: relative;
    width:100px;
    height:80px;
    font-size:20px;
    background: #E1F3D8;
    
  }

  .my-content {
    width:100px;
    font-size:20px;
    background: white;
    color:#3399FF
  }
  
  
  .my-label2{
    position: relative;
    width:100px;
    height:80px;
    font-size:20px;
    background: white;
  }

  .my-content2 {
    background:white;
  }

  

  </style>