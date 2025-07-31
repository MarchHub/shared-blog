//  生成 Rss 订阅
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { Feed } from 'feed'
import { createContentLoader } from 'vitepress'

var data = createContentLoader('posts/*.md')

console.log(data)