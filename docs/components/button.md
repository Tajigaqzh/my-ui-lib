# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type`、`size` 属性来定义按钮的样式。

```vue
<template>
  <div>
    <my-button>默认按钮</my-button>
    <my-button type="primary">主要按钮</my-button>
    <my-button disabled>禁用按钮</my-button>
  </div>
</template>
```

## 不同尺寸

Button 组件提供三种尺寸，可以在不同场景下选择合适的按钮尺寸。

```vue
<template>
  <div>
    <my-button size="small">小型按钮</my-button>
    <my-button size="medium">中等按钮</my-button>
    <my-button size="large">大型按钮</my-button>
  </div>
</template>
```

## API

### 属性

| 属性名   | 说明     | 类型    | 可选值                 | 默认值  |
| -------- | -------- | ------- | ---------------------- | ------- |
| type     | 类型     | string  | default / primary      | default |
| size     | 尺寸     | string  | small / medium / large | medium  |
| disabled | 是否禁用 | boolean | —                      | false   |

### 事件

| 事件名 | 说明           | 回调参数       |
| ------ | -------------- | -------------- |
| click  | 点击按钮时触发 | (event: Event) |

### 插槽

| 插槽名  | 说明     |
| ------- | -------- |
| default | 按钮内容 |
