/*
 * @description Implement TrimRight<T> which takes an exact string type and returns a new string with the whitespace ending removed.
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/4803-medium-trim-right/README.md
 */

/* _____________ Your Code Here _____________ */

type TrimRight<S extends string> = S extends `${infer F}${" " | "\n" | "\t"}`
  ? TrimRight<F>
  : S;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<TrimRight<"str">, "str">>,
  Expect<Equal<TrimRight<"str ">, "str">>,
  Expect<Equal<TrimRight<" s t r  ">, " s t r">>,
  Expect<Equal<TrimRight<"str     ">, "str">>,
  Expect<Equal<TrimRight<"     str     ">, "     str">>,
  Expect<Equal<TrimRight<"   foo bar  \n\t ">, "   foo bar">>
];
