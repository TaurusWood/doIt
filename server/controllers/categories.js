const categories = require('../model/categories');

module.exports = {
  'GET /get_categories': async(ctx, next) => {
    const data = await categories.getCategories(ctx.query); // ctx.request.query
    const code = data.length ? 1 : 0;
    ctx.rest({
      code,
      data
    })
  },
  'POST /add_categories': async(ctx, next) => {
    const data = await categories.addCategories(ctx.query);

  }
  'GET /guide/get_recommend': async(ctx, next) => {
    const data = [
      { locked: false, title: '想看的电影'},
      { locked: false, title: '想读的书' },
      { locked: false, title: '想买的东西' },
      { locked: false, title: '想去的地方' },
      { locked: true, title: '秘密' }
    ]
    ctx.rest({ data });
    next();
  }
}
