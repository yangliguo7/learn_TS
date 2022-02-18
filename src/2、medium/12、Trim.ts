/*
 * @description 实现trim
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/108-medium-trim/README.md
 */

/* _____________ Your Code Here _____________ */
// 方法1
type TrimLeft<S> = S extends `${" " | "\n" | "\t"}${infer A}` ? TrimLeft<A> : S;
type TrimRight<S> = S extends `${infer A}${" " | "\n" | "\t"}`
  ? TrimRight<A>
  : S;
type Trim<S extends string> = TrimLeft<TrimRight<S>>;

// 方法二
// type Trim<S extends string> = S extends `${" " | "\n" | "\t"}${infer A}`
//   ? Trim<A>
//   : S extends `${infer A}${" " | "\n" | "\t"}`
//   ? Trim<A>
//   : S;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>
];
