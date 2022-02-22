/*
 * @description Drop a specified char from a string.
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2070-medium-drop-char/README.md
 */

/* _____________ Your Code Here _____________ */

type DropChar<S, C> = S extends `${infer F}${infer R}`
  ? F extends C
    ? DropChar<R, C>
    : `${F}${DropChar<R, C>}`
  : "";

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type a = DropChar<"butter fly!", "">;
type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<"butter fly!", "">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", " ">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", "!">, "butter fly">>,
  Expect<Equal<DropChar<"    butter fly!        ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "b">, "  u t t e r f l y ! ">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "t">, " b u   e r f l y ! ">>
];
