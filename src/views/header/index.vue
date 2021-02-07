<template>
  <div class="header">
    <div class="welcome">欢迎访问后台系统</div>
    <div class="infon">
      <span>
        <a-icon type="user"></a-icon>
        <span style="padding-left:3px;">admin</span>
      </span>
      <a class="logout" @click="logout">退出登录</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$confirm({
        title: "提示",
        content: "确定退出吗？",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          //如果用普通函数，this要保存
          this.$router.push({
            path: "/login"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  // background-color: #f2f2f2;
  .welcome {
    flex: 7;
    font-weight: 700;
    font-size: 16px;
  }
  .infon {
    flex: 1;
    .logout {
      color: #1890ff;
      margin-left: 10px;
    }
  }
}
</style>
