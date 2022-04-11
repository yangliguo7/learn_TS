/*
 * @description 实现减法
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/7561-extreme-subtract/README.md
 */

/* _____________ Your Code Here _____________ */

// M => minuend, S => subtrahend
// M > s
type Subtract<
  M extends number,
  S extends number,
  Flag extends boolean = false,
  A extends number[] = [],
  Result extends number[] = []
> = M extends S
  ? 0
  : A["length"] extends M
  ? Flag extends false
    ? never
    : Result["length"]
  : A["length"] extends S
  ? Subtract<M, S, true, [...A, 1], [...Result, 1]>
  : Subtract<
      M,
      S,
      Flag,
      [...A, 1],
      Flag extends true ? [...Result, 1] : Result
    >;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>
];
