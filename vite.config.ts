import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { readdirSync, statSync, existsSync } from "fs";
import { glob } from "glob";

/**
 * 自动扫描 packages 目录，收集所有入口文件
 * 支持的入口模式：
 * 1. packages/<pkg>/src/index.ts - 标准包入口
 * 2. packages/<pkg>/index.ts - 简单包入口
 * 3. packages/core/<component>/index.ts - 组件入口
 *
 * 打包顺序：utils 和 theme 优先，然后是其他包
 */
function getPackageEntries() {
  const entries: Record<string, string> = {};
  const packagesDir = resolve(__dirname, "packages");

  // 优先级顺序：utils -> theme -> icons -> core
  const packageOrder = ["utils", "theme", "icons", "core"];

  for (const pkg of packageOrder) {
    const pkgPath = resolve(packagesDir, pkg);

    if (!existsSync(pkgPath)) continue;

    // 特殊处理 core 包：扫描所有组件
    if (pkg === "core") {
      // Core 主入口
      const coreIndex = resolve(pkgPath, "index.ts");
      if (existsSync(coreIndex)) {
        entries["index"] = coreIndex;
      }

      // 扫描所有组件
      const components = readdirSync(pkgPath).filter((name) => {
        const componentPath = resolve(pkgPath, name);
        return (
          statSync(componentPath).isDirectory() &&
          existsSync(resolve(componentPath, "index.ts"))
        );
      });

      for (const component of components) {
        entries[`core/${component}`] = resolve(pkgPath, component, "index.ts");
      }
    } else {
      // 其他包：优先使用 src/index.ts，其次使用 index.ts
      const srcIndex = resolve(pkgPath, "src/index.ts");
      const jsIndex = resolve(pkgPath, "src/index.js");
      const rootIndex = resolve(pkgPath, "index.ts");

      if (existsSync(srcIndex)) {
        entries[`${pkg}/index`] = srcIndex;
      } else if (existsSync(jsIndex)) {
        entries[`${pkg}/index`] = jsIndex;
      } else if (existsSync(rootIndex)) {
        entries[`${pkg}/index`] = rootIndex;
      }
    }
  }

  return entries;
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: "dist",
      rollupTypes: false,
      entryRoot: "packages",
      include: ["packages/**/*.ts", "packages/**/*.vue"],
      exclude: ["packages/**/node_modules/**", "**/test/**", "**/*.test.ts"],
      strictOutput: true,
    }),
  ],
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
    // 启用 sourcemap 便于调试
    sourcemap: true,
    lib: {
      entry: getPackageEntries(),
      name: "MyUI",
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // 外部化依赖，不打包进产物
      external: ["vue", "@vue/runtime-core", "@vue/shared"],
      output: {
        // 为外部依赖提供全局变量名
        globals: {
          vue: "Vue",
        },
        // 保留模块结构，便于 tree-shaking
        preserveModules: false,
        // 导出模式
        exports: "named",
        // 为 CommonJS 模块添加互操作性
        interop: "auto",
      },
    },
    // 优化构建性能
    minify: "esbuild",
    target: "es2015",
    // 清空输出目录
    emptyOutDir: true,
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ["vue"],
  },
});
