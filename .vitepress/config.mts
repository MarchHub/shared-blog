import { defineConfig } from 'vitepress'
import { sidebar } from './scripts/SidebarGenerator'
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'
import { ScanCurrentDir } from './scripts/NavGenerator'

export default defineConfig({
  title: "Machillka's Blog",
  description: "Record learning journey",

  markdown: {
    math: true,
    config: (md) => {
      md.use(markdownItTaskCheckbox)
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`;
          return htmlResult;
      }
    }
  },
  lastUpdated: true,
  themeConfig: {
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    nav: [
      { text: '主页', link: '/' },
      { text: '内容', link: '/posts/'},
      {
        text: '分类',
        items: ScanCurrentDir('../../posts/', 'posts')
      }
    ],
    // 侧边栏自定义
    sidebar: sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/machillka' },
      { icon: '', link: ''}
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present <a href="https://github.com/machillka">Machillka</a>'
    }
  },
})
