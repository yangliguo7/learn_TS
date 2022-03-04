/*
 * @description 根据数据大小等分数组
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/4499-medium-chunk/README.md
 */

/* _____________ Your Code Here _____________ */
// 默认N >= 1 T 为 tuple
type Chunk<
  T extends any[],
  N extends number,
  U extends any[] = [],
  P extends any[] = []
> = T extends [infer F, ...infer R]
  ? [...U, F]["length"] extends N
    ? Chunk<R, N, [], [...P, [...U, F]]>
    : Chunk<R, N, [...U, F], P>
  : U["length"] extends 0
  ? [...P, ...U]
  : [...P, U];
// 和js处理逻辑一样
// 1、遍历T
// 2、判断之前保存的数据加上和当前值的长度是否和N相等
//   2.2 如果相等说明满足 则忘最终数据里面存储数据
//   2.2 如果不相等 则继续往临时遍历 U 中存数据
// 需要考虑最后一个值 U 依旧不满足给定的N 这是N 就是 P

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
];
