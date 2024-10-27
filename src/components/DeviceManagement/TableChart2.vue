<template>
  <div class="AA">
    <el-button @click="clearFilter">恢复默认设置</el-button>
    <el-date-picker
      v-model="dateFilter"
      type="date"
      placeholder="选择要查找的日期"
      @change="handleDateFilterInput"
      style="width: 200px; margin-bottom: 10px;"
    ></el-date-picker>
    <el-table :data="filteredData" style="width: 100%;font-size:17px;" height="900">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <div class="demo-table-expand-row">
              <el-form-item label="名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="时间">
                <span>{{ props.row.time }}</span>
              </el-form-item>
            </div>
            <div class="demo-table-expand-row">
              <el-form-item label="空气温度">
                <span>{{ props.row.temperature }}</span>
              </el-form-item>
              <el-form-item label="空气湿度">
                <span>{{ props.row.airHumidity }}</span>
              </el-form-item>
            </div>
            <div class="demo-table-expand-row">
              <el-form-item label="二氧化碳">
                <span>{{ props.row.carbondioxide }}</span>
              </el-form-item>
              <el-form-item label="光照强度">
                <span>{{ props.row.intensity }}</span>
              </el-form-item>
            </div>
            <div class="demo-table-expand-row">
              <el-form-item label="土壤湿度">
                <span>{{ props.row.soilHumidity }}</span>
              </el-form-item>
              <el-form-item label="PH">
                <span>{{ props.row.ph }}</span>
              </el-form-item>
            </div>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="id" sortable></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="时间" prop="time" sortable></el-table-column>
    </el-table>
  </div>
</template>

<style>

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: black;
  font-size:17px;
}
.demo-table-expand .el-form-item {
  position: relative;
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  left: 25px;
  color: #3399FF;
  text-align: center; /* 内容居中 */
  font-size:20px;
}
.demo-table-expand-row {
  display: flex;
  position:relative;
  right:75px;
  width: 100%;
  font-size:17px;
}
.demo-table-expand-row .el-form-item {
  flex: 1; /* 让两个元素均分空间 */
  font-size:17px;
}
.el-table .el-table__row {
  height: 80px; /* 例如，将行高设置为50px */
}
</style>

<script>
export default {
  data() {
    return {
      tableData: [],
      dateFilter: null
    };
  },
  created() {
    this.fetchTableData();
  },
  methods: {
    fetchTableData() {
      let _this = this;
      _this.$http.get("/environment/history/findByUid/1")
        .then(function(response) {
          _this.tableData = response.data.map((item, index) => ({
            id: index + 1, // 逐行递增的 ID
            name: item.name || '环境信息' + (index + 1),
            time: _this.formatDate(item.date) || 'Unknown', // 将时间转换为字符串
            temperature: item.temperature || 'Unknown',
            airHumidity: item.airHumidity || 'Unknown',
            carbondioxide: item.carbondioxide || 'Unknown',
            intensity: item.intensity || 'Unknown',
            soilHumidity: item.soilHumidity || 'Unknown',
            ph: item.ph || 'Unknown'
          }));
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (`0${d.getMonth() + 1}`).slice(-2);
      const day = (`0${d.getDate()}`).slice(-2);
      const hours = (`0${d.getHours()}`).slice(-2);
      const minutes = (`0${d.getMinutes()}`).slice(-2);
      const seconds = (`0${d.getSeconds()}`).slice(-2);
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    clearFilter() {
      this.dateFilter = null;
    },
    handleDateFilterInput() {
      this.$refs.filterTable.clearSort();
    }
  },
  computed: {
    filteredData() {
      return this.tableData.filter(item => {
        if (!this.dateFilter) return true;
        const date = new Date(this.dateFilter);
        const itemDate = new Date(item.time);
        return (
          date.getFullYear() === itemDate.getFullYear() &&
          date.getMonth() === itemDate.getMonth() &&
          date.getDate() === itemDate.getDate()
        );
      });
    }
  }
};
</script>
