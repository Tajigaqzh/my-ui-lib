import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
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

// write output to repository root dist/core so all package builds are centralized
const outDir = resolve(__dirname, "../../dist/core");

export default defineConfig({
  plugins: [
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
      // multiple entry build: each component becomes its own entry
      entry: entries,
      name: "MyUICore",
      // write each component to dist/<component>/index.<format>.js, keep root as index.<format>.js
      fileName: (format, entryName) =>
        entryName === "index"
          ? `index.${format}.js`
          : `${entryName}/index.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        // preserve module directory structure so each component ends up in its own folder under dist/
        preserveModules: true,
        preserveModulesRoot: "packages/core",
      },
    },
  },
});
