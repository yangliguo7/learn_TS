/*
 * @description 创建一个比较大小的类型
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/4425-medium-greater-than/README.md
 */

/* _____________ Your Code Here _____________ */
// 通过数组是否能够分解
type CreateArr<T extends number, A extends any[] = []> = A["length"] extends T
  ? A
  : CreateArr<T, [...A, any]>;
type GreaterThan<T extends number, U extends number> = CreateArr<T> extends [
  ...CreateArr<U>,
  ...infer R
]
  ? R["length"] extends 0
    ? false
    : true
  : false;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>
];
