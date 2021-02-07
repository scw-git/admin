<template>
  <div class="product-type">
    <div class="add-type" style="margin-bottom:10px;">
      <a-button type="primary" @click="addProType">新增</a-button>
    </div>
    <a-table :data-source="tableData" bordered :rowKey="(record,index)=>{
      return index}">
      <a-table-column title="商品类型" data-index="type"></a-table-column>
      <a-table-column title="备注" data-index="desc"></a-table-column>

      <a-table-column title="操作" key="action">
        <!-- 如果设置了唯一的dataIndex可以忽略key -->
        <template slot-scope="record">
          <a href="javascript:" @click="edi(record)">编辑</a>
          <a href="javascript:" style="margin-left:10px;" @click="del(record._id)">删除</a>
        </template>
      </a-table-column>
    </a-table>
    <addProType ref="addProType"></addProType>
  </div>
</template>
<script>
import addProType from "@/views/body/components/modal/addProType.vue";
export default {
  components: {
    addProType
  },
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getProductType();
  },
  methods: {
    edi(record) {
      this.$refs.addProType.showModal(record);
    },
    del(id) {
      this.$confirm({
        title: "提示",
        content: "你确定删除吗？",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          let params = { id };
          this.$http.deleteProductType({ params }).then(res => {
            if (res.data.status == 200) {
              this.$message.success("删除成功");
              this.getProductType();
            }
          });
        }
      });
    },
    addProType() {
      this.$refs.addProType.showModal();
    },
    getProductType() {
      this.$http.getProductType().then(res => {
        this.tableData = res.data;
        // console.log("res", res);
      });
    }
  }
};
</script>
<style scoped lang='scss'>
</style>