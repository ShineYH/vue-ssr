import createApp from './app';


// 服务端需要每次都需要生成一个新的app实例
export default () => {
  let { app }  = createApp();
  return app;
}