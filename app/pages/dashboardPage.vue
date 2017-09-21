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
          <li v-for="(list, index) in todoList" :key="list.list_id" :class="{ active: index === 0 }">
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
        <Input type="text"></Input>
      </article>
    </div>
    <Modal v-model="addTodoListModal" title="新的任务清单">
      <Input type="text"></Input>
    </Modal>
  </div>
</template>

<script>

export default {
  name: 'dashboardPage',
  data() {
    return {
      addTodoListModal: false,
      itemName: '',
      user_name: '小明明儿'
    }
  },
  computed: {
    todoList() {
      return this.$store.state.todoList;
    },
  },
  methods: {

  }
}
</script>

<style lang="scss">
  .dashboard-page {
    nav {
      height: 6%;
      background-color: rgba(0,0,0,.3);
      box-shadow: 0 2px 5px 1px #555;
      padding: 8px 12px;
      color: #eee;
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
    }
  }
</style>
