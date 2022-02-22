/*
 * @description 实现Partial
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2757-medium-partialbykeys/README.md
 */

/* _____________ Your Code Here _____________ */

// 因为A&B 的交叉类型和全属性在类型上不一样的，即不是全等
type Copy<T extends object> = { [K in keyof T]: T[K] };

// type PartialByKeys<T extends { [k: string]: any }, K = unknown> = Copy<
//   {
//     [P in Exclude<keyof T, K>]: T[P];
//   } & {
//     [P in Extract<keyof T, K>]?: T[P];
//   }
// >;

type PartialByKeys<T extends { [k: string]: any }, K = unknown> = Copy<
  Partial<T> & {
    [P in Exclude<keyof T, K>]: T[P];
  }
>;
// 4.5.4中 相同key 不同修饰符合并则会去除修饰符

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

interface User {
  name: string;
  age: number;
  address: string;
}

interface UserPartialName {
  name?: string;
  age: number;
  address: string;
}

interface UserPartialNameAndAge {
  name?: string;
  age?: number;
  address: string;
}

type cases = [
  Expect<Equal<PartialByKeys<User, "name">, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, "name" | "unknown">, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, "name" | "age">, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>
];
