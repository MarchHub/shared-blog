# Unity Framework

尽量符合`Clean Architecture`，使得各个模块部分之间松耦合，也比较方便迁移到其他的引擎中。

## 框架

总核心的部分。

- 事件订阅、广播
	- Publisher
	- Register
	- 是否要实现一个Module管理，有待思考
- Profile 系统 —— 避免代码内的硬编码
	- 提供持久化功能 —— Json 的导入和导出
	- ~~？要使用反射绑定吗？~~
- 定义各种接口
	- 方法接口
	- 事件接口

## Toolkit

实现具体的功能，可复用模块，“即插即用”，依赖 `Unity` 和 `Framework Core`

- Movement
- 基础攻击系统
- 任务系统
	- 成就系统
- 背包系统
- 音频管理等
- Animation
- 状态机

## 文件目录以及规划

提供一个示例目录

```
Assets/                       // 根目录
├─ Framework/                 // 核心框架
│  ├─ Core/                   // 仅包含核心逻辑
│  │  ├─ Interface            // 抽象接口 (包含方法和事件接口)
│  │  └─ Implementations      // 接口的具体实现
│  └─ Profile/                
└─ Toolkit/                   // 工具箱, 大量实现适配器和接口
   ├─ AudioManager/           // 音频管理器
   ├─ Movement/               // 移动
   │  ├─ IMovement            // 继承方法接口, 并且添加针对移动的接口
   │  ├─ Movement             // 实现 IMovement 并且组装移动逻辑（用例层）
   │  └─ MovementComponent    // 实现 Unity 运行时的实现，即插即用
   ├─ Jump/                   // 跳跃
   └─ Adapters/               // 适配器, 适配 Unity 的输入系统、物理系统等
```

## 框架使用

一个`GameObjet`，把Movemnt组件拖拽进来，就可以移动；Jump组件拖拽，就可以跳跃。
或者快速的通过实现接口来搭建整个游戏，免去一些麻烦

1. 在Toolkit中创建模块（不依赖Unity）
2. 实现组件，达到即插即用的效果

而对于全局的`service`来说，提供可视化编辑器或者快速上手的API，便于日用