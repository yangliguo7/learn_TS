/*
 * @description IsTuple
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/4484-medium-istuple/README.md
 */

/* _____________ Your Code Here _____________ */
// type IsTuple<T> = T extends readonly [infer F, ...infer R]
//   ? true
//   : T extends []
//   ? true
//   : false;

// type IsTuple<T> = T extends readonly any[]
//   ? number extends T["length"] // 这里不能写成 T["length"] extends number 因为number是大类型 1234这种数组也是extends number
//     ? false
//     : true
//   : false;

// 如果需要解决never的问题则需要
type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
  ? number extends T["length"]
    ? false
    : true
  : false;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>, // 这个里面并没有内容。 T["length"] => number
  Expect<Equal<IsTuple<never>, false>>
];
