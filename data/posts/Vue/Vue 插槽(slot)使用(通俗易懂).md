# Vue 插槽(slot)使用(通俗易懂)

因为在2.6.0中，**具名插槽** 和 **作用域插槽** 引入了一个新的统一的语法 (即`v-slot` 指令)。它取代了 `slot` 和 `slot-scope`，并且现在网上都说的是一些老版本的内容，官方文档不太容易理解，所以就整理了一篇有关于插槽(slot)使用的文章

------

Slot 通俗的理解就是“占坑”，在组件模板中占好了位置，当使用该组件标签时候，组件标签里面的内容就会自动填坑（替换组件模板中`slot`位置）
并且可以作为承载分发内容的出口

## 内容插槽

定义两个组件 `home.vue`、`test.vue`
然后在`home.vue`组件中引用`test.vue`组件

**插槽内可以包含普通文本**

```vue
//home.vue
<test>
     Hello Word
</test>
复制代码
//test.vue
<a href="#">
	 <slot></slot>
</a>
复制代码
```

当组件渲染的时候，``会被替换为`Hello Word`

**插槽内也可以包含任何模板代码，包括HTML**

在你的`index.html`引入`Font Awesome`图标的样式就直接可以用那里面的图标了
``

```vue
//home.vue
<test>
    <!-- 添加一个 Font Awesome 图标 -->
    <span class="fa fa-user"></span>
    Hello Word
</test>
复制代码
```

**插槽内添加其他组件**

```vue
//home.vue
<test>
    <!-- 添加一个图标的组件 -->
    <font-awesome-icon></font-awesome-icon>
    Hello Word
</test>
复制代码
```

如果``中没有包含一个``元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。

**在插槽中使用数据**

插槽跟模板其他地方一样都可以访问相同的实例属性(也就是相同的"作用域")，而不能访问``的作用域

```vue
//home.vue
<test>
	//插槽可以获取到home组件里的内容
	Hello {{enhavo}}
</test>

data(){
	return{
		enhavo:'word'
	}
}
复制代码
//home.vue
//这里是获取不到name的，因为这个值是传给<test>的
<test name='you'>
    Hello {{name}}
</test>
复制代码
```

**规则：**
父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

## 后备内容(默认内容)插槽

有时候我们需要给插槽设置一个具体的默认内容，当别的组件没有给你内容的时候，那么默认的内容就会被渲染

```vue
//test.vue
//在slot插槽里设置默认内容 Submit
<button>
  <slot>Submit</slot>
</button>
复制代码
```

在`home.vue`里直接使用`test.vue`如下：

```vue
//home.vue
<test></test>
复制代码
```

那么最后设置的默认内容 Submit 将会被渲染

```vue
<button>
   Submit
</button>
复制代码
```

假如我们提供内容呢？

```vue
//home.vue
<test>按钮</test>
复制代码
```

那么这个提供的内容将会替代默认的内容被渲染出来

```vue
<button>
   按钮
</button>
复制代码
```

## 具名插槽

有时候我们一个组件里需要**多个插槽**

那么怎么办呢？ 对于这样的情况，``元素有一个特殊的特性：`name` ，这个特性可以用来**定义额外的插槽**

```vue
<div>
  <header>
    <!-- 我们希望把页头放这里 -->
  </header>
  
  <main>
    <!-- 我们希望把主要内容放这里 -->
  </main>
  
  <footer>
    <!-- 我们希望把页脚放这里 -->
  </footer>
</div>
复制代码
```

这时候，我们就可以使用`name`属性

```vue
<div>
  <header>
    <slot name="header"></slot>
  </header>
  
  <main>
    <slot></slot>
  </main>
  
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
复制代码
```

如果一个``不带`name`属性的话，那么它的`name`默认为`default`
在向具名插槽提供内容的时候，我们可以在`元素上使用`v-slot`指令，并以参数的形式提供其名称

```vue
<div>
   <template v-slot:header>
    <h1>Here might be a page title</h1>
   </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here some contact info</p>
  </template>
</div>
复制代码
```

现在 ` 元素中的所有内容都将会被传入相应的插槽。任何没有被包裹在带有 `v-slot` 的 ` 中的内容都会被视为默认插槽的内容。

如果你希望更明确一点的话，那就把主体内容那个插槽里设置`name="default"`，然后把上面的内容包裹起来

```vue
<template v-slot:default>
	<p>A paragraph for the main content.</p>
	<p>And another one.</p>
</template>
复制代码
```

**注：`v-slot`只能添加在一个`上，(只有一种例外情况，下面会说)**

## 作用域插槽

上面已经说了，**插槽跟模板其他地方一样都可以访问相同的实例属性(也就是相同的"作用域")，而不能访问``的作用域**

那如果想访问``作用域该怎么办呢？
我们把需要传递的内容绑到 `` 上，然后在父组件中用`v-slot`设置一个值来定义我们提供插槽的名字：

```vue
//test.vue
<div>
	<!-- 设置默认值：{{user.lastName}}获取 Jun -->
	<!-- 如果home.vue中给这个插槽值的话，则不显示 Jun -->
	<!-- 设置一个 usertext 然后把user绑到设置的 usertext 上 -->
	<slot v-bind:usertext="user">{{user.lastName}}</slot>
</div>

//定义内容
data(){
  return{
	user:{
	  firstName:"Fan",
	  lastName:"Jun"
	}
  }
}
复制代码
```

然后在`home.vue`中接收传过来的值：

```vue
//home.vue
<div>
  <test v-slot:default="slotProps">
    {{slotProps.usertext.firstName}}
  </test>
</div>
复制代码
```

这样就可以获得`test.vue`组件传过来的值了

绑定在 `` 元素上的特性被称为插槽 `prop`。在父组件中，我们可以用 `v-slot` 设置一个值来定义我们提供的插槽 prop 的名字，然后直接使用就好了

### 独占默认插槽的缩写语法

在上述情况下，当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 `v-slot` 直接用在组件上

这样写法还可以更简单，因为不带参数的`v-slot`就被假定为默认插槽，所以上面的代码还可以简化：

```vue
<div>
  <!-- 可以把 :default 去掉，仅限于默认插槽 -->
  <test v-slot="slotProps">
    {{slotProps.usertext.firstName}}
  </test>
</div>
复制代码
```

**注： 默认插槽 的缩写语法不能和 具名插槽 混用，因为它会导致作用域不明确**

```vue
<div>
  <!-- 可以把 :default 去掉，仅限于默认插槽 -->
  <test v-slot="slotProps">
    {{slotProps.usertext.firstName}}
    <!-- 无效，会警告 -->
    <template v-slot:other="otherSlotProps">
      slotProps is NOT available here
    </template>
  </test>
</div>
复制代码
```

只要出现**多个插槽**，始终要为所有的插槽使用完整的基于`的语法：

```vue
<test>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps">
    ...
  </template>
</test>
复制代码
```

### 解构插槽Prop

因为 作用域插槽 的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里
这意味着 `v-slot` 的值实际上可以是任何能够作为函数定义中的参数的 JS 表达式

所以本来是这样写的：

```vue
<div>
  <test v-slot="slotProps">
    {{slotProps.usertext.firstName}}
  </test>
</div>
复制代码
```

还可以这样写：

```vue
<div>
  <test v-slot={usertext}>
    {{usertext.firstName}}
  </test>
</div>
复制代码
```

这样可以使模板更简洁，尤其是在该插槽提供了多个 `prop` 的时候。它同样开启了 `prop` 重命名等其它可能，

例如可以将 usertext 重命名为 person：

```vue
<div>
  <test v-slot={usertext:person}>
    {{person.firstName}}
  </test>
</div>
复制代码
```

甚至可以定义 后备内容(默认内容)，用于插槽没有值时可以使用默认内容的情形：

```vue
<div>
  <test v-slot="{usertext={firstName:'Yang'}}">
    {{usertext.firstName}}
  </test>
</div>
复制代码
```

## 动态插槽名(2.6.0新增)

**动态指令参数**(需要自己了解)也可以用在`v-slot`上，来定义动态的插槽名：

```vue
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
复制代码
```

## 具名插槽的缩写(2.6.0新增)

跟 `v-on` 和 `v-bind` 一样，`v-slot` 也有缩写，即把参数之前的所有内容 `(v-slot:)` 替换为字符 `#`。例如 `v-slot:header` 可以被重写为 `#header`：

原来是这样写的：

```vue
<div>
   <template v-slot:header>
    <h1>Here might be a page title</h1>
   </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here some contact info</p>
  </template>
</div>  
复制代码
```

现在可以这样写：

```vue
<div>
   <template #header>
    <h1>Here might be a page title</h1>
   </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here some contact info</p>
  </template>
</div>
复制代码
```

**注：该指令和其他指令一样，只在其有参数的时候才可用**

下面的书写形式是错误的：

```vue
<test #="{ usertext }">
  {{ usertext.firstName }}
</test>
复制代码
```

如果希望使用缩写的话，**必须始终以明确插槽名取而代之**：

```vue
<test #default="{ usertext }">
  {{ usertext.firstName }}
</test>
复制代码
```

## 其他示例

**插槽 prop 允许我们将插槽转换为可复用的模板，这些模板可以基于输入的 prop 渲染出不同的内容。** 这在设计封装数据逻辑同时允许父级组件自定义部分布局的可复用组件时是最有用的。

例如，我们要实现一个 `` 组件，它是一个列表且包含布局和过滤逻辑：

```vue
<ul>
  <li
    v-for="todo in filteredTodos"
    v-bind:key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
复制代码
```

我们可以将每个 `todo` 作为父级组件的插槽，以此通过父级组件对其进行控制，然后将 `todo` 作为一个插槽 `prop` 进行绑定：

```vue
<ul>
  <li
    v-for="todo in filteredTodos"
    v-bind:key="todo.id"
  >
    <!--
    我们为每个 todo 准备了一个插槽，
    将 `todo` 对象作为一个插槽的 prop 传入。
    -->
    <slot name="todo" v-bind:todo="todo">
      <!-- 后备内容 -->
      {{ todo.text }}
    </slot>
  </li>
</ul>
复制代码
```

现在当我们使用 `` 组件的时候，我们可以选择为 todo 定义一个不一样的 ` 作为替代方案，并且可以从子组件获取数据：

```vue
<todo-list v-bind:todos="todos">
  <template v-slot:todo="{ todo }">
    <span v-if="todo.isComplete">✓</span>
    {{ todo.text }}
  </template>
</todo-list>
复制代码
```

**至于那些废弃了的 `slot` 和 `slot-scope` 特性，这里就不在阐述了，如果有兴趣了解的话，请参考官方文档**w