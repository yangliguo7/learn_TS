/*
 * @description Implement the type version of Array.indexOf, indexOf<T, U> takes an Array T, any U and returns the index of the first U in Array T.
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/5153-medium-indexof/README.md
 */

/* _____________ Your Code Here _____________ */

type IndexOf<T extends unknown[], U, A extends unknown[] = []> = T extends [
  infer F,
  ...infer R
]
  ? F extends U
    ? A["length"]
    : IndexOf<R, U, [...A, F]>
  : -1;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
];
