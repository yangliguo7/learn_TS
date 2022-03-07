/*
 * @description 实现一个fill
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/4518-medium-fill/README.md
 */

/* _____________ Your Code Here _____________ */
// type CreateArr<
//   L extends number,
//   A extends unknown[] = []
// > = A["length"] extends L ? A : CreateArr<L, [...A, 1]>;
// // F>=L =>true
// type isBig<F extends number, L extends number> = CreateArr<F> extends [
//   ...CreateArr<L>,
//   ...infer C
// ]
//   ? true
//   : false;
// type Fill<
//   T extends unknown[],
//   N,
//   Start extends number = 0,
//   End extends number = T["length"],
//   R extends unknown[] = [] // 构建结果数组
// > = true extends isBig<Start, End> //  Start>=End 直接返回 T
//   ? T
//   : T extends [infer F, ...infer L] // 开始遍历
//   ? true extends isBig<R["length"], Start> // 遍历到下标大于等于Start
//     ? true extends isBig<End, R["length"]>
//       ? R["length"] extends End // 遍历结束 这里需要判断edgeCase 当到END最后一位时,应该时F 不应该时N
//         ? Fill<L, N, Start, End, [...R, F]>
//         : Fill<L, N, Start, End, [...R, N]>
//       : Fill<L, N, Start, End, [...R, F]>
//     : Fill<L, N, Start, End, [...R, F]>
//   : R; // 遍历结束返回结果数组

// 方法二
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"],
  R extends unknown[] = [], // 记录已经遍历了几次
  B extends boolean = false // 标识 是否已经到start 和 end 区间范围
> = Start extends End
  ? T
  : T extends [infer F, ...infer L]
  ? R["length"] extends Start
    ? [N, ...Fill<L, N, Start, End, [...R, 1], true>]
    : true extends B
    ? R["length"] extends End
      ? [F, ...Fill<L, N, Start, End, [...R, 1], false>]
      : [N, ...Fill<L, N, Start, End, [...R, 1], true>]
    : [F, ...Fill<L, N, Start, End, [...R, 1], false>]
  : [];

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 2>, [1, true, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>
];
