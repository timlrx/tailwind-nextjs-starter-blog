---
title: ts项目中引入js的 npm包
date: 2024-01-20 11:49:57
tags:
  [TS]
---

#### 1 可以选择安装其npm包的[typescript](https://so.csdn.net/so/search?q=typescript&spm=1001.2101.3001.7020)版本  npm install @types/包名 --save  一般都是这样命名

如果没有安装成功 那说明他没有ts版本， 就只能另想办法

#### 2 如果是自己写的js库 可以单独编写.d.ts文件

#### 3 如果是npm包的话 可以引入微软的自动生成工具 **[dts-gen](https://github.com/Microsoft/dts-gen)**

```javascript
// 使用方法  
// 首先安装下他的包
npm install -g dts-gen
// 假设我们要给一个名为 ceshi 的npm包自动生成声明文件 
    // 没有安装ceshi包的需要先安装 npm install ceshi ....
    // 然后就是dts-gen的生成命令
    dts-gen -m ceshi
    // 然后就会在根目录生成一个ceshi.d.ts声明文件
```

部分npm包 会有 window is not defined 的错误  应该是此npm包 中调用的window对象无法在ts语法中直接使用

【这里哪位有解决办法...求支招】

如果是三方包 ... 那就没什么好办法

如果是自己写的库 可以将window替换为<any>window (这个没有测试过)

 

#### 下面说下我目前在项目中使用的方法

1 确认tsconfig.json中的 noImplicitAny 配置为 false

![](http://image.hansking.cn/picgo/2019092416571230.png)

话说 我使用了装饰器 

红色为一种方法， 绿色为一种方法 测试都是可用的

编译的时候没有报警告或错误 但是vscode有提示

![](http://image.hansking.cn/picgo/20190924165834262.png)

就是这红色的小波浪~

话说

如果没有用装饰器 而仅仅是引入ts的话 应该是没问题的
