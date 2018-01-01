<template lang="html">
  <nav>
    <div class="user pull-left">
      <Icon type="person"></Icon>
      {{nick}}
    </div>
    <div class="pull-right option">
      <Icon type="power"></Icon>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navBar',
  computed: {
    nick() {
      return this.$store.state.nick;
    },
  }
}
</script>

<style lang="scss">
  .dashboard-page nav {
    height: 36px;
    // background-color: rgba(0,0,0,.3);
    box-shadow: 0 2px 5px 1px #555;
    padding: 8px 12px;
    background-color: #f7f7f7;
    color: #666;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    position: relative;
    z-index: 2;
    .option {
      i {
        height: 100%;
        padding: 4px 0;
      }
    }
  }
</style>
