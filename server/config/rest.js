module.exports = {
  APIError: function (code, message) {
    this.status.status = 200;
    this.code = code || -99;
    this.message = message || 'internal: unknown_error';
  },
  restify: (pathPrefix) => {
    pathPrefix = pathPrefix || '/api/';
    return async (ctx, next) => {
      if (ctx.request.path.startsWith(pathPrefix)) {
        ctx.rest = result => {
          ctx.response.type = 'application/json';
          ctx.response.body = {
            code: result.code || 1,
            message: result.message || '',
            data: result.data
          };
        }
        try {
          await next();
        } catch(e) {
          ctx.response.status = 400; // ???
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
