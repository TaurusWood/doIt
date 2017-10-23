const APIError = require('../config/rest').APIError;

module.export = {
  'ALL /test': async (ctx, next) => {
    console.log(ctx.request.body);
    ctx.rest({
      message: 'just a test'
    });
  }
}
