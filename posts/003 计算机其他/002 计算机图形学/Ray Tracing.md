# Ray Tracing

光栅化的方法，有很多物理效果难以实现

光：
- 沿直线传播
- 光本身没有碰撞箱
- 光线可逆


## Whitted-Style Ray Tracing

一种递归算法

光线定义：
起点与一个有方向的向量 $r(t)=o + td, 0 \leq t < \infty$

是否相交 —— 
- 隐式表面，直接代入求解
- 显式表面，与三角形求焦
	- 光线和平面求焦
	- 焦点是否在三角形内

表示平面：法向量+一个点P，满足方程：$(P-P')N=0，展开之后——$$ax+by+cz+d=0$ （平面方程

MT 算法

Bounding Voluming：使用包围盒来抽象复杂形状——如果一个光线连包围盒都碰不到，那么更不可能碰到里面的物体

轴对齐包围盒——AABB “横平竖直”

对空间划分 ——
Oct-Tree
KD-Tree
BSP-Tree

对物体进行划分 ——
BVH

## 辐射度量学

准确定义光照的办法

光的属性：
`Radiant Flux` `Intensity` `Irradiance` `Radiance`

- Radiant Flux (Power)：光源单位时间辐射出的能量 $\Phi\equiv\frac{dQ}{dt}$ 是功率，单位 $Watt$ 光学上使用 $lm=lumen$
### Radiant  Intensity

`Radiant Intensity` 简称 `Intensity`，光从光源发出方向性的能量

Power per unit solid angle （每个单位立体角上的Power

$$I(\omega) = \frac{d\Phi}{d\omega}$$
$\Phi$ 可以使用流明或者瓦特作为单位

立体角：单位面积/半径平方 -> $\Omega=\frac{A}{r^2}$ 所以球为 $4\pi$ 立体角

### Irradiance

物体表面接收多少光 Power Per Unit Area

$$
E(x) = \frac{d\Phi}{dA}
$$
$\left[ \frac{W}{m^2} \right], \left[ \frac{lm}{m^2} =lux \right]$

Power/面积

### Radiance

度量光传播中的能量

