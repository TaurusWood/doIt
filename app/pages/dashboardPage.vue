<template lang="html">
  <div class="dashboard-page">
    <aside>
      <router-link v-for="item in menuItem" :to="{ name: item.name}"  :key="item.path">{{item.name}}</router-link>
    </aside>
    <Form ref="formInline" class="pull-right add-item">
      <Input type="text" v-model="itemName"></Input>
      <Button @click="addRoute">添加</Button>
    </Form>
    <router-view></router-view>
  </div>
</template>

<script>
import work from '@/components/dashboard/work.vue';

export default {
  name: 'dashboardPage',
  data() {
    return {
      itemName: '',
    }
  },
  computed: {
    menuItem() {
      return this.$store.state.routes.children;
    },
    menuItemLength() {
      return this.$store.state.routes.children.length;
    }
  },
  methods: {
    addRoute() {
      const routes = {
        path: `/dashboard/menuItem-${this.menuItemLength + 1}`,
        name: this.itemName,
        component: work
      }
      this.$store.commit('addRoute', routes);
      this.$router.addRoutes(this.$store.state.routes.children.concat(routes));
    }
  }
}
</script>

<style lang="scss">
  .dashboard-page {
    aside {
      width: 260px;
      height: 100%;
      background-color: rgba(0,0,0,.3);
      float: left;
      padding: 20px;
      box-shadow: 0 2px 5px 1px #555;
      a {
        color: #eee;
        font-size: 16px;
        display: block;
        height: 50px;
      }
    }
    .add-item {
      width: 300px;
    }
  }
</style>
