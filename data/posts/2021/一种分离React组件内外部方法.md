---
title: 一种分离React组件内外部方法
date: 2023-01-21 14:38:56
tags:
  [React]
---

# 一种分离React组件内外部方法

介绍一种比较新颖的架构方法，实现对React组件内外部方法的分离；

- 外部方法：提供给组件外部对象调用的方法，在内部永远也不会用到
- 作用：向外提供了操作此组件的接口；分离了外部方法之后使组件的结构更加清晰

## 创建项目

```bash
bash
复制代码npx create-react-app test-new-architecture --template=typescript
rm -rf src/*
mkdir App && touch index.tsx
cd App && touch index.tsx IApp.tsx IKit.tsx
```

### 各个文件作用

- src/index.tsx : 展示App组件的功能
- src/App/IApp.tsx : 原始组件
- src/App/IKit.tsx : 操作原始组件的
- src/App/index.tsx : 包装组件：包装了元素组件(IApp)及其操作工具(IKit)

## 文件内容

### 1. src/App/IApp.tsx

原始组件使用React.forwardRef包装，为其操作提供一个操作接口

```tsx
tsx
复制代码import React from 'react';

type IRef = React.ForwardedRef<HTMLInputElement>;
const IApp = React.forwardRef((props, ref: IRef) => {
    return (
        <div>
            <label htmlFor="ipt">姓名: </label>
            <input ref={ref} type="text" name="ipt" />
        </div>
    )
})

export default IApp;
```

### 2. src/App/index.tsx

包装组件在结构上将原始组件和其操作工具包装在一起；在逻辑上使用ref进行数据通信

```tsx
tsx
复制代码import React from 'react';
import IApp from './IApp';
import IKit from './IKit';


const App = () => {
  const appRef = React.useRef<any>();
  return (
    <>
      <IApp ref={appRef} />
      <IKit appRef={appRef} />
    </>
  );
}

export default App;
```

上面的代码中，将原始组件和工具组件进行逻辑联系的是**appRef对象**

### 3. src/App/IKit.tsx

工具组件本质上是一个函数式组件，之所以做成jsx，在于保持【原始组件和工具在结构上的统一】，即：

```tsx
tsx
复制代码    <>
      <IApp ref={appRef} />
      <IKit appRef={appRef} />
    </>
```

此文件的内容为：

```tsx
tsx
复制代码import React from 'react';

type IProps = {
    appRef: any;
}
const IKit = (props: IProps) => {
    const {appRef} = props;
    // 设置input的值
    const setText = React.useCallback((text: string) => {
        if (appRef && appRef.current) appRef.current.value = text;
    }, [appRef]);
    // 清空input的值
    const clearText = React.useCallback((text: string) => {
        if (appRef && appRef.current) appRef.current.value = '';
    }, [appRef]);
    // 向外暴露接口
    const appKit = React.useRef(
        {
            setText,
            clearText,
        }
    );

    React.useEffect(
        () => {
            // 挂载到全局中
            (window.top as any)['appKit'] = appKit.current;
        }, []
    )

    return null;
}

export default IKit;
```

### 4. src/index.tsx

使用包装组件App的代码如下：

```tsx
tsx
复制代码import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <App />
  </>
);
```

## 测试效果

`yarn start`启动之后，在控制台分别执行`appKit.setText(’hello architecture)`和`appKit.clearText()`，可以看到对应的结果。

