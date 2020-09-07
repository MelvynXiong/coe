module.exports = (middlewares) => {
  const len = middlewares.length;
  let next = async function () {
    return Promise.resolve({});
  };

  /**
   * 创建一个next函数
   * 该函数被调用时会执行当前中间件的下一个中间件
   */
  function createNext(ctx, middleware, oldNext) {
    return async () => {
      await middleware(ctx, oldNext);
    };
  }

  return async (ctx) => {
    for (let i = len - 1; i >= 0; i--) {
      next = createNext(ctx, middlewares[i], next);
    }
    await next();
  };
};
