const path = require('path');
const opn = require('opn');

const webpack = require('webpack');

const webpackConf = require('./webpack.dev.conf');  // 目前就只有开发环境

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const historyApiFallback = require('koa2-history-api-fallback');

// const json = require('koa-json');
// const loger = require('koa-logger');

const app = new koa();
const compiler = webpack(webpackConf);

const port = 3002;

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')());

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

app.use(bodyParser());

app.use(async function(ctx, next){
  let start = new Date;
  await next();
  let ms = new Date - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

app.on('error', function(err, ctx){
  console.log('server error', err);
});

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
