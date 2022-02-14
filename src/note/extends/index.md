### extends 关键字

js 中像 java 一样，extends 用于扩展 class,继承父类的属性和方法

```javascript
class Father {
  name = "Father";
  say() {
    return "父类的方法father";
  }
}

class Child extends Father {}
new Child().name; // ===> "Father"
new Child().say(); // ===> "父类的方法father"
```

在 TS 中，extends 关键字不同场景下代表的含义不一样

1. 表示继承/拓展的含义
2. 表示约束的含义
3. 表示分配的含义

#### 1.表示继承/拓展的含义

TS 中不仅可以用于 class 中,还可适用于 interface

```ts
interface Father {
  name: string;
}
interface Child extends Father {
  play: () => void;
}
// 这里的Child上面继承了来自Father的属性
const Tom: Child = {
  name: "Tom",
  play: () => {},
};

// 注意字段类型是需要一致的
interface Father {
  name: string;
}
interface Child extends Father {
  name: number; // 这里name是Father上也有的，但是类型不一致，则不允许这样extends
  play: () => void;
}
```

### 2. 表示约束的含义

在我们编写泛型的时候经常用到，约束传入的泛型

```ts
// 限制泛型入参类型。这里需要泛型是一个数组
type T<E extends any[]> = E;

// 限制泛型需要有length这个number字段
type T<E extends { length: number }> = E;

// 判断大小
type T<E extends { length: number }> = E["length"] extends 0 ? number : string;
type A = T<[]>; // string
type B = T<[1]>; // number
```

### 3. 表示分配的含义

extends 用来判断一个类型是不是可以分配给另一个类型,A extends B 并不是说 A 是 B 的子集，而是说 A 可以分配给 B。

```ts
interface Father {
  name: string;
}
interface Child {
  name: string;
}
type A = Child extends Father ? 0 : 1; // 0

interface Child {
  name: number; // 这种则不算继承，因为相同属性名下，类型不一样
}
type A = Child extends Father ? 0 : 1; // 1

// 在extends中 子类型只会大于等于父类型。
interface Father {
  name: string;
  age: number;
}
interface Child {
  name: string;
}
type A = Child extends Father ? 0 : 1; // 1
// 上面Child则不算继承Father。即Child 不能分配给 Father

// 还有一个很重要的则是
// 对于使用extends关键字的条件类型（即上面的三元表达式类型），如果extends前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用分配律计算最终的结果。
// 分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。

type A = "x" | "Y" extends "x" ? string : number; // number
// 这很容易理解 "x" | "Y" 没办法分配给 "x"。因为多了一个"Y"

type P<T> = T extends "x" ? string : number;
type A = P<"x" | "y">; // string | number
// 这里为什么是string | number呢?
// 因为T是泛型、x' | 'y'是联合类型、这里的extends满足分配率的原则。即上面实际操作是
// 1、"x" extends "x" ? string : number; // string
// 2、"Y" extends "x" ? string : number; // number
// 然后在联合起来 string | number
```

注意 never 是是所有类型的子类型，且 never 被认为是空的联合类型

```ts
type P<T> = T extends "x" ? string : number;
type A = P<never>; // never
// never 是空的联合类型,这里的 P<T> 根本没有进行执行,所以是never类型
```

如何防止条件判断中的分配?

**在条件判断类型的定义中，将泛型参数使用[]括起来，即可阻断条件判断类型的分配，此时，传入参数T的类型将被当做一个整体，不再分配。**
```ts
type P<T> = [T] extends ['x'] ? string : number;
type A = P<'x' | 'y'> // number
type A = P<never> // string
```
