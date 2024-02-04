---
title: npm淘宝源SSL正式到期 必须得换了
date: 2024-01-23 11:44:47
lastmod: 2024-02-04 11:07:11
tags:
  [前端]
---

起源：1月22号 淘宝源正式到期，更换npm源后仍然爆出taobao.org/xxx路径禁止访问

淘宝原镜像域名（`registry.npm.taobao.org`）的 HTTPS 证书正式到期。

如果你是将npm官方镜像改成了淘宝镜像，并想要继续使用，需要将 npm 源切换到新的源（`registry.npmmirror.com`），否则会报错。

- 更新新的npm源

  ```bash
  // 1. 切换镜像源
  npm config set registry https://registry.npmmirror.com
  
  // 2. 检测是否切换成功
  npm config get registry
  ```

- 跟新后仍然走的是 taobao.org地址，缓存需要清一下

  ```bash 
  // 1. 清空缓存
  npm cache clean --force
  
  // 2. 切换新源
  npm config set registry https://registry.npmmirror.com
  ```


更新pnpm

- 使用pnpm的还需要重装pnpm以切换源

  ```bash
  # 检查
  pnpm config get registry
  # 卸载
  sudo npm rm pnpm -g 
  # 重装 重装后会跟随npm源
  sudo npm install pnpm -g 
  ```

  
