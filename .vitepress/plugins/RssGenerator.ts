import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'
import { getDefaultTitle } from '../utilities/markdown'

// 匹配当前目录以及所有子目录下的 md 文件
const PATH = '**/*.md'
const baseUrl = `https://blog.machillka.site`

const feed = new Feed({
    title: `Machillka's Note`,
    description: 'Shared Notes',
    id: baseUrl,
    link: baseUrl,
    copyright: 'Copyright (c) 2025-present Machillka'
})



export async function genFeed(config: SiteConfig) {
    const postsMarkdown = await createContentLoader(PATH, {
    excerpt: true,
    render: true
    }).load()

    for (const {url, excerpt, frontmatter, html} of postsMarkdown) {
        feed.addItem({
            title: frontmatter.title || '',
            id: `${baseUrl}${url}`,
            link: `${baseUrl}${url}`,
            description: excerpt,
            content: html?.replaceAll('$ZeroWidthSpace', ''),
            date: frontmatter.data
        })
    }
    writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
}