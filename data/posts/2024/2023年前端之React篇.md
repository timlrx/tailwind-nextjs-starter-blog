---
title: 2023年前端之React篇
date: 2024-01-15 14:38:56
tags:
  [JavaScript]
---

# 【前端面试题】2023年前端面试真题之React篇

[野生程序猿江辰](https://juejin.cn/user/1257497032133597/posts)

2023-09-1914,984阅读13分钟

专栏： 

前端面试题

> 人的一生，总是难免有浮沉。不会永远如旭日东升，也不会永远痛苦潦倒。反复地一浮一沉，对于一个人来说，正是磨练。因此，浮在上面的，不必骄傲；沉在底下的，更用不着悲观。必须以率直、谦虚的态度，乐观进取、向前迈进。——松下幸之助

大家好，我是江辰，在如今的互联网大环境下，想必大家都或多或少且有感受，浮躁的社会之下，只有不断的保持心性，才能感知不同的收获，互勉。

2023年最新的面试题集锦，时刻做好准备。

本文首发于微信公众号：野生程序猿江辰

欢迎大家点赞，收藏，关注

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/719529acbec1443ca97a787a7eed132d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=400&h=400&s=246792&e=png&b=b7e7ea)

## 文章列表

- [2023年前端面试真题之JS篇](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3MDc1NDcyNw%3D%3D%26mid%3D2247484326%26idx%3D1%26sn%3D0c8466d6a66bc83ae265a56fd75101b8%26chksm%3Dce89b36ef9fe3a7876d021d25f1bc68e6e51388f91c06abd20ab3bcdadcaf471db15f9dc5d2b%26token%3D1282831674%26lang%3Dzh_CN%23rd)
- [2023年前端面试真题之CSS篇](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3MDc1NDcyNw%3D%3D%26mid%3D2247484360%26idx%3D1%26sn%3D5716735dfb91fe094cdaf4c6afbb579b%26chksm%3Dce89b300f9fe3a16a7f85b46921a29fd6bfce2a803b1586c95d94aac0a4a232c3d50f46b1a1e%26token%3D1282831674%26lang%3Dzh_CN%23rd)
- [2023年前端面试真题之HTML篇](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3MDc1NDcyNw%3D%3D%26mid%3D2247484489%26idx%3D1%26sn%3Dde4647b3a1ac4c75fd6c5fe1e9fe3e11%26chksm%3Dce89b481f9fe3d976ec3ad73c234efb55e0def6525fab0c7bcf4c5386667398ac7b7b36f4764%26token%3D1282831674%26lang%3Dzh_CN%23rd)
- [2023年前端面试真题之编码篇](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3MDc1NDcyNw%3D%3D%26mid%3D2247484919%26idx%3D1%26sn%3De78de7cc54b8f907b8406c3eaa4acd8b%26chksm%3Dce89b53ff9fe3c29eccd303df188c0d5f08f0abaf731bfcf404a4eef989c472576edd3ce031a%26token%3D1282831674%26lang%3Dzh_CN%23rd)
- [2023年前端面试真题之Vue篇](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3MDc1NDcyNw%3D%3D%26mid%3D2247484771%26idx%3D1%26sn%3D41f6fb9504e9408ba1e0e6547e8f866f%26chksm%3Dce89b5abf9fe3cbd7a118d48a95beb7e2eaf553327b1063044651188c1289ec185b2f7d33a01%26token%3D1282831674%26lang%3Dzh_CN%23rd)

## 什么时候使用状态管理器？

从项目的整体架构来看，要选择适合项目背景的极速。如果项目背景不适合使用状态管理器，那就没有一定的必要性去使用，比如微信小程序等，可以从以下几个维度来看

### 用户的使用方式复杂

- 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了WebSocket
- View要从多个来源获取数据

### 从组件角度看

- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

## 什么渲染劫持？

什么是渲染劫持，渲染劫持的概念是控制组件从另一个组件输出的能力，当然这个概念一般和react中的高阶组件（HOC）放在一起解释比较有明了。

高阶组件可以在render函数中做非常多的操作，从而控制原组件的渲染输出，只要改变了原组件的渲染，我们都将它称之为一种渲染劫持。

实际上，在高阶组件中，组合渲染和条件渲染都是渲染劫持的一种，通过反向继承，不仅可以实现以上两点，还可以增强由原组件 render 函数产生的 React元素。

实际的操作中通过操作 state、props 都可以实现渲染劫持

## 怎么实现React组件的国际化呢？

依赖于 i18next 的方案，对于庞大的业务项目有个很蛋疼的问题，那就是 json 文件的维护。每次产品迭代都需要增加新的配置，那么这份配置由谁来维护，怎么维护，都会有很多问题，而且如果你的项目要支持几十个国家的语言，那么这几十份文件又怎么维护。

所以现在大厂比较常用的方案是，使用 AST，每次开发完新版本，通过 AST 去扫描所有的代码，找出代码中的中文，以中文为 key，调用智能翻译服务，去帮项目自动生成 json 文件。这样，再也不需要人为去维护 json 文件，一切都依赖工具进行自动化。目前已经有大厂开源，比如滴滴的 di18n，阿里的 kiwi

## React如何进行代码拆分？拆分的原则是什么？

我认为 react 的拆分前提是代码目录设计规范，模块定义规范，代码设计规范，符合程序设计的一般原则，例如高内聚、低耦合等等。

在我们的react项目中：

- 在 api 层面我们单独封装，对外暴露 http 请求的结果。
- 数据层我们使用的 mobx 封装处理异步请求和业务逻辑处理。
- 试图层，尽量使用 mobx 层面的传递过来的数据，修改逻辑。
- 静态类型的资源单独放置
- 公共组件、高阶组件、插件单独放置
- 工具类文件单独放置

## React中在哪捕获错误？

官网例子：

```javascript
javascript
复制代码class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

使用

```xml
xml
复制代码<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

但是错误边界不会捕获：

```csharp
csharp
复制代码try{}catch(err){}
///异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
///服务端渲染
///它自身抛出来的错误（并非它的子组件)
```

## 为什么说React中的props是只读的？

保证react的单向数据流的设计模式，使状态更可预测。如果允许自组件修改，那么一个父组件将状态传递给好几个子组件，这几个子组件随意修改，就完全不可预测，不知道在什么地方修改了状态，所以我们必须像纯函数一样保护 props 不被修改

## 怎样使用Hooks获取服务端数据？

```javascript
javascript
复制代码import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [data, setData] = useState({ hits: [] });
  useEffect(async () => {
    const result = await axios(
      'https://api/url/to/data',
    );
    setData(result.data);
  });
  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}
export default App;
```

## 使用Hooks要遵守哪些原则？

1. 只在最顶层使用 Hook

不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。

1. 只在 React 函数中调用 Hook

不要在普通的 JavaScript 函数中调用 Hook。你可以：

- ✅ 在 React 的函数组件中调用 Hook
- ✅ 在自定义 Hook 中调用其他 Hook

## React Fiber它的目的是解决什么问题？

React15 的 `StackReconciler` 方案由于递归不可中断问题，如果 Diff 时间过长（JS计算时间），会造成页面 UI 的无响应（比如输入框）的表现，`vdom` 无法应用到 `dom` 中。

为了解决这个问题，React16 实现了新的基于 `requestIdleCallback` 的调度器（因为 `requestIdleCallback` 兼容性和稳定性问题，自己实现了 `polyfill`），通过任务优先级的思想，在高优先级任务进入的时候，中断 `reconciler`。

为了适配这种新的调度器，推出了 `FiberReconciler`，将原来的树形结构（vdom）转换成 Fiber 链表的形式（child/sibling/return），整个 Fiber 的遍历是基于循环而非递归，可以随时中断。

更加核心的是，基于 Fiber 的链表结构，对于后续（React 17 lane 架构）的异步渲染和 （可能存在的）worker 计算都有非常好的应用基础

## 说出几点你认为的React最佳实践

[参考官网](https://link.juejin.cn/?target=https%3A%2F%2Freact.dev%2Flearn%2Fthinking-in-react)

## React为什么要搞一个Hooks？

官网回答：

### 动机

Hook 解决了我们五年来编写和维护成千上万的组件时遇到的各种各样看起来不相关的问题。无论你正在学习 React，或每天使用，或者更愿尝试另一个和 React 有相似组件模型的框架，你都可能对这些问题似曾相识。

#### 在组件之间复用状态逻辑很难

React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。如果你使用过 React 一段时间，你也许会熟悉一些解决此类问题的方案，比如 render props 和 高阶组件。但是这类方案需要重新组织你的组件结构，这可能会很麻烦，使你的代码难以理解。如果你在 React DevTools 中观察过 React 应用，你会发现由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。尽管我们可以在 DevTools 过滤掉它们，但这说明了一个更深层次的问题：React 需要为共享状态逻辑提供更好的原生途径。

你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook 使你在无需修改组件结构的情况下复用状态逻辑。 这使得在组件间或社区内共享 Hook 变得更便捷。

#### 复杂组件变得难以理解

我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。例如，组件常常在 componentDidMount 和 componentDidUpdate 中获取数据。但是，同一个 componentDidMount 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 componentWillUnmount 中清除。相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。

在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。这也给测试带来了一定挑战。同时，这也是很多人将 React 与状态管理库结合使用的原因之一。但是，这往往会引入了很多抽象概念，需要你在不同的文件之间来回切换，使得复用变得更加困难。

为了解决这个问题，Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

#### 难以理解的 class

除了代码复用和代码管理会遇到困难外，我们还发现 class 是学习 React 的一大屏障。你必须去理解 JavaScript 中 this 的工作方式，这与其他语言存在巨大差异。还不能忘记绑定事件处理器。没有稳定的语法提案，这些代码非常冗余。大家可以很好地理解 props，state 和自顶向下的数据流，但对 class 却一筹莫展。即便在有经验的 React 开发者之间，对于函数组件与 class 组件的差异也存在分歧，甚至还要区分两种组件的使用场景。

另外，React 已经发布五年了，我们希望它能在下一个五年也与时俱进。就像 Svelte，Angular，Glimmer等其它的库展示的那样，组件预编译会带来巨大的潜力。尤其是在它不局限于模板的时候。最近，我们一直在使用 Prepack 来试验 component folding，也取得了初步成效。但是我们发现使用 class 组件会无意中鼓励开发者使用一些让优化措施无效的方案。class 也给目前的工具带来了一些问题。例如，class 不能很好的压缩，并且会使热重载出现不稳定的情况。因此，我们想提供一个使代码更易于优化的 API。

为了解决这些问题，Hook 使你在非 class 的情况下可以使用更多的 React 特性。 从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术

## 状态管理解决了什么问题？

### 专注 view 层

React 官网是这么简介的。JavaScript library for building user interfaces.专注 view 层 的特点决定了它不是一个全能框架，相比 angular 这种全能框架，React 功能较简单，单一。比如说没有前端路由，没有状态管理，没有一站式开发文档等。

### f(state) = view

react 组件是根据 state （或者 props）去渲染页面的，类似于一个函数，输入 state，输出 view。不过这不是完整意义上的 MDV（Model Driven View），没有完备的 model 层。顺便提一句，感觉现在的组件化和 MDV 在前端开发中正火热，大势所趋...

### state 自上而下流向、Props 只读

从我们最开始写 React 开始，就了解这条特点了。state 流向是自组件从外到内，从上到下的，而且传递下来的 props 是只读的，如果你想更改 props，只能上层组件传下一个包装好的 setState 方法。不像 angular 有 ng-model, vue 有 v-model， 提供了双向绑定的指令。React 中的约定就是这样，你可能觉得这很繁琐，不过 state 的流向却更清晰了，单向数据流在大型 spa 总是要讨好一些的。

这些特点决定了，React 本身是没有提供强大的状态管理功能的，原生大概是三种方式。

## 函数式组件有没有生命周期？

它没有提供生命周期概念，不像 class 组件继承 React.component，可以让你使用生命周期以及特意强调相关概念

## immutable的原理是什么？

使用字典树持久化数据结构，更新时可优化对象生成逻辑，降低成本

## 怎么防止HTML被转义？

```
dangerouslySetInnerHTML
```

## 说说你是如何提高组件的渲染效率的

![render](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49b97f7caf0940b883d8e76bea139bc6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=663&h=333&s=24902&e=png&b=ffffff)

### 是什么

react 基于虚拟 DOM 和高效 Diff算法的完美配合，实现了对 DOM最小粒度的更新，大多数情况下，React对 DOM的渲染效率足以我们的业务日常

复杂业务场景下，性能问题依然会困扰我们。此时需要采取一些措施来提升运行性能，避免不必要的渲染则是业务中常见的优化手段之一

### 如何做

#### 类组件：

- 继承PureComponent
- 使用shouldComponentUpdate优化

#### 函数组件：

- memo模拟PureComponent
- 使用useMemo缓存变量
- 使用useCallback缓存函数
- 循环添加key, key最好用数组项的唯一值，不推荐用 index

### 总结

在实际开发过程中，前端性能问题是一个必须考虑的问题，随着业务的复杂，遇到性能问题的概率也在增高

除此之外，建议将页面进行更小的颗粒化，如果一个过大，当状态发生修改的时候，就会导致整个大组件的渲染，而对组件进行拆分后，粒度变小了，也能够减少子组件不必要的渲染

## 说说对高阶组件（HOC）的理解？

高阶函数（Higher-order function），至少满足下列一个条件的函数

- 接受一个或多个函数作为输入
- 输出一个函数

在React中，高阶组件即接受一个或多个组件作为参数并且返回一个组件，本质也就是一个函数，并不是一个组件

```ini
ini
复制代码const EnhancedComponent = highOrderComponent(WrappedComponent);
```

上述代码中，该函数接受一个组件 `WrappedComponent` 作为参数，返回加工过的新组件 `EnhancedComponent`

高阶组件的这种实现方式，本质上是一个装饰者设计模式

## 说说对React refs 的理解？

Refs 在计算机中称为弹性文件系统（英语：Resilient File System，简称ReFS）

React 中的 Refs提供了一种方式，允许我们访问 DOM节点或在 render方法中创建的 React元素

本质为ReactDOM.render()返回的组件实例，如果是渲染组件则返回的是组件实例，如果渲染dom则返回的是具体的dom节点

class

```scala
scala
复制代码class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref="myref" />;
  }
}
```

hooks

```javascript
javascript
复制代码function App(props) {
  const myref = useRef()
  return (
    <>
      <div ref={myref}></div>
    </>
  )
}
```
