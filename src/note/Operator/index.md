### ts 中的操作符

#### &

TypeScript 也提供了名为交叉类型（Intersection types）的方法，用于合并已经存在的对象类型
注意这个`&`并不是像`Object.assign`一样,当存在相同字段时,后者会替换前者。而是会找到二者相同部分

```ts
// 联合类型
type UnionA = "a" | "b";
type UnionB = "a" | "b" | "c";
type UnionC = "c";
type A = UnionA & UnionB; // "a" | "b" 因为二者共有的部分为 "a" | "b"
type C = UnionA & UnionC; // never 因为二者不存在共有部分

// 接口
type TypeA = {
  name: string;
};
type TypeB = {
  age: number;
};
type A = TypeA & TypeB; // 相当于 { name: string , age: number;  }

// 当遇上相同字段不同类型
type TypeA = {
  name: string;
};
type TypeB = {
  name: number;
};
type A = TypeA & TypeB; // 相当于 { name: never;  }

type TypeA = {
  name: UnionA;
};
type TypeB = {
  name: UnionB;
};
type A = TypeA & TypeB; // 相当于 { name: "a" | "b";  }

// 相同字段 不同修饰符
type TypeA = {
  name: string;
};
type TypeB = {
  readonly name: string;
};
type A = TypeA & TypeB; // 相当于 {  name: string; }
const a: A = {
  name: "namee",
};
a.name = "vvv";
const b: TypeB = {
    name: "namee",
};
b.name = "vvv"; // ERROR：Cannot assign to 'name' because it is a read-only property
// 然而在v4.5.4中就不会报错


```
