## require
当前项目是我创建的一个UI库需要实现以下需求：
- 当前安装依赖在每个子文件夹下都会有一个node_modules。我希望所有的依赖都安装到根目录的node_modules
- 所有的scripts标签放到根目录下边，只属于单独的某一个包的脚本除外，如果更新了，记得更新package.json中的内容。
- 整个组件库的打包结果直接放到根组件的dist文件夹下，某个组件的打包结果也放到根组件的dist目录下，单个packages下的模块中不要保留打包内容。

## 已完成（更新于 2025-12-26）
- 在根目录的 `.npmrc` 中添加了 `public-hoist-pattern[]=*` 和 `shamefully-hoist=true`，配合已有的 `node-linker=hoisted`，以确保依赖尽量统一安装到根 `node_modules`。
- 在根 `package.json` 中新增并统一了一些脚本（例如 `build:core`、`build:utils`、`build:packages`），便于在根目录统一运行构建与开发命令；仅保留确实属于单个包的脚本（例如 `@my-ui/core` 的 `prebuild`/`build`/`dev`）。
- Vite 配置已将输出目录设置为仓库根的 `dist/`（`packages/core` -> `dist/core`，`packages/utils` -> `dist/utils`），且各包的 `main/module/exports` 已指向根下的 `dist`，因此不会在单个 package 中保留构建产物。

## 使用说明（建议）
- 在本仓库中请始终在根目录运行 `pnpm install`，以便依赖被安装/提升到根 `node_modules`。
- 使用根脚本进行常用操作，例如：
  - `pnpm run build:core`：构建 `@my-ui/core` 包
  - `pnpm run dev:core`：以 watch/开发模式运行 `@my-ui/core`
  - `pnpm run build:packages`：构建所有 packages

如果你希望我把包内仍保留的 per-package 脚本移到根（并在包内只保留最小化的脚本），我可以继续把这些脚本统一到根 `package.json`。

