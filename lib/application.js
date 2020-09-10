const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");
const compose = require("../utils/compose");
const EventEmitter = require("events");

class Application extends EventEmitter {
  constructor() {
    super();
    this.middlewares = [];
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
      const fn = compose(this.middlewares);
      fn(ctx)
        .then(() => this.respond(ctx))
        .catch((e) => this.onError(e, ctx));
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
    this.middlewares.push(fn);
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

  /**
   * 错误处理
   * @param {Object} e
   * @param {Object} ctx
   */
  onError(e, ctx) {
    if (e.code === "ENOENT") {
      ctx.status = 404;
    } else {
      ctx.status = 500;
    }
    const msg = e.message || "Internal error";
    ctx.res.end(msg);
    // 触发 error 事件
    this.emit("error", e);
  }
}

module.exports = Application;
