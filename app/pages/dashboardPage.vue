<template lang="html">
  <div class="dashboard-page">
    <nav>
      <div class="user pull-left">
        <Icon type="person"></Icon>
        {{user_name}}
      </div>
      <div class="pull-right option">
        <Icon type="power"></Icon>
      </div>
    </nav>
    <div class="dashboard">
      <aside class="pull-left">
        <ul>
          <li v-for="(list, index) in todoList" :key="list.list_id" :class="{ active: index === 1 }">
            <div class="list">
              <span>{{list.name}}</span>
              <Icon class="icon" type="android-settings"></Icon>
            </div>
          </li>
        </ul>
        <Button class="add-list" @click="addTodoListModal = true" long>
          <Icon type="android-add"></Icon>
          添加清单
        </Button>
      </aside>
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
    <Modal v-model="addTodoListModal" title="新的任务清单">
      <Input v-model="listName" type="text"></Input>
    </Modal>
  </div>
</template>

<script>
import todoItem from '@/components/dashboard/todoItem';

export default {
  name: 'dashboardPage',
  data() {
    return {
      addTodoListModal: false,
      listName: '',
      itemTitle: '',
      user_name: '小香芹儿',
      currentList: {},
    }
  },
  computed: {
    todoList() {
      return this.$store.state.todoList;
    },
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
    todoItem
  }
}
</script>

<style lang="scss">
  .dashboard-page {
    nav {
      height: 6%;
      // background-color: rgba(0,0,0,.3);
      box-shadow: 0 2px 5px 1px #555;
      padding: 8px 12px;
      background-color: #f7f7f7;
      color: #666;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      .option {
        i {
          height: 100%;
          padding: 4px 0;
        }
      }
    }
    .dashboard {
      height: 94%;
    }
    aside {
      width: 22%;
      height: 100%;
      background-color: rgba(0,0,0,.3);
      box-shadow: 0 2px 5px 1px #555;
      position: relative;
      ul {
        overflow-y: auto;
        li {
          color: #eee;
          font-size: 16px;
          display: block;
          height: 40px;
          padding: 0 12px;
          cursor: pointer;
          &.active {
            background-color: #f7f7f7;
            color: #666;
            border-radius: 4px;
            box-shadow: inset 0px 1px 20px 3px #e7e7e7;
          }
          .list {
            padding: 8px 0;
            height: 100%;
            .icon {
              float: right;
              height: 100%;
              padding: 4px 0;
            }
          }
        }
      }
      .add-list {
        position: absolute;
        bottom: 0;
      }
    }
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
