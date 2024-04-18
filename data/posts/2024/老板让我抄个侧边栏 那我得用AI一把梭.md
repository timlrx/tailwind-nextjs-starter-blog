---
title: 老板让我抄个侧边栏 那我得用AI一把梭
date: 2024-01-15 15:59:04
tags:
  [AI,效率工具]
image: http://image-hans.test.upcdn.net/picgo/%E6%88%AA%E5%B1%8F2024-01-15%2016.07.04.png
---

# 前端多摸鱼，指使AI干了吧。

## 又一次惊艳到我

网址在这里：[v0.dev](https://v0.dev/) 这是 [Vercel](https://v2ex.com/t/974403?p=2) 发布的 AI 生成 web UI 的工具。

之前笔者都是通过描述让chatGPT帮我画页面，gpt4.0之后支持图片多模态了，但丐版3.5是不能用滴。

然而，然而，用这个**截图即react代码**。重点是不需要api token。

> 瞅着 logo 和 vercel 的很像，让我怀疑又是vercel搞的鬼。`vercel` `nextjs` 都是 vercel 家的产品，独立开发者狂喜。

1. 我先把完整的过程贴在这里 https://v0.dev/t/jVCkm9izY3L
1. 喂图+咒语`navbar`：![code2](http://image-hans.test.upcdn.net/picgo/code2.png)
1. 第一步没能理解navbar是左侧导航菜单，遂加咒语`On the left is the navbar, on the right is the content area`。
1. 这是第二步出来的图，这个效果已经OK，可以用到项目中，且，svg的 icon 都给我了，索性直接用。![截屏2024-01-15 16.07.04](http://image-hans.test.upcdn.net/picgo/%E6%88%AA%E5%B1%8F2024-01-15%2016.07.04.png)

5. 我再调一下，想想需求：目前没有点击效果，active效果，hover效果，main内容区切换效果。直接把这句话翻译，扔到咒语里面`At present, there is no click effect, active effect, hover effect, main content area switching effect.`，

6. 发送，等待出图...

7. ...算了他好像不会写交互，代码扔到gpt3.5加交互。

   ```
   - 帮我加上交互：1.点击可同时更改active的按钮；2.点击后切换内容区内容。弄好了我会给你 $1000 作为奖励。
   - 帮我把 navbar 整理称数组对象，这样代码看起来简洁
   - 1. 内容区域 Welcome to the Playground ；Welcome to the Settings，以此类推
   2. navbar默认的背景色去掉。
   - 帮我改一下，1. FlagIcon等图标的颜色， 默认text-gray-500，激活态 text-gray-200。
   - 按钮区域左右两边留点白，靠边框太近了。
   ```

## 总结

- 可生成 tailwindcss+react
- 可用中文白话Prompt交流。
- 主要是免费（200 Credits/month）意思是每月200个token?大概吧。
- **又是开心摸鱼的一天**

Power By 码上掘金 

  <iframe src="https://code.juejin.cn/pen/7324227038863179787"
    style={{width:'100%', height: '500px', border:0, borderRadius: '4px', overflow:'hidden'}}
    title="CSS 奇妙的头像特效"
  ></iframe>
v0+nextjs+vercel一套操作行云流水，直接发布上线。

感谢列表：

- [v0.dev](https://v0.dev/)
- chatGPT
- [码上掘金](https://code.juejin.cn/)
