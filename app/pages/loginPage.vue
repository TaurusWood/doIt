<template lang="html">
  <div class="login-page" :style="panelHeight">
    <div class="blur"></div>
    <div class="form">
      <sign-in v-if="showSignIn" @cut="showSignIn = false;"></sign-in>
      <sign-up v-else @cut="showSignIn = true;"></sign-up>
    </div>
  </div>
</template>

<script>
import signIn from '@/components/login/signIn';
import signUp from '@/components/login/signUp';

export default {
  name: 'loginPage',
  data () {
    return {
      showSignIn: true
    }
  },
  computed: {
    panelHeight() {
      return {
        height: this.showSignIn ? '200px' : '250px'
      };
    }
  },
  methods: {

  },
  components: {
    signUp,
    signIn
  }
}
</script>

<style lang="scss">
  .login-page {
    width: 360px;
    height: 200px;
    top: 160px;
    position: relative;
    margin: auto;
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
