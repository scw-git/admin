<template>
  <div class="product-list">
    <div class="add-type" style="margin-bottom:10px;">
      <a-button type="primary" @click="addPro">新增</a-button>
      <a-col :span="10">
        <span style="margin-left:50px;">筛选：</span>
        <a-select style="width:200px;" defaultValue @change="handleChange">
          <a-select-option value>全部</a-select-option>
          <a-select-option v-for="(item,i) in type" :key="i" :value="item.type">{{item.type}}</a-select-option>
        </a-select>
      </a-col>
      <a-input-search placeholder="input search text" enter-button @search="onSearch" />
    </div>
    <a-table :data-source="tableData" bordered :rowKey="(record,index)=>{
      return index}">
      <a-table-column title="商品名称" :width="150" data-index="name"></a-table-column>
      <a-table-column title="价格" data-index="price"></a-table-column>
      <a-table-column title="类型" data-index="type"></a-table-column>
      <a-table-column title="库存" data-index="count"></a-table-column>
      <a-table-column title="发布日期" data-index="time"></a-table-column>
      <a-table-column title="是否推荐" :width="100">
        <template slot-scope="record">
          <span v-if="record.recommend">是</span>
          <span v-else>否</span>
        </template>
      </a-table-column>
      <a-table-column title="描述" :width="200" ellipsis data-index="desc"></a-table-column>
      <a-table-column title="操作" key="action">
        <!-- 如果设置了唯一的dataIndex可以忽略key -->
        <template slot-scope="record">
          <a href="javascript:" @click="edi(record)">编辑</a>
          <a href="javascript:" style="margin-left:10px;" @click="del(record._id)">删除</a>
        </template>
      </a-table-column>
    </a-table>
    <addPro ref="addPro"></addPro>
  </div>
</template>
<script>
import addPro from "@/views/body/components/modal/addPro.vue";
export default {
  components: {
    addPro
  },
  data() {
    return {
      tableData: [],
      type: [] //类型
    };
  },
  created() {
    this.getProductLists();
    this.getType();
  },
  methods: {
    onSearch(value) {
      let params = {
        searchValue: value
      };
      this.$http.searchProduct({ params }).then(res => {
        this.tableData = res.data;
        // console.log(res);
      });
    },
    handleChange(value) {
      this.getProductLists(value);
    },
    // 获取类型
    getType() {
      this.$http.getProductType().then(res => {
        this.type = res.data;
      });
    },
    edi(record) {
      this.$refs.addPro.showModal(record);
    },
    del(id) {
      this.$confirm({
        title: "提示",
        content: "你确定删除吗？",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          let params = {
            id
          };
          this.$http.deleteProduct({ params }).then(res => {
            if (res.status == 200) {
              this.$message.success("删除成功");
              this.getProductLists();
            }
          });
          this.visible = false;
        }
      });
    },
    addPro() {
      this.$refs.addPro.showModal();
    },
    //获取商品
    getProductLists(value) {
      let params = {
        type: value
      };
      this.$http.getProduct({ params }).then(res => {
        this.tableData = res.data.data;
      });
    }
  }
};
</script>
<style scoped lang='scss'>
.product-list {
  .add-type {
    display: flex;
    // flex-shrink: 1;
  }
}
</style>