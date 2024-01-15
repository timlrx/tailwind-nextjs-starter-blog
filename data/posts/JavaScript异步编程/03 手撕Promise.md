---
title: 03 手撕Promise
tags: [异步]
categories: [code]
date: 2021-12-28 15:43:00
---

# 03 ⼿撕Promise之从0开始实现完整的Promise对象

## Promise对象的基本结构定义

根据Promise对象的特点分析，Promise存在状态属性和Promise的值的属性。初始化Promise时需要传⼊⼀个回调函数来进⾏对象的基本设置，回调函数具备两个参数resolve和reject，两个参数均为函数。所以初始化代码如下:

```js
function MyPromise(fn) {
    //promise的初始状态为pending，可变成fulfilled或rejected其中之⼀
    this.promiseState = 'pending'
    this.promiseValue = undefined
    varresolve = function() {

    }
    varreject = function() {
        
    }
    if (fn) {
        fn(resolve, reject)
    } else {
        throw ('Init Error,Please use a function to init MyPromise!')
    }
}

```

根据对象特性，初始化Promise时的回调函数是同步执⾏的，所以此时的fn直接调⽤即可。在调⽤resolve和reject时，需要将Promise对象的状态设置为对应的fulfilled和rejected，其中需要传⼊Promise当前的结果，所以此时应该将resolve和reject修改为如下结构。

```js
//保存上下⽂对象
var _this = this
varresolve = function(value) {
    if (_this.promiseState == 'pending') {
        _this.promiseState = 'fulfilled'
        _this.promiseValue = value
    }
}
varreject = function(value) {
    if (_this.promiseState == 'pending') {
        _this.promiseState = 'rejected'
        _this.promiseValue = value
    }
}

```

定义完内部结构之后需要思考Promise在状态变更为fulfilled以及状态变更为rejected时对应的then和catch会相应执⾏，所以需要将对象的两个函数初始化：

```js
MyPromise.prototype.then=function(callback){
  
}
MyPromise.prototype.catch=function(callback){
  
}
```

## 实现then的调⽤

