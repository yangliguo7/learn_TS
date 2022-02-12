### 全局的实用程序类型

TS 中提供了很多全局的实用程序类型（Utility Types）

#### Partial< Type >

返回一个给定类型(Type)所有子集类型，该类型所有属性都**可选**

```ts
type A = {
  name: string;
  readonly age: number;
};
type Optional_A = Partial<A>;
// 等同于下面,将A的属性都变为可选
type Optional_A = {
  name?: string;
  readonly age?: number;
};
const param: Optional_A = {
  name: "name",
};

接口也同样适用;
interface A {
  name: string;
  readonly age: number;
}
type Optional_A = Partial<A>;
const param: Optional_A = {
  name: "name",
  age: 1,
};
param.age = 2; // ERROR Cannot assign to 'age' because it is a read-only property.
```

#### Required< Type >

与 Partial 相反，构造一个 Type 类型都变成 Required 的类型

```ts
interface A {
  age?: number;
  readonly name?: string;
}
type Required_A = Required<A>;
// 等同于下面,将A的属性都变为必选
interface Required_A {
  a: number;
  readonly b: string;
}
const param: Required_A = {
  name: "name", // ERROR：Property 'age' is missing in type '{ name: string; }' but required in type 'Required<A>'
};

// type 也同样使用
```

#### Readonly< Type >

构造一个 Type 类型都变成 Readonly 的类型

#### Record<Keys, Type>

构造一个**对象类型** 键为 Keys 数值为 Type。用于将一个类型的属性映射到另一个类型

```ts
type K = "string" | 1;
interface I {
  age: number;
  name: string;
}
type R = Record<K, I>; // 等同于 {string: I, "1": I}
const param: R = {
  string: {
    age: 1,
    name: "name",
  },
  1: {
    age: 1,
    name: "name",
  },
};

// 注意：作为对象的key，因此Keys 必须是string|number|symbol类型
// 因此
type K = string[];
type R = Record<K, I>; // ERROR：Type 'K' does not satisfy the constraint 'string | number | symbol'. Type 'string[]' is not assignable to type 'string'
```

#### Pick<Type, Keys>

从 Type 中选取 Keys（字符串文本或字符串文本的并集）;
Keys 需要是`Keyof Type`的子集

```ts
type T = {
  readonly name: string;
  age?: number;
  score: number;
};
type P = Pick<T, "name">; // 等同于 { readonly name: string; }
const param: P = {
  name: "name",
};
param.name = "other"; // ERROR：Cannot assign to 'name' because it is a read-only property.
// 取出多个Keys
type P = Pick<T, "name" | "age">; // 等同于 { readonly name: string; age?: number;}
// 如果在type上取出一个不存在的Key
type P = Pick<T, "name2">; // ERROR：'"name2"' is not assignable to type 'keyof T'.
```

#### Omit<Type, Keys>

从 Type 中省略 Keys（字符串文本或字符串文本的并集）来构造一个类型。
与 Pick 不一样，Pick 是从 Type 中取出 Keys,把 Type 作为新的类型。而 Omit 是从 Type 中省略 Keys 将，剩下的东西作为新的类型

```ts
type T = {
  readonly name: string;
  age?: number;
  score: number;
};
type P = Omit<T, "name">; // 等同于 { age?: number; score: number; } 省略了name
// 省略多个key
type P = Omit<T, "name" | "age">; // 等同于 { score: number; } 省略了name,age
// 省略一个不存在的key
type P = Omit<T, "name" | "name2">; //等同于 { age?: number; score: number; } 只省略了name，并不会异常
```

#### Exclude<UnionType, ExcludedMembers>

和 Omit 类似,对于联合类型(UnionType)而言,去除在 UnionType 中存在的 ExcludedMembers，返回一个新的 type

```ts
type T0 = Exclude<"a" | "b" | "c", "a">; // 等同于 "b" | "c"

type T0 = Exclude<"a" | "b" | "c", "a" | "b">; // 等同于 "c"

type T0 = Exclude<"a" | "b" | "c", "a" | "d">; // "b" | "c"

type T0 = Exclude<"a" | "b" | "c", "a" | "b" | "c">; // never
```

#### Extract<UnionType, ExtractMembers>

和 Exclude 相反，和 Pick 类似，在 UnionType 中，获取 ExtractMembers 中存在的 ExtractMembers，返回一个新的 type

```ts
type T0 = Extract<"a" | "b" | "c", "a">; // 等同于 "a"

type T0 = Extract<"a" | "b" | "c", "a" | "b">; // 等同于 "a" | "b"

type T0 = Extract<"a" | "b" | "c", "a" | "d">; // "a"

type T0 = Extract<"a" | "b" | "c", "d">; // never
```

### NonNullable< Type >

从 Type 中去除 null、undefined、Type

```ts
type T0 = NonNullable<string | number | undefined>; // string | number

type T0 = NonNullable<undefined>; // never

type T0 = NonNullable<{
  // { name: string; age: null; scode: undefined; }
  name: string;
  age: null;
  scode: undefined;
}>;
```

#### Parameters< Type >

从函数类型的参数中使用的类型构造元组类型，

```ts
declare function f1({ a, b }: { a: string; b: string }): void;

type T = Parameters<f1>; // ERROR f1 是一个数值而不是类型

type T = Parameters<typeof f1>; // [{ a: string; b: string }] 注意这是一个数组,

const a: T = [{ a: "a", b: "b" }];

type T = Parameters<() => void>; // [] 因为默认参数args是一个数组

class C {
  constructor() {}
}
type T = Parameters<typeof C>; //  Type 'typeof C' does not satisfy the constraint '(...args: any) => any'.
```

#### ConstructorParameters< Type >

与 Parameters 类似，Parameters 并不作用与构造函数，而 ConstructorParameters 则是适用于构造函数(可 new 的)

```ts
class C {
  constructor({ a, b }: { a: string; b: string }) {}
}
type T = ConstructorParameters<typeof C>; // [{ a: string; b: string }] 注意这是一个数组,

class C {
  constructor() {}
}
type T = ConstructorParameters<typeof C>; // []

type T = ConstructorParameters<() => {}>; // ERROR : Type '() => {}' does not satisfy the constraint 'new (...args: any) => any'.
```

#### ReturnType< Type >

构造一个由函数类型的返回类型组成的类型

```ts
declare function f1(): { a: number; b: string };

type T = ReturnType<typeof f1>; // { a: number; b: string }

type f2 = () => void;
type T = ReturnType<f2>; // void

function f3<T>(param: T): T {
  return param;
}
type T = ReturnType<typeof f3>; // unknow

class C {
  constructor() {}
}
type T = ReturnType<typeof C>; //  Type 'typeof C' does not satisfy the constraint '(...args: any) => any'.
```
