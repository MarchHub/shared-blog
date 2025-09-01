# 添加笔记

使用Markdown写好文件直接丢到`posts`下对应的文件夹就好。如果想要开新坑，就新建文件夹，侧边栏和导航会自动生成

提供一个笔记的template
```txt
---
tags:
  - temp
date: 2001-03-17
title: Your title
---

# Your title

Contents
```

## 笔记规范

笔记中的图片等资源引用：

可以放在`/posts/Assets/`下然后使用相对路径调用（相对路径以`./`开头），
笔记中图片资源示例：
假设正在记录:`/posts/001 编程语言/001 C#/基础语法`中，需要放一张名为`test.jpg`的贴图，则使用如下语法
`![TEST](./../../attachments/pln.jpg)`

当然也可以再在笔记所在目录下建立一个`Assets`文件夹，然后调用

静态资源可以放在`/public/`目录下

## 文件命名规范

- 以 `00x` 作为文件夹的开头
- 写的开心就好