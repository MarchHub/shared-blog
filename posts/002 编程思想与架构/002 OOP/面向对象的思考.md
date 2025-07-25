---
date: 2025-07-05T23:49:48+08:00
author: Machillka
title: 面向对象的思考
categories:
  - Program
tags:
  - CSharp
  - 面向对象
  - 修饰符
image: header.jpg
---
# 基础权限

| 修饰符      | 可见范围    | 备注                  |
| -------- | ------- | ------------------- |
| public   | 所有      | 对所有可见               |
| private  | 当前类     | 只能在当前的类才内访问，派生类无法访问 |
| protect  | 当前类和派生类 | 派生类可以访问（可以跨程序集）     |
| internal | 当前程序集   | 也就是当前项目的所有代码都可以访问   |

# 继承与多态

## abstract

”抽象“，也就是标记为未实现，需要在派生类当中做出实现，实现的时候使用 `override` 修饰符

>[!note] 如果类内含有抽象成员，就必须用 `abstract` 修饰这个类


```CSharp
public abstract class AnimalBase
{
    // 所有 Animal 都有的 并且可以随时读写
    public int Id { get; set; }
    // 所有 Animal 都有名字，但是需要自己去实现自己的名字是什么
    public abstract string Name { get; }

}
public class Cat : AnimalBase
{
    // 使用 override 表示重载 abstract 中定义的属性
    public override string Name => "Cat";
    // 只有 Cat 才有捕捉老鼠的行为 所以定义为成员
    public void CatchMouse()
    {
        Console.WriteLine("This cat is catching a mouse");
    }
}
```

## virtual

”虚“，~~可以在基类中提供默认实现的 “abstact”~~，派生类可以选择是否重载 (override) 它
但是只能修饰 方法、属性、索引器、事件，==不可以修饰类==
含有虚成员的类可以不是抽象类

```CSharp
public class Person
{
    public virtual string Name => "Nobody";
}
public class Tom : Person
{
    public override string Name => "Tom";
}
public class Nobody : Person
{
    public void LoudOutSadness()
    {
        // 输出就是 Person 的默认实现, 即 Nobody
        Console.WriteLine(Name);
    }
}
```

## override

用于标记重载抽象成员或者虚成员

## sealed

“密封”，标记此
- 方法，无法再重载
- 类，无法再派生
如下
![[Pasted image 20250706085912.png]]
dog 是最后一层封装，我们无法对它进行派生（~~不然会出现Monster，害怕~~

> 适用于不希望暴露扩展点的核心类，比如工具类或安全敏感类。

## new

”隐藏“，创建一个与基类同名但独立的成员，具体调用哪一个成员，看实例化对象的类型

# 特性修饰符

## static

无需实例化可以直接访问（dotnet 中 CLR **按需** 在类型加载时分配静态字段内存，静态构造则在首次使用前执行）

## const

编译时常量

## readonly

运行时常量，仅能在声明或构造函数中赋值

## partial

拆分声明到多个文件内
```CSharp
// File1.cs
public partial class Person
{
    public string Name { get; set; }
}

// File2.cs
public partial class Person
{
    public int Age { get; set; }
}
```
此时 Person 拥有 Name 和 Age 两个属性

## extern

声明外部实现（针对方法）

```CSharp
public class NativeMethods
{
    [DllImport("user32.dll")]
    public static extern int MessageBox(IntPtr h, string t, string c, uint u);
}
```

## unsafe

可以使用不安全的代码（比如指针操作）
