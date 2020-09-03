const { delegateGet, delegateSet } = require("../utils");
const proto = {};

// 定义request中要代理的setter和 getter
const requestSet = [];
const requestGet = ["query"];

// 定义response中要代理的setter和 getter
const responseSet = ["body", "status"];
const responseGet = responseSet;

requestSet.forEach((ele) => {
  delegateSet(proto, "request", ele);
});

requestGet.forEach((ele) => {
  delegateGet(proto, "request", ele);
});

responseSet.forEach((ele) => {
  delegateSet(proto, "response", ele);
});

responseGet.forEach((ele) => {
  delegateGet(proto, "response", ele);
});

module.exports = proto;
