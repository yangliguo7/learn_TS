/*
 * @description 联合类型转为交叉类型
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/55-hard-union-to-intersection/README.md
 */

/* _____________ Your Code Here _____________ */
// 错误写法，因为[] 函数都是引用类型 并不是数值类型，所以这个type 只能满足第一个全是基本类型
// type UnionToIntersection<U, T extends U = U> = T extends U
//   ? T & Exclude<U, T>
//   : never;

// 参考文献
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types
// type UnionToIntersection<U> = (
//   U extends unknown ? (arg: U) => unknown : never
// ) extends (arg: infer P) => unknown
//   ? P
//   : never;


// 注意这里不是 T extends unknown ? (arg: T) => void extends (arg: infer R) => void?R:never  :never
// ( T extends unknown ? (arg: T) => void : never ) 这里已经是分配律了
// @link https://stackoverflow.com/questions/62496072/difference-between-covariant-and-contravariant-positions-in-typescript
type UnionToIntersection<T> = (
  T extends unknown ? (arg: T) => void : never
) extends (arg: infer R) => void
  ? R
  : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<UnionToIntersection<"foo" | 42 | true>, "foo" & 42 & true>>,
  Expect<
    Equal<UnionToIntersection<"foo" | 42 | true | []>, "foo" & 42 & true & []>
  >,
  Expect<
    Equal<
      UnionToIntersection<(() => "foo") | ((i: 42) => true)>,
      (() => "foo") & ((i: 42) => true)
    >
  >
];
