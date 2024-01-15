---
title: webpack-day-02
tags: [异步]
categories: [code]
date: 2021-12-23 14:19:00

---

# 脚手架创造之路二：脚手架的完善和优化方案

## 1搭建地基包

地基包就是我们在上一节课中实现的基本的生产和开发环境分离的环境

首先打开案例中的vue-cli文件夹，今天我们在昨天实现的基本webpack环境基础上实现vue的cli的基本功能

打开之后先运行，进行本地服务的启动

```sh
npm install
npm run dev
```

然后尝试运行，进行本地项目的构建

```sh
npm run build
```

然后我们将项目按照@vue/cli的结构进行改造

## 2构建本地脚手架项目结构

首先清空src中的内容，然后创建main.js文件

```js
//main.js
console.log('main.js')
```

然后找到webpack.base.js。将entry中的内容改成如下内容

```js
//entry做如下修改
entry:{
  main:'./src/main.js'
},
//plugins做如下修改
plugins:[
  new HtmlWebpackPlugin({
    template:'./public/index.html',
    filename:'index.html',
    chunks:['main']
  })
]
```

然后分别运行开发环境，和构建命令测试是否能正常运行和构建项目

## 3.安装Vue依赖库

首先用命令行打开当前项目的目录，并且安装vue

```sh
npm i vue -s
```

安装完毕之后我们改造public中的index.html

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<div id="app"></div>
	</body>
</html>

```

然后我们在src下创建一个App.vue

```vue
<template>
	<div>
		app.vue
	</div>
</template>

<script>
</script>

<style>
</style>

```

然后我们改在main.js中做如下改造

```js
//main.js
import Vue from 'vue'
import App from './App.vue'
new Vue({
	render:(h) => h(App) 
}).$mount('#app')
```

然后运行项目会发现页面空白并且控制台会提示如下错误

```sh
Uncaught Error: Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> <template>
| 	<div>
| 		app.vue
    at Object../src/App.vue (main.bundle.js:8456)
    at __webpack_require__ (bootstrap:18)
    at Object../src/main.js (main.bundle.js:8436)
    at __webpack_require__ (bootstrap:18)
    at startup:3
    at startup:4
```

当前错误是因为我们的webpack地基框架中并没有解析vue文件的插件导致App.vue无法正确加载。

所以下一步的操作是让vue文件能正常读取。

这里需要使用的就是vue-loader，vue-template-compiler 

```sh
npm i vue-loader -D
```

```sh
npm i vue-template-compiler -D
```

然后我们改造webpack.base.js的配置

```js
// webpack.base.js
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```

以上操作完成之后我们来实际运行一下项目

```sh
npm run dev
```

并且打包构建一下

```sh
npm run build
```

发现vue文件已经可以解析

到此为止vue的处理部分已经完成

## 4VueRouter的安装

接下来我们要把项目的页面管理框架VueRouter插入

首先安装VueRouter

```sh
npm i vue-router -s
```

然后我们在项目src下创建views文件夹，并且创建Index.vue如下

```vue
<template>
	<div>
		我是index.vue
	</div>
</template>

<script>
</script>

<style>
</style>

```

我们在src下创建router文件夹，并且在router文件夹内创建index.js文件

```js
//router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
Vue.use(VueRouter)
const routes = [
	{
		path:'/',
		name:'Index',
		component:Index
	}
]
const router = new VueRouter({
	routes
})
export default router
```

完毕之后我们在改造main.js

```js
//main.js
import Vue from 'vue'
import App from './App.vue'
//引入路由配置
import router from './router'
new Vue({
  //将路由整合到vue中
	router,
	render:(h) => h(App) 
}).$mount('#app')
```

完毕之后我们在src中创建一个Test.vue文件并且初始化为以下内容

```vue
<template>
	<div>
		Test
	</div>
</template>

<script>
</script>

<style>
</style>

```

并且将该文件注册到router/index.js中这里我们采用异步的方式

```js
//router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
Vue.use(VueRouter)
const routes = [
	{
		path:'/',
		name:'Index',
		component:Index
	},
	{
		path:'/test',
		name:'Test',
		component:() => {
			return import(
				/*webpackChunkName:"test"*/
				'../views/Test.vue'
			)
		}
	}
]
const router = new VueRouter({
	routes
})
export default router
```

启动项目查看内容，发现页面并没有跳转到index和test

我们需要改造App.vue让路由能正确的加载所以

将App.vue改造成如下

```vue
<template>
  <div >
    {{str}}
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:'App',
  data(){
    return {
      str:'hello1'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
```

然后我们启动查看页面，是否正常访问

之后我们运行

```sh
npm run build
```

查看dist目录会发现多生成一个test.bundle.js

这个文件是通过异步引入vue页面之后生成的

这么做有一个非常大的好处就是当我们项目的页面非常多的时候可以通过异步引入的方式将路由按照自定义的webpackChunkName将他们单独拆分成多个包，这样打包后的js文件就不会将所有的源代码都放到一个main.bundle.js中所以这么做可以实现vue项目的首屏幕加载速度的优化。



-------------------------

完毕之后我们在index中通过router-link跳转到Test.vue

我们接下来在Test.vue中定义一些样式

```vue
<template>
	<div class="test">
		Test
	</div>
</template>

<script>
</script>

<style lang="scss">
	.test{
		display: flex;
		color: red;
	}
</style>

```

然后我们运行

```sh
npm run build
```

来进行构建以下项目，先运行index.html看一下效果。然后我们看一下构建出来的文件结构。这里的test.bundle就是Test.vue解析出来的代码，并且通过import（）异步引入的组件我们能够自动拆分到新的文件中，这个就是webpack的功能。

到此我们的脚手架主要功能就完成了。下一步我们可以加入js压缩插件

和public中的静态资源转移构建插件来实现更多的功能

### 关于prefetch

结合文档学习：https://webpack.docschina.org/guides/code-splitting/#splitchunksplugin

## 5.个性化功能

### 5.1gzip压缩代码

引入compression-webpack-plugin组件来实现对vue项目的代码进一步压缩

```sh
npm i compression-webpack-plugin -D
```

安装成功之后我们在webpack.prod.js中引入这个插件

```js
const CompressionPlugin = require("compression-webpack-plugin")
plugins:[
  new CompressionPlugin({
    algorithm: "gzip",
    test: /\.js$|\.html$|\.css$/,
    threshold: 10240,
    minRatio: 0.8
  })
]
```

完成之后我们打包构建这个项目

```sh
npm run build
```

查看构建的代码如果有超过10kb的代码就会被压缩成.gz为后缀的压缩包

这样将项目放到服务器上之后访问项目时如果哪个文件有gz的压缩包就会优先加载gz文件下载到本地再解压这样就能提升加载速度。

### 5.2public中的静态资源处理

我们在项目中有可能会引用public中的静态资源。

所以我们先启动项目

然后改造Index.vue，这里需要在对应的public文件夹中创建imgs文件夹并且放入一个名为bg1.png的图片然后在src中创建一个名为assets的文件夹放入bg.png图片

```vue
<template>
	<div>
		我是index.vue
		<router-link to="/test">跳转到test</router-link>
		<img style="display: block;" width="200" :src="src" alt="">
		<img width="200" height="200" src="imgs/bg1.png" alt="">
	</div>
</template>

<script>
	import img from '../assets/bg.png'
	export default{
		data(){
			return {
				src:img
			}
		}
	}
</script>

<style>
</style>

```

这里是两种引入静态资源的方式，直接在img上编写路径是通过public文件夹引入图片，通过import的方式是在src中引入图片，我们现在运行

``` sh
npm run build
```

然后我们打开dist中的index.html文件查看内容，发现只有一张图片展示

这是因为我们在public中使用的图片地址是在html标签上直接写的webpack并不知道我们依赖了这张图片所以没有将他输出到dist中，所以这里我们需要通过copy-webpack-plugin这个插件来实现将public的内容合并到dist中这样所有的静态资源在构建之后才能正常使用

```sh
npm i copy-webpack-plugin -D
```

然后改造webpack.prod.js

```js
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')
module.exports = merge(base,{
	mode:'production',
	devtool:'source-map',
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					MiniCssExtractPlugin.loader,//抽取css样式文件
					{loader:'css-loader'},
					{loader:'postcss-loader'},
				]
			},
			{
				test:/\.scss$/,
				use:[
					MiniCssExtractPlugin.loader,//抽取css样式文件
					{loader:'css-loader'},
					{loader:'postcss-loader'},
					{loader:'sass-loader'}
				]
			}
		]
	},
	plugins:[
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename:'[name].css'
		}),
		new CompressionPlugin({
			algorithm: "gzip",
			test: /\.js$|\.html$|\.css$/,
			threshold: 10240,
			minRatio: 0.8
		}),
		new CopyPlugin({
			patterns: [
				{ 
					from: path.resolve(__dirname,'public'),
					to: path.resolve(__dirname,'dist')
				},
			],
			options: {
				concurrency: 100,
			},
		})
	]
})
```

然后运行

```sh
npm run build
```

我们查看结果，dist文件夹中集成了public中创建的imgs文件夹，这样静态资源就可以全部使用了。

以上就是我们模拟vue脚手架的常用功能。

### 5.3 依赖图谱展示

依赖图谱展示需要使用的插件为`webpack-bundle-analyzer`

需要在webpack的配置文件中加入如下代码

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
```

```javascript
plugins:[
  new BundleAnalyzerPlugin()
]
```

他的文档地址如下：https://www.npmjs.com/package/webpack-bundle-analyzer

使用后可以通过他来可视化追踪构建项目的依赖图谱和各个组件间的依赖关系

