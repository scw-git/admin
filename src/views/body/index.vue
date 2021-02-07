<template>
  <div class="body">
    <div class="left-item">
      <a-menu
        style="width: 180px;height:100%;"
        mode="vertical"
        @click="handleClick"
        :selectedKeys="selKey"
      >
        <a-menu-item key="userInfo">
          <a-icon type="user" />用户列表管理
        </a-menu-item>
        <a-menu-item key="productType">
          <a-icon type="shopping" />商品类型管理
        </a-menu-item>
        <a-menu-item key="productLists">
          <a-icon type="unordered-list" />商品列表管理
        </a-menu-item>
      </a-menu>
    </div>
    <div class="right-body">
      <a-card>
        <router-view></router-view>
      </a-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selKey: ["userInfo"]
    };
  },
  created() {
    //这个的作用就是，当你选中第二个menu刷新后，不会重新选中第一个。
    this.getRouter();
  },

  methods: {
    getRouter() {
      //这个的作用就是，当你选中第二个menu刷新后，不会重新选中第一个。
      let router_path = this.$route.path;
      let i = router_path.indexOf("/index/");
      if (i > -1) {
        this.selKey[0] = router_path.slice(i + 7);
      }
    },
    handleClick({ key }) {
      this.selKey[0] = key;
      this.$router.push({
        path: "/index/" + key
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.body {
  display: flex;
  .right-body {
    width: 100%;
    height: 100%;
    margin-top: 4px;
    padding: 10px;
    background-color: #f2f2f2;
  }
}
</style>