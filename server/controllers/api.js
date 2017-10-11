const user = require('../model/user');

module.exports = {
  'GET /api/get_test': async (ctx, next) => {
    console.log('/api/get_test');
    ctx.response.type = 'application/json';
    ctx.response.body = {
       seuccess: true
    };
  },
  'POST /api/sign_up': async (ctx, next) => {
    console.log('/api/sign_up', ctx.request, ctx.request.body);
    const userInfo = {
      username: ctx.request.body.username,
      password: ctx.request.body.password
    }
    ctx.response.type = 'application/json';
    // const result = await user.signUp(userInfo);
    ctx.response.body = {
      seuccess: true
    };
  }
}
