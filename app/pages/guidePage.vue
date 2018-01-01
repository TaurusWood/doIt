<template lang="html">
  <div class="guide-page">
    <div class="guide-panel">
      <div class="blur-shadow"></div>
      <!-- <section class="head">
        欢迎首次来到Doit，以下是为您推荐的，稍后也可创建属于自己的list。
      </section> -->
      <section class="recommend clearfix">
        <div :class="[{selected: val.selected}]" class="item" v-for="val in recommendList" @click="val.selected = !val.selected">
            <Icon :type="val.icon"></Icon>
            <p>{{val.title}}</p>
        </div>
      </section>
      <section class="action">
        <Button long @click="postRecommendList">选好了</Button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'guidePage',
  data() {
    return {
      recommendList: [
        { icon: 'social-youtube', title: '想看的电影', selected:false},
        { icon: 'ios-book', title: '想读的书', selected:false },
        { icon: 'ios-cart', title: '想买的东西', selected:false },
        { icon: 'plane', title: '想去的地方', selected:false },
        { icon: 'ios-locked', title: '私人', selected:false },
        { icon: 'compose', title: '工作', selected:false }
      ],
      checkedRecommend: []
    }
  },
  methods: {
    postRecommendList() {
      const postData = this.recommendList.filter(i => i.selected).map(i => {
        if (i.title) {
          return {title: i.title}
        }
      });
      this.$store.dispatch('addCategories', postData).then(() => {
        this.$router.push({name: 'dashboard'});
      })
    }
  }
}
</script>

<style lang="scss">
.guide-page {
  .guide-panel {
    width: 260px;
    height: 300px;
    position: relative;
    margin: auto;
    top: 130px;
    box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.2);
    section {
      position: relative;
      z-index: 10;
    }
    .head {
      color: #fff;
      height: 70px;
      background-color: rgba(0, 0, 0, 0.3);
      // color: #666;
      padding: 4px 8px;
    }
    // .recommend {
    //   height: 100%;
    // }
    .item {
      position: relative;
      float: left;
      width: 50%;
      height: 30%;
      z-index: 10;
      text-align: center;
      padding-top: 20px;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;
      cursor: pointer;
      border: 1px solid rgba(221, 221, 221, 0.5);
      &.selected {
        color: #f3f3f3;
        box-shadow: inset 0 0 5px 2px rgba(221, 221, 221, 0.5);
        background-color: rgba(0, 0, 0, 0.32);
        text-shadow: 0px 0px 14px #fff;
      }
      i.ivu-icon {
        font-size: 18px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
