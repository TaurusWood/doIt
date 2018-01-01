const path = require('path');
const opn = require('opn');

const webpack = require('webpack');
const webpackConf = require('./webpack.dev.conf');  // 目前就只有开发环境

const koa = require('koa');
const jwt = require('jsonwebtoken');
const session = require('koa-session2');

const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const historyApiFallback = require('koa2-history-api-fallback');

const Store = require('../server/config/store');
const controller = require('../server/controller');
const rest = require('../server/config/rest');
const TOKEN_PRIMARY_KEY = require('../server/config/config').TOKEN_PRIMARY_KEY;

// const json = require('koa-json');
// const loger = require('koa-logger');

const app = new koa();
const compiler = webpack(webpackConf);

const port = 3002;

const devMiddleware = require('koa-webpack-middleware').devMiddleware(compiler, {
  publicPath: webpackConf.output.publicPath,
  stats: {
    colors: true
  },
  // quiet: true   // display nothing to the console Default false
});

const hotMiddleware = require('koa-webpack-middleware').hotMiddleware(compiler, {
  log: false,
  heartbeat: 2000  // How often to send heartbeat updates to the client to keep the connection alive
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  })
})

app.use(devMiddleware);
app.use(hotMiddleware);

const uri = 'http://localhost:' + port

const readyPromise = new Promise(resolve => {
  devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n');
    // opn(uri);
  });
  resolve();
});

app.use(session({
    key: "SESSIONID",
    store: new Store()
}));

app.use(async function(ctx, next){
  let start = new Date;
  await next();
  let ms = new Date - start;
  console.log('Process', ctx.method, ctx.url, ms + 'ms');
});

// token valid
app.use(async function (ctx, next) {
  if (ctx.url.indexOf('/api') > -1 && ctx.url.indexOf('/api/auth/') === -1) {
    const token = ctx.request.header['x-access-token']  // X-Access-Token 会被转换成小写
    jwt.verify(token, TOKEN_PRIMARY_KEY, function (err, decoded) {
      console.log('err: ', err);
      if (err) {
          ctx.response.status = 401;
          ctx.response.body = {
            code: -100,
            message: 'invalid token',
          };
      } else {
        console.log('decoded: ', decoded);
      }
    })
  }
  await next();
})

// session
// app.use(async function (ctx, next) {
//   const sessionId = ctx.cookies.get('SESSIONID');
//   const userInfo = ctx.session;
//   console.log('ctx.session-s: ', ctx.session);
//   console.log('userInfo: ', userInfo);
//   console.log('SESSIONID: ', sessionId);
//   await next();
// })

// restify 接口风格统一
app.use(rest.restify());
app.use(bodyParser());
app.use(controller());



app.on('error', function(err, ctx){
  console.log('server error', err);
});

// handle fallback for HTML5 history API
app.use(historyApiFallback());
app.use(serve(path.resolve('dist')));

const server = app.listen(port, () => {
  console.log('app is listening in 3002');
});

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
