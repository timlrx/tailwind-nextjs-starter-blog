---
title: 函数式组件IconFont
date: 2024-01-15 14:38:56
tags:
  [CSS,🙅🏻‍♀️bu造轮子]
---

# 函数式组件 -- IconFont

封装了一个iconFont的组件，方便之后的工作中进行使用；此组件提供了大量的接口，可以较为自由的根据业务场景进行配置。

## 1. 定义组件接口

接口可以大致分成几类：svg名称，样式，点击的回调，状态，状态颜色

```typescript
typescript
复制代码interface IconfontProps {
  icon: string; // svg::use的xlinkHref属性值
  style?: CSSProperties; // 覆盖样式
  onClick?: (...args: any) => void; // 点击回调
  noHover?: boolean;
  noActive?: boolean;
  disabled?: boolean;
  selected?: boolean; // 选中状态
  backgroundColor?: string;
  color?: string;
  hoveredColor?: string;
  hoveredBgColor?: string;
  activatedBgColor?: string;
}
```

## 2. 定义内部组件接口

内部接口可以大致分成几类：状态，状态颜色

```typescript
typescript
复制代码interface IconfontProps {
  noHover?: boolean; // 没有悬浮
  noActive?: boolean; // 没有激活
  disabled?: boolean; // 不可点击
  backgroundColor?: string; // 背景颜色
  color?: string; // 字体颜色
  hoveredBgColor?: string; // 悬浮背景变色
  activatedBgColor?: string; // 鼠标按下变色
  hoveredColor?: string; // 悬浮字体变色
}
```

## 3. 内部组件

使用`styled-components`这个js库中的`styled, css`实现一个`css-in-js`类型的内部组件`Icon`

```typescript
typescript
复制代码const Icon = styled.svg<IIntersectedProps>`
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  fill: ${(props: IIntersectedProps) => props.color};
  background-color: ${(props: IIntersectedProps) => props.backgroundColor};
  overflow: hidden;
  font-size: 16px;
  &:hover {
    background-color: ${(props: IIntersectedProps) =>
      props.noHover ? undefined : props.hoveredBgColor};
    fill: ${(props) => (props.noHover ? undefined : props.hoveredColor)};
  }
  &:active {
    background-color: ${(props: IIntersectedProps) =>
      props.noActive ? undefined : props.activatedBgColor};
    fill: ${(props: IIntersectedProps) => (props.noActive ? undefined : props.hoveredColor)};
  }
  ${(props: IIntersectedProps) =>
    props.disabled &&
    css`
      filter: grayscale(1) opacity(0.5);
    `};
`;
```

## 4. 外部组件

外部组件的基本结构就是：svg:use

```typescript
typescript
复制代码const IconFont = (props: IconfontProps) => {
  const {
    icon,
    style,
    backgroundColor = 'rgba(255,255,255,0.1)',
    color = 'grey',
    hoveredColor = 'blue',
    hoveredBgColor ='#fff',
    activatedBgColor = true,
    onClick = ()=>{},
    noHover = true,
    noActive = true,
    disabled = false,
  } = props;
  return (
    <Icon
      style={style}
      backgroundColor={backgroundColor}
      color={color}
      hoveredColor={hoveredColor}
      hoveredBgColor={hoveredBgColor}
      activatedBgColor={activatedBgColor}
      onClick={onClick}
      noHover={noHover}
      noActive={noActive}
      disabled={disabled}
    >
      <use xlinkHref={`#${icon}`} />
    </Icon>
  );
};
```

## 5. 全部代码

自定义组件文件的所有代码如下：

```typescript
typescript
复制代码// IconFont.tsx
import React, { CSSProperties } from "react";
import styled, { css } from "styled-components";
import "@assets/icons/iconfont";

interface IconfontProps {
  icon: string; // svg::use的xlinkHref属性值
  style?: CSSProperties; // 覆盖样式
  onClick?: (...args: any) => void; // 点击回调
  noHover?: boolean;
  noActive?: boolean;
  disabled?: boolean;
  selected?: boolean; // 选中状态
  backgroundColor?: string;
  color?: string;
  hoveredColor?: string;
  hoveredBgColor?: string;
  activatedBgColor?: string;
}

interface IIntersectedProps {
  noHover?: boolean; // 没有悬浮
  noActive?: boolean; // 没有激活
  disabled?: boolean; // 不可点击
  backgroundColor?: string; // 背景颜色
  color?: string; // 字体颜色
  hoveredBgColor?: string; // 悬浮背景变色
  activatedBgColor?: string; // 鼠标按下变色
  hoveredColor?: string; // 悬浮字体变色
}

const Icon = styled.svg<IIntersectedProps>`
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  fill: ${(props: IIntersectedProps) => props.color};
  background-color: ${(props: IIntersectedProps) => props.backgroundColor};
  overflow: hidden;
  font-size: 16px;
  &:hover {
    background-color: ${(props: IIntersectedProps) =>
      props.noHover ? undefined : props.hoveredBgColor};
    fill: ${(props) => (props.noHover ? undefined : props.hoveredColor)};
  }
  &:active {
    background-color: ${(props: IIntersectedProps) =>
      props.noActive ? undefined : props.activatedBgColor};
    fill: ${(props: IIntersectedProps) => (props.noActive ? undefined : props.hoveredColor)};
  }
  ${(props: IIntersectedProps) =>
    props.disabled &&
    css`
      filter: grayscale(1) opacity(0.5);
    `};
`;

export const IconFont = (props: IconfontProps) => {
  const {
    icon,
    style,
    backgroundColor = 'rgba(255,255,255,0.1)',
    color = 'grey',
    hoveredColor = 'blue',
    hoveredBgColor ='#fff',
    activatedBgColor = true,
    onClick = ()=>{},
    noHover = true,
    noActive = true,
    disabled = false,
  } = props;
  return (
    <Icon
      style={style}
      backgroundColor={backgroundColor}
      color={color}
      hoveredColor={hoveredColor}
      hoveredBgColor={hoveredBgColor}
      activatedBgColor={activatedBgColor}
      onClick={onClick}
      noHover={noHover}
      noActive={noActive}
      disabled={disabled}
    >
      <use xlinkHref={`#${icon}`} />
    </Icon>
  );
};
```
