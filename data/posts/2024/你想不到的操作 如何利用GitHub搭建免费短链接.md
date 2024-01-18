---
title: 你想不到的操作 如何利用GitHub搭建免费短链接
tags:   [🙅🏻‍♀️bu造轮子]
categories: [code]
date: 2024-01-19 00:16:19
image: http://image.hansking.cn/picgo/%E6%88%AA%E5%B1%8F2024-01-19%2000.50.46.png
---

# 如何利用GitHub搭建免费短链接？

​	现在很多平台都使用短链接（Short URL）技术分享链接，比如新浪的、Telegram的t.me、Twitter的t.co。


​	这些链接的后缀往往很短，只有几个随机字符或数字。可以设置为自动增长**免费短链接**，也可以通过Hash算法生成，只要是唯一的即可。然后在服务器的数据库中，通过唯一的随机码，找到对应的URL进行重定向。

​	因此，如果我们需要构建自己的短链接服务，通常需要独立的服务器或数据库。不过 GitHub 上有位牛人提供了一个免费短链接思路，大家可以免费使用 Github Pages 搭建自己的短链接服务

> 但这个更牛 [nlsn.cf/1](https://nlsn.cf/1)
>
> 这哥们把 github 仓库的 issue 当数据库了！！！！！
>
> 仓库地址 https://github.com/nelsontky/gh-pages-url-shortener
>
> 牛逼数据库地址 https://github.com/nelsontky/gh-pages-url-shortener-db/issues

1. 第1步

​	首先，在 GitHub 上创建一个新的存储库作为存储链接的数据库。此处作者将其命名为 gh-pages-url-shortener-db。

2. 第 2 步

​	fork这个链接仓库，打开404.html，修改文件中的GITHUB_ISSUES_LINK字段，把这个值指向你上一步创建的gh-pages-url-shortener-db仓库。

```
// 注意将{username}和{dbname}替换为自己的用户名和仓库
var GITHUB_ISSUES_LINK = "https://api.github.com/repos/{username}/{dbname}/issues/";
```

3. 第 3 步

​	最后在Settings->GitHub Pages->Source settings中配置GitHub Pages分支。

立即测试！

在第一步创建的gh-pages-url-shortener-db仓库中打开一个issue，标题为需要转换的长链接。

例如，我这里使用了一个中文翻译的链接，它将定位到百度百科上的科比·布莱恩特条目。

现在，您可以在浏览器中输入 URL /link/1 跳转到上面的百度百科条目。

为了避免邮件中断完全免费:使用 GitHub Pages 搭建**免费短链接**服务，建议关闭本仓库的通知功能。

**哈哈！！**

这是如何工作的？

为什么短链可以通过 GitHub Pages 实现？

原始 Repo 的作者提到：404.html 处理所有请求Small javascript 片段通过 JSON API 获取 GitHub 问题的 JSON 表示，并重定向到问题标题，作为 URL。

**真正的秘密隐藏在404.html中，供有兴趣的读者自己阅读。**

## 🐂 你也可以直接使用

1. 打开 https://github.com/nelsontky/gh-pages-url-shortener-db/issues
2. 新建issue `New Issue`按钮
3. Title框输入你想要转短链的域名
4. 直接提交
5. 提交成功在标题后面的#1597 就是你的了。![截屏2024-01-19 00.13.25](http://image.hansking.cn/picgo/%E6%88%AA%E5%B1%8F2024-01-19%2000.13.25.png)

6. 现在可以试试访问本站 [nlsn.cf/1597](https://nlsn.cf/1597)



或许你想在任何时候自动转短链，github 提供如下几种API进行创建 Issue。[GitHub API文档](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#create-an-issue)

也可以通过访问 https://github.com/nelsontky/gh-pages-url-shortener-db/issues/created_by/HansKing98 来查看自己创建的短链

- curl

  ```bash
  curl -L \
    -X POST \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer <YOUR-TOKEN>" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    https://api.github.com/repos/OWNER/REPO/issues \
    -d '{"title":"http://你要转的短链","body":"","assignees":["octocat"],"milestone":1,"labels":["bug"]}'
  ```

- JavaScript

  ```js
  // Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: 'YOUR-TOKEN'
  })
  
  await octokit.request('POST /repos/{owner}/{repo}/issues', {
    owner: 'nelsontky',
    repo: 'gh-pages-url-shortener-db',
    title: 'https://gallery.hansking.cn',
    body: '',
    assignees: [
      'hansking98'
    ],
    milestone: 1,
    labels: [
      'my-short-url'
    ],
    headers: {
      'X-GitHub-Api-Version': '2024-01-19'
    }
  })
  ```

Api 返回数据的 id 就是 issue 的 id了。

