/*
 * @description Implement StartsWith<T, U> which takes two exact string types and returns whether T starts with U
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2688-medium-startswith/README.md
 */

/* _____________ Your Code Here _____________ */
type StartsWith<T extends string, U extends string> = T extends `${U}${infer R}`
  ? true
  : false;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<StartsWith<"abc", "ac">, false>>,
  Expect<Equal<StartsWith<"abc", "ab">, true>>,
  Expect<Equal<StartsWith<"abc", "abcd">, false>>
];
