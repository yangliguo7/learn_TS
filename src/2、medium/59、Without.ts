/*
 * @description 实现一个像 Lodash.without 函数一样的泛型 Without<T, U>，它接收数组类型的 T 和数字或数组类型的 U 为参数，会返回一个去除 U 中元素的数组 T。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/5117-medium-without/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */

type Without<
  T extends unknown[],
  U,
  RESULT extends unknown[] = []
> = T extends [infer F, ...infer R]
  ? Without<
      R,
      U,
      F extends (U extends unknown[] ? U[number] : U) ? RESULT : [...RESULT, F]
    >
  : RESULT;

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
];
