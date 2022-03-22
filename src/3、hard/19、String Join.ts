/*
 * @description Create a type-safe string join utility
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/847-hard-string-join/README.md
 */

type JoinHelper<
  T extends string[],
  D extends string,
  A extends string = ""
> = T extends [infer F, ...infer R]
  ? R extends string[]
    ? JoinHelper<R, D, `${A}${F & string}${R["length"] extends 0 ? "" : D}`>
    : A
  : A;

/* _____________ Your Code Here _____________ */
declare function join<D extends string>(
  delimiter: D
): <T extends string[]>(...parts: T) => JoinHelper<T, D>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

// Edge cases
const noCharsOutput = join("-")();
const oneCharOutput = join("-")("a");
const noDelimiterOutput = join("")("a", "b", "c");

// Regular cases
const hyphenOutput = join("-")("a", "b", "c");
const hashOutput = join("#")("a", "b", "c");
const twoCharOutput = join("-")("a", "b");
const longOutput = join("-")("a", "b", "c", "d", "e", "f", "g", "h");

type cases = [
  Expect<Equal<typeof noCharsOutput, "">>,
  Expect<Equal<typeof oneCharOutput, "a">>,
  Expect<Equal<typeof noDelimiterOutput, "abc">>,
  Expect<Equal<typeof twoCharOutput, "a-b">>,
  Expect<Equal<typeof hyphenOutput, "a-b-c">>,
  Expect<Equal<typeof hashOutput, "a#b#c">>,
  Expect<Equal<typeof longOutput, "a-b-c-d-e-f-g-h">>
];
