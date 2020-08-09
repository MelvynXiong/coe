module.exports = {
  get body() {
    return this._body;
  },
  /**
   * 设置 body 的时候没有直接调用 this.res.end来返回信息
   * 这样可多次覆盖性设置数据，真正的返回消息操作会放在 application.js中
   */
  set body(data) {
    this._body = data;
  },
  get status() {
    return this.res.statusCode;
  },
  set status(statusCode) {
    if (typeof statusCode !== "number") {
      throw new Error("statusCode must be a number");
    }
    this.res.statusCode = statusCode;
  },
};
