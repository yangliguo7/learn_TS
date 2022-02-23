/*
 * @description 元组转为对象
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/3188-medium-tuple-to-nested-object/README.md
 */

/* _____________ Your Code Here _____________ */
// 在type中数组是没办法直接遍历的
// type A<P extends any[]> = {
//   [K in P]: 1; // 这里的P 是没办法直接便利的。因为P 是any类型 导致K 也是any类型，而key 只能是 string|number 不是是symbol
// };
// 所以我们可以做推断
// 即使做推导出数组的每一项也是没办法直接做成对象的key的
// type A<P extends any[]> = P extends [infer F, ...infer R]
//   ? {
//       F: 1; // 这里的F 并不是推导出的F 而是字符串F
//     }
//   : P;
// 我们可以构建A进行赋值，这里的F是any类型。
// type A<P extends any[]> = P extends [infer F, ...infer R]
//   ? {
//       [A in F]: 1; // 这里的F没办法直接遍历，因为类型不满足
//     }
//   : P;
// 所以我们需要构建类型 & string
// type A<P extends any[]> = P extends [infer F, ...infer R]
//   ? {
//       [A in F & string]: 1; // 这里的A 才是真正的对象key
//     }
//   : P;

// 从后往前推
type Helper<U, O> = O extends { [k: string]: never } ? U : O;
type TupleToNestedObject<T extends any[], U, O = {}> = T extends [
  ...infer F,
  infer R
]
  ? TupleToNestedObject<
      F,
      U,
      {
        [P in R & string]: Helper<U, O>;
      }
    >
  : Helper<U, O>;

// 从前往后推
// type TupleToNestedObject<T extends any[], U> = T extends [infer F, ...infer R]
//   ? {
//       [P in F & string]: TupleToNestedObject<R, U>;
//     }
//   : U;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<TupleToNestedObject<["a"], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<["a", "b"], number>, { a: { b: number } }>>,
  Expect<
    Equal<
      TupleToNestedObject<["a", "b", "c"], boolean>,
      { a: { b: { c: boolean } } }
    >
  >,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>
];
