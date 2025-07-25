# 变量

```c#
??
??=
```

用于合并 null

```C#
int ?a = null;          // 允许 a 为 null
```

```C#
a ?? b

if (a == null)
	a = b;
```

# 方法

```c#
DelegateFunction?.Invoke()
```

判断是否为空，如果为空就不执行；不为空就执行
等价于
```C#
if (DelegateFunction != null)
	DelegateFunction.Invoke();
```