1. 计划、实际进度双行灯箱

   https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html

   ![截屏2022-03-03 09.55.34](https://image.hansking.cn/uPic/202203/dNmk4e.png)

2. 项目工期

   - 父节点的时间为空即可时

   ![截屏2022-03-03 10.07.07](https://image.hansking.cn/uPic/202203/Scn5C5.png)

3. 定义日期范围

   ```js
   gantt.init("gantt_here", new Date(2018, 02, 10), new Date(2018, 03, 20));
   ```

4. 显示时间范围之外的任务

   ```js
   gantt.config.show_tasks_outside_timescale = true;
   gantt.config.start_date = new Date(2020, 1, 1);
   gantt.config.end_date = new Date(2020, 2,1);
   ```

5. 项目关闭（折叠）时显示子任务

   ```js
   ganttInstance.config.open_split_tasks = true;
   ```


为了显示未安排的任务，请使用配置参数[show_unscheduled](https://docs.dhtmlx.com/gantt/api__gantt_show_unscheduled_config.html)设置为*true*：

```js
gantt.config.show_unscheduled = true;
```

请注意，甘特图会将默认日期分配给未安排的任务。这意味着此类任务对象的**start_date/end_date**属性不会为空：

```js
var task = gantt.getTask(3); console.log(task.unscheduled); // true  console.log(task.start_date); // Tue Jun 25 2019 18:42:50
```



https://docs.dhtmlx.com/gantt/api__gantt_external_render_config.html

# 外部渲染

将外部组件渲染到 DOM 中

*对象* **外部渲染**；

#### 例子

```js
import ReactDOM from 'react-dom';
import React from 'react';
 
gantt.config.columns = [
    {name:"text",       label:"Task name",  tree:true, width:"*"},
    {name:"start_date", label:"Start time", align: "center"},
    {name:"duration",   label:"Duration",   align: "center"},
    { 
        name:"external", label:"Element 1", align: "center",
        onrender: (item, node) => {
            return <DemoButton
                    text="Edit 1"
                    onClick={() => alert("Element as React Component")}
                    />
        }
    }
];
 
gantt.config.external_render = { 
    // checks the element is a React element
    isElement: (element) => {
        return React.isValidElement(element);
    },
    // renders the React element into the DOM
    renderElement: (element, container) => {
        ReactDOM.render(element, container);
    }
};
```

点击滚动

```js
// 点击触发

// 水平滚动
gantt.scrollTo(30, 80); // scrolls container both horizontally and vertically 
```

