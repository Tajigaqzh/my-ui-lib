import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import fs from "fs";

// Collect component entry points located at packages/core/<component>/index.ts
function getEntries() {
  const dir = resolve(__dirname);
  const entries: Record<string, string> = {};

  for (const name of fs.readdirSync(dir)) {
    const sub = resolve(dir, name);
    try {
      if (fs.statSync(sub).isDirectory()) {
        const entry = resolve(sub, "index.ts");
        if (fs.existsSync(entry)) {
          entries[name] = entry;
        }
      }
    } catch (e) {
      // ignore
    }
  }

  // keep the package root index as the main bundle
  entries["index"] = resolve(__dirname, "index.ts");
  return entries;
}

const entries = getEntries();

// 主入口产物输出到 dist，组件产物输出到 dist/core
const outDir = resolve(__dirname, "../../dist");

export default defineConfig({
  resolve: {
    alias: [
      { find: /^~\/?/, replacement: `${resolve(__dirname, 'src')}/` },
      { find: /^@\/?/, replacement: `${resolve(__dirname, 'src')}/` }
    ]
  },
  plugins: [
    tsconfigPaths(),
    vue(),
    dts({
      outDir,
      // avoid running API Extractor (which can fail with certain TS versions),
      // emit .d.ts per module instead of rolling up
      rollupTypes: false,
      // generate declaration files preserving the package's directory structure
      entryRoot: resolve(__dirname),
      include: ["**/*.ts", "**/*.vue"],
      strictOutput: true,
      // skip type checks during the plugin run to avoid compiler version mismatch failures
      // skipDiagnostics: true,
    }),
  ],
  build: {
    outDir,
    lib: {
      entry: entries,
      name: "MyUICore",
      fileName: (format, entryName) => {
        // 主入口产物输出到 dist/index.js，其它组件输出到 dist/core/xxx/index.js
        if (entryName === "index") return `index.${format}.js`;
        return `core/${entryName}/index.${format}.js`;
      },
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        preserveModules: true,
        preserveModulesRoot: "packages/core",
      },
    },
  },
});
