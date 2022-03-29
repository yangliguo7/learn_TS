/*
 * @description 实现 ObjectFromEntries
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2949-hard-objectfromentries/README.md
 */

/* _____________ Your Code Here _____________ */
// 方法一
// 取出key
// type ObjectFromEntriesKeyHelper<T extends unknown[]> = T["length"] extends 2
//   ? T[0]
//   : never;
// // 取出value
// type ObjectFromEntriesValueHelper<
//   T extends unknown[],
//   key extends string,
//   A extends T = T
// > = T["length"] extends 2
//   ? T extends A
//     ? T[0] extends key
//       ? T[1]
//       : never
//     : never
//   : never;
// type ObjectFromEntries<T extends unknown[]> = T["length"] extends 2
//   ? {
//       [P in ObjectFromEntriesKeyHelper<T> &
//         string]: ObjectFromEntriesValueHelper<T, P>;
//     }
//   : never;

// 其实很容易把他构造成 { name: string} | { age: number} | {locations: string[] | null} 这样的类型
// type ObjectFromEntriesHelper<
//   T extends unknown[],
//   A extends T = T
// > = T["length"] extends 2
//   ? T extends A
//     ? Record<T[0] & string, T[1]>
//     : never
//   : never;
// // 和目标的区别是 目标是一整个对象。如果我们用之前的UnionToIntersection 则变成 A & B & C...
// type UnionToIntersection<T extends Record<string, unknown>> = (
//   T extends unknown ? (arg: T) => void : never
// ) extends (arg: infer R) => void
//   ? R
//   : never;
// // 他虽然直观是一个never类型但是我们可以Pick遍历出来!!!!!!!!!!!!
// // 这个方法也很巧妙!! 但是需要注意的是。如果两个key重复则会是never类型
// type Pick<T> = {
//   [P in keyof T]: T[P];
// };
// // 集合一下
// type ObjectFromEntries<T extends unknown[]> = Pick<
//   UnionToIntersection<ObjectFromEntriesHelper<T>>
// >;
// type ObjectFromEntries<T extends [string,any]> = {
//     [K in T as K[0]]:K[1]
// }

// 方法三
type ObjectFromEntries<T extends [string, any]> = { [A in T as A[0]]: A[1] };

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries =
  | ["name", string]
  | ["age", number]
  | ["locations", string[] | null];

type cases = [Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>];
