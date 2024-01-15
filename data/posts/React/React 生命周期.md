## 旧版生命周期

## ![截屏2021-07-10 14.49.29](https://image.hansking.cn/uPic/202107/DguP2t.png)

![截屏2021-08-05 15.46.41](https://image.hansking.cn/uPic/202108/TTWPkE.png)++++

1. 初始化阶段:由ReactDOM. render()触发---初次渲染

   1. constructor( )
   2. componentWillMount( )
   3. render( )
   4. componentDidMount() =====> 常用

     - 一般在这个钩子中做一些初始化的事，例如:开启定时器、发送网络请求.

2. 更新阶段:由组件内部this. setSate()或父组件render触发

   1. shouldComponentUpdate( )
   2. componentWillUpdate()
   3. render() =====> 必须使用的一一个
   4. componentDidUpdate( )

3. 卸载组件:由ReactDOM. unmountComponentAtNode( )触发

   1. componentWillUnmount() =====> 常用

   	- 一般在这个钩子中做一 些收尾的事，例如:关闭定时器、取消订阅消息

   

## 新版生命周期

![截屏2021-08-05 15.43.21](https://image.hansking.cn/uPic/202108/OoXVTd.png)

1. 初始化阶段:由ReactDOM. render()触发---初次渲染
   1. constructor( )
   2. getDerivedStateFromProps
   3. render( )
   4. componentDidMount() =====> 常用
     - 一般在这个钩子中做一 -些初始化的事，例如:开启定时器、发送网络请求、订阅消息
   
  2. 更新阶段:由组件内部this. setSate( )或父组件重新render触发

      1. getDerivedStateFromProps
        2. shouldComponentUpdate( )
        3. render( )
        4. getSnapshotBeforeUpdate
        5. componentDidUpdate( )」

3. 卸载组件:由ReactDOM. unmountComponentAtNode( )触发

     1. componentWillUnmount() =====> 常用
        - 一般在这个钩子中做一 些收尾的事，例如:关闭定时器、取消订阅消息



- #### [2.6.5. 重要的勾子](http://notes.xiyanit.cn/#/react/React面向组件编程?id=_265-重要的勾子)

  - 1.render：初始化渲染或更新渲染调用
  - 2.componentDidMount：开启监听, 发送ajax请求
  - 3.componentWillUnmount：做一些收尾工作, 如: 清理定时器

- #### [2.6.6. 即将废弃的勾子](http://notes.xiyanit.cn/#/react/React面向组件编程?id=_266-即将废弃的勾子)

  - 1.componentWillMount
  - 2.componentWillReceiveProps
  - 3.componentWillUpdate

