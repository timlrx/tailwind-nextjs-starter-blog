```
export default **connect**(**mapStateToProps**, **mapDispatchToProps**)(ViewIndex);
```


```js
connect(mapStateToProps,mapDispatchTpprops)(组件)
```

### Redux

解决组件和data连接的问题并提供两个读写的api

1. #### state:

   - 每个组件都可以访问到一个全局的state
   - state 存放在 store 仓库中

2. #### dispatch

   - 写入操作

3. #### store

   - 仓库

4. #### action

   - {type, payload}

5. #### connect

   - 对组件进行一次封装
   - 1.从上下文拿到读写接口
   - 2.封装
   - 3.恰当的更新
   - `connect(mapStateToProps,mapDispatchTpprops)(组件)`
   - {state, dispatch}

![截屏2022-01-10 下午4.35.37](https://image.hansking.cn/uPic/202201/%E6%88%AA%E5%B1%8F2022-01-10%20%E4%B8%8B%E5%8D%884.35.37-jI3rwx.png)