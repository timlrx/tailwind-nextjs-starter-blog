---
title: 函数式组件iframe封装
date: 2023-01-23 14:38:56
tags:
  [React]
---

# 函数式组件 -- iframe封装

## 1. 故事背景

随着前端项目业务复杂程度的不断提高，需要将一些第三方的功能模块接入系统中；因此，在实际开发的时候，常常使用iframe将这些第三方模块集成进来。现封装一个Iframe函数式组件，以实现后续的复用。

## 2. 组件的外部参数

创建iframe的父级组件传入最基本的外部参数

- path: 目标源地址
- name: iframe的名称
- style: iframe的样式,默认值为宽高百分百，无边框 接口如下所示：

```typescript
typescript
复制代码export interface IframeProps {
  path: string; // iframe源地址
  name: string; // iframe标签名
  style?: CSSProperties; // 提供控制样式的接口
}
```

## 3. 组件的内部参数

所谓内部参数就是除去了【修改之后需要引起组件刷新】的组件内部维护的数据

- loaderTimer: 定时器词柄，在组件mount之后1秒之后启动,含义为如果iframe在1s中加载完毕就不显示加载动画
- iframeRef: 控制iframe标签的词柄

```typescript
typescript
复制代码  loaderTimer: NodeJS.Timeout;
  iframeRef: React.RefObject<HTMLIFrameElement>;
  constructor(props: IframeProps) {
    super(props);
    this.iframeRef = createRef(); // iframe元素操作符
    // 如果在实例化之后1s显示，意思就是超过这个时间再显示正在加载中
    this.loaderTimer = setTimeout(() => {
      this.setState({
        loading: true,
      });
    }, 1000);
    ...
  }
```

## 4. 组件的状态

状态也是内部参数，但是状态的值发生变化之后会引起组件刷新

- url: 表示格式化之后的iframe源地址，处理props.path得到
- loading: 表示加载动画的状态，值为true的时候显示加载动画

接口如下：

```typescript
typescript
复制代码export interface IframeState {
  url: string; // 格式化之后的目标源地址
  loading: boolean; // 加载状态
}
```

构造函数中初始化其值：

```typescript
typescript
复制代码    this.state = {
      url: this.formatUrl(),
      loading: false,
    };
```

## 5. 组件上的方法

### 5.1 formatUrl 格式化iframe src的方法

```typescript
typescript
复制代码  // 格式化源的地址
  formatUrl = () => {
    // do something with path
    return this.props.path;
  };
```

### 5.2 clearTimer 清除加载动画定时器的方法

```typescript
typescript
复制代码  // 清除定时器
  clearTimer = () => {
    clearTimeout(this.loaderTimer);
    this.setState({
      loading: false,
    });
  }
```

### 5.3 组件加载和卸载生命周期函数

```typescript
typescript
复制代码  // 使用window对象的 message事件实现多个窗口之间的通信
  componentDidMount() {
    window.addEventListener("message", this.handleReportEvent);
  }

  // 记得移除监听事件和定时器
  componentWillUnmount() {
    window.removeEventListener("message", this.handleReportEvent);
    this.clearTimer();
  }
```

### 5.4 processMessage 处理iframe窗口之间通信的事件函数

```typescript
typescript
复制代码  processMessage = (e) => {
    if(!e?.data) return;
    const {topic="", data={}} = e.data;
    
    if (topic === "Special_Task1") {
      // do something with data
      console.log(topic, data);
    } else if (topic === "Pass_to_Child") {
      const iframe = this.iframeRef.current;
      if (iframe) iframe.contentWindow.postMessage(
        {
          topic: "Msg_From_Parent",
          data,
        },
        "*"
      );
    }
  };
```

### 5.5 render 组件的渲染函数

```typescript
typescript
复制代码  render() {
    const { loading, url } = this.state;
    const { name, style={
      width: '100%',
      height: '100%',
      border: 'none',
    } } = this.props;
    return (
      <div className="container">
        <Spin spinning={loading}>
          <iframe
            title={"iframe"}
            name={name} // iframe都应该有一个名字
            ref={this.iframeRef}
            src={decodeURIComponent(url)} // 这里记得需要使用一个decodeURIComponent
            style={style}
            onLoad={this.clearTimer} // iframe加载完毕之后将加载动画关掉
          />
        </Spin>
      </div>
    );
  }
```

## 6. Iframe组件

```typescript
typescript
复制代码import React, { CSSProperties, createRef } from "react";
// iframe刹时间加载的时候需要有加载动画
import { Spin } from "antd";
import "./iframe.less";
import { CSSProp } from "styled-components";

export interface IframeProps {
  path: string; // iframe源地址
  name: string; // iframe标签名
  style?: CSSProperties; // 提供控制样式的接口
}

export interface IframeState {
  url: string; // 格式化之后的目标源地址
  loading: boolean; // 加载状态
}

class Iframe extends React.PureComponent<IframeProps, IframeState> {
  loaderTimer: NodeJS.Timeout;
  iframeRef: React.RefObject<HTMLIFrameElement>;
  constructor(props: IframeProps) {
    super(props);
    this.iframeRef = createRef(); // iframe元素操作符
    this.state = {
      url: this.formatUrl(),
      loading: false,
    };
    // 如果在实例化之后1s显示，意思就是超过这个时间再显示正在加载中
    this.loaderTimer = setTimeout(() => {
      this.setState({
        loading: true,
      });
    }, 1000);
  }

  // 格式化源的地址
  formatUrl = () => {
    // do something with path
    return this.props.path;
  };

  // 清除定时器
  clearTimer = () => {
    clearTimeout(this.loaderTimer);
    this.setState({
      loading: false,
    });
  }

  // 使用window对象的 message事件实现多个窗口之间的通信
  componentDidMount() {
    window.addEventListener("message", this.processMessage);
  }

  // 记得移除监听事件和定时器
  componentWillUnmount() {
    window.removeEventListener("message", this.processMessage);
    this.clearTimer();
  }

  // message事件处理回调函数
  processMessage = (e) => {
    if(!e?.data) return;
    const {topic="", data={}} = e.data;
    
    if (topic === "Special_Task1") {
      // do something with data
      console.log(topic, data);
    } else if (topic === "Pass_to_Child") {
      const iframe = this.iframeRef.current;
      if (iframe) iframe.contentWindow.postMessage(
        {
          topic: "Msg_From_Parent",
          data,
        },
        "*"
      );
    }
  };

  render() {
    const { loading, url } = this.state;
    const { name, style={
      width: '100%',
      height: '100%',
      border: 'none',
    } } = this.props;
    return (
      <div className="container">
        <Spin spinning={loading}>
          <iframe
            title={"iframe"}
            name={name} // iframe都应该有一个名字
            ref={this.iframeRef}
            src={decodeURIComponent(url)} // 这里记得需要使用一个decodeURIComponent
            style={style}
            onLoad={this.clearTimer} // iframe加载完毕之后将加载动画关掉
          />
        </Spin>
      </div>
    );
  }
}

export default Iframe;
```
