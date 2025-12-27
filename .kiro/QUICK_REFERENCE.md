# 快速参考

> 常用命令和工作流程速查表

## 📋 常用命令

### 依赖管理

```bash
# 安装所有依赖
pnpm install

# 添加根依赖
pnpm add -D <package>

# 添加到特定包
pnpm add <package> --filter @my-ui/core
```

### 构建

```bash
# 构建所有包
pnpm run build

# 清理构建产物
pnpm run clean
```

### 开发

```bash
# 启动 playground
pnpm run dev:playground

# 启动文档站点
pnpm run docs:dev
```

### 测试

```bash
# 运行测试（单次）
pnpm test --run

# Watch 模式
pnpm test

# 测试 UI
pnpm test:ui

# 覆盖率报告
pnpm test:coverage
```

### 发布

```bash
# 创建 changeset
pnpm changeset

# 版本更新
pnpm version

# 发布
pnpm release
```

## 🔄 工作流程

### 1. 添加新组件

```bash
# 1. 创建组件文件夹
mkdir -p packages/core/input

# 2. 创建组件文件
# packages/core/input/src/input.vue
# packages/core/input/src/input.ts
# packages/core/input/index.ts

# 3. 在 packages/core/index.ts 中导出
# export { Input } from './input'

# 4. 构建
pnpm run build

# 5. 在 playground 中测试
pnpm run dev:playground
```

### 2. 添加测试

```bash
# 1. 创建测试文件
# test/<component>.test.ts

# 2. 运行测试
pnpm test --run

# 3. 查看覆盖率
pnpm test:coverage
```

### 3. 更新文档

```bash
# 1. 编辑 .kiro/requirements.md 添加需求

# 2. AI 执行后会生成总结到 .kiro/summaries/

# 3. 更新根 README.md（如果需要）
```

## 📁 文件位置速查

### 源码

- 组件：`packages/core/<component>/`
- 工具：`packages/utils/src/`
- 样式：`packages/theme/src/`
- 图标：`packages/icons/src/`

### 配置

- 构建配置：`vite.config.ts`
- 测试配置：`vitest.config.ts`
- TypeScript：`tsconfig.json`
- pnpm：`.npmrc`, `pnpm-workspace.yaml`

### 文档

- 需求管理：`.kiro/requirements.md`
- AI 总结：`.kiro/summaries/`
- 组件文档：`docs/`

### 演示和测试

- Playground：`playground/`
- 测试文件：`test/`

## 🎯 组件开发模板

### 组件文件结构

```
packages/core/<component>/
├── src/
│   ├── <component>.vue      # 组件主文件
│   ├── <component>.ts       # 组件属性定义
│   └── use-<component>.ts   # 组件逻辑（可选）
└── index.ts                 # 入口文件
```

### 组件模板

**src/component.ts**

```typescript
import type { ExtractPropTypes } from "vue";

export const componentProps = {
  // 定义属性
} as const;

export type ComponentProps = ExtractPropTypes<typeof componentProps>;
```

**src/component.vue**

```vue
<template>
  <div class="my-component">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { componentProps } from "./component";

defineOptions({
  name: "MyComponent",
});

defineProps(componentProps);
</script>

<style lang="scss" scoped>
.my-component {
  // 样式
}
</style>
```

**index.ts**

```typescript
import Component from "./src/component.vue";
import type { App } from "vue";

Component.install = (app: App) => {
  app.component(Component.name as string, Component);
};

export default Component;
export { Component };
export * from "./src/component";
```

### 测试模板

**test/component.test.ts**

```typescript
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Component from "../packages/core/component/src/component.vue";

describe("Component", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component);
    expect(wrapper.exists()).toBe(true);
  });
});
```

## 🔍 故障排查

### 构建失败

```bash
# 1. 清理并重新安装
pnpm run clean
rm -rf node_modules
pnpm install

# 2. 重新构建
pnpm run build
```

### 类型错误

```bash
# 检查 TypeScript 配置
cat tsconfig.json

# 确保 shims-vue.d.ts 存在
cat packages/core/shims-vue.d.ts
```

### 测试失败

```bash
# 查看详细错误
pnpm test --run --reporter=verbose

# 单独运行某个测试
pnpm test test/card.test.ts
```

## 📞 获取帮助

1. 查看 `.kiro/requirements.md` 了解项目历史
2. 查看 `.kiro/summaries/` 中的详细文档
3. 在 `.kiro/requirements.md` 中提出新需求
