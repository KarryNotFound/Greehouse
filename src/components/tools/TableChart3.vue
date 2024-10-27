<template>
  <div>
    <el-button @click="clearFilter">恢复默认设置</el-button>
    <el-date-picker
      v-model="dateFilter"
      type="date"
      placeholder="选择要查找的日期"
      @change="handleDateFilterInput"
      style="width: 200px; margin-bottom: 10px;"
    ></el-date-picker>
    <el-select
      v-model="tagFilter"
      placeholder="选择状态"
      @change="handleTagFilterChange"
      style="width: 200px; margin-bottom: 10px;">
      <el-option
        v-for="item in tagOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-table
      ref="filterTable"
      :data="filteredData"
      class="custom-table"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="700">
      </el-table-column>
      <el-table-column
        prop="name"
        label="报警信息"
       >
      </el-table-column>
      <el-table-column
        prop="tag"
        label="状态"
        sortable
        width="200">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '警告' ? 'danger' : 'success'"
            style="font-size:17px"
            disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dateFilter: null,
      tagFilter: '',
      tagOptions: [
        { label: '警告', value: '警告' },
        { label: '已处理', value: '已处理' }
      ]
    }
  },
  mounted(){
    this.fetchData();
  },

  methods: {
    fetchData(){
      let _this = this;
        this.$http.get("/warning/info/findAll").then(function(response){
            const data = response.data;
            _this.tableData = data.map((item)=>({
                date : _this.formatDate(item.date),
                name : item.info,
                tag : item.state
            }));
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
    resetDateFilter() {
      this.dateFilter = null;
    },
    clearFilter() {
      this.dateFilter = null;
      this.tagFilter = '';
    },
    handleDateFilterInput() {
      this.$refs.filterTable.clearSort();
    },
    handleTagFilterChange() {
      this.$refs.filterTable.clearSort();
    },
    formatter(row, column) {
      return row.address;
    }
  },
  computed: {
    filteredData() {
      return this.tableData.filter(item => {
        if (this.dateFilter) {
          const date = new Date(this.dateFilter);
          const itemDate = new Date(item.date);
          if (
            date.getFullYear() !== itemDate.getFullYear() ||
            date.getMonth() !== itemDate.getMonth() ||
            date.getDate() !== itemDate.getDate()
          ) {
            return false;
          }
        }
        return !this.tagFilter || item.tag === this.tagFilter;
      });
    }
  }
}
</script>

<style>
.custom-table .el-table__cell {
  font-size: 20px;
}
</style>
