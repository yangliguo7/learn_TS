/*
 * @description Implement the type version of Array.join, Join<T, U> takes an Array T, string or number U and returns the Array T with U stitching up.
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/5310-medium-join/README.md
 */

/* _____________ Your Code Here _____________ */
type Join<
  T extends unknown[],
  U extends number | string,
  S extends string = ""
> = T extends [infer F, ...infer R]
  ? R["length"] extends 0
    ? `${S}${string & F}`
    : Join<R, U, `${S}${string & F}${U}`>
  : S;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Join<["a", "p", "p", "l", "e"], "-">, "a-p-p-l-e">>,
  Expect<Equal<Join<["Hello", "World"], " ">, "Hello World">>,
  Expect<Equal<Join<["2", "2", "2"], 1>, "21212">>,
  Expect<Equal<Join<["o"], "u">, "o">>
];
