import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My UI",
  description: "一个基于 Vue 3 的现代化 UI 组件库",
  base: "/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/components/button" },
      { text: "指南", link: "/guide/getting-started" },
    ],

    sidebar: {
      "/components/": [
        {
          text: "基础组件",
          items: [
            { text: "Button 按钮", link: "/components/button" },
            { text: "Card 卡片", link: "/components/card" },
          ],
        },
      ],
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "快速开始", link: "/guide/getting-started" },
            { text: "安装", link: "/guide/installation" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/yourusername/my-ui-lib" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025-present",
    },
  },
  vite: {
    server: {
      port: 5174,
    },
  },
});
