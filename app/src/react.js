import { REACT_ELEMENT } from "./constants";
import { toVdom } from "./utils";

function createElement(type, config, children) {
  console.log({
    type,
    config,
    children,
  });
  if (config) {
    // 这里可写可不写，就是为了简化下我们自己写的，只把必要的返回，没用的参数越少越清晰嘛
    delete config.__source;
    delete config.__self;
  }
  const props = { ...config };
  if (arguments.length > 3) {
    // 有多个儿子
    props.chidlren = Array.prototype.slice.call(arguments, 2).map(toVdom);
  } else if (arguments.length === 3) {
    // 只有一个子，直接赋值
    props.children = toVdom(children);
  }

  return {
    $$typeof: REACT_ELEMENT,
    type,
    props,
  };
}

const React = {
  createElement,
};
export default React;
