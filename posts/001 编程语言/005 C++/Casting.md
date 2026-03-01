# Casting

比直接 `(T)val` 略高级一点

## 编译期 Cast

`static_cast` 可以做基本类型转化,比如`int`和`float`之间.
同时也可以把 `void*` 指针转回原始类型的指针

问题就是,它不会在 runtime 进行检查,所以如果用它把基类指针转回子类（Downcasting），但该对象实际上并不是那个子类，编译器不会报错，但运行时的解引用会触发未定义行为。

##

``
`dynamic_cast`


## 

`const_cast`