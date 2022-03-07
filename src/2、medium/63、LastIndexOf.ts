/*
 * @description Implement the type version of Array.lastIndexOf, LastIndexOf<T, U> takes an Array T, any U and returns the index of the last U in Array
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/5317-medium-lastindexof/README.md
 */

/* _____________ Your Code Here _____________ */

type LastIndexOf<T, U> = T extends [...infer F, infer R]
  ? R extends U
    ? F["length"]
    : LastIndexOf<F, U>
  : -1;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>
];
