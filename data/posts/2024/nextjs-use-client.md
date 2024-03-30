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

![](http://image.hansking.cn/picgo/202403301210616.png)

可以简单按照报错提示修改为 client component 这样就没问题 ![Img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52543b878e4449099b41bca54535b77a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3820&h=2092&s=804361&e=png&b=232323)

![](http://image.hansking.cn/picgo/20240330121133.png)

但是如果你稍不注意直接在 page.tsx 加上'use client'也是没有报错的！

![](http://image.hansking.cn/picgo/20240330121154.png)



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

假设 Post 组件中需要加载一个很大的第三方库例如`sanitize-html

![](http://image.hansking.cn/picgo/20240330121318.png)

如果放在client component 就不太适宜，可以看官方文档的第四条，将导入的较大第三方库尽量放在server component上减少客户端的压力 

![](http://image.hansking.cn/picgo/20240330121337.png)

所以最优的解决办法就是：谁需要交互性就将最叶子节点变成客户端组件

❎ ![](http://image.hansking.cn/picgo/20240330121407.png)

✔️ ![](http://image.hansking.cn/picgo/20240330121447.png)

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

结果是符合直觉的 

![](http://image.hansking.cn/picgo/20240330121502.png)

如果将 Post 组件删掉是不会报错的，也就是说在 client component使用Button会表现为client，而在 server component不会被影响，各自独立
