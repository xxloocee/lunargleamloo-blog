/**
 * Astro 配置文件
 * 
 * 用于配置站点、适配器和集成工具。
 * 
 * 2026-03-24: 移除已弃用的 Cloudflare platformProxy 配置，改为 Astro 6 自动处理。
 */
// @ts-check

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import { visit } from 'unist-util-visit';

/** @returns {import('unified').Plugin} */
function rehypeLazyImages() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        node.properties.loading = 'lazy';
        node.properties.decoding = 'async';
      }
    });
  };
}

export default defineConfig({
  site: 'https://lunargleamloo-blog.pages.dev',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeLazyImages],
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
