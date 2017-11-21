const jwt = require('jsonwebtoken');
const PRIMARY_KEY = require('../config/config').PRIMARY_KEY;

module.exports = {
  APIError: function (code, message) {
    this.status = 200;
    this.code = code || -99;
    this.message = message || 'internal: unknown_error';
  },
  restify: (pathPrefix) => {
    pathPrefix = pathPrefix || '/api/';
    return async (ctx, next) => {
      console.log(ctx.request.path.startsWith('/api/guide'));
      if (ctx.request.path.startsWith(pathPrefix)) {
        ctx.rest = result => {
          let code = (!result.code && result.code !== 0) ? 1 : result.code;
          ctx.response.type = 'application/json';
          ctx.response.body = {
            code: code,
            message: result.message || '',
            data: result.data || ''
          };
          if (result.token) {
            ctx.response.body.token = result.token;
          }
        }
        try {
          await next();
        } catch(e) {
          // ctx.response.status = 400; // ???
          ctx.response.type = 'application/json';
          ctx.response.body = {
            code: e.code || -99,
            message: e.message || 'internal: unknown_error'
          }
        }
      } else {
        await next();
      }
    }
  }
}
