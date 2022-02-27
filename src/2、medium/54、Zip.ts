/*
 * @description In This Challenge, You should implement a type Zip<T, U>, T and U must be Tuple
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/4471-medium-zip/README.md
 */

/* _____________ Your Code Here _____________ */
// 构建数组减去1位
// type GenerateArr<T extends number, A extends any[] = []> = A["length"] extends T
//   ? A
//   : GenerateArr<T, [...A, 1]>;
// type AddOne<T extends number> = [...GenerateArr<T>, 1]["length"];
// type Zip<
//   T extends any[],
//   U extends any[],
//   I extends number = 0
// > = T[I] extends undefined // 注意一下 这是undefined 不是never
//   ? []
//   : U[I] extends undefined
//   ? []
//   : [[T[I], U[I]], ...Zip<T, U,AddOne<I> extends number?AddOne<I>:never>];

// 方法二 多层循环判断
// type Zip<T extends any[], U extends any[]> = T extends [infer F1, ...infer R1]
//   ? U extends [infer F2, ...infer R2]
//     ? [[F1, F2], ...Zip<R1, R2>]
//     : []
//   : [];

// 一个很巧妙的方法,是对方法一的变形，我们在方法一中特地记录了数组长度
// 然而这是不需要特地操作的
type Zip<
  T extends any[],
  U extends any[],
  A extends any[] = []
> = A["length"] extends T["length"] | U["length"]
  ? A // 这个是A 就是记录的数据,从0 开始记录
  : Zip<T, U, [...A, [T[A["length"]], U[A["length"]]]]>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ["1", "2"]>, [[1, "1"], [2, "2"]]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>
];
