/*
 * @description 找出相同的部分
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/5423-hard-intersection/README.md
 */

/* _____________ Your Code Here _____________ */
// 方法1
type GetItem<T> = T extends unknown[] ? T[number] : T;
// type GetSameItem<T, P, A extends GetItem<T> = GetItem<T>> = A extends GetItem<T>
//   ? A extends GetItem<P>
//     ? A
//     : never
//   : never;
// type Intersection<T extends unknown[], A extends unknown = ""> = T extends [
//   infer F,
//   ...infer R
// ]
//   ? Intersection<R, GetSameItem<"" extends A ? F : A, F>>
//   : A;

// 方法2
type Intersection<T extends unknown[]> = T extends [infer F, ...infer R]
  ? GetItem<F> & Intersection<R>
  : unknown;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>,

  Expect<Equal<GetItem<[1, 2, 3]>, 1 | 2 | 3>>,
  Expect<Equal<GetItem<[]>, never>>,
  Expect<Equal<GetItem<1>, 1>>,
  // Expect<Equal<GetSameItem<[], []>, never>>,
  // Expect<Equal<GetSameItem<[1], [1]>, 1>>,
  // Expect<Equal<GetSameItem<[1, 2], [1, 3]>, 1>>,
  // Expect<Equal<GetSameItem<[1, 2], [3]>, never>>,
  // Expect<Equal<GetSameItem<[1, 2], never>, never>>,
  // Expect<Equal<GetSameItem<[1, 2], 1 | 2>, 1 | 2>>,
  // Expect<Equal<GetSameItem<[1, 2], "1" | 2>, 2>>
];
