# 安装

## 环境要求

- Node.js 16+
- Vue 3.3+

## 使用包管理器

我们建议您使用包管理器（如 pnpm、npm、yarn）安装 My UI。

### pnpm

```bash
pnpm install @my-ui/core
```

### npm

```bash
npm install @my-ui/core
```

### yarn

```bash
yarn add @my-ui/core
```

## 浏览器直接引入

直接通过浏览器的 HTML 标签导入 My UI，然后就可以使用全局变量 `MyUI` 了。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- 引入样式 -->
    <link rel="stylesheet" href="//unpkg.com/@my-ui/theme/dist/index.css" />
  </head>
  <body>
    <div id="app">
      <my-button>按钮</my-button>
    </div>
  </body>
  <!-- 引入 Vue -->
  <script src="//unpkg.com/vue@3"></script>
  <!-- 引入组件库 -->
  <script src="//unpkg.com/@my-ui/core"></script>
  <script>
    const { createApp } = Vue;
    const app = createApp({});
    app.use(MyUI);
    app.mount("#app");
  </script>
</html>
```

## 开发环境

如果你想在本地开发和调试组件库：

```bash
# 克隆项目
git clone https://github.com/yourusername/my-ui-lib.git

# 进入项目目录
cd my-ui-lib

# 安装依赖
pnpm install

# 构建组件库
pnpm run build

# 启动 playground
pnpm run dev:playground

# 启动文档站点
pnpm run docs:dev
```
