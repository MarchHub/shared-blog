import { defineConfig } from 'vitepress'
import { sidebar } from './scripts/SidebarGenerator'
import { ScanCurrentDir } from './scripts/NavGenerator'
import githubContributors from './plugins/FetchContributors'
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'
import mark from 'markdown-it-mark'
import footnote from 'markdown-it-footnote'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'

export default defineConfig({
  base: '/vitepress-blog/',
  title: "Machillka's Blog",
  description: "Record learning journey",
  head: [
    ['link', { rel: 'icon', href: '/icon.png' }],
  ],
  cleanUrls: true,
  markdown: {
    math: true,
    config: (md) => {
      md.use(markdownItTaskCheckbox)
      md.use(mark)
      md.use(footnote)
      // md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
      //     let htmlResult = slf.renderToken(tokens, idx, options);
      //     if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`;
      //     return htmlResult;
      // }
    },
    codeTransformers: [
      transformerTwoslash()
    ],
    // theme: { light: 'material-theme-lighter', dark: 'material-theme-palenight' }
  },
  lastUpdated: true,
  themeConfig: {
    lastUpdated: {
      text: '上次更新于',
      formatOptions: {
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
    sidebar: sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/machillka' },
      { icon: '', link: ''}
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present <a href="https://github.com/machillka">Machillka</a>'
    },
  },
  vite: {
    plugins: [
      githubContributors()
    ]
  }
})
