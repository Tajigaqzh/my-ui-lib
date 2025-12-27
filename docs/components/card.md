# Card 卡片

将信息聚合在卡片容器中展示。

## 基础用法

卡片包含标题、内容。

```vue
<template>
  <my-card title="卡片标题">
    <p>这是卡片内容</p>
  </my-card>
</template>
```

## 简单卡片

卡片可以只有内容区域。

```vue
<template>
  <my-card>
    <p>这是一个简单的卡片</p>
  </my-card>
</template>
```

## 自定义头部

通过 header 插槽可以自定义头部内容。

```vue
<template>
  <my-card>
    <template #header>
      <div style="display: flex; justify-content: space-between">
        <span>自定义头部</span>
        <my-button size="small">操作按钮</my-button>
      </div>
    </template>
    <p>卡片内容</p>
  </my-card>
</template>
```

## 阴影效果

可以设置卡片的阴影效果。

```vue
<template>
  <div>
    <my-card shadow="always" title="总是显示">
      <p>总是显示阴影</p>
    </my-card>

    <my-card shadow="hover" title="悬浮时显示">
      <p>鼠标悬浮时显示阴影</p>
    </my-card>

    <my-card shadow="never" title="从不显示">
      <p>从不显示阴影</p>
    </my-card>
  </div>
</template>
```

## 自定义样式

可以通过 body-style 属性自定义卡片内容区域的样式。

```vue
<template>
  <my-card
    title="自定义样式"
    :body-style="{ padding: '40px', backgroundColor: '#f5f7fa' }"
  >
    <p>自定义内容区域样式</p>
  </my-card>
</template>
```

## API

### 属性

| 属性名    | 说明               | 类型   | 可选值                 | 默认值 |
| --------- | ------------------ | ------ | ---------------------- | ------ |
| title     | 卡片标题           | string | —                      | —      |
| shadow    | 阴影显示时机       | string | always / hover / never | always |
| bodyStyle | 内容区域自定义样式 | object | —                      | {}     |

### 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| header  | 自定义头部内容 |
| default | 卡片内容       |
