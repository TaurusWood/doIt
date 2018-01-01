import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nick: window.sessionStorage.getItem('nick') || null,
    categories: null,
  },
  mutations: {
    getNick(state, data) {
      state.nick = data;
    },
    updateCategories(state, data) {
      if (state.categories && state.categories.length) {
        Object.keys(state.categories[0]).forEach(key => {
          if (!data[key]) {
            data[key] = null;
          }
        })
        state.categories.push(data)
      } else {
        state.categories = data;
      }
    },
    delCategories(state, catIdArr) {
      catIdArr.forEach(cat_id => {
        state.categories = state.categories.filter(cat => cat.cat_id !== cat_id);
      })
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
                });
    },
    addCategories({ commit }, categories) {
      return Vue.prototype.axios
                .post('/api/add_category', categories)
                .then(res => res.data);
    },
    // axios.delete 的参数params 在query里面，会被序列化。 故改用post
    delCategories({ commit }, cat_id) {
      return Vue.prototype.axios
                .post('/api/del_categories', cat_id)
                .then(() => {
                  commit('delCategories', cat_id.cat_id)
                })
    }
  }
})
