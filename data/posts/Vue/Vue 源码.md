

[TOC]



### 文件结构

### 入口

package.json, main是require的入口，module是import的入口

```json
  "main": "dist/vue.runtime.common.js",
  "module": "dist/vue.runtime.esm.js",
```

dist是build后产生的，"build": "node scripts/build.js",

所以npm run build执行的事build.js

```js
build(builds)
```

入口是 src/platforms/web/entry-runtime-with-compiler.js

```js
import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
重写$Mount
```

runtime/indexruntime/index

```js
最初定义

import Vue from 'core/index'
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```



core/index

```js
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

initGlobalAPI(Vue)

```

instance/index终于找到

```js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```



### init

src/core/instance/init.js

逻辑很清晰 各个初始化，每个扩展逻辑写成单独的函数，值得学习

```js
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    // 生命周期
    initLifecycle(vm)
    // 事件
    initEvents(vm)
    // 渲染
    // createEleent
    // slot
    initRender(vm)
    // 生命周期钩子
    // data prop methods 
    callHook(vm, 'beforeCreate')
    // injections
    //  inject
    initInjections(vm) // resolve injections before data/props
    // state
    // data prop computed methods 
    
    initState(vm)
    // provide
    //  provide
    initProvide(vm) // resolve provide after data/props
    // 生命周期
    //  created生命周期的时候，可以获得 provide, methods, computed, props
    callHook(vm, 'created')

    // 如果new的时候有el ，就调用$mount ， 和咱们手动调用$mount是一个意思
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

#### 

### compiler

把template编译成render函数返回虚拟dom 
如果没有compiler模块，文件变小，但是支持render

#### 写法

core
	核心
platforms
	平台 web, weex

server
	服务端渲染相关
sfc
	.vue 文件解析
Shared
	共用的方法和常量

### 生命周期

一图胜好多字 ，好多地方看到callHook，src/core/instance/lifecycle ，回到core/instance/int.js中，能看到befoireCreate和created调用的时机

 `beforeCreate` 和 `created` 是在 `initState` 的前后，`initState` 的作用是初始化 `props`、`data`、`methods`、`watch`、 等属性，那么显然 `beforeCreate` 的钩子函数中就不能获取到 `props`、`data` 中定义的值，也不能调用 `methods` 中定义的函数。原理一目了然

mountComponent中，beforeMount， beforeUpdate,callHook

可以看到_reder之前beforeMount， _update之后mounted， watch监听变化，触发beforeUpdate

