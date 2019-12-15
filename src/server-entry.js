import createApp from './app';


// 服务端需要每次都需要生成一个新的app实例
export default (context) => {
  return new Promise((resolve) => {
    let { app, router }  = createApp();
    router.push(context.url);
    // 我们需要在路由加载完之后，才能resolve app，在服务端运行的router
    // 会有哦onReady方法
    router.onReady(() => {
      resolve(app);
    });
  });
}