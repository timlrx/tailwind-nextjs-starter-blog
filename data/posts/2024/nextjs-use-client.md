---
title: Next.js 中关于'use client'的使用误解及解法
date: 2024-03-30 12:04:36
tags:
  [React]
---

## client component vs server component

我们在 page.tsx中导入 Button 自定义组件

```tsx
tsx
复制代码// app/page.tsx
import styles from './page.module.css'
import Button from './components/button'
export default function Home() {
	return (
		<main className={styles.main}>
			<h1>hello world</h1>
			<Button />
		</main>
	)
}
```

由于 nextjs 默认 src之下的组件都是 server component，在Button组件（server component）中，如果直接调用client component 才能使用的交互性例如 onClick useState是会报错的

![Img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/855aeac9a88e4b2b9288ff5719556777~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3814&h=2094&s=1367505&e=png&b=232323)

可以简单按照报错提示修改为 client component 这样就没问题 ![Img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52543b878e4449099b41bca54535b77a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3820&h=2092&s=804361&e=png&b=232323)

但是如果你稍不注意直接在 page.tsx 加上'use client'也是没有报错的！

![Img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b4889585cce4beda74cbf977675c578~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3824&h=2074&s=944723&e=png&b=232323)

但是这样造成的问题是：导入page.tsx 的所有组件都将是'client component',那和直接写 react 有什么区别..

```tsx
tsx
复制代码'use client'
import styles from './page.module.css'
import Button from './components/button'
import Post from './components/post'

export default function Home() {
	return (
		<main className={styles.main}>
			<h1>hello world</h1>
			<Button />
            <Post/>
		</main>
	)
}
```

假设 Post 组件中需要加载一个很大的第三方库例如`sanitize-html`![Img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9721cc54a4cb438cb1ae2daa88b0977c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1392&h=324&s=57831&e=png&b=242424)

如果放在client component 就不太适宜，可以看官方文档的第四条，将导入的较大第三方库尽量放在server component上减少客户端的压力 ![Img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e1ef3142ae64f3983821a384cf4131e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1344&h=1338&s=193916&e=png&b=fefefe)

所以最优的解决办法就是：谁需要交互性就将最叶子节点变成客户端组件

❎ ![Img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/310b31e9fb2841b885e68ba5662725cf~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1976&h=1138&s=123451&e=png&b=ffffff)

✔️ ![Img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f75939680dcf4532a3937121250563b8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1888&h=1114&s=119919&e=png&b=ffffff)

## 使用 context 封装 children

假设你需要使用一个上下文 context 传递一些数据，你可以这样写

```tsx
tsx
复制代码// app/context/ThemeComtext.tsx
'use client'
import { useState, cloneElement, ReactNode, ReactElement } from 'react'
export default function ThemeContextProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState('light')

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
	}

	return <div>{cloneElement(children as ReactElement, { theme, toggleTheme })}</div>
}
```

使用时在 layout 上封装一层 wrapper

```tsx
tsx
复制代码import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeContextProvider from './context/ThemeContext'

const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeContextProvider>{children}</ThemeContextProvider>
			</body>
		</html>
	)
}
```

`ThemeContextProvider`其实是一个客户端组件，如果把 children 根组件 wrapper 在 这个context 中根据上面的说法岂不是之下的所有组件也都是客户端组件了？

> 正确思考方式是 ： 关注import tree 而不是 render tree

上一个例子中，我们在一个使用'use client'的客户端组件中 import其他组件，那么这些组件都会变成客户端组件，而这里的例子其实只是传递组件children，并不会将 children 中的服务端组件改成客户端组件

总结就是 改变组件和 `jsx` 渲染的结构无关，而是和import 相关联

## 多次导入交互性组件

> 将一个交互性的组件分别导入至 client  && server 组件会是什么情况?

交互性组件Button

```jsx
jsx
复制代码import style from './button.module.css'
export default function Button() {
	return (
		<div className={style.btn} onClick={() => console.log('click me')}>
			Click me
		</div>
	)
}
```

server Component

```jsx
jsx
复制代码import sanitizeHtml from 'sanitize-html'
import Button from './button'
export default function Post() {
	return (
		<div>
			Post 
			<Button />
		</div>
	)
}
```

Client component

```jsx
jsx
复制代码'use client'
import Button from './button'
export default function Form() {
	return (
		<div>
			form <Button />
		</div>
	)
}
```

结果是符合直觉的 ![Img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/280deb9b6c854532b7bb9bc0e2dfd13b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3828&h=2058&s=1131825&e=png&b=232323) 如果将 Post 组件删掉是不会报错的，也就是说在 client component使用Button会表现为client，而在 server component不会被影响，各自独立

作者：oddpro
链接：https://juejin.cn/post/7301948815753445414
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
