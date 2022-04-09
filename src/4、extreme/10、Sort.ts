/*
 * @description 数组排序
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/741-extreme-sort/README.md
 */

/* _____________ Your Code Here _____________ */
// A > B => true
type Compare<
  A extends unknown,
  B extends unknown,
  Tmp extends unknown[] = []
> = Tmp["length"] extends A
  ? false
  : Tmp["length"] extends B
  ? true
  : Compare<A, B, [...Tmp, 1]>;
type SortCore<
  // 以传入的数据为起始点为基数 左边为小于他的数 右边大于他的数量
  T extends unknown[],
  B extends unknown,
  Flag extends boolean = false,
  Big extends unknown[] = [],
  Small extends unknown[] = []
> = T extends [infer F, ...infer R]
  ? SortCore<
      R,
      B,
      Flag,
      Compare<F, B> extends true ? [...Big, F] : Big,
      Compare<F, B> extends true ? Small : [...Small, F]
    >
  : Flag extends true
  ? [...Big, ...Small]
  : [...Small, ...Big];
type Sort<
  T extends unknown[],
  Flag extends boolean = false,
  Result extends unknown[] = T
> = T extends [infer F, ...infer R]
  ? Sort<R, Flag, SortCore<Result, F, Flag>>
  : Result;






/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Compare<2, 1>, true>>,
  Expect<Equal<Compare<1, 1>, false>>,
  Expect<Equal<Compare<0, 1>, false>>,

  Expect<
    Equal<SortCore<[2, 4, 7, 6, 6, 6, 5, 8, 9], 5>, [2, 4, 5, 7, 6, 6, 6, 8, 9]>
  >,

  Expect<Equal<Sort<[]>, []>>,
  Expect<Equal<Sort<[1]>, [1]>>,
  Expect<Equal<Sort<[2, 1]>, [1, 2]>>,
  Expect<Equal<Sort<[0, 0, 0]>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1, 2]>, [1, 2, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0]>, [0, 0, 0, 0, 1, 2, 3]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>, [2, 4, 5, 6, 6, 6, 7, 8, 9]>>,
  Expect<Equal<Sort<[1, 1, 2, 1, 1, 1, 1, 1, 1]>, [1, 1, 1, 1, 1, 1, 1, 1, 2]>>,
  Expect<Equal<Sort<[], true>, []>>,
  Expect<Equal<Sort<[1], true>, [1]>>,
  Expect<Equal<Sort<[2, 1], true>, [2, 1]>>,
  Expect<Equal<Sort<[0, 0, 0], true>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1, 2], true>, [3, 2, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0], true>, [3, 2, 1, 0, 0, 0, 0]>>,
  Expect<
    Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>, [9, 8, 7, 6, 6, 6, 5, 4, 2]>
  >
];
