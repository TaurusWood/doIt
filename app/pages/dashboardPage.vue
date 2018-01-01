<template lang="html">
  <div class="dashboard-page">
    <nav-bar></nav-bar>
    <cat-list></cat-list>
    <article class="pull-right">
      <div class="add-item" @keyup.enter="addTodoItem">
        <Input class="add-input" type="text" v-model="itemTitle" placeholder="在这里添加你的计划"></Input>
        <div class="add-menu">
          <Icon type="ios-timer-outline"></Icon>
          <!-- <Icon type="ios-timer"></Icon> -->
          <Icon type="android-apps"></Icon>
        </div>
      </div>
      <todo-item></todo-item>
    </article>

  </div>
</template>

<script>
import navBar from '@/components/dashboard/navBar';
import catList from '@/components/dashboard/catList';
import todoItem from '@/components/dashboard/todoItem';

export default {
  name: 'dashboardPage',
  data() {
    return {
      itemTitle: '',
    }
  },
  methods: {
    addTodoItem() {
      const postData = {
        title: this.itemTitle
      }
      console.log(postData);
      this.$store.commit('addTodoItem', postData)
    }
  },
  components: {
    navBar,
    catList,
    todoItem
  }
}
</script>

<style lang="scss">
  .dashboard-page {
    article {
      width: 76%;
      padding: 20px;
      .add-item {
        display: inline-block;
        position: relative;
        color: #666;
        width: 100%;
        .add-menu {
          position: absolute;
          right: 0;
          top: 0;
          width: 60px;
          height: 100%;
          padding: 4px 0;
          font-size: 14px;
          cursor: pointer;
          i {
            font-size: 20px;
            padding: 2px 0;
            & + i {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
</style>
