# TypeScript JSX 类型警告修复

> 生成时间：2025-12-27
> 相关问题：JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists

## 问题描述

在 Vue 组件中出现 TypeScript 警告：

```
JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
```

这是因为 TypeScript 找不到 JSX 的类型定义。

## 解决方案

### 1. 添加 JSX 类型声明 ✅

创建全局 JSX 类型声明文件：

**文件**：`types/vue-jsx.d.ts`

```typescript
import type { VNode } from "vue";

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass {
      $props: {};
    }
    interface ElementAttributesProperty {
      $props: {};
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface IntrinsicAttributes {
      [elem: string]: any;
    }
  }
}

export {};
```

### 2. 更新 tsconfig.base.json ✅

添加 JSX 相关配置：

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "vue",
    "types": ["vite/client"]
  },
  "include": ["types/**/*.d.ts"]
}
```

### 3. 更新 packages/core/tsconfig.json ✅

```json
{
  "compilerOptions": {
    "jsx": "preserve"
  },
  "include": ["**/*.ts", "**/*.vue", "**/*.tsx", "shims-vue.d.ts"]
}
```

### 4. 完善 Vue 组件类型声明 ✅

更新 `packages/core/shims-vue.d.ts`：

```typescript
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    MyButton: typeof import("./button/src/button.vue").default;
    MyCard: typeof import("./card/src/card.vue").default;
  }
}

export {};
```

### 5. 修复 Button 组件模板 ✅

在模板中使用 `props.` 前缀访问属性：

```vue
<template>
  <button
    :class="[
      'my-button',
      `my-button--${props.type}`,
      `my-button--${props.size}`,
    ]"
    :disabled="props.disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps(buttonProps);
const { _ref, handleClick } = useButton(props);
</script>
```

### 6. 安装必要的依赖 ✅

```bash
pnpm add -D -w @vue/runtime-core
```

## 验证结果

构建成功，没有类型错误：

```bash
pnpm run build
# ✓ built in 1.22s
```

## 相关配置文件

- `types/vue-jsx.d.ts` - JSX 类型声明
- `tsconfig.base.json` - 基础 TypeScript 配置
- `packages/core/tsconfig.json` - Core 包配置
- `packages/core/shims-vue.d.ts` - Vue 组件类型声明

## 最佳实践

### 1. Vue 3 + TypeScript 项目配置

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "vue",
    "types": ["vite/client"]
  }
}
```

### 2. 在模板中访问 props

```vue
<!-- 推荐：使用 props. 前缀 -->
<template>
  <div>{{ props.title }}</div>
</template>

<!-- 或者解构 -->
<script setup>
const { title } = defineProps<{ title: string }>();
</script>
<template>
  <div>{{ title }}</div>
</template>
```

### 3. 全局组件类型声明

```typescript
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    MyComponent: typeof import("./path/to/component.vue").default;
  }
}
```

## 总结

通过添加 JSX 类型声明和完善 TypeScript 配置，成功解决了 Vue 3 项目中的 JSX 类型警告问题。现在项目可以正常构建，没有类型错误。

---

相关文档：

- [TypeScript 配置](../../tsconfig.base.json)
- [Vue 类型声明](../../packages/core/shims-vue.d.ts)
- [JSX 类型声明](../../types/vue-jsx.d.ts)
