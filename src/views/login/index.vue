<template>
  <div class="login">
    <div class="item">
      <a-form-model ref="ruleForm" :model="loginForm" :rules="rules">
        <a-form-model-item prop="user">
          <a-input v-model="loginForm.user" placeholder="enter user">
            <a-icon slot="prefix" type="user"></a-icon>
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input
            type="password"
            v-model="loginForm.password"
            placeholder="enter password"
            @keydown.enter="login"
          >
            <a-icon slot="prefix" type="lock"></a-icon>
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button class="btn" type="danger" @click="login">登录</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        user: "",
        password: ""
      },
      rules: {
        user: [{ required: true, trigger: "blur", message: "请输入账号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (
            this.loginForm.user == "admin" &&
            this.loginForm.password == "admin"
          ) {
            this.$router.push({
              path: "/index"
            });
          } else {
            this.$message.error("账号或密码错误！！");
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("~@/assets/img/login_bg.jpg") no-repeat right bottom/100%;
  //   background-size: 100%; //图片大小可以像上面那样写
  display: flex;
  justify-content: center;
  align-items: center;
  .item {
    width: 280px;
    height: 280px;
    background-color: rgba($color: #fff, $alpha: 0.3);
    padding: 30px 20px;
    border-radius: 5px;
    .btn {
      width: 100%;
    }
  }
}
</style>
