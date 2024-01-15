# 鸿蒙原生开发

https://mayw-teaching.feishu.cn/docx/H3qlddyh6oXEpUxBqp9cjCwPnic

1. 状态管理 **State Prop Link**

   - @State：@State装饰的变量拥有其所属组件的状态，可以作为其子组件单向和双向同步的数据源。当其数值改变时，会引起相关组件的渲染刷新。

   - @Prop：@Prop装饰的变量可以和父组件建立单向同步关系，@Prop装饰的变量是可变的，但修改不会同步回父组件。

   - @Link：@Link装饰的变量和父组件构建双向同步关系的状态变量，父组件会接受来自@Link装饰的变量的修改的同步，父组件的更新也会同步给@Link装饰的变量。

2. 高级用法
   - @Provide/@Consume：@Provide/@Consume装饰的变量用于跨组件层级（多层组件）同步状态变量，可以不需要通过参数命名机制传递，通过alias（别名）或者属性名绑定。
   - @Observed：@Observed装饰class，需要观察多层嵌套场景的class需要被@Observed装饰。单独使用@Observed没有任何作用，需要和@ObjectLink、@Prop连用。
   - @ObjectLink：@ObjectLink装饰的变量接收@Observed装饰的class的实例，应用于观察多层嵌套场景，和父组件的数据源构建双向同步。

3. 装饰器：
   - stract 自定义组件

4. 过渡动画 sharedTransition

   ```Ts
   Image(this.foodItem.image)
     .sharedTransition(JSON.stringify(this.foodItem.id), {
       // 此处是过渡动画 sharedTransition ，用id标注。
       duration: 400,
       delay: 100,
       curve:Curve.Ease
     })
   ```

5. 组件

   ArcTS API 文档 https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/ts-container-scroll-0000001427902480-V3

   - Scroll 可滚动的子元素
   - Navigator
   - Tabs
     - TabContent
     - .tabBar()
   - List
     - ListItem
   - Swiper
     - 1,2
   - 





【掘金】初识ArkTS语言 https://juejin.cn/post/7304844128734412838?searchId=2023122216291590B559E58653A7745A5D#heading-16



【鸿蒙应用开发指南】https://harmonyos-next.github.io/interview-handbook-project/