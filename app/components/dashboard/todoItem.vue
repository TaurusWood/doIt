<template lang="html">
  <div class="todo-item">
    <ul>
      <li v-for="item in todoItem">
        <Checkbox>Checkbox</Checkbox>
        {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    todoItem() {
      return this.$store.state.todoItem;
    },
  }
}
</script>

<style lang="scss">
  .dashboard-page .todo-item {
    margin-top: 50px;
    ul {
      li {
        margin: 20px 0;
        padding: 4px 10px;
        // background-color: #f7f7f7;
        height: 30px;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.4);
        border: 1px solid #495060;
        color: #eee;
      }
    }
  }
</style>
