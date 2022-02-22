/*
 * @description Implement EndsWith<T, U> which takes two exact string types and returns whether T ends with U
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2693-medium-endswith/README.md
 */

/* _____________ Your Code Here _____________ */

type EndsWith<T extends string, U extends string> = T extends `${infer F}${U}`
  ? true
  : false;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<EndsWith<"abc", "bc">, true>>,
  Expect<Equal<EndsWith<"abc", "abc">, true>>,
  Expect<Equal<EndsWith<"abc", "d">, false>>
];
