const router = require('koa-router')();

const controllers = require('../server/controllers/api');

for (let api in controllers) {
  let path;
  if (api.startsWith('GET ')) {
    path = api.substring(4);
    router.get(path, controllers[api]);
    console.log(`register URL mapping: GET ${path}`);
  } else if (api.startsWith('POST ')) {
    path = api.substring(5);
    router.post(path, controllers[api]);
    console.log(`register URL mapping: POST ${path}`);
  }
}

module.exports = function () {
  return router.routes();
}
