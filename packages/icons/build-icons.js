// 自动化构建图标库
import { readdirSync, writeFileSync } from "fs";
import { resolve } from "path";

// 自动生成图标导出文件
const generateIconsIndex = () => {
  const iconsDir = resolve(__dirname, "src");
  const files = readdirSync(iconsDir).filter((file) => file.endsWith(".vue"));

  const exports = files
    .map((file) => {
      const name = file.replace(".vue", "");
      return `export { default as ${name} } from './${name}.vue'`;
    })
    .join("\n");

  writeFileSync(resolve(iconsDir, "index.ts"), exports);
};
