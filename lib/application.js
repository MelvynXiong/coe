const http = require("http");
class Application {
  constructor() {
    this.callbackFunc = null;
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }

  /**
   * 获取http server所需的 callback 函数
   */
  callback() {
    return (req, res) => {
      this.callbackFunc(req, res);
    };
  }

  use(fn) {
    this.callbackFunc = fn;
  }
}

module.exports = Application;
