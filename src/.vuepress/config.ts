import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      // title: "Blog Demo",
      description: "A blog demo for cilikube",
    },
    "/zh/": {
      lang: "zh-CN",
      // title: "CILIKUBE",
      description: "集群管理平台",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
