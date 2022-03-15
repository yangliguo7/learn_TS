/*
 * @description 实现一个c语言的printf
 */

/* _____________ Your Code Here _____________ */

type ControlsMap = {
  c: "char";
  s: "string";
  d: "dec";
  o: "oct";
  h: "hex";
  f: "float";
  p: "pointer";
};
type ParsePrintFormat<
  S extends string,
  A extends string[] = []
> = S extends `${infer F}%${infer C}${infer R}`
  ? C extends keyof ControlsMap
    ? ParsePrintFormat<R, [...A, ControlsMap[C]]>
    : ParsePrintFormat<R, [...A]>
  : A;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ParsePrintFormat<"">, []>>,
  Expect<Equal<ParsePrintFormat<"Any string.">, []>>,
  Expect<Equal<ParsePrintFormat<"The result is %d.">, ["dec"]>>,
  Expect<Equal<ParsePrintFormat<"The result is %%d.">, []>>,
  Expect<Equal<ParsePrintFormat<"The result is %%%d.">, ["dec"]>>,
  Expect<Equal<ParsePrintFormat<"The result is %f.">, ["float"]>>,
  Expect<Equal<ParsePrintFormat<"The result is %h.">, ["hex"]>>,
  Expect<Equal<ParsePrintFormat<"The result is %q.">, []>>,
  Expect<Equal<ParsePrintFormat<"Hello %s: score is %d.">, ["string", "dec"]>>,
  Expect<Equal<ParsePrintFormat<"The result is %">, []>>
];
