import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: null,

  },
  mutations: {
    updateCategories(state, data) {
      state.categories = data;
    },
    addTodoItem(state, data) {
      state.todoItem.push(data);
    }
  },
  actions: {
    getCategories({ commit }) {
      return Vue.prototype.axios
                .get('/api/get_categories', 'noErrhandle')
                .then(res => {
                  commit('updateCategories', res.data);
                  return res.data.length ? false : true;
                })
    },
    addCategories({ commit }, categories) {
      return Vue.prototype.axios
                .post('/api/add_categories', { params: categories })
                .then(res => {
                  res.success && commit('updateCategories', res.data);
                })

    }
  }
})
