const jwt = require('jsonwebtoken');
const PRIMARY_KEY = require('../config/config').PRIMARY_KEY;

module.exports = {
  APIError: function (message) {
    this.status = 200;
    this.success = false;
    this.message = message || 'internal: unknown_error';
  },
  restify: (pathPrefix) => {
    pathPrefix = pathPrefix || '/api/';
    return async (ctx, next) => {
      console.log(ctx.request.path.startsWith('/api/guide'));
      if (ctx.request.path.startsWith(pathPrefix)) {
        ctx.rest = result => {
          ctx.response.type = 'application/json';
          ctx.response.body = {
            success: result.success || true,
          };
          if (result.data) {
            ctx.response.body.data = result.data;
          }
          if (result.message) {
            ctx.response.body.message = result.message;
          }
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
            success: false,
            message: e.message || 'internal: unknown_error'
          }
        }
      } else {
        await next();
      }
    }
  }
}
