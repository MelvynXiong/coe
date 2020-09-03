function delegateGet(target, prop, ele) {
  const descriptor = Object.getOwnPropertyDescriptor(target, ele);
  Object.defineProperty(target, ele, {
    ...descriptor,
    configurable: true,
    enumerable: true,
    get() {
      return this[prop][ele];
    },
  });
}

function delegateSet(target, prop, ele) {
  const descriptor = Object.getOwnPropertyDescriptor(target, ele);
  Object.defineProperty(target, ele, {
    ...descriptor,
    configurable: true,
    enumerable: true,
    set(data) {
      this[prop][ele] = data;
    },
  });
}

module.exports = {
  delegateGet,
  delegateSet,
};
