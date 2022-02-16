/*
 * @description 实现泛型TupleToUnion<T>，它返回元组所有值的合集。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/10-medium-tuple-to-union/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */
// 错误示例
// type TupleToUnion<T extends any[]> = keyof {
//   [P in T]: P;
// };
// 这里的T并不能遍历。因为T是any类型。并不是联合类型

// 正确示例
// type TupleToUnion<T extends any[]> = T[number];

// type TupleToUnion<T> = T extends (infer F)[] ? F : never;
// 这是使用infer 推断出 F的内容。知道T是什么类型的数组

type TupleToUnion<T extends any[]> = T extends [infer F, ...infer R] ? F | TupleToUnion<R> : never
// 这里的|是联合类型

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<TupleToUnion<[123, "456", true]>, 123 | "456" | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>
];
