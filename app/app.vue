<template lang="html">
  <div id="app">
    <!-- <nav class="aside-nav">
      <router-link :to="{ name: 'login'}">登录</router-link>
      <router-link :to="{ name: 'guide'}">引导</router-link>
      <router-link :to="{ name: 'dashboard'}">面板</router-link>
    </nav> -->
    <router-view name="page"></router-view>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss">
  @import "./assets/css/layout.scss";
  @import "./assets/css/common.scss";
</style>
