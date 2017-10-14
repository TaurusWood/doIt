const user = require('../model/user');
const APIError = require('../config/rest').APIError;

module.exports = {
  'POST /auth/check_name': async (ctx, next) => {
    const data = await user.checkName(ctx.request.body.username);
    if (data) {
      ctx.rest({
        message: '该用户名尚未被注册',
        data
      });
    } else {
      throw new APIError(-1, '用户名已存在');
    }
  },
  'POST /auth/sign_up': async (ctx, next) => {
    const userInfo = {
      username: ctx.request.body.username,
      password: ctx.request.body.password
    };
    const data = await user.signUp(userInfo);
    if (data) {
      ctx.rest({data});
    } else {
      throw new APIError();
    }
  },
  'POST /auth/sign_in': async (ctx, next) => {
    const userInfo = {
      username: ctx.request.body.username,
      password: ctx.request.body.password
    };
    const data = await user.signIn(userInfo);
    if (data) {
      ctx.rest({data});
    } else {
      throw new APIError(-2, '用户名或密码错误');
    }
  },
  'PUT /auth/update_password': async (ctx, next) => {
    const userInfo = {
      username: ctx.request.body.username,
      password: ctx.request.body.password,
      newPassword: ctx.request.body.newPassword
    }
    const data = await user.updatePassword(userInfo);
    if (data) {
      ctx.rest({
        message: '密码修改成功',
        data
      });
    } else {
      throw new APIError(-2, '用户名或密码错误');
    }
  }
}
