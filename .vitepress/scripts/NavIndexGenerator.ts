import fs from 'fs'
import path from 'path'
import { folderNames } from '../ignore'

/*
读取当前目录下的所有文件, 返回需要动态生成 notecard.vue 或者 foldercard.vue 所需要的数据
*/

interface CardItem {
    isNote: boolean
    name: string,
    link: string,
}
/**
 * 
 * @param dir
 * @param routePath
 * @returns 目录下的所有文件的基础数据
 */
export function ReadAllFile(dir: string, routePath: string): CardItem[] {
    const items: CardItem[] = []

    dir = path.join(__dirname, dir)
    const entries = fs
    .readdirSync(dir)
    .sort((x: string, y: string) => x.localeCompare(y, 'en'))

    for(const name of entries) {
        if (name == 'index.md')
            continue
        const fullPath = path.join(dir, name)
        const stat = fs.statSync(fullPath)
        const isNote = !stat.isDirectory()
        items.push({
            isNote: isNote,
            name: name,
            link: routePath + '/' + name + '.md'
        })
    }

    return items
}