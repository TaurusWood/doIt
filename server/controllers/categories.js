const categories = require('../model/categories');

const filterTimeAt = function (data) {
  delete data.created_at;
  delete data.deleted_at;
  delete data.updated_at;
  return data;
}

module.exports = {
  'GET /get_categories': async (ctx, next) => {
    let data = await categories.getCategories(ctx.session.user_id);
    data = filterTimeAt(data);
    ctx.rest({ data })
  },
  'POST /add_categories': async (ctx, next) => {
    // console.log('ctx.session.user_id: ', ctx.session.user_id);
    // console.log('ctx.request.query: ', ctx.request.query);  // get
    // console.log('ctx.request.body: ', ctx.request.body)  // post
    let data = await categories.addCategories(ctx.request.body, ctx.session.user_id);
    data = filterTimeAt(data);
    ctx.rest({
      message: '添加成功',
      data,
    })
  },
  'POST /del_categories': async (ctx, next) => {
    const data = await categories.delCategories(ctx.request.body);
    ctx.rest({
      message: '删除成功',
      data,
    })
  }
}
