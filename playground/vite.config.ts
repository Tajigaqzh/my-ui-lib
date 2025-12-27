import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@my-ui/core": resolve(__dirname, "../packages/core/index.ts"),
      "@my-ui/utils": resolve(__dirname, "../packages/utils/src/index.ts"),
    },
  },
  server: {
    fs: {
      // Allow serving files from the parent directory (for dist access)
      allow: ['..']
    }
  },
  // 配置静态资源服务，确保可以访问 dist 目录
  publicDir: false, // 禁用默认的 public 目录
  // 添加静态文件服务中间件
  define: {
    // 确保在开发模式下也能访问构建文件
    __DEV__: true
  },
  // 配置开发服务器的静态文件服务
  assetsInclude: ['**/*.es.js', '**/*.cjs.js']
});
