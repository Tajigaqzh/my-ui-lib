import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: {
      "@my-ui/core": resolve(__dirname, "packages/core"),
      "@my-ui/utils": resolve(__dirname, "packages/utils/src"),
    },
  },
});
