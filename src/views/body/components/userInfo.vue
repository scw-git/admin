<template>
  <div class="user-info">
    <a-table :data-source="tableData" bordered :rowKey="(record,index)=>{
      return index}">
      <a-table-column title="用户名" data-index="userName"></a-table-column>
      <a-table-column title="密码" data-index="pw"></a-table-column>
      <a-table-column title="性别" data-index="gender"></a-table-column>
      <a-table-column title="联系方式" data-index="myPhone"></a-table-column>
      <a-table-column title="操作" key="action">
        <!-- 如果设置了唯一的dataIndex可以忽略key -->
        <template slot-scope="record">
          <a href="javascript:" @click="deleteUser(record._id)">删除</a>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$http.getUsers().then(res => {
        this.tableData = res.data;
        // console.log(this.tableData);
      });
    },

    deleteUser(id) {
      this.$confirm({
        title: "提示",
        content: "你确定删除吗？",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          let params = {
            id
          };
          // axios.delete("/xxx", { params: {} });
          this.$http.delUser({ params }).then(res => {
            if (res.status == 200) {
              this.getUsers();
              this.$message.success("删除成功");
            }
            // console.log(res);
          });
        }
      });
    }
  }
};
</script>