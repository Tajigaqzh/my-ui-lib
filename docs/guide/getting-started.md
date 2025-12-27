# 快速开始

本节将介绍如何在项目中使用 My UI。

## 安装

使用 pnpm 安装：

```bash
pnpm install @my-ui/core
```

使用 npm 安装：

```bash
npm install @my-ui/core
```

使用 yarn 安装：

```bash
yarn add @my-ui/core
```

## 完整引入

在 main.ts 中写入以下内容：

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import MyUI from "@my-ui/core";
import "@my-ui/theme";

const app = createApp(App);
app.use(MyUI);
app.mount("#app");
```

## 按需引入

```vue
<script setup lang="ts">
import { Button, Card } from "@my-ui/core";
</script>

<template>
  <Button>按钮</Button>
  <Card title="卡片标题">卡片内容</Card>
</template>
```

## 开始使用

现在你可以启动项目了。对于各个组件的使用方法，请参阅它们各自的文档。
