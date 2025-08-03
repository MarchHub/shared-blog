// 从markdown中获得文件标题（ # Title
export function getDefaultTitle(content: string) {
    const match = content.match(/^(#+)\s+(.+)/m)
    return match?.[2] || ''
}
