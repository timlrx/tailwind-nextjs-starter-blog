---
title: MacOS平台Homebrew更新brew update卡死 完美解决.md
tags: [Mac]
categories: [电脑]
date: 2020-12-16 14:25:00
lastmod: 2020-12-16 16:11:00
---

# macOS平台Homebrew更新brew update卡死,完美解决

> 版本2020.01.05

```
摘要:
使用brew install [软件包]安装软件包时,卡在Updating Homebrew...
或输入`brew update`更新brew,半天没反应.产生原因一般是在国内访问官方
更新源获取资源太慢,解决方案可以采用更换国内镜像更新源.
关键词: Linux; macOS; mac; Homebrew; brew update; 开源软件镜像站;
```

##### 一. Homebrew 简介

1. Homebrew是什么?

   - Homebrew是macOS或Linux缺失的软件包的管理器.

2. 如何安装Homebrew?

   - 命令行里运行以下命令即可.

   ```shell
   $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
   ```

   - 参考[Homebrew](https://brew.sh/index_zh-cn).

3. Homebrew几点备注.

   - Homebrew会将软件包安装到独立目录,一般为`/usr/local/Cellar`目录.
   - 然后将文件软连接至执行路径,一般为`/usr/local/bin`目录.

##### 二. Homebrew 命令

- `brew install [包名]`
- `brew update`
- `brew update -verbose`
- `brew cleanup`:清理旧有软件包.
- `brew doctor`:诊断Homebrew的问题.
- `brew update-reset`

##### 三. brew update 卡死解决方案

1. 问题场景.

   - **场景1.**使用`brew install [软件包]`安装其他软件包,卡在*Updating Homebrew...*
   - **场景2.**输入`brew update`更新brew,半天没反应.

2. 原因分析.

   - 对于**场景1**我们可以选择`Control-C`直接终止当前前台update进程,然后brew就会接着执行install了.

   - 但这样并不能"治本",其实造成上述两种情况的主要原因是资源访问太慢.

   - 我们知道默认官方更新源在`github.com`上,因为一些原因,国内访问不太顺畅.

   - 解决方案是我们可以选择国内镜像更新源.

   - 国内镜像更新源推荐[中国科大开源软件镜像站](http://mirrors.ustc.edu.cn/)或[清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/).

   - 某些同学可能要有疑问了,"我已经按照网上其他教程替换更新源了呀?怎么还不行?"

   - 这里回答是,"可能你并没有更换彻底".

     - 输入`brew update -verbose`我们可以看到`brew update`工作的具体步骤.

     ```shell
     $ brew update -verbose
     Checking if we need to fetch /usr/local/Homebrew...
     Checking if we need to fetch /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask...
     Fetching /usr/local/Homebrew...
     Checking if we need to fetch /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core...
     Fetching /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask...
     Checking if we need to fetch /usr/local/Homebrew/Library/Taps/homebrew/homebrew-services...
     Fetching /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core...
     Already up-to-date.
     ```

     - 我们可以看到它一共检查了`Homebrew`,`homebrew-cask`,`homebrew-core`,`homebrew-services`这几个文件.
     - 而网上大部分教程替换更新源时往往只替换了`Homebrew`和`homebrew-core`这两个的源.
     - 出问题,可能就出在`homebrew-cask`这个文件上,而我之前运行`brew update -verbose`显示卡死也的确是卡在这个地方.
     - 所以知道了原因,我们只要把`homebrew-cask`这个文件的更新源也替换一下即可.
     - 具体操作见[中国科大镜像源:homebrew-cask](http://mirrors.ustc.edu.cn/help/homebrew-cask.git.html).

3. 解决方案,以USTC镜像为例.

   - 步骤1.

     替换`Homebrew`源.

     ```shell
     $ cd "$(brew --repo)"
     $ git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
     ```

     - `"$(brew --repo)"`是用来自动指向Homebrew的目录的.
     - 参考[Homebrew源使用帮助](http://mirrors.ustc.edu.cn/help/brew.git.html).

   - 步骤2.

     替换`homebrew-core`源.

     ```shell
     $ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
     $ git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
     ```

     - 参考[Homebrew Core源使用帮助](http://mirrors.ustc.edu.cn/help/homebrew-core.git.html).

   - 步骤3.

     替换`homebrew-cask`源.

     ```shell
     $ cd "$(brew --repo)"/Library/Taps/homebrew/homebrew-cask
     $ git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git
     ```

     - 参考[Homebrew Cask源使用帮助](http://mirrors.ustc.edu.cn/help/homebrew-cask.git.html).

   - 补充.

      

     中国科大`开源软件镜像站`

     或

     清华大学开源软件镜像站

     同时提供的有Homebrew二进制预编译包`Homebrew-bottles`的镜像源.

     - 可有选择的进行替换,这里不进行演示.
- 参考[Homebrew Bottles 源使用帮助](http://mirrors.ustc.edu.cn/help/homebrew-bottles.html).