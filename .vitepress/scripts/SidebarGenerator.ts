import fs from 'fs'
import path from 'path'
import { folderNames } from '../ignore'
interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

/**
 * @param dir 需要扫描的当前目录
 * @param rountPath 文件前缀
 * @returns 返回传入的 dir 生成的 sidebar
 */
console.log(folderNames)
function ScanDir(dir: string, routePath = '', depth = 1): SidebarItem[] {
    const entries = fs
    .readdirSync(dir)
    .sort((x: string, y: string) => x.localeCompare(y, 'en'))

    const items: SidebarItem[] = []

    for (const name of entries) {
        const fullPath = path.join(dir, name)
        const stat = fs.statSync(fullPath)
        if (folderNames.includes(name))
        {
            console.log(name)
            continue
        }

        // directory -> gen title item
        if (stat.isDirectory())
        {
            const childItems = ScanDir(
                fullPath,
                // path.join(routePath, name),
                routePath + '/' + name,
                depth + 1
            )
            // 存在子项, 添加为子项, 并且当前节点是折叠的节点
            if (childItems.length)
            {
                // 存在导航页面, 添加
                if (fs.existsSync(path.join(fullPath, 'index.md'))) {
                    items.push({
                        text: name,
                        collapsed: depth >= 2,
                        // 默认所有都有导航页面, 写在 path/index.md 中
                        //TODO: 可考虑自动生成 index.md
                        link: routePath + '/' + name + '.md',
                        items: childItems
                    })
                } else {
                    items.push({
                        text: name,
                        collapsed: depth >= 2,
                        items: childItems
                    })
                }

            }
            // 若不存在子项 就直接跳过
        }
        // 作为 md 文件 -> 添加 link
        else if (name.endsWith('.md') && name != 'index.md') {
            const slug = name.replace(/\.md$/, '')
            const link = `/${routePath}/${slug}`
            items.push({
                text: slug,
                link: link
            })
        }
    }

    return items;
}

//TODO: 是否要对每一个专栏的侧边栏进行简单的重定义？

export const postSidebar: SidebarItem[] = ScanDir(
    path.join(__dirname, '../../posts'),
    'posts'
)