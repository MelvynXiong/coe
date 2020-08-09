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
    set() {
      target[ele] = this[prop][ele];
    },
  });
}

module.exports = {
  delegateGet,
  delegateSet,
};
