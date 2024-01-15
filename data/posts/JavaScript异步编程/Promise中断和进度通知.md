---
title: Promise中断和进度通知
tags: [异步]
categories: [code]
date: 2021-12-26 14:24:00
lastmod: 2021-12-27 17:34:00
---

# Promise中断和进度通知

这段时间闲着没事就去翻翻红宝书，已经看到 Promise 篇了，今天又让我翻到两个陌生的知识点。

因为 Promise 业务场景太多了自我感觉掌握的也比较透彻，之前也跟着 Promise A+ 的规范手写过完整的 Promise，所以这部分内容基本上就大致过一遍，直到看见关于 Promise 的取消以及监听进度...🤔

只能说以后要是我当上面试官一定让候选人来谈谈这两个点，然后顺势安利我这篇文章🤣

## 取消功能

众所周知。Promise的状态是不可逆的，也就是只能从 pending -> fulfilled 或 pending -> rejected。

```js
const sendButton = document.querySelector("#send");
const cancelButton = document.querySelector("#cancel");

class CancelPromise {

 // delay: 取消功能期限  request：获取数据请求(必须返回 promise)
  constructor(delay, request) {
    this.req = request;
    this.delay = delay;
    this.timer = null;
  }

  delayResolve() {
    return new Promise((resolve, reject) => {
      console.log("prepare request");
      this.timer = setTimeout(() => {
        console.log("send request");
        this.timer = null;
        this.req().then(
          (res) => resolve(res),
          (err) => reject(err)
        );
      }, this.delay);
    });
  }

  cancelResolve() {
    console.log("cancel promise");
    this.timer && clearTimeout(this.timer);
  }
}

// 模拟网络请求
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("this is data");
    }, 2000);
  });
}

const cp = new CancelPromise(1000, getData);

sendButton.addEventListener("click", () =>
  cp.delayResolve().then((res) => {
    console.log("拿到数据：", res);
  })
);
cancelButton.addEventListener("click", () => cp.cancelResolve());

```

## 进度通知功能

这个需求就比较明确了，我们直接来看红宝书的实现吧，核心思想就是扩展之前的 Promise，为其添加 `notify` 方法作为监听，并且在 executor 中增加额外的参数来让用户进行通知操作：

```js
class TrackablePromise extends Promise {
  constructor(executor) {
    const notifyHandlers = [];
    super((resolve, reject) => {
      return executor(resolve, reject, (status) => {
        notifyHandlers.map((handler) => handler(status));
      });
    });
    this.notifyHandlers = notifyHandlers;
  }
  notify(notifyHandler) {
    this.notifyHandlers.push(notifyHandler);
    return this;
  }
}
let p = new TrackablePromise((resolve, reject, notify) => {
  function countdown(x) {
    if (x > 0) {
      notify(`${20 * x}% remaining`);
      setTimeout(() => countdown(x - 1), 1000);
    } else {
      resolve();
    }
  }
  countdown(5);
});

p.notify((x) => setTimeout(console.log, 0, "progress:", x));
p.then(() => setTimeout(console.log, 0, "completed"));

```

就是说，在接口调用过程中通过触发notify即可获取接口进度更新通知。

5. async/await 链式调用

   - ```js
     class ApiClient {
         constructor() {
             this.value = null;
         }
     
         async firstMethod() {
             this.value = await fetch('/first-url').then(r => r.json());
             return this;
         }
     
         async secondMethod() {
             this.value = await fetch('/second-url').then(r => r.json());
             return this;
         }
     }
     
     // 使用方式
     const client = new ApiClient();
     const result = await client.firstMethod().then(c => c.secondMethod());
     ```

   - async setTimeout => 异步处理之后设置的定时器，会在异步任务之后开始定时。

6. 结合`async/await`和事件循环

   - 使用`async/await`可以更好地控制事件循环，像处理DOM事件或定时器等场合。

   -  ```js
      // 异步定时器函数
      async function asyncSetTimeout(fn, ms) {
          await new Promise(resolve => setTimeout(resolve, ms));
          fn();
      }
      
      // 示例
      asyncSetTimeout(() => console.log('Timeout after 2 seconds'), 2000);
      ```

7. 使用`sync/await`简化错误处理

   - 错误处理是异步编程中的重要部分。通过`async/await`，可以将错误处理的逻辑更自然地集成到同步代码中。

     ```js
     async function asyncOperation() {
         try {
             const result = await mightFailOperation();
             return result;
         } catch (error) {
             handleAsyncError(error);
         }
     }
     
     async function mightFailOperation() {
         // 有可能失败的异步操作
     }
     
     function handleAsyncError(error) {
         // 错误处理逻辑
     }
     ```

     