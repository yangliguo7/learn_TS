/*
 * @description Get an Object that is the difference between O & O1
 */

/* _____________ Your Code Here _____________ */
// type Diff<O extends { [k: string]: any }, O1 extends { [k: string]: any }> = {
//   [P in
//     | Exclude<keyof O1, keyof O>
//     | Exclude<keyof O, keyof O1>]: P extends keyof O
//     ? O[P]
//     : P extends keyof O1
//     ? O1[P]
//     : never;
// };

// 简单写法
type Diff<O, O1> = Omit<O & O1, keyof O1 & keyof O>
// Omit 和 Exclude 类似。Exclude 处理的是联合类型
// keyof O1 & keyof O 只会获取相同部分

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  name: string;
  age: string;
  a: number;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};

type Foo2 = {
  name: string;
  age: string;
  a: number;
};
type Bar2 = {
  name: string;
  age: string;
  a: number;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number; a: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number; a: number }>>,
  Expect<Equal<Diff<Bar2, Foo2>, {}>>
];
