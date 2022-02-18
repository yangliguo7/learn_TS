/*
 * @description 实现Trim Left
 */

/* _____________ Your Code Here _____________ */
//
type TrimLeft<S> = S extends `${" " | "\n" | "\t"}${infer A}` ? TrimLeft<A> : S;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<TrimLeft<"str">, "str">>,
  Expect<Equal<TrimLeft<" str">, "str">>,
  Expect<Equal<TrimLeft<"     str">, "str">>,
  Expect<Equal<TrimLeft<"     str     ">, "str     ">>,
  Expect<Equal<TrimLeft<"   \n\t foo bar ">, "foo bar ">>
];
