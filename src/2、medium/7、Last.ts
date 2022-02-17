/*
 * @description 实现一个通用Last<T>，它接受一个数组T并返回其最后一个元素的类型。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/15-medium-last/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */

// type Last<T extends any[]> = T extends [infer F, ...infer R]
//   ? R extends { length: 0 }
//     ? F
//     : Last<R>
//   : never;

// 在ts中... 也可以放在首位进行推断
// type Last<T extends any[]> = T extends [...infer F, infer R] ? R : never;

// 一个新的解法，补充参数
// 但是ts中不能直接做成加减
// 我们需要做一个减法的器。减法可以通过数组长度进行加减
// 然后构建一个数组也是需要通过ts来完成

// 创建一个长度为L的数组
// type GenerateArr<L extends number, A extends any[] = []> = A["length"] extends L
//   ? A
//   : GenerateArr<L, [1, ...A]>;
// // 通过数组长度进行加减运算
// // 这个限定了 A 必须大于 B
// type Minus<A extends number, B extends number> = GenerateArr<A> extends [
//   ...GenerateArr<B>,
//   ...infer R
// ]
//   ? R["length"]
//   : never;
// type Last<T extends any[]> = T["length"] extends 0
//   ? never
//   : T[Minus<T["length"], 1>];

// 可能实现减法运算很麻烦，你也可以这样,构建一个新的数组
type Last<T extends any[]> = T["length"] extends 0
  ? never
  : [never, ...T][T["length"]];

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];
