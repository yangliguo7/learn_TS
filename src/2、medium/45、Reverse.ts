/*
 * @description Implement the type version of Array.reverse
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/3192-medium-reverse/README.md
 */

/* _____________ Your Code Here _____________ */

type Reverse<T extends any[], A extends any[] = []> = T extends [
  infer F,
  ...infer R
]
  ? Reverse<R, [F, ...A]>
  : A;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Reverse<["a", "b"]>, ["b", "a"]>>,
  Expect<Equal<Reverse<["a", "b", "c"]>, ["c", "b", "a"]>>,
  Expect<Equal<Reverse<[]>, []>>
];
