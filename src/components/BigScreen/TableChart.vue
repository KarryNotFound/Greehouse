<template>
    <div class="myTableChart">
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-style="{height: '0px'}"
      :row-class-name="tableRowClassName"
      :cell-style="Cellstyle"
      :header-cell-style="{color: '#FDFDFD',fontSize: '14px', backgroundColor: '#778899',padding:'2px'}"
      >
      <el-table-column
        prop="date"
        label="日期"
        width="140">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="报警信息"
        >
      </el-table-column>
    </el-table>
    </div>
  </template>
  
  <style>

    .myTableChart{
        position:relative;
        top:70px;
        height:100px;
        padding:0px 10px;

    }

    .el-table-column{
      font-size:20px;
    }
    
    .el-table .warning-row {
      background: #FF6464;
      font-size:20px;
    }
  
    .el-table .success-row {
      background: #f0f9eb;
      font-size:20px;
     }

     .el-table .normal-row{
      background:oldlace;
      font-size:20px;
     }
  </style>
  
  <script>
    export default {
      methods: {
        tableRowClassName({row, rowIndex}) {
          if (row.address=='危险') {
            return 'warning-row';
          } else if (row.address === '预警') {
            return 'normal-row';
          }else{
            return 'success-row';
          }
        },
        Cellstyle({row}){
            if (row.address==='危险') {
                return {
                color:'black',
                padding:'2px',
                }
          } else if (row.address === '预警') {
            return {
                color:'#CD853F',
                padding:'2px',
                }
          }else{
            return {
                color:'green',
                padding:'2px',
                }
          }
      },
    },
      data() {
        return {
          tableData: [{
            date: '2024-07-02',
            name: '温度状况',
            address: '预警',
          },
          {
            date: '2024-07-03',
            name: '灌溉状况',
            address: '预警',
          },
          {
            date: '2024-07-05',
            name: '湿度状况',
            address: '危险',
          },
          {
            date: '2024-07-04',
            name: '设备状况',
            address: '正常'
          }, {
            date: '2024-07-01',
            name: '空气状况',
            address: '正常',
          }, {
            date: '2024-07-01',
            name: '系统状况',
            address: '正常',
          }]
        }
      }
    }
  </script>