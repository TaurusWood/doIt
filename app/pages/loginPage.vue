<template lang="html">
  <div class="login-page">
    <div class="blur"></div>
    <div class="form">
      <Form :model="formItem" :label-width="80">
        <FormItem label="用户名">
          <Input type="text" v-model="formItem.user" placeholder="请输入">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="密码">
          <Input type="password" v-model="formItem.password" placeholder="请输入">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem class="action">
            <Button type="primary" @click="handleLogin">登录</Button>
            <Button>注册</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      formItem: {
        user: '',
        password: '',
      }
    }
  },
  methods: {
    handleLogin() {
      console.log(this.$router.push)
      this.$router.push({ name: 'dashboard' });
    },
  }
}
</script>

<style lang="scss">
  .login-page {
    width: 360px;
    height: 200px;
    position: relative;
    margin: 150px auto;
    box-shadow: 0 0 6px 3px #222;
    .blur {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      filter: blur(3px);
      background: {
        image: url(../assets/images/wallpaper/sunflower.jpg);
        size: cover;
        attachment: fixed;
      }
    }
    .form {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 10;
      padding: 26px;
      background-color: rgba(0,0,0,.36);
      color: #fff;
      .ivu-form-item {
        .ivu-form-item-label {
          color: #eee;
        }
      }
      .action {
        button + button {
          margin-left: 50px;
        }
      }
    }
  }
</style>
