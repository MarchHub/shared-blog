[[Lambda 表达式 - Lambda 表达式和匿名函数 - C# reference | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/lambda-expressions)]

可转化成委托

基本写法
```c#
(input-parameters) => expression

Action line = () => Console.WriteLine();
var Square = (x) => x * x;

```

支持弃元