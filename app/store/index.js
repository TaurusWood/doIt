import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: [
      {
        name: '工作',
        list_id: 1,
        list_number: 0,
        flag: -1,
        group_id: -1,
        group_name: '',
      },
      {
        name: '想看的电影',
        list_id: 2,
        list_number: 0,
        flag: -1,
        group_id: -1,
        group_name: '',
      },
      {
        name: '计划看的书',
        list_id: 3,
        list_number: 0,
        flag: -1,
        group_id: -1,
        group_name: '',
      },
      {
        name: '私人',
        list_id: 4,
        list_number: 0,
        flag: -1,
        group_id: -1,
        group_name: '',
      }
    ],
    todoItem: [
      {
        list_id: 1,
        title: '重构京东',
        status: 'unfinshed',
        deadline: '',
        level: 0,
        create_time: '',
        remark: '',
      }
    ]
  },
  mutations: {
    addTodoItem(state, data) {
      state.todoItem.push(data);
    }
  }
})
