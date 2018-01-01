const jwt = require('jsonwebtoken');
const user = require('../model/user');
const categories = require('../model/categories');
const APIError = require('../config/rest').APIError;
const TOKEN_PRIMARY_KEY = require('../config/config').TOKEN_PRIMARY_KEY;

module.exports = {
  'POST /auth/check_name': async (ctx, next) => {
    const data = await user.checkName(ctx.request.body.nick);
    if (data) {
      ctx.rest({
        message: '该用户名尚未被注册',
        data
      });
    } else {
      throw new APIError('用户名已存在');
    }
  },
  'POST /auth/sign_up': async (ctx, next) => {
    const userInfo = {
      nick: ctx.request.body.nick,
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
      nick: ctx.request.body.nick,
      password: ctx.request.body.password
    };
    const data = await user.signIn(userInfo);
    if (data) {
      const hasCategories = await categories.hasCategories(data.uid);
      const userToken = {
        user_id: data.uid,
        nick: data.nick,
        has_cat: hasCategories
      }
      // 储存session
      ctx.session = userToken;
      // expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
      ctx.rest({
        token: jwt.sign(userToken, TOKEN_PRIMARY_KEY, { expiresIn: '7d' }),
        data: userToken
      });
    } else {
      throw new APIError('用户名或密码错误');
    }
  },
  'POST /auth/sign_out': async (ctx, next) => {
    ctx.session = null;
    ctx.rest({
      message: '用户已注销'
    })
  },
  'PUT /update_password': async (ctx, next) => {
    const userInfo = {
      nick: ctx.request.body.nick,
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
      throw new APIError('用户名或密码错误');
    }
  }
}
