---
title: 函数式组件ColorPicker
date: 2023-01-15 14:38:56
tags:
  [React]
---

# 函数式组件 -- ColorPicker (但具有历史记录功能)

封装了一个用来选择颜色的react函数式组件ColorPicker，使用自定义钩子函数，利用useState和localStorage实现记录选中颜色历史功能。

## 1. ColorPicker的外部依赖

ColorPicker组件使用`antd的Popover`组件，`react-color的SketchPicker`组件，以及`styled-components的styled`实现的.

```typescript
typescript
复制代码import React from 'react';
import styled from 'styled-components';
import { SketchPicker, ColorChangeHandler, ColorResult } from 'react-color';
import { Popover } from 'antd';
```

## 2. 自定义钩子函数实现颜色历史记录功能

自定义钩子函数useLocalStorageColor的本质是对useState的加强；在记录颜色的同时将最新选中的颜色值更新到持久化存储器中去。难点在于将数据处理成第三方组件能够方便使用的格式。

```typescript
typescript
复制代码function useLocalStorageColor(token: string, init: Array<string>, split: string) {
  // 初始化颜色序列
  const originPreset: any = init;
  // 从localStorage尝试获取颜色值
  const fromStorage = (localStorage.getItem(token) || '').split(split);
  // 容器
  const emptyBlock: any[] = [];
  // 暂存storage中的值
  const [colorArr, setColorArr] = React.useState(fromStorage);
  // 长度
  const len = colorArr.length;
  // 剩余位置
  const blank = originPreset.length - len;

  // 如果还有剩余的位置
  if (blank) {
    // 将剩余的位置都使用空白色填充
    for (let i = 0; i < blank; i++) {
      emptyBlock.push({ color: `#CCCCC${i}`, title: 'sketch-picker-preset' });
    }
  }

  // 更新拼接颜色数组
  const setColor = React.useCallback((newData: string) => {
    // token是话题名称
    const oldColor = (localStorage.getItem(token) || '').split(split);
    // 查询当前选中颜色是否已经记录在历史中了
    const index = oldColor.findIndex((v) => v === newData);
    // 如果已经存在了则需要从历史中清除
    if (index !== -1) oldColor.splice(index, 1);
    // 更新之后的颜色序列
    const updateData = [newData, ...oldColor.slice(0, originPreset.length - 1)];
    // 将新的颜色历史存入localStorage中
    localStorage.setItem(token, updateData.join(split));
    // 更新颜色值
    setColorArr(updateData);
  }, []);

  // 自定义钩子函数会将预置颜色，本地颜色和空白格拼接起来返回
  const color = originPreset.concat(colorArr).concat(emptyBlock);
  // 返回加强之后的useState
  return [color, setColor];
}
```

## 3. ColorPicker组件的外部接口

```typescript
typescript
复制代码interface IProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id?: string;
  color: string;
  disabled?: boolean;
  onChange?: ColorChangeHandler;
}
```

## 4. 内部包装组件C

使用styled-components的styled函数构造一个自定义样式的包裹div，这个过程可以使用less+className代替； 使用css-in-js的方案原因在于：传参方便！

```typescript
typescript
复制代码const C = styled.div<{ disabled: boolean }>`
  line-height: 1;
  position: relative;
  height: 20px;
  cursor: ${(props) => (props.disabled ? 'no-drop' : 'cursor')};
  .disable-pointer-events {
    pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  }
  .color {
    display: inline-block;
    width: 32px;
    height: 20px;
    border: ${(props) => (props.disabled ? '1px dashed #c4c4c4' : '1px solid #333')};
    border-radius: 2px;
    padding: 2px;
    .color-show {
      height: 100%;
    }
  }
`;
```

## 5. SketchPicker的change回调函数

SketchPicker组件上提供了两种回调`onChange`和`onChangeComplete`。前者是选择的颜色变化之后的回调，而后者是做了节流的颜色变化之后的回调。之所以这样做是为了将耗时操作和频繁操作分开以提高性能。

```typescript
typescript
复制代码  const handleChange = (data: ColorResult, e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      // 执行传入的回调函数
      onChange(data, e);
    }
  };

  // 确认选中颜色发生变化之后的回调函数（在此处的功能是将当前选中的颜色值写入历史中去）
  const handleChangeComplete = (data: ColorResult) => {
    // 将选中的颜色写入localStorage中去
    localStorage.setItem('currentColor', data.hex);
    // 尝试性获取选中颜色对应的div
    const target = document.querySelector(`div[title="${data.hex.toUpperCase()}"]`) as HTMLElement;
    if (target) {
      // 如果获取到对应的dom，那就给这个dom加上边框
      target.style.boxShadow = '0px 0px 0px 2px #2A54D1';
    }
  };
```

## 6. SketchPicker的预置颜色

SketchPicker提供了名为presetColors的接口，接受一个string[]类型的变量，显示数组中的颜色；这个是颜色历史记录功能的支柱！

```typescript
typescript
复制代码    <SketchPicker
        presetColors={presetColors} // 预置颜色值
        color={color} // 受控组件
        onChange={handleChange} // 回调1
        onChangeComplete={handleChangeComplete} // 回调2
    />
```

## 7. Popover设置

自定义antd组件Popover的`content trigger destroyTooltipOnHide onOpenChange`属性，使之符合期望的效果

```typescript
typescript
复制代码    <Popover
        content={
        // 弹出的组件为react-color中的SketchPicker
        <SketchPicker
            presetColors={presetColors} // 预置颜色值
            color={color} // 受控组件
            onChange={handleChange} // 回调1
            onChangeComplete={handleChangeComplete} // 回调2
        />
        }
        trigger="click" // Popover组件渲染content的时机
        destroyTooltipOnHide // 隐藏时是否销毁
        onOpenChange={() => {
        // 打开状态发生变化的时候的回调函数
        const currentColor = localStorage.getItem('currentColor');
        if (currentColor) setPresetColors(currentColor); // 向内存中存储当前颜色值
        }}
    >
        {/* 背景或者外框 */}
        <div className="color">
        <div className="color-show" style={{ backgroundColor: disabled ? 'transparent' : color }} />
        </div>
    </Popover>
```

## 8. 完整的组件 ColorPicker.tsx

```typescript
typescript
复制代码import React from 'react';
import styled from 'styled-components';
import { SketchPicker, ColorChangeHandler, ColorResult } from 'react-color';
import { Popover } from 'antd';

// 自定义的钩子函数
function useLocalStorageColor(token: string, init: Array<string>, split: string) {
  // 初始化颜色序列
  const originPreset: any = init;
  // 从localStorage尝试获取颜色值
  const fromStorage = (localStorage.getItem(token) || '').split(split);
  // 容器
  const emptyBlock: any[] = [];
  // 暂存storage中的值
  const [colorArr, setColorArr] = React.useState(fromStorage);
  // 长度
  const len = colorArr.length;
  // 剩余位置
  const blank = originPreset.length - len;

  // 如果还有剩余的位置
  if (blank) {
    // 将剩余的位置都使用空白色填充
    for (let i = 0; i < blank; i++) {
      emptyBlock.push({ color: `#CCCCC${i}`, title: 'sketch-picker-preset' });
    }
  }

  // 更新拼接颜色数组
  const setColor = React.useCallback((newData: string) => {
    // token是话题名称
    const oldColor = (localStorage.getItem(token) || '').split(split);
    // 查询当前选中颜色是否已经记录在历史中了
    const index = oldColor.findIndex((v) => v === newData);
    // 如果已经存在了则需要从历史中清除
    if (index !== -1) oldColor.splice(index, 1);
    // 更新之后的颜色序列
    const updateData = [newData, ...oldColor.slice(0, originPreset.length - 1)];
    // 将新的颜色历史存入localStorage中
    localStorage.setItem(token, updateData.join(split));
    // 更新颜色值
    setColorArr(updateData);
  }, []);

  // 自定义钩子函数会将预置颜色，本地颜色和空白格拼接起来返回
  const color = originPreset.concat(colorArr).concat(emptyBlock);
  // 返回加强之后的useState
  return [color, setColor];
}

interface IProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id?: string;
  color: string;
  disabled?: boolean;
  onChange?: ColorChangeHandler;
}

const C = styled.div<{ disabled: boolean }>`
  line-height: 1;
  position: relative;
  height: 20px;
  cursor: ${(props) => (props.disabled ? 'no-drop' : 'cursor')};
  .disable-pointer-events {
    pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  }
  .color {
    display: inline-block;
    width: 32px;
    height: 20px;
    border: ${(props) => (props.disabled ? '1px dashed #c4c4c4' : '1px solid #333')};
    border-radius: 2px;
    padding: 2px;
    .color-show {
      height: 100%;
    }
  }
`;

const XColorPicker = ({ id, color, onChange, disabled, ...props }: IProps): JSX.Element => {
  // 选中颜色发生变化之后的回调函数（一般由调用者传入）
  const handleChange = (data: ColorResult, e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      // 执行传入的回调函数
      onChange(data, e);
    }
  };

  // 确认选中颜色发生变化之后的回调函数（在此处的功能是将当前选中的颜色值写入历史中去）
  const handleChangeComplete = (data: ColorResult) => {
    // 将选中的颜色写入localStorage中去
    localStorage.setItem('currentColor', data.hex);
    // 尝试性获取选中颜色对应的div
    const target = document.querySelector(`div[title="${data.hex.toUpperCase()}"]`) as HTMLElement;
    if (target) {
      // 如果获取到对应的dom，那就给这个dom加上边框
      target.style.boxShadow = '0px 0px 0px 2px #2A54D1';
    }
  };

  // 使用自定义钩子函数初始化颜色历史值
  const [presetColors, setPresetColors] = useLocalStorageColor('colorHistory', Array(8).fill(''), '&');

  // 返回由div包裹的Popover组件
  return (
    <C
      id={id} // 使用document查找此dom的依据
      disabled={disabled || false} // 状态，和样式相关
      {...props} // 其它属性
    >
      {/* 总体的结构是div>span>Popover */}
      <span className="disable-pointer-events">
        <Popover
          content={
            // 弹出的组件为react-color中的SketchPicker
            <SketchPicker
              presetColors={presetColors} // 预置颜色值
              color={color} // 受控组件
              onChange={handleChange} // 回调1
              onChangeComplete={handleChangeComplete} // 回调2
            />
          }
          trigger="click" // Popover组件渲染content的时机
          destroyTooltipOnHide // 隐藏时是否销毁
          onOpenChange={() => {
            // 打开状态发生变化的时候的回调函数
            const currentColor = localStorage.getItem('currentColor');
            if (currentColor) setPresetColors(currentColor); // 向内存中存储当前颜色值
          }}
        >
          {/* 背景或者外框 */}
          <div className="color">
            <div className="color-show" style={{ backgroundColor: disabled ? 'transparent' : color }} />
          </div>
        </Popover>
      </span>
    </C>
  );
};

export default XColorPicker;
```
