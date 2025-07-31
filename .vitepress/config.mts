import { defineConfig } from 'vitepress'
import { sidebar } from './scripts/SidebarGenerator'
import { ScanCurrentDir } from './scripts/NavGenerator'
import githubContributors from './plugins/FetchContributors'
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'
import mark from 'markdown-it-mark'
import footnote from 'markdown-it-footnote'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import wikilink from 'markdown-it-wikilinks'
const base = '/'

export default defineConfig({
  base: base,
  title: "Machillka's Blog",
  description: "Record learning journey",
  head: [
    ['link', { rel: 'icon', href: base + 'favicon.ico' }],
    ['meta', { name : 'algolia-site-verification', content: '98C626A87738BF05'}]
  ],
  cleanUrls: true,
  markdown: {
    math: true,
    config: (md) => {
      md.use(markdownItTaskCheckbox)
        .use(mark)
        .use(footnote)
        .use(wikilink, {
          linkPattern:`/[[([\s\S]+?)\]]/`,
          pageResolver: name =>
          name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, ''),
          hrefTemplate: path => `/${path}/`,
          htmlAttributes: { class: 'wikilink', target: '_blank' }
          }
        )
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
    search: {
      provider: 'local'
    },
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
