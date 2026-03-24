/// <reference types="astro/client" />

// 2026-03-24: 为 Pagefind 动态生成的脚本添加模块定义，解决导入报错
declare module "/pagefind/pagefind.js" {
  export const init: () => Promise<any>;
  export const search: (query: string, options?: any) => Promise<any>;
}
