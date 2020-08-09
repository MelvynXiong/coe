const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class Application {
  constructor() {
    this.callbackFunc = null;
    this.context = context;
    this.request = request;
    this.response = response;
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
      const ctx = this.createContext(req, res);

      this.callbackFunc(ctx).then(() => this.respond(ctx));
    };
  }

  /**
   * 构造ctx
   * @param {*} req
   * @param {*} res
   */
  createContext(req, res) {
    const ctx = Object.create(this.context);

    // 对原生对象的封装
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);

    // node 的 req, res 对象
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  use(fn) {
    this.callbackFunc = fn;
  }

  /**
   * 回复客户端消息
   * @param {*} ctx
   */
  respond(ctx) {
    const content = ctx.body;
    if (typeof content === "string") {
      ctx.res.end(content);
    } else if (typeof content === "object") {
      ctx.res.end(JSON.stringify(content));
    }
  }
}

module.exports = Application;
