# 项目需求文档

> 本文档用于记录项目需求、已完成的工作和待办事项。
> 你可以在这里提出新需求，AI 会读取并执行。

## 当前项目概述

这是一个基于 Vue 3 的 UI 组件库，采用 monorepo 架构，使用 pnpm workspace 管理。

## 需求历史

### ✅ 已完成 - 2025-12-27

#### 1. 统一构建配置

**需求**：

- 当前每个子包都有独立的 vite.config.ts，希望统一在根目录打包
- 所有依赖安装到根目录的 node_modules
- 所有构建产物输出到根目录的 dist 文件夹

**完成情况**：

- ✅ 删除了所有子包的独立 vite.config.ts（4个）
- ✅ 创建根目录统一的 vite.config.ts，自动扫描所有包入口
- ✅ 配置 .npmrc 实现依赖提升到根目录
- ✅ 统一输出到 dist/ 目录，生成 ESM 和 CJS 两种格式
- ✅ 自动生成 TypeScript 类型声明文件

#### 2. 创建 Card 组件

**需求**：

- 创建一个 Card 卡片组件
- 支持标题、阴影效果、自定义样式等功能

**完成情况**：

- ✅ 创建完整的 Card 组件（packages/core/card/）
- ✅ 支持 title、shadow、bodyStyle 属性
- ✅ 支持 header 和 default 插槽
- ✅ 完善的 SCSS 样式
- ✅ 已在 packages/core/index.ts 中导出

#### 3. 创建 Playground

**需求**：

- 在根目录创建 playground 文件夹
- 使用打包后的组件库展示示例

**完成情况**：

- ✅ 创建 playground/ 文件夹
- ✅ 配置 Vite 开发环境
- ✅ 展示 Button 和 Card 组件的多种用法
- ✅ 提供完整的演示界面

#### 4. 创建测试环境

**需求**：

- 新建 test 目录使用 vitest
- 测试 Card 组件

**完成情况**：

- ✅ 配置 Vitest 测试框架（vitest.config.ts）
- ✅ 创建 test/ 目录
- ✅ 为 Card 组件编写 7 个单元测试
- ✅ 所有测试通过
- ✅ 支持测试覆盖率报告

#### 5. 文档管理优化

**需求**：

- 总结文档固定输出到某个文件夹
- 提供约束文档和最佳实践方案
- 合并之前的 REQUESTS.md 和总结文档

**完成情况**：

- ✅ 创建 .kiro/ 文件夹管理 AI 协作文档
- ✅ 整合所有需求和总结到统一位置
- ✅ 提供清晰的文档结构

---

## 📋 待办事项

### 高优先级

- [ ] 完善 Button 组件的功能和样式
- [ ] 为 Button 组件添加单元测试
- [ ] 完善组件库的 TypeScript 类型定义

### 中优先级

- [ ] 添加更多基础组件（Input、Select、Dialog 等）
- [ ] 完善 VitePress 文档站点
- [ ] 添加组件的使用文档和 API 说明

### 低优先级

- [ ] 配置 CI/CD 自动化流程
- [ ] 添加 ESLint 和 Prettier 配置
- [ ] 配置 Husky 和 Commitlint
- [ ] 考虑使用 Turborepo 优化构建性能

---

## 🎯 新需求

> 在下方添加你的新需求，AI 会读取并执行

### 标记系统说明
- `[TODO]` - 待实现的需求
- `[IN_PROGRESS]` - 正在实现中  
- `[DONE]` - 已完成
- `[BLOCKED]` - 被阻塞的需求

### 需求列表

- 打包顺序调整。我的utils和theme打包优先级最高，我希望你在打包的时候先打包这两个目录，之后再打包其他目录。`[DONE]`
- 完善组件库的 TypeScript 类型定义 `[DONE]`
- 添加 ESLint 和 Prettier 配置，格式化代码，配置 Husky 和 Commitlint规范提交信息，在提交之前执行format格式化代码。`[DONE]`
- 完善card的VitePress 文档站点，之后新生成的模块自动更新VitePress，修改vitepress默认端口，确保他不使用5173 `[DONE]`
- 使用 Turborepo 优化构建性能 `[DONE]`
- playground已经实现了直接引用core包中的组件，现在我想让你进一步完善playground包，按照我的组件名创建路由，一个路由对应一个组件，这样可以单独测试某一个组件。`[IN_PROGRESS]`
- 还有一个问题，当我打包后，my-button的样式好像丢失了，请帮我检查一下打包后的组件是否包含样式，还有我希望你能运行playground的时候允许我调整引用的依赖是构件产物，还是源文件，这样我便于对比打包后的效果和开发时的效果是否一致 `[IN_PROGRESS]`