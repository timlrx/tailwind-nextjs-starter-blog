---
title: next.js 优势
date: 2023-12-04 11:43:00
tags:
  [前端]
---

## next.js 优势

优势

1. 默认包含打包构建 Babel，PostCSS

2. 图片懒加载

3. 图片设置缓存

   - x-nextis-cache: HIT    `HIT`或`MISS`

4. 自定义404页，500页

5. 国际化路由

6. SEO优化

7. 动态api路由

   - ### [可选的捕获所有 API 的路由](https://www.nextjs.cn/docs/api-routes/dynamic-api-routes#可选的捕获所有-api-的路由)

8. MDX（可用MD当页面）

9. fetch 会自动进行接口缓存

   - 如何请求新的数据？nextjs可向外暴露一个接口，命中对应next.tag:"xxx"的值，即可在外部进行刷新接口缓存。
   - `revalidateTag(tag)`  或 `revalidatePath(path)`   ?path=product/[id]