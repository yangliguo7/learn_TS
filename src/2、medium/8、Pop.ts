/*
 * @description 实现一个通用Pop<T>，它接受一个数组T并返回一个没有最后一个元素的数组。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/16-medium-pop/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */
// Pop
type Pop<T extends any[]> = T extends { length: 0 }
  ? []
  : T extends [...infer F, infer R]
  ? F
  : never;

// Shift
// 删除第一个
type Shift<T extends any[], K> = T extends { length: 0 }
  ? []
  : T extends [infer F, ...infer R]
  ? F
  : never;

// Push
type Push<T extends any[], K> = [...T, K];

// Unshift
// 从前面增加第一个
type Unshift<T extends any[], K> = [K, ...T];

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<[]>, []>>,
  Expect<Equal<Pop<["a", "b", "c", "d"]>, ["a", "b", "c"]>>
];
