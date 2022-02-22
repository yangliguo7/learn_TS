/*
 * @description Implement the type version of Array.shift
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/3062-medium-shift/README.md
 */

/* _____________ Your Code Here _____________ */

type Shift<T extends any[]> = T extends [infer F, ...infer R] ? R : [];

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<["a", "b", "c", "d"]>, ["b", "c", "d"]>>,
  Expect<Equal<Shift<[]>, []>>
];
