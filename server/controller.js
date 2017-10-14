const fs = require('fs');
const router = require('koa-router')();

const addMapping = function (router, mapping) {
  let path;
  for (let api in mapping) {
    if (api.startsWith('GET ')) {
      path = api.substring(4);
      router.get(path, mapping[api]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (api.startsWith('POST ')) {
      path = api.substring(5);
      router.post(path, mapping[api]);
      console.log(`register URL mapping: POST ${path}`);
    } else if (api.startsWith('PUT ')) {
      path = api.substring(4);
      router.put(path, mapping[api]);
      console.log(`register URL mapping: PUT ${path}`);
    } else if (api.startsWith('DELETE ')) {
      path = api.substring(7);
      router.del(path, mapping[api]);
      console.log(`register URL mapping: DELETE ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}


const addControllers = function (router, dir) {
  fs.readdirSync(__dirname + '/' + dir).filter(file => file.endsWith('.js'))
    .forEach(file => {
      console.log(`process controller: ${file}...`);
      let mapping = require(__dirname + '/' + dir + '/' + file);
      addMapping(router, mapping)
    })
}


module.exports = function (dir) {
  const controller_dir = dir || 'controllers';
  addControllers(router, controller_dir);
  router.use('/api', router.routes())
  return router.routes();
}
