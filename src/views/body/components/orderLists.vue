<template>
  <div class="order-lists">
    <a-table
      :scroll="{y:400}"
      size="small"
      :loading="loading"
      :pagination="false"
      :data-source="dataAcount"
      :bordered="true"
      :rowKey="(record,index)=>{return index}"
    >
      <a-table-column title="订单号" data-index="orderNumber"></a-table-column>
      <a-table-column title="总计" data-index="total"></a-table-column>
      <a-table-column title="时间" data-index="date"></a-table-column>
      <a-table-column title="状态" width="100px" data-index="status"></a-table-column>
      <a-table-column title="收货人" data-index="consignee"></a-table-column>
      <a-table-column title="收货地址" data-index="address"></a-table-column>
      <a-table-column title="联系方式" data-index="myPhone"></a-table-column>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataAcount: [],
      loading: false
    };
  },
  created() {
    this.getLists();
  },
  methods: {
    getLists() {
      this.loading = true;
      this.$http.getOrder().then(res => {
        this.dataAcount = res.data;
        this.loading = false;
        console.log(res.data);
      });
    }
  }
};
</script>
<style scoped>
</style>
