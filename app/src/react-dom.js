import { REACT_TEXT } from "./constants";

function render(vdom, container) {
  //。 第二步
  //1
  const newDOM = createDOM(vdom); // 不同功能写在不同函数里，清晰          // 第三步
  //2
  container.appendChild(newDOM);
}

// 创建真实 dom
function createDOM(vdom) {
  let { type, props } = vdom; // 我们知道虚拟dom就是我们生成的那个对象
  let dom; // 最后要返回的

  if (type === REACT_TEXT) {
    // 如果是个文本
    dom = document.createTextNode(props);
  } else {
    // 标签节点
    dom = document.createElement(type);
  }

  // 需要对props 中的 style 和 children 和其他进行处理
  if (props) {
    // 单独处理属性
    updateProps(dom, {}, props); // 第四步
    // 单独处理 chidlren
    if (
      props.chidlren &&
      typeof props.children === "object" &&
      props.chidlren.$$typeof
    ) {
      // 文本
      render(props.chidlren, dom);
    } else if (Array.isArray(props.children)) {
      // 子为数组，把子挂载到当前的父 dom
      reconcileChildren(props.children, dom); // 第五步
    }
  }

  return dom;
}

// 子虚拟节点，父真实节点
function reconcileChildren(chidlrenVdom, parentDom) {
  // 循环递归处理， 算法题里非二叉树的多子树节点，也是 for 循环遍历处理
  for (let i = 0; i < chidlrenVdom.length; i++) {
    render(chidlrenVdom[i], parentDom);
  }
}

// 对 dom 进行新属性赋值，旧属性没有的删除, vue中也是类型的操作，遍历新属性，旧属性
function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === "children") {
      continue; // 单独处理
    } else if (key === "style") {
      let styleObj = newProps[key];
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else {
      dom[key] = newProps[key];
    }
  }
  // 老的有，新的没有 删除
  for (let key in oldProps) {
    if (!newProps.hasOwnProperty(key)) {
      delete dom[key];
    }
  }
}

// 根据调用，返回的一定是对象       第一步
const ReactDOM = {
  render,
};
export default ReactDOM;
