/*
 * @description FlattenDepth
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/3243-medium-flattendepth/README.md
 */

/* _____________ Your Code Here _____________ */
// 我之前的做法
// 数字减一
// type GenerateArr<
//   T extends string,
//   A extends any[] = []
// > = `${A["length"]}` extends T ? A : GenerateArr<T, [...A, 1]>;
// type CreateArr<
//   S extends string,
//   A extends any[] = []
// > = S extends `${infer F}${infer L}`
//   ? F extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
//     ? CreateArr<
//         L,
//         [
//           ...A,
//           ...A,
//           ...A,
//           ...A,
//           ...A,
//           ...A,
//           ...A,
//           ...A,
//           ...A,
//           ...A,
//           ...GenerateArr<F>
//         ]
//       >
//     : never
//   : A;
// type MinusOne<T extends number> = CreateArr<`${T}`> extends [
//   infer F,
//   ...infer R
// ]
//   ? R["length"]
//   : T;
// type FlattenDepth<A extends any[], Depth extends number = 1> = Depth extends 0
//   ? A
//   : A extends [infer F, ...infer R]
//   ? [
//       ...(F extends any[] ? FlattenDepth<F, MinusOne<Depth>> : [F]),
//       ...(R["length"] extends 0 ? [] : FlattenDepth<R, Depth>)
//     ]
//   : A;
// 这个做法的问题就是在于：会有一个递归深度的问题,因为进行了减法运算

type FlattenDepth<
  T,
  P extends number = 1,
  A extends any[] = []
> = A["length"] extends P
  ? T
  : T extends [infer F, ...infer R]
  ? F extends any[]
    ? [...FlattenDepth<F, P, [0, ...A]>, ...FlattenDepth<R, P, A>]
    : [F, ...FlattenDepth<R, P, A>]
  : T;
// 这个解法并没有做减法运算，而是构建了数组，用数组长度做计数器

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<
    Equal<
      FlattenDepth<[1, 2, 3, 4], 222222222222222222222222222222>,
      [1, 2, 3, 4]
    >
  >,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[[1], 1, [2]]>, [1, 1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [5], 2, [3, 4], [[[5]]]], 2>, [1, 5, 2, 3, 4, [5]]>
  >,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [], [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>
  >,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
];
