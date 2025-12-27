import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@my-ui/core": resolve(__dirname, "../dist/index.es.js"),
      "@my-ui/utils": resolve(__dirname, "../dist/utils/index.es.js"),
    },
  },
});
