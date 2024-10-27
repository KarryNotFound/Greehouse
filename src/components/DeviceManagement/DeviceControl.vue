<template>
    <div class="DeviceControl_mainbox">
    <el-table
      :data="tableData"
      style="width: 100%;font-size:17px"
      height="500">


      <el-table-column
        label="设备状态"
        width="300">


        <template slot-scope="scope">
        <el-tag style="font-size:17px" lable-class-name="my-tag-1" type="success">正常</el-tag>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>


      </el-table-column>


      <el-table-column
        label="设备名称"
        width="300">


        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p :class="['C', scope.row.state === '开启' ? 'text-green' : 'text-red']">运行状态: {{ scope.row.state }}</p>
            <p class="A">设备名称: {{ scope.row.name }}</p>
            <p class="B">作用: {{ scope.row.work }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag style="font-size:17px">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>

        
      </el-table-column>


      <el-table-column label="开关"
        class="custom-height"
      >
      <template slot-scope="scope">
            <div>
            <buttom-2 :title="scope.row.name" @transmit="handleButtonClick(scope.row,$event)"></buttom-2>
            </div>
    </template>


    </el-table-column>

    </el-table>
    </div>
  </template>
  


  <script>
import buttom2 from '../tools/buttom2.vue';
    export default {
  components: { buttom2 },
      data() {
        return {
          tableData: [{
            date: '',
            name: '空气加热器',
            work: '增加空气温度',
            state:'关闭'
          },
          {
            date: '',
            name: '灌溉系统',
            work: '提供水源,增加土壤湿度',
            state:'关闭'
          }, {
            date: '',
            name: '遮阳帘',
            work: '防止光照过于强烈,间接降低光照强度',
            state:'关闭'
          },{
            date: '',
            name: '负压风机',
            work: '将室内闷热气体迅速排出室外，改善通风',
            state:'关闭'
          },{
            date: '',
            name: '自动控制',
            work: '根据环境状况自动控制设备开关',
            state:'关闭'
          },{
            date: '',
            name: '补光灯',
            work: '调节灯光',
            state:'关闭'
          }]
        }
      },
      methods: {
            handleButtonClick(row,event){
                console.log('Button clicked for row:', row);
                console.log('event active:', event);
                if(event.checked==true){
                    row.state="开启";
                }else{
                    row.state="关闭";
                }
            }
      }
    }
  </script>

<style lang="less" scoped> 
.DeviceControl_mainbox{
    padding:10px 10px,
}

.custom-height {
position: relative;
height: 250px; /* 设置你想要的高度 */
display: flex;
align-items: center;
justify-content: center;
}

.B{
color:#3399FF;
}

.A{
color:orange;
}

.C{
color:inherit;
}

.text-green {
color: green;
}

.text-red {
color: red;
}
</style>