---
title: TypeScript 使用
date: 2024-01-12 17:55:13
tags:
  [前端,TS]
image: http://image-hans.test.upcdn.net/picgo/code2024-01-12%201.png
---

# TypeScript 使用

gpt检索：https://chat.openai.com/c/be931627-73e1-4d35-ad3a-11c7c119ea90

1. 交叉类型来组装

   ```ts
   // 没看清结构最开始以为要将tag属性加在Post内
   type Post = {
     title: string;
     content: string;
     // 已经存在的属性
     // ...
   };
   type PostWithTag = Post & {
     tag: string;
   };
   const PostCard = ({ post }: { post: CoreContent<Post>}) => {
     // 这样post中就可以传Post交叉{tag}了。
   })
   ```

2. 对象类型中添加属性

   ```ts
   // blog-page.tsx
   <PostCard post={post} tag="plog" />
     
   // PostCard.tsx
   const PostCard = ({ post, tag2 }: { post: CoreContent<Post>; tag2?: 'plog' }) => {
   	// 其实tag2是和post同级，且tag2，可不传或传'plog'。可不传用 : 前加 ? 来设置。
   }
   ```