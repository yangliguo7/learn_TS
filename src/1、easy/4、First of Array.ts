/*
 * @description 实现一个通用First<T>，它接受一个数组T并返回它的第一个元素的类型。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/14-easy-first/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */
// 首先很容易写成这样，获取第一个元素，但是没有考虑到空数组的情况
// type First<T extends any[]> = T[0]
// 所以需要解决的是如何判断数组为空，即数组大小为0这一比较。

// 使用extends可以做到数值比较

// 正确示例
type First<T extends any[]> = T["length"] extends 0 ? never : T[0];
// 这里我们去除T[length] 和 0 做比较 (使用extends)

// 其他解法
// type First<T extends any[]> = T extends [] ? never : T[0];
// type First<T extends any[]> = T extends never [] ? never : T[0];
// type First<T extends any[]> = T[0] extends T[number] ? T[0] : never;
// type First<T extends any[]> = T extends [infer First, ...any[]] ? First : never; // 这里使用到了infer 去推断

// 错误示例
// type First<T extends any[]> = T[0] extends never ? never : T[0];


/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];
