# 构建优化说明

> 生成时间：2025-12-27
> 相关需求：统一构建配置

## 优化前的问题

1. ❌ 每个包都有独立的 `vite.config.ts`，配置重复且难以维护
2. ❌ 需要分别构建每个包，效率低下
3. ❌ 子包目录下会生成 `node_modules`，依赖管理混乱
4. ❌ 构建产物分散在各个子包的 `dist` 目录

## 优化后的方案

### 1. 统一构建配置 ✅

**单一配置文件**：根目录的 `vite.config.ts` 统一管理所有包的构建

**自动扫描入口**：

```typescript
// 自动发现所有包的入口文件
- packages/core/index.ts → dist/index.*.js
- packages/core/button/index.ts → dist/core/button.*.js
- packages/core/card/index.ts → dist/core/card.*.js
- packages/utils/src/index.ts → dist/utils/index.*.js
- packages/theme/src/index.ts → dist/theme/index.*.js
- packages/icons/src/index.js → dist/icons/index.*.js
```

### 2. 统一依赖管理 ✅

**配置文件**：`.npmrc`

```properties
node-linker=hoisted
shared-workspace-lockfile=true
public-hoist-pattern[]=*
shamefully-hoist=true
```

**效果**：

- 所有依赖安装到根目录 `node_modules`
- 子包不再生成独立的 `node_modules`
- 依赖版本统一，避免冲突

### 3. 统一输出目录 ✅

**输出结构**：

```
dist/
├── index.es.js              # Core 主入口 (ESM)
├── index.cjs.js             # Core 主入口 (CJS)
├── index.d.ts               # Core 类型定义
├── style.css                # 样式文件
├── core/
│   ├── button.es.js
│   ├── button.cjs.js
│   ├── card.es.js
│   ├── card.cjs.js
│   └── index.d.ts
├── utils/
│   ├── index.es.js
│   ├── index.cjs.js
│   └── index.d.ts
├── theme/
│   └── ...
└── icons/
    └── ...
```

### 4. 简化的构建命令 ✅

**之前**：

```bash
pnpm run build:core
pnpm run build:utils
pnpm run build:theme
pnpm run build:icons
```

**现在**：

```bash
pnpm run build  # 一次构建所有包
```

## 构建配置亮点

### 自动化入口扫描

- 无需手动配置每个包的入口
- 新增组件自动被识别
- 支持多种入口模式（src/index.ts、index.ts）

### 性能优化

- 使用 `esbuild` 进行快速压缩
- 启用 sourcemap 便于调试
- 优化依赖预构建

### 输出格式

- 同时生成 ESM 和 CJS 格式
- 支持 tree-shaking
- 外部化 Vue 依赖，减小包体积

### 类型声明

- 自动生成 `.d.ts` 类型文件
- 保持目录结构一致
- 排除测试文件

## 核心配置代码

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [vue(), dts()],
  resolve: {
    alias: {
      "@my-ui/core": resolve(__dirname, "packages/core"),
      "@my-ui/utils": resolve(__dirname, "packages/utils/src"),
      "@my-ui/theme": resolve(__dirname, "packages/theme/src"),
      "@my-ui/icons": resolve(__dirname, "packages/icons/src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    lib: {
      entry: getPackageEntries(), // 自动扫描
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue"],
    },
  },
});
```

## 使用指南

### 开发新组件

1. 在 `packages/core/<component-name>/` 创建组件
2. 创建 `index.ts` 作为入口
3. 运行 `pnpm run build` 自动构建

### 添加新包

1. 在 `packages/<package-name>/` 创建包
2. 创建 `src/index.ts` 或 `index.ts`
3. 更新 `pnpm-workspace.yaml`（如果需要）
4. 运行 `pnpm run build` 自动构建

### 本地开发

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm run build

# 启动 playground 查看效果
pnpm run dev:playground

# 运行测试
pnpm test
```

## 进一步优化建议

### 1. 增量构建

考虑使用 Turborepo 或 Nx 实现增量构建，只构建变更的包：

```bash
pnpm add -D turbo
```

### 2. 并行构建

如果包之间没有依赖关系，可以并行构建提升速度

### 3. 构建缓存

启用 Vite 的构建缓存，加快重复构建速度

### 4. 按需加载

考虑实现组件的按需加载，减小最终打包体积：

```typescript
import { Button } from "@my-ui/core/button";
```

### 5. 监听模式

添加 watch 模式用于开发：

```json
{
  "scripts": {
    "dev": "vite build --watch"
  }
}
```

## 总结

通过统一构建配置，我们实现了：

- ✅ 配置简化：从 4 个配置文件减少到 1 个
- ✅ 构建效率：一次命令构建所有包
- ✅ 依赖管理：统一的 node_modules
- ✅ 产物管理：集中的 dist 目录
- ✅ 可维护性：自动化的入口扫描
- ✅ 开发体验：更快的构建速度

这种方案特别适合 monorepo 架构的组件库项目！
