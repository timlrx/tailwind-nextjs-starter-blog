---
title: NextJs 请求数据
date: 2023-05-17 17:06:14
tags:
  [React]
---

## 请求数据

###### **官方推荐的是fetch 注意 fetch中的路径应是完整的路径**

```js
function About({ data }) {
    console.log(data) //在这里打印的可在控制台输出
    return (
        <div>
            {
                data.map( item => (
                    <li key={item.id}>{item.title}</li>
                ))
            }
        </div>
    )
}

export const getStaticProps = async () => {
    let result = await fetch('http://apitest.dianzhijia.com/api/open/article?page=1',{
        headers: {
            Accept: 'application/vnd.dpexpo.v1+json' //设置请求头
        },
        method: 'get',
    })
    let res = await result.json() //必须通过此方法才可返回数据
    const {data: {data}} = res
    return {
        props: {
            data //props值传导render函数中
        }
    }
}

export default About
```

###### 
