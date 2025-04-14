import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/posts/": [
    // "",
    // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "文档",
      icon: "book",
      // prefix: "posts/",
      link: "posts/",
      children: "structure",
    },
    

    // "intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    // },
  ],

  "/zh/concepts/": [
  {
    text: "概念",
    icon: "book",
    link: "/zh/concepts/",
    children: "structure",
  },
],
"/zh/contributing/": [
  {
    text: "开源贡献",
    icon: "book",
    link: "/zh/contributing/",
    children: "structure",
  },
],
});
