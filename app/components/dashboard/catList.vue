<template lang="html">
  <aside class="pull-left">
    <ul>
      <li v-for="(category, index) in categories" :key="category.cat_id" :class="{ active: index === 1 }">
        <div class="list">
          <span>{{category.title}}</span>
          <Icon class="icon" type="ios-trash" @click.native="delCategories(category.cat_id)"></Icon>
        </div>
      </li>
    </ul>
    <Button class="add-list" @click="addCategories" long>
      <Icon type="android-add"></Icon>
      添加清单
    </Button>
  </aside>
</template>

<script>
export default {
  name: 'catList',
  data() {
    return {
      catTitle: '',
      addTodoListModal: false,
      currentList: {},
    }
  },
  created() {
    this.$store.dispatch('getCategories')
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    addCategories() {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.catTitle,
              autofocus: true,
              placeholder: '项目名称',
            },
            on: {
              input: (v) => {
                this.catTitle = v;
              }
            }
          })
        },
        onOk: () => {
          this.$store.dispatch('addCategories', [{title: this.catTitle}])
          .then(data => {
            this.catTitle = '';
            this.$store.commit('updateCategories', data)
          })
        }
      })
    },
    delCategories(cat_id) {
      this.$Modal.warning({
        content: '确定要删除该项目？',
        loading: true,
        onOk: () => {
          this.$store.dispatch('delCategories', {cat_id: [cat_id]}).then(() => {
            this.$Modal.remove();
          })
        }
      })

    }
  },
}
</script>

<style lang="scss">
.dashboard-page aside {
    width: 22%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
    box-shadow: 0 2px 5px 1px #555;
    position: relative;
    z-index: 1;
    margin-top: -36px;
    padding-top: 36px;
    ul {
        overflow-y: auto;
        max-height: 85%;
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
                box-shadow: inset 0 1px 20px 3px #e7e7e7;
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
</style>
