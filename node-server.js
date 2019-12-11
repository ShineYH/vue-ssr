let express = require('express');
let fs = require('fs');
let Vue = require('vue');
let VueServerRender = require('vue-server-renderer');
let app = express();
let path = require('path');

// 读取打包后的server bundle
let serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf8');
// 读取服务端渲染html模板
let template = fs.readFileSync('./dist/index.ssr.html', 'utf8');
// 获取渲染函数时，传入bundle和模板即可
let render = VueServerRender.createBundleRenderer(serverBundle, {
  template
});
app.get('/', (req, res) => {
  // 将渲染成功的字符串返回给客户端
  render.renderToString((err, html) => {
    res.send(html); // 直接传入html
  });
});
// 这个static要放在下面，否则不会走‘/’这个路由，而是直接把html返回出去了
app.use(express.static(path.resolve(__dirname, 'dist')))
app.listen(4000);